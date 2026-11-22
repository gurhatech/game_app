<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        $name = 'Rahul';
        $email = 'rahul@gmail.com';

        return Inertia::render('login', [
            'name' => $name,
            'email' => $email,
        ]);
    }

    public function loginHandler(Request $request){
        $validate = $request->validate([
            'name'=> 'required',
            'phone_no' => 'max:10|unique:users,phone_no',
            'balance' => 'decimal:100,5000'
        ]);
        return $request->ip();
        
    }

    public function register()
    {
        $name = 'Rahul';
        $email = 'rahul@gmail.com';

        return Inertia::render('register', [
            'name' => $name,
            'email' => $email,
        ]);
    }

    public function profilePage(Request $request){
        return Inertia::render('profilePage', [
            'member_account' => $request->member_account
        ]);
    }
}
