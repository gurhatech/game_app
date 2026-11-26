<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id','Order_id','amount','payment_type','status','utr'])]
class Diposit extends Model
{

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
