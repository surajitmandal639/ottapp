<?php

namespace App\Http\Controllers;

use App\Models\AndroidAd;
use App\Models\AndroidSetting;
use App\Models\VerifyPurchaseApp;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AndroidController extends Controller
{
    public function purchase()
    {
        try {
             return Inertia::render('Admin/Android/Purchase', [
                'title' => 'App Verify Purchase',
                'purchase' => VerifyPurchaseApp::first() ?? null
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    public function purchaseSave(Request $request)
    {
        try {            
            $ap = VerifyPurchaseApp::first() ?? new VerifyPurchaseApp;

            // Validate the incoming request data
            $request->validate([
                'buyer_name' => 'required|string|max:255',
                'purchase_code' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('android_purchases')->ignore($ap->id)
                ],

                'app_package_name' => 'required|string|max:255',
            ]);

            // Set the properties from the validated request
            $ap->buyer_name = $request->buyer_name;
            $ap->purchase_code = $request->purchase_code;
            $ap->app_package_name = $request->app_package_name;

            // Save the record to the database
            $ap->save();

            $msg = $ap->id ? 'Purchase updated successfully' : 'Purchase created successfully';

            // Return a success response with Inertia
            return redirect()->back()->with('success', $msg);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function checkUnique(Request $request)
    {
        $field = $request->input('field');
        $value = $request->input('value');
        $exists = VerifyPurchaseApp::where($field, $value)->exists();

        return response()->json($exists);
    }

    public function androidSetting()
    {
        try {
             return Inertia::render('Admin/Android/Setting', [
                'title' => 'ndroid App Settings',
                'androidSetting' => AndroidSetting::first() ?? null
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    public function androidSettingSave(Request $request)
    {
        try {
            $ap = AndroidSetting::first() ?? new AndroidSetting;
            $oldFile = $ap->app_logo ?? null;

            $request->validate([
                'app_name' => 'required|string|max:255',
                'app_logo' => 'nullable|image|mimes:jpeg,png|max:2048',
                'app_email' => 'required|string|email|max:255',
                'app_company' => 'nullable|string|max:255',
                'app_website' => 'nullable|string|max:255',
                'app_contact' => 'nullable|string|max:255',
                'app_version' => 'nullable|string|max:255',
                'about_us' => 'nullable|string',
                'privacy_policy' => 'nullable|string',
                'onesignal_app_id' => 'nullable|string|max:255',
                'onesignal_rest_key' => 'nullable|string|max:255',                
                'app_update_version_code' => 'nullable|numeric',
                'app_update_desc' => 'nullable|string',
                'app_update_link' => 'nullable|url',
                'terms_of_use' => 'nullable|string',
            ]);
            
            $ap->app_name = $request->app_name;
            
            if ($request->hasFile('app_logo')) {
                $file = $request->file('app_logo');
                $filename = 'logo_' . time() . '.' . $file->getClientOriginalExtension(); // Use the original file extension
                $file->storeAs('public/upload/images/android_setting', $filename);
                $ap->app_logo = $filename;

                // Delete the old logo file if it exists
                if ($oldFile && Storage::exists('public/upload/images/android_setting/' . $oldFile)) {
                    Storage::delete('public/upload/images/android_setting/' . $oldFile); // Correct the path to match where files are stored
                }
            }
                        
            $ap->app_email = $request->app_email;
            $ap->app_company = $request->app_company;
            $ap->app_website = $request->app_website;
            $ap->app_contact = $request->app_contact;
            $ap->app_version = $request->app_version;
            $ap->about_us = $request->about_us;
            $ap->privacy_policy = $request->privacy_policy;
            $ap->onesignal_app_id = $request->onesignal_app_id;
            $ap->onesignal_rest_key = $request->onesignal_rest_key;
            $ap->app_update_popup = $request->app_update_popup;
            $ap->app_update_version_code = $request->app_update_version_code;
            $ap->app_update_desc = $request->app_update_desc;
            $ap->app_update_link = $request->app_update_link;
            $ap->app_update_cancel_option = $request->app_update_cancel_option;
            $ap->terms_of_use = $request->terms_of_use;
            
            $ap->save();
    
            $msg = $ap->wasRecentlyCreated ? 'Settings created successfully' : 'Settings updated successfully';
    
            // Return a success response with Inertia
            return redirect()->back()->with('success', $msg);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    
    public function androidAdList()
    {
        try {
             return Inertia::render('Admin/Android/AdList', [
                'title' => 'Android Ad List',
                'androidAds' => AndroidAd::where('status', '!=', 0)->get() ?? null
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    public function androidAdCreate($id = null)
    {
        try {
            $aal = AndroidAd::where('id', $id)->first();

             return Inertia::render('Admin/Android/AdCreate', [
                'title' => $id ? ucfirst($aal->ads_name) : 'Android Ad Create',
                'androidAd' => $aal ?? null
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    public function androidAdListSave(Request $request, $id = null)
    {
        try {
            // Fetch the existing ad list or create a new one
            $aal = AndroidAd::find($id) ?? new AndroidAd;

            // Validate request data
            $request->validate([
                'ads_name' => 'required|string|max:255',
                'publisher_id' => 'nullable|string|max:255',
                'banner_id' => 'nullable|string|max:255',
                'banner_on' => 'nullable|boolean',
                'interstitial_id' => 'nullable|string|max:255',
                'interstitial_on' => 'nullable|boolean',
                'interstitial_clicks' => 'nullable|integer|min:1',
                'status' => 'nullable|in:0,1,2', // 0 is delete, 1 = active, 2 = inactive (or other statuses if needed)
            ]);

            // Assign form data to the model properties
            $aal->ads_name = $request->ads_name;
            $aal->publisher_id = $request->publisher_id;
            $aal->banner_id = $request->banner_id;
            $aal->banner_on = $request->banner_on;
            $aal->interstitial_id = $request->interstitial_id;
            $aal->interstitial_on = $request->interstitial_on;
            $aal->interstitial_clicks = $request->interstitial_clicks;
            $aal->status = $request->status ?? 2; // Default to inactive (2) if no status is provided

            // Save the changes to the database
            $aal->save();

            // Determine success message based on whether a new record was created or an existing one was updated
            $msg = 'Ad settings ' . ($id ? 'updated ' : 'created ') . 'successfully';

            // Return a success response with Inertia
            return redirect()->back()->with('success', $msg);

        } catch (\Throwable $th) {
           throw $th;            
        }
    }

    public function androidNotification(){
        try {
             return Inertia::render('Admin/Android/Notification', [
                'title' => 'Android App Notification',
                'videos' => Video::where('status', '!=', 0)->get()
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    

}
