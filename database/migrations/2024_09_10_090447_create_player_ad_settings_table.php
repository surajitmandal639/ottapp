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
        Schema::create('player_ad_settings', function (Blueprint $table) {
            $table->id();
            $table->enum('vast_type', ['Local', 'URL']);
            $table->string('ad_video_local')->nullable();
            $table->string('ad_video_url')->nullable();
            $table->string('custom_ad1_source')->nullable();
            $table->string('custom_ad1_timestart')->nullable();
            $table->string('custom_ad1_link')->nullable();
            $table->string('custom_ad2_source')->nullable();
            $table->string('custom_ad2_timestart')->nullable();
            $table->string('custom_ad2_link')->nullable();
            $table->string('custom_ad3_source')->nullable();
            $table->string('custom_ad3_timestart')->nullable();
            $table->string('custom_ad3_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_ad_settings');
    }
};
