<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Director;
use App\Models\Genre;
use App\Models\HomeSlider;
use App\Models\Image;
use App\Models\Language;
use App\Models\SubscriptionPlan;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MasterController extends Controller
{
    public function languages()
    {
        return Inertia::render('Admin/Language', [
            'title' => 'Languages',
            'languages' => Language::where('status', '!=', 0)->paginate(4)
        ]);
    }

    public function languageSave(Request $request, $id = null)
    {
        $id = decryptString($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:languages,name,' . $id,
            'status' => 'required|in:1,2',
        ]);

        $lang = $id ? Language::where('id', $id)->first() : new Language;

        $lang->name = $request->name;
        $lang->status = $request->status;
        $lang->save();

        $msg = $id ? 'Language updated successfully' : 'Language created successfully';

        return redirect()->route('admin.languages')->with('success', $msg);
    }

    public function languageStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:0,1,2'
        ]);

        $status = $request->status;

        $lang = Language::findOrFail(decryptString($id));
        $lang->status = $status;
        $lang->save();

        return redirect()->back()->with('success', 'Language status changed to ' . ($status == 1 ? 'active' : ($status == 2 ? 'inactive' : 'delete')) . ' successfully.');
    }

    public function genres()
    {
        return Inertia::render('Admin/Genre', [
            'title' => 'Genres',
            'genres' => Genre::where('status', '!=', 0)->paginate(4),
        ]);
    }

    public function genreSave(Request $request, $id = null)
    {
        $id = decryptString($id);
        $genre = $id ? Genre::where('id', $id)->first() : new Genre;

        $request->validate([
            'name' => 'required|string|max:255|unique:genres,name,' . $id,
            'status' => 'required|boolean'
        ]);

        $genre->name = $request->name;
        $genre->status = $request->status ? 1 : 2;
        $genre->save();

        $msg = $id ? 'Genre updated successfully' : 'Genre created successfully';

        return redirect()->route('admin.genres')->with('success', $msg);
    }

    public function genreStatus(Request $request, $id)
    {
        $id = decryptString($id);

        $request->validate([
            'status' => 'required|in:0,1,2'
        ]);

        $status = $request->status;

        $language = Genre::findOrFail($id);
        $language->status = $status;
        $language->save();

        return redirect()->route('admin.genres')->with('success', 'Genre status changed to ' . ($status == 1 ? 'active' : ($status == 2 ? 'inactive' : 'delete')) . ' successfully.');
    }

    public function actors(Request $request)
    {
        $search = $request->query('s', '');

        // Fetch actors with search functionality and pagination
        $actors = Actor::query()
            ->where('status', '!=', 0)
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->with('images') // Ensure related images are loaded
            ->paginate(6); // Adjust the number of items per page as needed

        // dd($actors);
        return Inertia::render('Admin/CastCrews/Actors/Index', [
            'title' => 'Actors',
            'actors' => $actors,
            'search' => $search,
        ]);
    }

    public function actorCreate($id = null)
    {
        $id = decryptString($id);
        $actor = $id ? Actor::where('id', $id)->with('images')->first() : null;
        $title = $id ? 'Add Actor' : 'Edit Actor';

        return Inertia::render('Admin/CastCrews/Actors/Create', [
            'title' => $title,
            'actor' => $actor,
        ]);
    }

    public function actorSave(Request $request, $id = null)
    {
        if ($id) {
            $id = decryptString($id);
            $actor = Actor::where('id', $id)->first();
        }

        $actor = new Actor;

        // Validate request data
        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'required|string',
            'place_of_birth' => 'required|string',
            'date_of_birth' => 'required|date',
            'status' => 'required|integer|between:0,2',
            'images' => 'nullable|array',
            'images.*' => 'file|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Update actor details
        $actor->name = $request->name;
        $actor->bio = $request->bio;
        $actor->place_of_birth = $request->place_of_birth;
        $actor->date_of_birth = $request->date_of_birth;
        $actor->status = $request->status ?? 1;
        $actor->save();

        // Handle image uploads
        if ($request->hasFile('images')) {
            // Delete existing images if any
            if ($actor->images()->count() > 0) {
                $existingImagePaths = $actor->images->map(fn($image) => 'public/upload/images/actors/' . $image->filename)->all();
                Storage::delete($existingImagePaths);
                $actor->images()->delete();
            }

            // Upload and save new images
            foreach ($request->file('images') as $image) {
                $filename = 'actor_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('public/upload/images/actors', $filename);

                $img = new Image;
                $img->filename = $filename;
                $img->img_for = 'actor';
                $img->parent_table_id = $actor->id;

                $actor->images()->save($img);
            }
        }

        // Return with success message
        $msg = $id ? 'Actor updated successfully' : 'Actor created successfully';
        return redirect()->route('admin.actors')->with('success', $msg);
    }

    public function actorDelete(Request $request)
    {
        $ids = $request->input('ids'); // Get the encrypted IDs
        $decryptedIds = [];
    
        // Decrypt the IDs
        foreach ($ids as $encryptedId) {
            $decryptedIds[] = decryptString($encryptedId);
        }
    
        // Update the status for each actor individually
        foreach ($decryptedIds as $decryptedId) {
            $actor = Actor::find($decryptedId);
            if ($actor) {
                $actor->status = 0; // Set the status to '0' (deleted)
                $actor->save(); // Save the changes
            }
        }
        
        return redirect()->route('admin.actors')->with('success', 'Actor status changed to delete successfully.');
    }

    public function directors(Request $request)
    {
        $search = $request->query('s', '');

        // Fetch directors with search functionality and pagination
        $directors = Director::query()
            ->where('status', '!=', 0)
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->with('images')
            ->paginate(6);
            
        return Inertia::render('Admin/CastCrews/Directors/Index', [
            'title' => 'Directors',
            'directors' => $directors,
            'search' => $search,
        ]);
    }

    public function directorCreate($id = null)
    {
        $id = decryptString($id);
        $director = $id ? Director::where('id', $id)->with('images')->first() : null;
        $title = $id ? 'Add Director' : 'Edit Director';

        return Inertia::render('Admin/CastCrews/Directors/Create', [
            'title' => $title,
            'director' => $director,
        ]);
    }

    public function directorSave(Request $request, $id = null)
    {
        if ($id) {
            $id = decryptString($id);
            $director = Director::where('id', $id)->first();
        }

        $director = new Director;

        // Validate request data
        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'required|string',
            'place_of_birth' => 'required|string',
            'date_of_birth' => 'required|date',
            'status' => 'required|integer|between:0,2',
            'images' => 'nullable|array',
            'images.*' => 'file|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Update director details
        $director->name = $request->name;
        $director->bio = $request->bio;
        $director->place_of_birth = $request->place_of_birth;
        $director->date_of_birth = $request->date_of_birth;
        $director->status = $request->status ?? 1;
        $director->save();

        // Handle image uploads
        if ($request->hasFile('images')) {
            // Delete existing images if any
            if ($director->images()->count() > 0) {
                $existingImagePaths = $director->images->map(fn($image) => 'public/upload/images/directors/' . $image->filename)->all();
                Storage::delete($existingImagePaths);
                $director->images()->delete();
            }

            // Upload and save new images
            foreach ($request->file('images') as $image) {
                $filename = 'director_' . time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('public/upload/images/directors', $filename);

                $img = new Image;
                $img->filename = $filename;
                $img->img_for = 'director';
                $img->parent_table_id = $director->id;

                $director->images()->save($img);
            }
        }

        // Return with success message
        $msg = $id ? 'Director updated successfully' : 'Director created successfully';
        return redirect()->route('admin.directors')->with('success', $msg);
    }
    
    public function directorDelete(Request $request)
    {
        $ids = $request->input('ids'); // Get the encrypted IDs
        $decryptedIds = [];
    
        // Decrypt the IDs
        foreach ($ids as $encryptedId) {
            $decryptedIds[] = decryptString($encryptedId);
        }
    
        // Update the status for each director individually
        foreach ($decryptedIds as $decryptedId) {
            $director = Director::find($decryptedId);
            if ($director) {
                $director->status = 0; // Set the status to '0' (deleted)
                $director->save(); // Save the changes
            }
        }
        
        return redirect()->route('admin.directors')->with('success', 'Director status changed to delete successfully.');
    }

    public function homeSliders(Request $request)
    {
        $sliders = HomeSlider::query()
            ->where('status', '!=', 0)
            ->paginate(4);
            
        return Inertia::render('Admin/Home/Sliders/Index', [
            'title' => 'Sliders',
            'sliders' => $sliders,
        ]);
    }

    public function homeSliderCreate($id = null)
    {
        $id = decryptString($id);
        $slider = $id ? HomeSlider::where('id', $id)->first() : null;
        $title = $id ? 'Add Slider' : 'Edit Slider';

        return Inertia::render('Admin/Home/Sliders/Create', [
             'title' => $title,
             'slider' => $slider,
             'movies' => Video::where('status', '!=', 0)->orderBy('name','asc')->get(),
             'sports' => [],
        ]);
    }

    public function homeSlidersSave(Request $request, $id = null)
    {
        if ($id) {
            $id = decryptString($id);
            $director = Director::where('id', $id)->first();
        }

        $director = new Director;

        // Validate request data
        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'required|string',
            'place_of_birth' => 'required|string',
            'date_of_birth' => 'required|date',
            'status' => 'required|integer|between:0,2',
            'images' => 'nullable|array',
            'images.*' => 'file|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Update director details
        $director->name = $request->name;
        $director->bio = $request->bio;
        $director->place_of_birth = $request->place_of_birth;
        $director->date_of_birth = $request->date_of_birth;
        $director->status = $request->status ?? 1;
        $director->save();

        // Handle image uploads
        if ($request->hasFile('images')) {
            // Delete existing images if any
            if ($director->images()->count() > 0) {
                $existingImagePaths = $director->images->map(fn($image) => 'public/upload/images/directors/' . $image->filename)->all();
                Storage::delete($existingImagePaths);
                $director->images()->delete();
            }

            // Upload and save new images
            foreach ($request->file('images') as $image) {
                $filename = 'director_' . time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('public/upload/images/directors', $filename);

                $img = new Image;
                $img->filename = $filename;
                $img->img_for = 'director';
                $img->parent_table_id = $director->id;

                $director->images()->save($img);
            }
        }

        // Return with success message
        $msg = $id ? 'Director updated successfully' : 'Director created successfully';
        return redirect()->route('admin.directors')->with('success', $msg);
    }
    
    public function homeSlidersDelete(Request $request)
    {
        $ids = $request->input('ids'); // Get the encrypted IDs
        $decryptedIds = [];
    
        // Decrypt the IDs
        foreach ($ids as $encryptedId) {
            $decryptedIds[] = decryptString($encryptedId);
        }
    
        // Update the status for each director individually
        foreach ($decryptedIds as $decryptedId) {
            $director = Director::find($decryptedId);
            if ($director) {
                $director->status = 0; // Set the status to '0' (deleted)
                $director->save(); // Save the changes
            }
        }
        
        return redirect()->route('admin.directors')->with('success', 'Director status changed to delete successfully.');
    }
    


    public function subscriptionPlans()
    {
        $subscriptionPlans = SubscriptionPlan::where('status', '!=', 0)->get();

        return Inertia::render('Admin/SubscriptionPlans/Index', [
            'title' => 'SubscriptionPlan Plans',
            'subscription_plans' => $subscriptionPlans
        ]);
    }

    // public function edit(string $id)
    // {
    //     $sp = SubscriptionPlan::where('id', $id)->first();
    //     return Inertia::render('Admin/SubscriptionPlans/Create', [
    //         'title' => 'Edit Plan',
    //         'subscription_plan' => $sp
    //     ]);
    // }
}
