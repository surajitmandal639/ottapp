<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function welcome(){ 
        $breadcrumbData = [
            ['name' => 'Home', 'url' => route('home')],
            ['name' => 'Welcome', 'url' => route('welcome')],
        ];

        $videos = Video::where('status', '!=', 0)->latest()->take(5)->get();

        return Inertia::render('Welcome', [
            'title' => 'Welcome',
            'breadcrumb' => $breadcrumbData,
            'videos' => $videos
        ]);
    }

    public function search(Request $request)
    {
        $searchTerm = $request->input('searchTerm');

        return response()->json([
            'videos' => Video::where('name', 'LIKE', '%' . $searchTerm . '%')->get() ?? [],
            'tvShows' => [],
            'sports' => []
        ]);
    }

    public function page($slug)
    {
        $page = implode('', array_map('ucfirst', explode('-', $slug))); // like AboutUs
        $title = ucwords(str_replace(['-', '_'], ' ', $slug)); // like About Us

        return Inertia::render('Page', [
            'title' => $title,
            'page' => Page::where('slug', $slug)->first()
        ]);
    }
}
