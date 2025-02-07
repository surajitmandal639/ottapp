<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\Slider;
use App\Models\UploadImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class SliderController extends Controller
{

    public function index(Request $request)
    {
        $sliders = Slider::query()
            ->where('status', '!=', 0)
            ->paginate(4);

        $sliders->each(function ($slider) {
            $slider->image_url = getImageUrl('sliders', $slider->image);
        });
            // dd($sliders);
        return Inertia::render('Admin/Home/Sliders/Index', [
            'title' => 'Sliders',
            'sliders' => $sliders,
        ]);
    }

    /**
     * Show the form for creating a new slider.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Home/Sliders/Create', [
            'title' => 'Add Slider',
            'movies' => Video::where('status', '!=', 0)->orderBy('name','asc')->get(),
            'sports' => [],
        ]);
    }

    /**
     * Store a newly created slider in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // 'type' => 'nullable|string',
            // 'display_on' => 'nullable|array',
            'status' => 'nullable|boolean',
        ]);

        // Store the image if it is uploaded
        if ($request->hasFile('image')) {
            $filePath = $request->file('image')->store('upload/images/sliders', 'public');
            $validatedData['image'] = basename($filePath);
        }

        // Convert display_on array to a comma-separated string
        // $validatedData['display_on'] = implode(',', $validatedData['display_on']);

        // Create the Slider with the validated data
        Slider::create($validatedData);

        // Redirect back with success message
        return redirect()->back()->with('success', 'Slider created successfully.');
    }

    /**
     * Show the form for editing the specified slider.
     *
     * @param Slider $slider
     * @return \Inertia\Response
     */
    public function edit(Slider $slider)
    {
        // Generate the image URLs for all images
        $slider->image_url = getImageUrl('sliders', $slider->image);
        return Inertia::render('Admin/Home/Sliders/Create', [
            'title' => 'Edit Slider',
            'slider' => $slider,
            'movies' => Video::where('status', '!=', 0)->orderBy('name','asc')->get(),
            'sports' => [],
        ]);
    }

    /**
     * Update the specified slider in storage.
     *
     * @param Request $request
     * @param Slider $slider
     * @return \Illuminate\Http\RedirectResponse
     */

    public function update(Request $request, Slider $slider)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // 'type' => 'required|string',
            // 'display_on' => 'required|array',
            'status' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('upload/images/sliders', 'public');
            $slider->image = basename($imagePath);
        }

        $slider->update([
            'title' => $request->title,
            // 'type' => $request->type,
            // 'display_on' => implode(',', $request->display_on),
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Slider updated successfully.');
    }

    /**
     * Remove the specified slider from storage.
     *
     * @param Slider $slider
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Slider $slider)
    {
        $slider->update(['status' => 0]);
        // $slider->delete(); // Soft delete or delete based on your requirement
        return redirect()->back()->with('success', 'Slider deleted successfully.');
    }
}
