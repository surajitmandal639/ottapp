<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'style',
        'vector_icons',
        'autoplay',
        'rewind_forward',
        'watermark',
        'logo',
        'logo_position',
        'url',
        'default_ads',
    ];
}
