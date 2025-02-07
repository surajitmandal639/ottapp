<?php

namespace Database\Seeders;

use App\Models\SMTPSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SMTPSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SMTPSetting::create([
            'host' => 'mail.example.com',
            'port' => '465',
            'email' => 'info@example.com',
            'password' => 'secret',
            'encryption' => 'SSL',
        ]);
    }
}
