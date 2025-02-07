<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'status'];

    public function videos()
    {
        return $this->belongsToMany(Video::class, 'section_video');
    }


}
