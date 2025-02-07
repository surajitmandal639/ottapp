<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Language;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        if (auth()->user()->hasRole('admin')) {
            $data = [
                'title' => 'Admin Dashboard',
                'totalLanguage' => Language::count(),
                'totalGenres' => Genre::count(),
                'totalVideos' => Video::count(),
                'totalUsers' => User::count(),
                'totalTransactions' => Transaction::count(),
            ];
            
            return Inertia::render("Admin/Dashboard/Index", [
                'data' => $data
            ]);
        }

        $breadcrumbData = [
            ['name' => 'Home', 'url' => route('home')],
            ['name' => 'Dashboard', 'url' => route('dashboard')],
        ];

        return Inertia::render("Dashboard", [
            'title' => 'Dashboard',
            'breadcrumb' => $breadcrumbData,
            'videos' => Video::where('status', '!=', 0)->latest()->take(5)->get()
        ]);        
    }
}
