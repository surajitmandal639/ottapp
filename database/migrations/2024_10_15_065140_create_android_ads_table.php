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
        Schema::create('android_ads', function (Blueprint $table) {
            $table->id();
            $table->string('ads_name'); // e.g., Admob, AppLovin, etc.
            $table->string('publisher_id')->nullable();
            $table->string('banner_id')->nullable();
            $table->boolean('banner_on')->default(false);
            $table->string('interstitial_id')->nullable();
            $table->boolean('interstitial_on')->default(false);
            $table->integer('interstitial_clicks')->nullable();
            $table->tinyInteger('status')->default(2)->comment('0 is delete, 1 is active, 2 is inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('android_ads');
    }
};
