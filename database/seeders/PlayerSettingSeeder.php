<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlayerSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('player_settings')->insert([
            'style' => 'classic_skin_dark',
            'vector_icons' => 'no',
            'autoplay' => 'no',
            'rewind_forward' => 'yes',
            'watermark' => 'yes',
            'logo' => '/images/player_logo.png',
            'logo_position' => 'topRight',
            'url' => 'http://exampleurl.com',
            'default_ads' => 'Vast',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
