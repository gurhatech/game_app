
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\TransactionController;

Route::middleware([''])->group(function () {
    Route::inertia('/withdraw', 'withdraw')->name('withdraw');
    Route::inertia('/mail', 'mail')->name('mail');
    Route::inertia('/earn', 'earn')->name('earn');
    Route::inertia('/promo', 'promo')->name('promo');
    Route::inertia('/mine', 'mine')->name('mine');
    Route::get('/profile/{member_account}', [AuthController::class, 'profilePage'])->name('profilePage');
    Route::get('/transaction/{transactionType}', [TransactionController::class, 'index'])->name('index');
    Route::post('/launch_game', [GameController::class, 'launchGame']);
    Route::inertia('/launch_game', 'launchGame')->name('launchGame');
});

Route::middleware(['guest:web'])->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login',[AuthController::class,'loginHandler']);
    Route::get('/register', [AuthController::class, 'register'])->name('register');
});

Route::post('/callback',[GameController::class,'callback']);

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/diposit', 'diposit')->name('diposit');
Route::inertia('/support', 'chatSupport')->name('support');
