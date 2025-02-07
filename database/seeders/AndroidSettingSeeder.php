<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AndroidSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('android_settings')->insert([
            'app_name' => 'Your App Name',
            'app_logo' => null,
            'app_email' => 'info@yourapp.com',
            'app_company' => 'Your Company',
            'app_website' => 'www.yourapp.com',
            'app_contact' => '+123456789',
            'app_version' => '1.0.0',
            'about_us' => 'About us information...',
            'privacy_policy' => 'Privacy policy information...',
            'onesignal_app_id' => 'your-onesignal-app-id',
            'onesignal_rest_key' => 'your-onesignal-rest-key',
            'app_update_popup' => true,
            'app_update_version_code' => 2,
            'app_update_desc' => 'New features and bug fixes.',
            'app_update_link' => 'https://play.google.com/store/apps/details?id=your.app.package',
            'app_update_cancel_option' => true,
            'terms_of_use' => 'Terms of use content...',
        ]);
    }
}
