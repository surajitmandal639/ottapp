<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'logo', 'favicon', 'email', 'description', 'keywords',
        'header_code', 'footer_code', 'copyright_text', 'default_timezone', 'default_language',
        'styling', 'currency_code', 'tmdb_api_token', 'facebook_url', 'twitter_url',
        'instagram_url', 'google_play_url', 'apple_store_url', 'gdpr_cookie_consent',
        'gdpr_consent_title', 'gdpr_consent_text', 'gdpr_privacy_url', 'envato_username',
        'buyer_purchase_code'
    ];
}
