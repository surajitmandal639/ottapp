<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\Video;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 sections
        for ($i = 1; $i <= 5; $i++) {
            $section = Section::create([
                'title' => 'Section ' . $i,
                'status' => 1,
            ]);

            // Get a random set of video IDs (assuming you have a Video model and videos in the database)
            $videoIds = Video::inRandomOrder()->take(3)->pluck('id')->toArray();

            // Associate the section with videos
            $section->videos()->sync($videoIds);
        }
    }
}
