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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->enum('upcoming', [1, 2])->comment('2 is inactive, 1 is active');
            $table->enum('access', ['free', 'paid']);
            $table->string('imdb_id')->nullable();
            $table->decimal('imdb_rating', 3, 1)->nullable();
            $table->string('content_rating', 3);
            $table->date('release_date')->nullable();
            $table->string('duration', 8)->nullable();
            $table->tinyInteger('status')->default(1)->comment('0 is delete, 1 is active, 2 is inactive');
            $table->string('seo_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('keywords')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('poster')->nullable();
            $table->string('trailer_url')->nullable();
            $table->integer('video_quality')->nullable();
            $table->tinyInteger('video_type')->default(1)->comment('1 is Local, 2 is URL, 3 is HLS, 4 is Embed');
            $table->string('video_local')->nullable();
            $table->string('video_local_480')->nullable();
            $table->string('video_local_720')->nullable();
            $table->string('video_local_1080')->nullable();
            $table->string('video_url')->nullable();
            $table->string('video_url_480')->nullable();
            $table->string('video_url_720')->nullable();
            $table->string('video_url_1080')->nullable();
            $table->string('video_hls')->nullable();
            $table->string('video_embed_code')->nullable();
            $table->enum('download_enable', [1, 2])->nullable()->comment('2 is disable, 1 is enable');
            $table->string('download_url')->nullable();
            $table->enum('subtitle_enable', [1, 2])->nullable()->comment('2 is disable, 1 is enable');
            $table->string('subtitle_language1', 50)->nullable();
            $table->string('subtitle_url1')->nullable();
            $table->string('subtitle_language2', 50)->nullable();
            $table->string('subtitle_url2')->nullable();
            $table->string('subtitle_language3', 50)->nullable();
            $table->string('subtitle_url3')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->dropColumn('imdb_id');
        });

        Schema::dropIfExists('videos');
    }
};
