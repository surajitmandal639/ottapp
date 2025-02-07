<?php

namespace Database\Seeders;

use App\Models\Actor;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VideoActorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $videos = Video::all();
        $actors = Actor::all();
    
        // Loop through each video
        foreach ($videos as $video) {
            
            // Randomly select between 1 to 5 actors
            $randomActorIds = $actors->random(rand(1, 5))->pluck('id')->toArray();
            
            // Attach the actor IDs directly to the video
            $video->actors()->attach($randomActorIds);
        }
    }
    
}
