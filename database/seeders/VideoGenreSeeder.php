<?php

namespace Database\Seeders;

use App\Models\Genre;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VideoGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $videos = Video::all();
        $genres = Genre::all();

        // Assign random genres to each video
        foreach ($videos as $video) {
            $video->genres()->attach(
                $genres->random(rand(1, 3))->pluck('id')->toArray() // Attach 1 to 3 random genres to each video
            );
        }
    }
}
