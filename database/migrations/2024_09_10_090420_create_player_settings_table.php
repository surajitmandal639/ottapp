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
        Schema::create('player_settings', function (Blueprint $table) {
            $table->id();
            $table->string('style')->default('classic_skin_dark');
            $table->string('vector_icons')->default('no');
            $table->string('autoplay')->default('no');
            $table->string('rewind_forward')->default('yes');
            $table->string('watermark')->default('yes');
            $table->string('logo')->nullable();
            $table->string('logo_position')->default('topRight');
            $table->string('url')->default('#');
            $table->string('default_ads')->default('Vast');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_settings');
    }
};
