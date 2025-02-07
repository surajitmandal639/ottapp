<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CouponUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Retrieve all available coupons
        $coupons = Coupon::all();

        // Ensure there are coupons to assign to users
        if ($coupons->isEmpty()) {
            $this->command->warn('No coupons found to assign to users.');
            return;  // Stop the seeding if no coupons are available
        }

        // Get all users
        $users = User::all();

        foreach ($users as $user) {
            // Randomly select a coupon from the available coupons
            $coupon = $coupons->random();

            // Assign the coupon to the user (if needed)
            DB::table('coupon_user')->insert([
                'user_id' => $user->id,
                'coupon_id' => $coupon->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
