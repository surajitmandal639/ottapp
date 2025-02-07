<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadImage extends Model
{
    use HasFactory;

    protected $fillable = ['filename', 'img_for', 'parent_table_id'];

    public function users()
    {
        return $this->belongsTo(User::class, 'parent_table_id');
    }
}
