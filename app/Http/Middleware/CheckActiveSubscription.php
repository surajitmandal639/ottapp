<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Video;

class CheckActiveSubscription
{
    public function handle(Request $request, Closure $next)
    {
        // Get the video ID from the route
        $videoId = $request->route('id');
        $video = Video::find(decryptString($videoId));

        // If the video is free, skip subscription check
        if ($video && $video->access === 'free') {
            return $next($request);
        }

        // If the video is paid, check if the user is logged in and has an active subscription
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'You must be logged in to watch this video.');
        }

        $user = auth()->user();

        // Check if the user has any active subscription plan
        $activeSubscription = $user->subscriptionPlan()
            ->wherePivot('status', 1) // Active status
            ->wherePivot('end_date', '>=', now()) // Subscription is not expired
            ->first();

        if (!$activeSubscription) {
            return redirect()->route('memberships')->with('error', 'Buy a subscription plan first!');
        }

        return $next($request);
    }
}
