<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

#[Fillable(['user_id','amount','transaction_type','referance'])]
class Transaction extends Model
{
    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
}
