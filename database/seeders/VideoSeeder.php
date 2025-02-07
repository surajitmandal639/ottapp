<?php

namespace Database\Seeders;

use App\Models\Video;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create videos and store them in the database
        for ($i = 1; $i <= 5; $i++) {
            $video = Video::create([
                'imdb_id' => 'tt' . str_pad($i, 7, '0', STR_PAD_LEFT),
                'name' => 'Video ' . $i,
                'description' => 'Description of Video ' . $i,
                'upcoming' => rand(1, 2),
                'access' => rand(0, 1) === 0 ? 'paid' : 'free', // Randomly set 'paid' or 'free'
                'duration' => '120 min',
                'release_date' => now()->addDays($i * 10)->format('Y-m-d'),
                'imdb_rating' => rand(1, 10) + rand(0, 9) / 10, // Random rating between 1.0 and 10.0
                'content_rating' => '16+',
                'seo_title' => 'Video ' . $i . ' Title',
                'meta_description' => 'Meta description for Video ' . $i,
                'keywords' => 'video, drama',
                'poster' => null,
                'thumbnail' => null,
                'trailer_url' => 'http://example.com/trailer' . $i,
                'video_quality' => 2,
                'video_type' => rand(1, 4), // Randomly set video type between 1 and 4
                'video_local' => 'video_local_' . $i . '.mp4',
                'video_local_480' => 'video_local_480_' . $i . '.mp4',
                'video_local_720' => 'video_local_720_' . $i . '.mp4',
                'video_local_1080' => 'video_local_1080_' . $i . '.mp4',
                'video_url' => 'http://example.com/video' . $i,
                'video_url_480' => 'http://example.com/video480_' . $i,
                'video_url_720' => 'http://example.com/video720_' . $i,
                'video_url_1080' => 'http://example.com/video1080_' . $i,
                'video_hls' => 'http://example.com/video' . $i . '.m3u8',
                'video_embed_code' => '<iframe src="http://example.com/embed' . $i . '" frameborder="0"></iframe>',
                'download_enable' => rand(1, 2),
                'download_url' => 'http://example.com/download' . $i,
                'subtitle_enable' => rand(1, 2),
                'subtitle_language1' => 'English',
                'subtitle_url1' => 'http://example.com/subtitle1_' . $i . '.srt',
                'subtitle_language2' => 'French',
                'subtitle_url2' => 'http://example.com/subtitle2_' . $i . '.srt',
                'subtitle_language3' => 'Spanish',
                'subtitle_url3' => 'http://example.com/subtitle3_' . $i . '.srt',
            ]);
        }
    }
}
