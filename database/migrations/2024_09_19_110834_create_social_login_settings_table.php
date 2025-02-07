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
        Schema::create('social_logins', function (Blueprint $table) {
            $table->id();
            $table->string('provider_name'); // 'google', 'facebook', etc.
            $table->string('client_id')->nullable(); // Client ID for the provider
            $table->string('client_secret')->nullable(); // Client Secret for the provider
            $table->tinyInteger('status')->default(1)->comment('0 is delete, 1 is active, 2 is inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('social_logins');
    }
};
