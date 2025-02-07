<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerAdSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'vast_type',
        'ad_video_local',
        'ad_video_url',
        'custom_ad1_source',
        'custom_ad1_timestart',
        'custom_ad1_link',
        'custom_ad2_source',
        'custom_ad2_timestart',
        'custom_ad2_link',
        'custom_ad3_source',
        'custom_ad3_timestart',
        'custom_ad3_link',
    ];
}
