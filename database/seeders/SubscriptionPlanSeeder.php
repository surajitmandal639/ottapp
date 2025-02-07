<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insert subscription plans into the database
        DB::table('subscription_plans')->insert([
            [
                'name' => 'Basic Plan',
                'duration' => 7,
                'duration_type' => "Days", // Days
                'price' => 99,
                'device_limit' => 1,
                'ads' => 1,
                'status' => 2,
            ],
            [
                'name' => 'Premium Plan',
                'duration' => 1,
                'duration_type' => "Weeks", // Weeks
                'price' => 199,
                'device_limit' => 1,
                'ads' => 1,
                'status' => 2,
            ],
            [
                'name' => 'Silver Plan',
                'duration' => 1,
                'duration_type' => "Months", // Months
                'price' => 299,
                'device_limit' => 2,
                'ads' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Gold Plan',
                'duration' => 6,
                'duration_type' => "Months", // Months
                'price' => 399,
                'device_limit' => 2,
                'ads' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Platinum Plan',
                'duration' => 1,
                'duration_type' => "Years", // Years
                'price' => 499,
                'device_limit' => 5,
                'ads' => 0,
                'status' => 1,
            ],
        ]);

        // Fetch all the subscription plans
        $subscriptionPlans = SubscriptionPlan::all();

        // Fetch all users (or just a specific one if needed)
        $users = User::where('status', '!=', 0)
            ->whereHas('roles', function ($q) {
                $q->where('name', 'not like', '%admin%');
            })
            ->get();

        foreach ($users as $user) {
            // Randomly decide whether to assign a plan or not (50% chance for null)
            $randomPlan = rand(0, 1) ? $subscriptionPlans->random() : null;

            // If a subscription plan is selected (not null), insert it into the pivot table
            if ($randomPlan) {
                DB::table('subscription_plan_user')->insert([
                    'user_id' => $user->id,
                    'subscription_plan_id' => $randomPlan->id,
                    'start_date' => now(),
                    'end_date' => now()->addMonths($randomPlan->duration),
                    'status' => 1, // Active
                ]);
            } else {
                // Optionally handle the case where no plan is assigned (null)
                // For example, you could log it or skip this user
                // Log::info("User {$user->id} did not receive a subscription plan.");
            }
        }
    }
}
