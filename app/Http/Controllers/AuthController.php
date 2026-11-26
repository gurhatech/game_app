<?php

namespace App\Http\Controllers;

use App\Models\Otp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('login');
    }

    public function loginHandler(Request $request)
    {
        $request->validate([
            'mobile' => 'required|digits:10|exists:users,mobile',
            'otp' => 'required|digits:6|exists:otps,otp'
        ]);

        try {
            $user = User::where('mobile', $request->mobile)->first();
            $otp = Otp::where('mobile', $request->mobile)->first();
            if ($user && $otp->otp == $request->otp) {
                Auth::login($user);
                DB::table('otps')->where('mobile', $request->mobile)->delete();
                return redirect()->route('home');
            } else {
                return back();
            }
        } catch (\Throwable $th) {
            return back()->with(['error' => "Code Incorrect,Please enter valid Code"]);
        }
    }

    public function sendOtp(Request $request)
    {
        $request->validate([
            'mobile' => 'required|digits:10',
        ]);

        try {
            $number = (string) random_int(100000, 999999);
            $http = Http::withToken("otpf_M9Q_AmVA6fqgqbLu6t6EzNw5l44QAVj4Fk8V8Y9q")->post("https://otpflow.in/send-otp", [
                'number' => $request->mobile,
                'purpose' => 'login',
                'ttl' => 10,
                'otp' => $number,
                'otp_length' => 6
            ]);

            $otp = new Otp();
            $otp->purpose = "login";
            $otp->mobile = $request->mobile;
            $otp->otp = $number;
            $otp->otp_id = $http->json('otp_id');
            $otp->expires_at =  $http->json('expires_at');
            $otp->save();

            return back()->with(['success' => $http->json('message')]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage(), []);
            return back()->with(["error" => "Connection Failed,Please try again."]);
        }
    }

    public function register()
    {
        return Inertia::render('register');
    }

    public function registerHandler(Request $request)
    {
        $request->validate([
            'mobile' => 'required|digits:10|unique:users,mobile',
            'otp' => 'required|digits:6|exists:otps,otp'
        ]);

        try {
            $number = (string) random_int(100000, 999999);
            $otp = Otp::where('mobile', $request->mobile)->latest()->first();
            if ($otp->otp_id && $otp->otp == $request->otp) {
                $user = new User();
                $user->uid = $number;
                $user->name = 'Player' . $number;
                $user->ip = $request->ip();
                $user->mobile = $request->mobile;
                $user->verify_at = Carbon::now();
                $user->password = Hash::make($request->otp);
                $user->save();
                Auth::login($user);

                DB::table('otps')->where('mobile', $request->mobile)->delete();

                return redirect()->route('home');
            } else {
                return back()->with(['error' => "Connection Failed Please try again."]);
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage(), []);
            return back()->with(["error" => "OTP Invailid,Please Enter Vailid OTP."]);
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('home');
    }

    public function profilePage(Request $request)
    {
        return Inertia::render('profilePage', [
            'uid' => $request->uid
        ]);
    }
}
