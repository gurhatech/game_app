<?php

namespace App\Http\Controllers;

use App\Models\Otp;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GuestController extends Controller
{
    public function guestLogin(Request $request)
    {
        $number = (string) random_int(100000, 999999);

        $user = new User();
        $user->uid = $number;
        $user->name = 'Player' . $number;
        $user->ip = $request->ip();
        $user->is_guest = true;
        $user->password = Hash::make(Str::random(20));
        $user->save();
        Auth::login($user);
        return redirect()->route('home');
    }

    public function bind_mobile(Request $request)
    {
        $request->validate([
            'mobile' => 'required|digits:10|unique:users,mobile',
            'otp' => [
                'required',
                'digits:6',
                'exists:otps,otp'
            ]
        ]);


        try {
            $otp = Otp::where('mobile', $request->mobile)->first();
            $user = User::where('id', Auth::id())->first();
            if ($otp->otp == $request->otp && $user->is_guest) {
                $user->mobile = $request->mobile;
                $user->verify_at = Carbon::now();
                $user->is_guest = false;
                $user->save();

                DB::table('otps')->where('mobile', $request->mobile)->delete();

                return redirect()->back();
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage(), []);
            return back()->with(["error" => "OTP Invailid,Please Enter Vailid OTP."]);
        }
    }
}
