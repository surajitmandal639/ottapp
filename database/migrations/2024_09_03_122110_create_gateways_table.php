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
        Schema::create('gateways', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50); // Correct column name
            $table->string('api_key');
            $table->string('api_secret');
            $table->string('short_info');
            $table->string('image')->nullable();
            $table->tinyInteger('status')->default(1)->comment('0 is delete, 1 is active, 2 is inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gateways');
    }
};
