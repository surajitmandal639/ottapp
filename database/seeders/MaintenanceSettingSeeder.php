<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaintenanceSettingSeeder extends Seeder
{
    /**
     * Seed the coupons table.
     *
     * @return void
     */
    public function run()
    {
        DB::table('maintenance_settings')->insert([
            'title' => 'The Website Under Maintenance!',
            'description' => 'This Website Under Maintenance!',
            'secret' => 'your-secret-token',
            'status' => 0,
        ]);
    }
}
