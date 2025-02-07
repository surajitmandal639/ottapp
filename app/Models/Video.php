<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = ['imdb_id', 'name', 'description', 'status', 'upcoming', 'access','imdb_id',
        'duration', 'release_date', 'rating', 'content_rating',
        'imdb_rating', 'content_rating', 'release_date', 'seo_title', 'meta_description', 'keywords',
        'poster', 'thumbnail', 'trailer_url', 'video_quality', 'video_type', 'video_local',
        'video_local_480', 'video_local_720', 'video_local_1080', 'video_url', 'video_url_480',
        'video_url_720','video_url_1080','video_hls','video_embed_code','download_enable',
        'download_url','subtitle_enable', 'subtitle_language1','subtitle_url1','subtitle_language2',
        'subtitle_url2','subtitle_language3','subtitle_url3'
    ];

    public function languages()
    {
        return $this->belongsToMany(Language::class, 'language_video');
    }

    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'video_actor');
    }

    public function directors()
    {
        return $this->belongsToMany(Director::class, 'video_director');
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'video_genre');
    }

    public function sections()
    {
        return $this->belongsToMany(Section::class, 'video_section');
    }


}
