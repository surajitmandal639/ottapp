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
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('duration');
            $table->string('duration_type');
            $table->decimal('price', 8, 2);
            $table->integer('device_limit')->nullable();
            $table->tinyInteger('ads')->default(1)->comment('1 is on , 2 is off');
            $table->tinyInteger('status')->default(1)->comment('0 is delete, 1 is active, 2 is inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_plans');
    }
};
