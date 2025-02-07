<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionPlan extends Model
{
    use HasFactory;

    protected $table = "subscription_plans";

    public function users()
    {
        return $this->hasMany(User::class, 'subscription_plan_id');
    }
}
