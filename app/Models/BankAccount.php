<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

#[Fillable(['user_id','name','ifsc','bank_account_no','status'])]
class BankAccount extends Model
{
    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
}
