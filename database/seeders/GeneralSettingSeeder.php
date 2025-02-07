<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneralSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('general_settings')->insert([
            [
                'name' => 'Viavi Streaming - Watch TV Shows, Movies Online',
                'logo' => null,
                'favicon' => null,
                'email' => 'info@viavilab.com',
                'description' => 'Viavi Streaming is Best Script for Streaming Website & Application | Streaming App | Streaming Script | TV Streaming Source Code | TV Clone | Netflix Clone | Amazon Prime Clone | Hotstar Clone | Streaming App',
                'keywords' => 'Video Streaming, Streaming Website, Streaming App, Live TV, Movies, TV Shows',
                'header_code' => null,
                'footer_code' => null,
                'copyright_text' => 'Copyright © 2024 www.video.com All Rights Reserved.',
                'default_timezone' => 'Asia/Kolkata',
                'default_language' => 'en',
                'styling' => 'style-six',
                'currency_code' => 'INR',
                'tmdb_api_token' => null,
                'facebook_url' => 'https://www.facebook.com/profile.php?id=61567736287703',
                'twitter_url' => 'https://twitter.com/',
                'instagram_url' => 'https://www.instagram.com/',
                'google_play_url' => 'https://play.google.com',
                'apple_store_url' => 'https://apps.apple.com',
                'gdpr_cookie_consent' => 1,
                'gdpr_consent_title' => 'This website is using cookies',
                'gdpr_consent_text' => 'We use them to give you the best experience. If you continue using our website, we\'ll assume that you are happy to receive all cookies on this website.',
                'gdpr_privacy_url' => 'https://example.com',
                'envato_username' => 'abc',
                'buyer_purchase_code' => 'xyz',

            ],
        ]);
    }
}
