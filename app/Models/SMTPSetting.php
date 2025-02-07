<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SMTPSetting extends Model
{
    use HasFactory;

    protected $table = 'smtp_settings';

    protected $fillable = [
        'smtp_host',
        'smtp_port',
        'smtp_email',
        'smtp_password',
        'smtp_encryption',
    ];
}
