<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'gateway_id',
        'user_id',
        'transaction_id',
        'amount',
        'currency',
        'status',
        'response',
    ];

    public function gateway()
    {
        return $this->belongsTo(Gateway::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
