<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Director;
use App\Models\Genre;
use App\Models\Language;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function details($id)
    {
        // Fetch the video details
        $video = Video::with(['languages', 'genres', 'actors', 'directors'])
            ->where('id', decryptString($id))
            ->firstOrFail();

        // Fetch related videos
        $videos = Video::where('status', '!=', 0)
            ->whereHas('languages', function ($query) use ($video) {
                $query->whereIn('languages.id', $video->languages->pluck('id')); // Qualified `languages.id`
            })
            ->whereHas('genres', function ($query) use ($video) {
                $query->whereIn('genres.id', $video->genres->pluck('id')); // Qualified `genres.id`
            })
            ->whereHas('actors', function ($query) use ($video) {
                $query->whereIn('actors.id', $video->actors->pluck('id')); // Qualified `actors.id`
            })
            ->whereHas('directors', function ($query) use ($video) {
                $query->whereIn('directors.id', $video->directors->pluck('id')); // Qualified `directors.id`
            })
            ->with(['languages', 'genres', 'actors', 'directors'])
            ->get();

        // Render the view
        return Inertia::render('Video/Details', [
            'title' => 'Video Details',
            'video' => $video,
            'videos' => $videos,
        ]);
    }

    public function watch($id)
    {
        $video = Video::with(['languages', 'genres', 'actors', 'directors'])
            ->where('id', decryptString($id))
            ->firstOrFail();

        return Inertia::render('Video/Watch', [
            'title' => $video->name,
            'video' => $video,
        ]);
    }


    // Backend ------------------------

    public function importFromImdb(Request $request)
    {
        $imdbId = $request->input('imdb_id'); // tt3896198

        if (!$imdbId) {
            return response()->json(['error' => 'IMDb ID is required.'], 422);
        }

        // Use an API to fetch video details from IMDb
        $response = Http::get("http://www.omdbapi.com", [
            'i' => $imdbId,
            'apikey' => env('OMDB_API_KEY') // Replace with your OMDB API key
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch data from IMDb.'], 500);
        }

        $movieData = $response->json();

        if ($movieData['Response'] === 'False') {
            return response()->json(['error' => 'No video found with that IMDb ID.'], 404);
        }

        // You can now use $movieData to create or update a video record in your database.
        $video = Video::updateOrCreate(
            ['imdb_id' => $movieData['imdbID']],
            [
                'name' => $movieData['Title'],
                'bio' => $movieData['Plot'],
                'place_of_birth' => $movieData['Country'],
                'date_of_birth' => $movieData['Released'],
                'status' => 1,
            ]
        );

        // Optionally, you can also save the poster image.
        $posterUrl = $movieData['Poster'];
        // Save poster logic here...

        return response()->json([
            'success' => 'Video imported successfully.',
            'video' => $video
        ]);
    }

    public function index(Request $request)
    {
        // Get search query and filters from request
        $search = $request->query('s', '');
        $languageId = $request->query('language_id', '');
        $genreId = $request->query('genre_id', '');

        $videos = Video::query()
            ->where('status', '!=', 0) // Exclude videos with status 0
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%'); // Search by name
            })
            ->when($languageId, function ($query, $languageId) {
                $query->whereHas('languages', function ($q) use ($languageId) {
                    $q->where('languages.id', $languageId); // Specify the table name
                });
            })
            ->when($genreId, function ($query, $genreId) {
                $query->whereHas('genres', function ($q) use ($genreId) {
                    $q->where('genres.id', $genreId); // Specify the table name
                });
            })
            ->paginate(4); // Paginate results

        foreach ($videos as $video) {
            $video->thumbnail_url = getImageUrl('videos', $video->thumbnail);
        }
        // Fetch available languages and genres for filters
        $languages = Language::pluck('name', 'id');
        $genres = Genre::pluck('name', 'id');

        // Render the videos index view with data
        return Inertia::render('Admin/Videos/Index', [
            'title' => 'Videos',
            'videos' => $videos,
            'search' => $search,
            'languageId' => $languageId,
            'languages' => $languages,
            'genreId' => $genreId,
            'genres' => $genres,
        ]);
    }

    public function create($id = null)
    {
        // Must match the JavaScript secret key
        $decryptedId = decryptString($id);

        if ($decryptedId === null) {
            abort(404, "Invalid or corrupted ID");
        }

        $video = $id ? Video::find($decryptedId)->load('languages', 'genres', 'actors', 'directors') : null;

        if ($id) {
            $video->thumbnail_url = getImageUrl('videos', $video->thumbnail);
        }

        return Inertia::render('Admin/Videos/Create', [
            'title' => $id ? 'Edit Video' : 'Add Video',
            // 'data' => [
            'video' => $id ? $video : null,
            'languages' => Language::select('id', 'name')->where('status', '!=', 0)->get(),
            'genres' => Genre::where('status', '!=', 0)->get(),
            'actors' => Actor::where('status', '!=', 0)->get(),
            'directors' => Director::where('status', '!=', 0)->get(),
            // ]
        ]);
    }

    public function saveVideo(Request $request, $id = null)
    {
        // Common validation rules for both store and update
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'upcoming' => 'required|in:1,2',
            'access' => 'required|string|in:free,paid',
            'languages' => 'required|array',
            'genres' => 'required|array',
            'actors' => 'required|array',
            // 'directors' => 'required|array',
            'imdb_id' => 'nullable|string',
            'imdb_rating' => 'nullable|numeric|min:1|max:10',
            'content_rating' => 'required|string|regex:/^\d{1,2}\+$/',
            'release_date' => 'nullable|date',
            'status' => 'required|integer|in:1,2',
            'seo_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'keywords' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'poster' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'trailer_url' => 'nullable|url',
            'video_quality' => 'required|integer|in:1,2,3',
            'video_type' => 'required|integer|in:1,2,3,4',
            'video_local' => 'nullable|file|mimes:mp4,avi,mkv',
            'video_local_480' => 'nullable|file|mimes:mp4,avi,mkv',
            'video_local_720' => 'nullable|file|mimes:mp4,avi,mkv',
            'video_local_1080' => 'nullable|file|mimes:mp4,avi,mkv',
            'video_url' => 'nullable|url',
            'video_url_480' => 'nullable|url',
            'video_url_720' => 'nullable|url',
            'video_url_1080' => 'nullable|url',
            'video_hls' => 'nullable|url',
            'video_embed_code' => 'nullable|string',
            'download_enable' => 'required|integer|in:1,2',
            'download_url' => 'nullable|url',
            'subtitle_enable' => 'required|integer|in:1,2',
            'subtitle_language1' => 'nullable|string|max:255',
            'subtitle_url1' => 'nullable|url',
            'subtitle_language2' => 'nullable|string|max:255',
            'subtitle_url2' => 'nullable|url',
            'subtitle_language3' => 'nullable|string|max:255',
            'subtitle_url3' => 'nullable|url',
        ]);

        // If $id is null, create a new Video, else find the existing one
        $video = $id ? Video::findOrFail(decryptString($id)) : new Video;

        // Retrieve old file paths if updating
        $oldPoster = $video->poster;
        $oldThumbnail = $video->thumbnail;
        $oldVideoLocal = $video->video_local;
        $oldVideoLocal480 = $video->video_local_480;
        $oldVideoLocal720 = $video->video_local_720;
        $oldVideoLocal1080 = $video->video_local_1080;

        // Fill the video object with validated data from the request
        $video->fill($request->except([
            'poster',
            'thumbnail',
            'video_local',
            'video_local_480',
            'video_local_720',
            'video_local_1080',
            'languages',
            'genres',
            'actors',
            'directors'
        ]));

        // Save the video record
        $video->save();

        // Clear existing relationships in pivot tables
        DB::table('language_video')->where('video_id', $video->id)->delete();
        DB::table('video_genre')->where('video_id', $video->id)->delete();
        DB::table('video_actor')->where('video_id', $video->id)->delete();
        DB::table('video_director')->where('video_id', $video->id)->delete();

        // Insert new relationships into pivot tables
        $languages = $request->input('languages', []);
        foreach ($languages as $language) {
            // DB::table('language_video')->insert(['video_id' => $video->id, 'language_id' => encryptString($languageId)]);
            DB::table('language_video')->insert(['video_id' => $video->id, 'language_id' => decryptString($language['value'])]);
        }

        $genres = $request->input('genres', []);
        foreach ($genres as $genre) {
            DB::table('video_genre')->insert(['video_id' => $video->id, 'genre_id' => decryptString($genre['value'])]);
        }

        if ($request->actors) {
            $actors = $request->input('actors', []);
            foreach ($actors as $actor) {

                DB::table('video_actor')->insert(['video_id' => $video->id, 'actor_id' => decryptString($actor['value'])]);
            }
        }

        // if ($request->directors) {
        //     $directors = $request->input('directors', []);
        //     foreach ($directors as $director) {
        //         DB::table('video_director')->insert(['video_id' => $video->id, 'director_id' => decryptString($director['value'])]);
        //     }
        // }

        // Handle file uploads and delete old files if updating
        $this->handleFileUpload($request, 'poster', $video, $oldPoster);
        $this->handleFileUpload($request, 'thumbnail', $video, $oldThumbnail);
        $this->handleFileUpload($request, 'video_local', $video, $oldVideoLocal);
        $this->handleFileUpload($request, 'video_local_480', $video, $oldVideoLocal480);
        $this->handleFileUpload($request, 'video_local_720', $video, $oldVideoLocal720);
        $this->handleFileUpload($request, 'video_local_1080', $video, $oldVideoLocal1080);

        return redirect()->back()->with('success', $id ? 'Video updated successfully!' : 'Video created successfully!');
    }

    protected function handleFileUpload(Request $request, $field, $video, $oldFile = null)
    {
        if ($request->hasFile($field)) {
            $file = $request->file($field);
            $filename =  'video_' . time() . $file->getClientOriginalExtension();
            $file->storeAs('public/videos', $filename);
            $video->{$field} = $filename;

            // Delete old file if it exists
            if ($oldFile && Storage::exists('public/videos/' . $oldFile)) {
                Storage::delete('public/videos/' . $oldFile);
            }
        }
    }


    public function status(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|boolean'
        ]);

        $v = Video::findOrFail(decryptString($id));
        $v->status = $request->status ? 1 : 2;
        $v->save();

        return redirect()->back()->with('success', 'Video status changed to ' . ($request->status ? 'active' : 'inactive') . ' successfully.');
    }
    public function destroy($id)
    {
        dd($id);
        $video = Video::where('id', decryptString($id))->first();
        $video->update(['status' => 0]);
        // $video->delete(); // Soft delete or delete based on your requirement
        return redirect()->back()->with('success', 'Video deleted successfully.');
    }

    public function deleteMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:videos,id',
        ]);

        // Fetch the videos to get their image paths
        $videos = Video::whereIn('id', decryptString($request->ids))->get();

        foreach ($videos as $video) {
            if ($video->thumbnail && file_exists(storage_path('app/public/upload/images/videos/' . $video->thumbnail))) {
                unlink(storage_path('app/public/upload/images/videos/' . $video->thumbnail));
            }
            if ($video->poster && file_exists(storage_path('app/public/upload/images/videos/' . $video->poster))) {
                unlink(storage_path('app/public/upload/images/videos/' . $video->poster));
            }
        }

        // Now delete the videos from the database
        Video::whereIn('id', decryptString($request->ids))->delete();

        return back()->with('success', 'Selected videos and their images deleted successfully.');
    }
}
