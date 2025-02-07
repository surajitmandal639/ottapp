<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AndroidAdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('android_ads')->insert([
            [
                'ads_name' => 'Admob',
                'publisher_id' => 'pub-3940256099942544',
                'banner_id' => 'ca-app-pub-3940256099942544/6300978111',
                'banner_on' => true,
                'interstitial_id' => 'ca-app-pub-3940256099942544/1033173712',
                'interstitial_on' => true,
                'interstitial_clicks' => 2,
                'status' => 1,
            ],
            [
                'ads_name' => 'AppLovin\'s MAX',
                'publisher_id' => null,
                'banner_id' => null,
                'banner_on' => false,
                'interstitial_id' => null,
                'interstitial_on' => false,
                'interstitial_clicks' => 0,
                'status' => 1,
            ],
        ]);
    }
}
