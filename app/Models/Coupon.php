<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'type', 'value', 'usage_limit', 'expires_at', 'status'];

    /**
     * Relationship with users who used this coupon.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'coupon_user')
            ->withPivot('used_at')
            ->withTimestamps();
    }

    /**
     * Get the count of how many times the coupon has been used.
     */
    public function getUsedCountAttribute()
    {
        return $this->users()->count();
    }

    /**
     * Check if the coupon is valid.
     */
    public function isValid()
    {
        $isNotExpired = !$this->expires_at || now()->lessThanOrEqualTo($this->expires_at);
        $hasRemainingUses = !$this->usage_limit || $this->users()->count() < $this->usage_limit;

        return $isNotExpired && $hasRemainingUses && $this->status;
    }

    /**
     * Calculate the discount based on the type.
     */
    public function calculateDiscount($totalPrice)
    {
        if ($this->type === 'fixed') {
            return min($this->value, $totalPrice); // Ensure the discount does not exceed total price
        }

        if ($this->type === 'percent') {
            return $totalPrice * ($this->value / 100);
        }


        return 0;
    }

    public function uses()
    {
        return $this->hasMany(CouponUser::class, 'coupon_id');
    }
}
