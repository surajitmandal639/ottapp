<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VerifyPurchaseAppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('verify_purchase_apps')->insert([
            'buyer_name' => 'John Doe',
            'purchase_code' => 'ABC123XYZ',
            'app_package_name' => 'com.example.myapp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
