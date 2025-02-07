<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample languages
        Language::create(['name' => 'Bengali']);
        Language::create(['name' => 'Hindi']);
        Language::create(['name' => 'English']);
        Language::create(['name' => 'Spanish', 'status'=> 2]);
        Language::create(['name' => 'French']);
    }
}
