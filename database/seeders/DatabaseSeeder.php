<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            LanguageSeeder::class,
            GenreSeeder::class,
            ActorSeeder::class,
            DirectorSeeder::class,
            VideoSeeder::class,
            VideoActorSeeder::class,
            VideoDirectorSeeder::class,
            VideoGenreSeeder::class,
            VideoLanguageSeeder::class,
            ImdbSeeder::class,
            HomeSliderSeeder::class,
            SectionSeeder::class,
            CouponSeeder::class,
            CouponUserSeeder::class,
            GatewaySeeder::class,
            TransactionSeeder::class,
            PageSeeder::class,
            PlayerSettingSeeder::class,
            PlayerAdSettingSeeder::class,
            GeneralSettingSeeder::class,
            CurrencySeeder::class,
            SMTPSettingSeeder::class,
            SocialLoginSeeder::class,
            MaintenanceSettingSeeder::class,
            VerifyPurchaseAppSeeder::class,
            AndroidSettingSeeder::class,
            AndroidAdSeeder::class,
            SubscriptionPlanSeeder::class,
        ]);
    }
}
