<?php

namespace App\Http\Controllers;

use Carbon\CarbonTimeZone;
use Carbon\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

use App\Mail\TestMail;

use App\Models\SocialLogin;
use App\Models\Currency;
use App\Models\GeneralSetting;
use App\Models\MaintenanceSetting;
use App\Models\SMTPSetting;

class SettingController extends Controller
{

    public function generalSetting()
    {
        // Fetch the general settings
        $generalSetting = GeneralSetting::find(1);

        // Format the time zones with UTC offset using Carbon
        $formattedTimeZones = collect(CarbonTimeZone::listIdentifiers())->mapWithKeys(function ($timezone) {
            $offset = CarbonTimeZone::create($timezone)->toOffsetName();
            return [
                $timezone => "(UTC{$offset}) {$timezone}",
            ];
        });

        return Inertia::render('Admin/Settings/General', [
            'title' => 'General Settings',
            'generalSetting' => $generalSetting,
            'timeZones' => $formattedTimeZones,
            'languages' => Language::all(),
            'currencies' => Currency::query()
            // ->select('name', 'alphabetic_code')
            ->distinct('name')
            ->get()
        ]);
    }

    // Update the site settings
    public function generalSettingSave(Request $request)
    {
        // dd($request->all());
        // Validate the incoming request
        $request->validate([
            'name' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'favicon' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'email' => 'nullable|email|max:255',
            'description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'header_code' => 'nullable|string',
            'footer_code' => 'nullable|string',
            'copyright_text' => 'nullable|string|max:255',
            'default_timezone' => 'nullable|string|max:255',
            'default_language' => 'nullable|string|max:255',
            'styling' => 'nullable|string|max:255',
            'currency_code' => 'nullable|string|max:10',
            'tmdb_api_token' => 'nullable|string|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'google_play_url' => 'nullable|url|max:255',
            'apple_store_url' => 'nullable|url|max:255',
            'gdpr_cookie_consent' => 'nullable|boolean',
            'gdpr_consent_title' => 'nullable|string|max:255',
            'gdpr_consent_text' => 'nullable|string',
            'gdpr_privacy_url' => 'nullable|url|max:255',
            'envato_username' => 'nullable|string|max:255',
            'buyer_purchase_code' => 'nullable|string|max:255',
        ]);

        $ad = GeneralSetting::find(1);

        if (!$ad) {
            $ad = new GeneralSetting;
            $ad->id = 1;
            $oldSiteLogo = $oldSiteFavicon = null;
        } else {
            $oldSiteLogo = $ad->logo;
            $oldSiteFavicon = $ad->favicon;
        }

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = "logo" . "." . $file->getClientOriginalExtension();
            $file->storeAs('upload/images/general_ettings', $filename, 'public');

            // // Delete the old file if it exists
            // if ($oldSiteLogo && Storage::exists('public/upload/images/general_ettings/' . $oldSiteLogo)) {
            //     Storage::delete('public/upload/images/general_ettings/' . $oldSiteLogo);
            // }

            $ad->logo = $filename;
        }

        if ($request->hasFile('favicon')) {
            $file = $request->file('favicon');
            $filename = "favicon" . "." . $file->getClientOriginalExtension();
            $file->storeAs('upload/images/general_ettings', $filename, 'public');

            // // Delete the old file if it exists
            // if ($oldSiteFavicon && Storage::exists('public/upload/images/general_ettings/' . $oldSiteFavicon)) {
            //     Storage::delete('public/upload/images/general_ettings/' . $oldSiteFavicon);
            // }

            $ad->favicon = $filename;
        }

        // if ($request->hasFile('favicon')) {
        //     $file = $request->file('favicon');
        //     $filename = "favicon" . "." . $file->getClientOriginalExtension();
        //     $file->storeAs('upload/images/general_ettings', $filename, 'public');

        //     // Delete the old file if it exists
        //     if ($oldSiteFavicon && Storage::exists('public/upload/images/general_ettings/' . $oldSiteFavicon)) {
        //         Storage::delete('public/upload/images/general_ettings/' . $oldSiteFavicon);
        //     }

        //     $ad->favicon = $filename;

        // }

        // Update or create the rest of the fields
        $ad->fill($request->except('logo', 'favicon'));
        $ad->save();

        // dd(1,  $ad->favicon);


        return redirect()->back()->with('success', 'General settings updated successfully.');
    }

    public function smtp()
    {
        return Inertia::render('Admin/Settings/SmtpEmail', [
            'title' => 'Email Settings',
            'smtp' => SMTPSetting::find(1),
        ]);
    }

    public function smtpSave(Request $request)
    {
        // Validate the input fields
        $request->validate([
            'host' => 'required|string',
            'port' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
            'encryption' => 'nullable|string',
        ]);

        // Find the first record, or create a new one if it doesn't exist
        $smtpSetting = SMTPSetting::find(1);

        if (!$smtpSetting) {
            $smtpSetting = new SMTPSetting();
            $smtpSetting->id = 1;
        }

        // Assign the request data to the SMTPSetting fields
        $smtpSetting->host = $request->host;
        $smtpSetting->port = $request->port;
        $smtpSetting->email = $request->email;
        $smtpSetting->password = $request->password;
        $smtpSetting->encryption = $request->encryption;

        // Save the record in the database
        $smtpSetting->save();

        // Redirect back with a success message
        return redirect()->back()->with('success', 'SMTP settings updated successfully.');
    }

    public function smtpTest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'test_email' => 'required|email',
        ]);

        if ($validator->fails()) {
            // Return the validation error messages as JSON response
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()->first()
            ]); // 422 for validation errors
        }

        Mail::to($request->test_email)->send(New TestMail());

        // Proceed with email sending logic if validation passes
        return response()->json([
            'status' => 'success',
            'message' => 'Test email sent successfully!'
        ]);
    }

    // Social Login
    public function socialLogin()
    {
        return Inertia::render('Admin/Settings/SocialLogin', [
            'title' => 'Social Login',
            'providers' => SocialLogin::where('status', '!=', 0)->get(),
        ]);
    }

    public function socialLoginSave(Request $request)
    {
        // Validate the input for multiple social providers
        $request->validate([
            'providers' => 'required|array',
            'providers.*.provider_name' => 'required|string',
            'providers.*.client_id' => 'nullable|string',
            'providers.*.client_secret' => 'nullable|string',
            'providers.*.status' => 'required|integer|in:0,1,2',
        ]);

        // Loop through the social login data from the request
        foreach ($request->providers as $provider) {
            // Find or create the social login setting for the specified provider
            $socialLogin = SocialLogin::where('provider_name', $provider['provider_name'])->first();
            $msg = 'Social login settings updated successfully.';

            if (!$socialLogin) {
                $socialLogin = new SocialLogin();
                $socialLogin->provider_name = $provider['provider_name'];
                $msg = 'Provider add successfully.';

            }

            // Assign the request data to the SocialLogin fields
            $socialLogin->client_id = $provider['client_id'];
            $socialLogin->client_secret = $provider['client_secret'];
            $socialLogin->status = $provider['status'];

            // Save the record in the database
            $socialLogin->save();
        }

        // Redirect back with a success message
        return redirect()->route('social-login')->with('success', $msg);
    }

    public function menu()
    {
        return Inertia::render('Admin/Settings/Menu', [
            'title' => 'Menu Settings',
            'menus' => [],
        ]);
    }

    public function recaptcha()
    {
        return Inertia::render('Admin/Settings/Recaptcha', [
            'title' => 'Recaptcha Settings',
            'menus' => [],
        ]);
    }

    public function bannerAd()
    {
        return Inertia::render('Admin/Settings/BannerAd', [
            'title' => 'Banner Ads',
            'menus' => [],
        ]);
    }

    public function siteMaintenance()
    {
        $maintenance = MaintenanceSetting::first();

        return Inertia::render('Admin/Settings/SiteMaintenance', [
            'title' => 'Site Maintenance',
            'maintenance' => $maintenance,
        ]);
    }

    public function siteMaintenanceSave(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'secret' => 'nullable|string',
        ]);

        $maintenance = MaintenanceSetting::first();
        $maintenance->update($request->only('title', 'description', 'secret'));

        return redirect()->back()->with('success', 'Site maintenance settings updated successfully.');
    }

    public function changeMaintenanceMode($mode)
    {
        try{
            $maint = MaintenanceSetting::first();

            if (!$maint) {
                return response()->json(['status' => 'error', 'message' => 'Maintenance settings not found.'], 404);
            }

            $maint->status = $mode;
            $maint->update();

            if ($mode == 1) {
                // Artisan::call('down', [
                //     '--secret' => $maint->secret
                // ]);
                $msg = 'Maintenance mode enabled successfully. @ URL: ' . url('/') . '/' . $maint->secret;
            } else {
                // Artisan::call('up');
                $msg = 'Maintenance mode disabled successfully.';
            }

            return response()->json(['status' => 'success', 'message' => $msg]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Failed to change maintenance mode: ' . $e->getMessage()], 500);
        }
    }



}
