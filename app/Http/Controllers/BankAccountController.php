<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'bank_account_no' => 'required|max:20|confirmed',
            'ifsc' => 'required|confirmed' 
        ]);

        $bank_account = BankAccount::create($request->all());

        if($bank_account){
            return back()->with(['success' => "Account Added Successfully."]);
        }else{
             return back()->with(['error' => "Connection faild please try again."]);
        }
    }
}
