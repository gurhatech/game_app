<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;


#[Fillable(['mobile','otp','otp_id','purpose','expires_at'])]
class Otp extends Model
{
    protected $table = "otps";

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
        ];
    }
}
