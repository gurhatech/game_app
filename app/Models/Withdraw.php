<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

#[Fillable(['user_id','bank_account_id','Order_id','amount','wager_amount','payment_type'])]
class Withdraw extends Model
{
    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
}
