<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Gateway;

class TransactionSeeder extends Seeder
{
    /**
     * Seed the transactions table.
     */
    public function run(): void
    {
        // Get the first user and gateway, or create them if not present
        $users = User::take(5)->where('id', '!=', 1)->get();
        $gateways = Gateway::all();

        if ($users->isEmpty() || $gateways->isEmpty()) {
            $this->command->error('No users or gateways found. Please seed users and gateways first.');
            return;
        }

        foreach ($users as $user) {
            foreach ($gateways as $gateway) {
                for ($i = 1; $i <= 3; $i++) { // Create 5 transactions for each user-gateway pair
                    Transaction::create([
                        'user_id' => $user->id,
                        'gateway_id' => $gateway->id,
                        'transaction_id' => 'txn_' . $user->id . '_' . $gateway->id . '_' . $i,
                        'amount' => rand(10, 500), // Random amount between 10 and 500
                        'currency' => 'USD',
                        'status' => $this->getRandomStatus(), // Random status
                        'response' => json_encode(['status' => $this->getRandomStatus()]),
                    ]);
                }
            }
        }
    }

    /**
     * Get a random transaction status.
     */
    private function getRandomStatus(): string
    {
        $statuses = ['completed', 'pending', 'failed'];
        return $statuses[array_rand($statuses)];
    }
}
