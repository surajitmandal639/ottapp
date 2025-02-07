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
        Schema::create('home_sliders', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('image')->nullable();
            // Uncomment the following lines if you want to use these fields
            // $table->tinyInteger('type')->default(1)->comment('1 is video, 2 is tv show, 3 is live tv, 4 is sports');
            // $table->integer('type_id')->default(0)->comment('');
            // $table->json('display_on')->default(json_encode(['home']));
            $table->json('display_on')->nullable();
            $table->tinyInteger('status')->default(1)->comment('0 is delete, 1 is active, 2 is inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_sliders'); // Correct table name
    }
};
