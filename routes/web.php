
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\DipositController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WithdrawController;

Route::middleware(['auth:web'])->group(function () {
    Route::post('/logout',[AuthController::class,'logout']);
    Route::post('/bind-mobile',[GuestController::class,'bind_mobile']);
    Route::get('/profile/{uid?}', [AuthController::class, 'profilePage'])->name('profilePage');
    Route::get('/transaction/{transactionType?}', [TransactionController::class, 'index'])->name('index');
    Route::inertia('/support', 'chatSupport')->name('support');

     Route::get('/withdraw', [WithdrawController::class,'index'])->name('withdraw');
     Route::post('/withdraw',[WithdrawController::class,'store']);
     Route::post('/add-bank-account',[BankAccountController::class,'store']);
});

Route::middleware(['guest:web'])->group(function () {
    Route::post('/guest-login',[GuestController::class,'guestLogin']);
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login',[AuthController::class,'loginHandler']);
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register',[AuthController::class,'registerHandler']);
});

// OTP ROUTE ==============
Route::post('/send-otp',[AuthController::class,'sendOtp']);
Route::post('/verify-otp',[AuthController::class,'verifyOtp']);

// Game Route ============
Route::post('/launch_game', [GameController::class, 'launchGame']);
Route::inertia('/launch_game', 'launchGame')->name('launchGame');
Route::post('/callback',[GameController::class,'callback']);


// Access Both =========
Route::inertia('/mail', 'mail')->name('mail');
Route::inertia('/earn', 'earn')->name('earn');
Route::inertia('/promo', 'earn')->name('promo');
Route::inertia('/mine', 'mine')->name('mine');
Route::inertia('/', 'welcome')->name('home');
Route::get('/diposit',[DipositController::class,'index'])->name('diposit');
Route::post('/diposit',[DipositController::class,'store']);

