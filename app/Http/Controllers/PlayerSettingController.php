<?php

namespace App\Http\Controllers;

use App\Models\PlayerAdSetting;
use App\Models\PlayerSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PlayerSettingController extends Controller
{
    // Backend
    public function playerSetting()
    {
        return Inertia::render('Admin/PlayerSettings/Index', [
            'title' => 'Player Settings',
            'settings' => PlayerSetting::first()
        ]);
    }

    public function playerSettingSave(Request $request)
    {
        $request->validate([
            'style' => 'required|string',
            'vector_icons' => 'required|string',
            'autoplay' => 'required|string',
            'rewind_forward' => 'required|string',
            'watermark' => 'required|string',
            'logo' => 'nullable|string',
            'logo_position' => 'required|string',
            'url' => 'required|url',
            'default_ads' => 'required|string',
        ]);

        PlayerSetting::updateOrCreate(
            ['id' => 1],
            $request->all()
        );

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }

    public function playerAdSetting()
    {
        return Inertia::render('Admin/PlayerSettings/Ads', [
            'title' => 'Player Ad Settings',
            'ad' => PlayerAdSetting::first(),
        ]);
    }

    public function playerAdSettingSave(Request $request)
    {
        // Validate the request
        $request->validate([
            'vast_type' => 'required|in:Local,URL',
            'ad_video_url' => 'nullable|required_if:vast_type,URL|url',
            'custom_ad1_source' => 'nullable|url',
            'custom_ad1_timestart' => 'nullable|regex:/^\d{2}:\d{2}:\d{2}$/',
            'custom_ad1_link' => 'nullable|url',
            'custom_ad2_source' => 'nullable|url',
            'custom_ad2_timestart' => 'nullable|regex:/^\d{2}:\d{2}:\d{2}$/',
            'custom_ad2_link' => 'nullable|url',
            'custom_ad3_source' => 'nullable|url',
            'custom_ad3_timestart' => 'nullable|regex:/^\d{2}:\d{2}:\d{2}$/',
            'custom_ad3_link' => 'nullable|url',
        ]);

        $ad = PlayerAdSetting::find(1);

        if (!$ad) {
            $ad = new PlayerAdSetting;
            $ad->id = 1;
            $oldFile = null;
            $request->validate(['ad_video_local' => 'nullable|file|mimes:mp4,avi,mkv|required_if:vast_type,Local']);
        } else {
            $oldFile = $ad->ad_video_local;
            if(!$oldFile){
                $request->validate(['ad_video_local' => 'nullable|file|mimes:mp4,avi,mkv|required_if:vast_type,Local']);
            }
        }

        // Handle file upload if a file is provided
        if ($request->hasFile('ad_video_local')) {
            $file = $request->file('ad_video_local');
            $filename = "ad_" . time() . "." . $file->getClientOriginalExtension();
            $file->storeAs('upload/videos', $filename, 'public');

            // Delete the old file if it exists
            if ($oldFile && Storage::exists('public/upload/videos/' . $oldFile)) {
                Storage::delete('public/upload/videos/' . $oldFile);
            }

            $ad->ad_video_local = $filename;
        }

        // Update or create the rest of the fields
        $ad->fill($request->except('ad_video_local'));
        $ad->save();

        return redirect()->back()->with('success', 'Player ad setting updated successfully.');
    }

}
