<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create an admin user
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        // Assign the 'admin' role (role ID 1) to the admin user via the pivot table
        DB::table('role_user')->insert([
            'user_id' => $adminUser->id,
            'role_id' => 1, // admin role ID
        ]);

        // Create a regular user
        $user = User::create([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password' => Hash::make('12345678'),
            'user_expiry_date' => Carbon::now()->addYears(rand(1, 2)),
        ]);

        // Assign the 'user' role (role ID 2) to the regular user via the pivot table
        DB::table('role_user')->insert([
            'user_id' => $user->id,
            'role_id' => 2, // user role ID
        ]);
        
        // Create 10 additional users
        for ($i = 1; $i <= 10; $i++) {
            $newUser = User::create([
                'name' => 'User ' . $i,
                'email' => 'user' . $i . '@gmail.com',
                'password' => Hash::make('12345678'),
                'user_expiry_date' => Carbon::now()->addYears(rand(1, 2)),
            ]);

            // Assign the 'user' role to each new user
            DB::table('role_user')->insert([
                'user_id' => $newUser->id,
                'role_id' => 2, // user role ID
            ]);
        }
    }
}
