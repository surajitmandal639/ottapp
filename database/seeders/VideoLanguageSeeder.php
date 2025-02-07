<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Video;
use Illuminate\Database\Seeder;

class VideoLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $videos = Video::all();
        $languages = Language::all();

        // Assign random languages to each video
        foreach ($videos as $video) {

            // Get random languages (between 1 to 5) and their IDs
            $randomLanguageIds = $languages->random(rand(1, 5))->pluck('id')->toArray();

            // Attach the random language IDs to the video (many-to-many relationship)
            $video->languages()->attach($randomLanguageIds);
        }
    }
}
