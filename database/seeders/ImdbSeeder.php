<?php

namespace Database\Seeders;

use App\Models\Imdb;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImdbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Imdb::insert([
            [
                'imdb_id' => 'tt0111161',
                'title' => 'The Shawshank Redemption',
                'description' => 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                'poster' => 'https://example.com/poster1.jpg',
            ],
            [
                'imdb_id' => 'tt0068646',
                'title' => 'The Godfather',
                'description' => 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
                'poster' => 'https://example.com/poster2.jpg',
            ],
            // Add more IMDb entries as needed
        ]);
    }
}
