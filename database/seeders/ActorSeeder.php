<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Number of actors to create
        $numberOfActors = 9;

        // Number of images per actor
        $imagesPerActor = 3;

        // Prepare data for actors
        $actorsData = [];
        for ($i = 1; $i <= $numberOfActors; $i++) {
            $actorsData[] = [
                'name' => 'Actor ' . $i,
                'bio' => 'Biography of Actor ' . $i,
                'place_of_birth' => 'Birth place of Actor ' . $i,
                'date_of_birth' => '198' . $i . '-0' . $i . '-2' . $i,
                'status' => 1,
                'created_at' => now(), // Add timestamps if necessary
                'updated_at' => now(), // Add timestamps if necessary
            ];
        }

        // Insert actors into the database
        DB::table('actors')->insert($actorsData);

        // Get the last inserted IDs
        $lastActorId = DB::table('actors')->max('id');

        // Prepare data for upload images
        $uploadImagesData = [];
        for ($i = 1; $i <= $numberOfActors; $i++) {
            for ($j = 1; $j <= $imagesPerActor; $j++) {
                $uploadImagesData[] = [
                    'filename' => null, // Unique filename for each image
                    'img_for' => 'actor',
                    'parent_table_id' => $i, // Assuming the actor IDs are sequential
                    'created_at' => now(), // Add timestamps if necessary
                    'updated_at' => now(), // Add timestamps if necessary
                ];
            }
        }

        // Insert upload images into the database
        DB::table('images')->insert($uploadImagesData);
    }
}

