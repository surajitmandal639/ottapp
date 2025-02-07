<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('general_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();
            $table->string('email')->nullable();
            $table->text('description')->nullable();
            $table->text('keywords')->nullable();
            $table->text('header_code')->nullable();
            $table->text('footer_code')->nullable();
            $table->string('copyright_text')->nullable();
            $table->string('default_timezone')->nullable();
            $table->string('default_language')->nullable();
            $table->string('styling')->nullable();
            $table->string('currency_code')->nullable();
            $table->string('tmdb_api_token')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('google_play_url')->nullable();
            $table->string('apple_store_url')->nullable();
            $table->tinyInteger('gdpr_cookie_consent')->default(1)->comment('1 is active, 2 is inactive');
            $table->string('gdpr_consent_title')->nullable();
            $table->text('gdpr_consent_text')->nullable();
            $table->string('gdpr_privacy_url')->nullable();
            $table->string('envato_username')->nullable();
            $table->string('buyer_purchase_code')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('general_settings');
    }
};
