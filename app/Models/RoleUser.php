<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model
{
    use HasFactory;

    // Specify the table if it's not the default
    protected $table = 'role_user';

    // If you need to disable timestamps
    public $timestamps = false;

    // Define any fillable or guarded properties if needed
    protected $fillable = ['role_id', 'user_id'];
}
