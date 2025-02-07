<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Retrieve IDs for admin and user roles
        $adminRoleId = Role::where('name', 'admin')->value('id');
        $userRoleId = Role::where('name', 'user')->value('id');

        // Check if roles exist
        if (!$adminRoleId || !$userRoleId) {
            $this->command->error('Roles not found.');
            return;
        }

        // Assign 'admin' role to the admin user
        $adminUser = User::where('email', 'admin@gmail.com')->first();

        if ($adminUser) {
            $adminUser->roles()->attach($adminRoleId);
        } else {
            $this->command->error('Admin user not found.');
        }

        // Assign 'user' role to the 10 regular users
        $regularUsers = User::where('email', 'like', 'user%')->take(10)->get();

        foreach ($regularUsers as $user) {
            $user->roles()->attach($userRoleId);
        }
    }
}
