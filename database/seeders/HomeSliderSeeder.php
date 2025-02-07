<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HomeSliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 sliders
        for ($i = 1; $i <= 5; $i++) {
            DB::table('home_sliders')->insert([
                'title' => 'Slider ' . $i,
                'image' => null,
                // 'type' => 1, // movie, sport, live tv etc
                // 'type_id' => 1, // movie_id, sport_id, ....
                // 'display_on' => json_encode(['home']), // home, movie, sport, live tv
            ]);
        }
    }
}
