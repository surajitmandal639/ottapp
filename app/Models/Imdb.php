<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imdb extends Model
{
    use HasFactory;

    protected $table = 'imdb';

    public function videos()
    {
        return $this->hasMany(Video::class, 'imdb_id');
    }
}
