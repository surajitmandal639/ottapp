<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gateway;

class GatewaySeeder extends Seeder
{
    /**
     * Seed the gateways table.
     */
    public function run(): void
    {
        Gateway::create([
            'name' => 'Stripe',
            'api_key' => 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
            'api_secret' => 'whsec_...',
            'short_info' => 'Stripe payment gateway',
            'image' => 'stripe.png',
            'status' => 1,
        ]);

        Gateway::create([
            'name' => 'Razorpay',
            'api_key' => 'rzp_test_...',
            'api_secret' => '...',
            'short_info' => 'Razorpay payment gateway',
            'image' => 'razorpay.png',
            'status' => 1,
        ]);

        // Add more gateways as needed
    }
}
