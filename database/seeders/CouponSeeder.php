<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CouponSeeder extends Seeder
{
    /**
     * Seed the coupons table.
     *
     * @return void
     */
    public function run()
    {
        DB::table('coupons')->insert([
            [
                'code' => 'DISCOUNT10',
                'type' => 'percent', // Percentage
                'value' => 10.00, // 10%
                'usage_limit' => 100, // Max 100 uses
                'exp_date' => Carbon::now()->addDays(30)->toDateString(), // 30 days from today
                'status' => 1, // Active
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'SAVE20',
                'type' => 'fixed', // Fixed amount
                'value' => 20.00, // $20 off
                'usage_limit' => 50, // Max 50 uses
                'exp_date' => Carbon::now()->addDays(60)->toDateString(), // 60 days from today
                'status' => 1, // Active
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'FREESHIP',
                'type' => 'fixed', // Fixed amount
                'value' => 5.00, // $5 off
                'usage_limit' => null, // No limit
                'exp_date' => Carbon::now()->addDays(15)->toDateString(), // 15 days from today
                'status' => 2, // Inactive
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'WELCOME15',
                'type' => 'percent', // Percentage
                'value' => 15.00, // 15%
                'usage_limit' => null, // No limit
                'exp_date' => Carbon::now()->addMonths(3)->toDateString(), // 3 months from today
                'status' => 1, // Active
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
