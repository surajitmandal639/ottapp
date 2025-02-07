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
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('img_for', 30); // Indicates the type of entity the image is associated with (e.g., 'user', 'actor')
            $table->unsignedBigInteger('parent_table_id'); // ID of the parent record (user id, actor id, etc.)
            $table->string('filename')->nullable(); // The name of the image file
            $table->boolean('status')->default(1); // Status of the image (e.g., active, inactive)
            $table->timestamps();

            // Indexes for performance optimization
            $table->index('img_for');
            $table->index('parent_table_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
