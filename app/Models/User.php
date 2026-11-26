<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use App\Models\Diposit;
use App\Models\BankAccount;
use App\Models\Withdraw;
use App\Models\Transaction;

/**
 * @property int $id
 * @property string $uid
 * @property string $name
 * @property string|null $email
 * @property string|null $ip
 * @property int|null $phone_no
 * @property float $balance
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $verify_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['uid','name','ip','mobile','balance','password','verify_at','is_guest'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{

    public function diposit(){
        return $this->hasMany(Diposit::class,'user_id','id');
    }

    public function withdraw(){
        return $this->hasMany(Withdraw::class,'user_id','id');
    }

    public function bank_account(){
        return $this->hasMany(BankAccount::class,'user_id','id');
    }

    public function transaction(){
        return $this->hasMany(Transaction::class,'user_id','id');
    }

    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
}
