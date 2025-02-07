<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    public function index(Request $request)
    {
        $sections = Section::with('videos')->paginate(10); // Adjust pagination as needed

        return Inertia::render('Admin/Home/Sections/Index', [
            'title' => 'Home Sections',
            'sections' => $sections,

        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Home/Sections/Create', [
            'title' =>'Add home Section',
            'videos' => Video::where('status', '!=', 0)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'video_ids' => 'required|array',
            'status' => 'required|integer|between:0,2',
        ]);

        $section = Section::create([
            'title' => $request->title,
            'status' => $request->status,
        ]);

        $section->videos()->sync($request->video_ids);

        return redirect()->route('sections.index')->with('success', 'Section created successfully.');
    }

    public function edit(Section $section)
    {
        return inertia('Home/Sections/Create', [
            'section' => $section->load('videos'),
            'videos' => Video::all(),
        ]);
    }

    public function update(Request $request, Section $section)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'video_ids' => 'required|array',
            'status' => 'required|boolean',
        ]);

        $section->update([
            'title' => $request->title,
            'status' => $request->status,
        ]);

        $section->videos()->sync($request->video_ids);

        return redirect()->route('sections.index')->with('success', 'Section updated successfully.');
    }

    public function status(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|boolean'
        ]);

        $s = Section::findOrFail($id);
        $s->status = $request->status ? 1 : 2;
        $s->save();

        return redirect()->back()->with('success', 'Section status changed to ' . ($request->status ? 'active' : 'inactive') . ' successfully.');
    }

    public function destroy(Section $section)
    {
        $section->delete(); // This will soft delete the section if using SoftDeletes trait

        return redirect()->back()->with('success', 'Section deleted successfully.');
    }
}
