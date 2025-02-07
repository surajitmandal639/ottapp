<?php

namespace Database\Seeders;

use App\Models\Director;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VideoDirectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $videos = Video::all();
        $directors = Director::all();

        // Assign random directors to each video
        foreach ($videos as $video) {
            $video->directors()->attach(
                $directors->random(rand(1, 2))->pluck('id')->toArray() // Attach 1 to 2 random directors to each video
            );
        }
    }
}
