<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $searchTerm = $request->input('searchTerm');

        return response()->json([
            'videos' => Video::where('name', 'LIKE', '%' . $searchTerm . '%')->get() ?? [],
            'tvShows' => [],
            'sports' => []
        ]);
    }
}
