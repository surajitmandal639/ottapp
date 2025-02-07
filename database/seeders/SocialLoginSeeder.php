<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocialLoginSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $providers = [
            [
                'provider_name' => 'google',
                'client_id' => 'your-google-client-id',
                'client_secret' => 'your-google-client-secret',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_name' => 'facebook',
                'client_id' => 'your-facebook-app-id',
                'client_secret' => 'your-facebook-client-secret',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more providers like Twitter, LinkedIn, etc., as needed
        ];

        DB::table('social_logins')->insert($providers);
    }
}
