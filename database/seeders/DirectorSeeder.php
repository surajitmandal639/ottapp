<?php

namespace Database\Seeders;

use App\Models\Director;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DirectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Number of actors to create
        $numberOfActors = 7;

        // Number of images per actor
        $imagesPerActor = 2;

        // Create actors and store them in the database
        for ($i = 1; $i <= $numberOfActors; $i++) {
            $actor = Director::create([
                'name' => 'Director ' . $i,
                'bio' => 'Biography of Director ' . $i,
                'place_of_birth' => 'Birth place of Director ' . $i,
                'date_of_birth' => '198' . $i . '-0' . $i . '-2' . $i,
                'status' => 1,
            ]);

            // Create sample images associated with this actor
            for ($j = 1; $j <= $imagesPerActor; $j++) {
               
                DB::table('images')->insert([
                    'filename' => null,
                    'img_for' => 'director',
                    'parent_table_id' => $actor->id,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
