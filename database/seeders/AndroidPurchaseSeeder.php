<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AndroidPurchaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('android_purchases')->insert([
            'buyer_name' => 'Demo User',
            'purchase_code' => 'DEMO-PURCHASE-CODE',
            'app_package_name' => 'com.example.app',
            'status' => 1,
        ]);
    }
}
