<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlayerAdSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('player_ad_settings')->insert([
            [
                'vast_type' => 'URL',
                'ad_video_local' => 'demo.mp4',
                'ad_video_url' => 'http://example.com/demo.mp4',
                'custom_ad1_source' => 'http://example.com/ad1.mp4',
                'custom_ad1_timestart' => '00:00:10',
                'custom_ad1_link' => 'http://example.com/ad1-link',
                'custom_ad2_source' => 'http://example.com/ad2.mp4',
                'custom_ad2_timestart' => '00:00:20',
                'custom_ad2_link' => 'http://example.com/ad2-link',
                'custom_ad3_source' => 'http://example.com/ad3.mp4',
                'custom_ad3_timestart' => '00:00:30',
                'custom_ad3_link' => 'http://example.com/ad3-link',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
