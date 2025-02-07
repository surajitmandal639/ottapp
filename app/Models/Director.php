<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Director extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'bio', 'place_of_birth', 'date_of_birth', 'status'];

    public function images()
    {
        return $this->hasMany(Image::class, 'parent_table_id', 'id')->where('img_for', 'director');
    }

    public function videos()
    {
        return $this->belongsToMany(Video::class);
    }
}
