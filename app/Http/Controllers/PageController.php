<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;

class PageController extends Controller
{
    // Backend
    public function pages(Request $request)
    {
        return Inertia::render('Admin/Pages/Index', [
            'title' => 'Pages',
            'pages' => Page::where('status', '!=', 0)->get()
        ]);
    }

    public function create($id = null)
    {
        return Inertia::render('Admin/Pages/Create', [
            'title' => $id ? 'Edit PAge' : 'Add PAge',
            'page' => $id ? Page::find($id) : null
        ]);
    }

    public function save(Request $request, $id = null)
    {
        $request->validate([
            'title' => 'required|string|max:255|unique:pages,title,' . $id,
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'status' => 'required|in:0,1,2',
        ]);

        $page = $id ? Page::find($id) : new Page;

        $title = $request->input('title');
        $page->title = $title;
        $page->description = $request->input('description');
        $page->order = $request->input('order');
        $page->status = $request->input('status');

        // Generate slug from title using Str::slug
        $page->slug = Str::slug($title);

        $page->save();

        $message = $id ? 'Page updated successfully!' : 'Page created successfully!';

        return redirect()->back()->with('success', $message);
    }

    public function slug($slug)
    {
        $page = implode('', array_map('ucfirst', explode('-', $slug))); // like AboutUs
        $title = ucwords(str_replace(['-', '_'], ' ', $slug)); // like About Us

        return Inertia::render('Admin/Pages/Slug', [
            'title' => $title,
            'page' => Page::where('slug', $slug)->first()
        ]);
    }

    public function checkUniqueness(Request $request)
    {
        $field = $request->field;
        $value = $request->value;
        $id = decryptString($request->id);

        $query = Page::query();

        if ($id) {
            $query->where('id', '!=', $id);
        }

        $exists = $query->where($field, $value)->exists();

        return response()->json($exists);
    }

}
