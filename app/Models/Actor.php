<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;

    public function images()
    {
        return $this->hasMany(Image::class, 'parent_table_id', 'id')->where('img_for', 'actor');
    }

    // Define the videos relationship
    public function videos()
    {
        return $this->belongsToMany(Video::class);
    }
}
