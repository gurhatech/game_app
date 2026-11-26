<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Diposit;
use App\Models\Withdraw;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class WithdrawController extends Controller
{
    public function index(){
        $auth_id = Auth::user();
        $bank_account = BankAccount::where('user_id',$auth_id->id)->first();
        $diposit = Diposit::where('user_id',$auth_id->id)->latest()->first();

        $withdrawable_amount = 0 ;
        if($diposit->amount * 100 ){

        }

        return Inertia::render("withdraw",['bank_account' => $bank_account,'wager' => $diposit->wager_amount]);
    }

    public function store(Request $request){
        $request->validate([
            'amount' => 'required',
        ]);
        $order_id = Str::ulid();
        
        return $order_id;
    }
}
