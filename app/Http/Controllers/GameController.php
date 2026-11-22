<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use RuntimeException;
use Throwable;

class GameController extends Controller
{
    private function pkcs7_pad(string $data, int $block = 16): string
    {
        $pad = $block - (strlen($data) % $block);
        return $data . str_repeat(chr($pad), $pad);
    }

    private function aes256ecb_encrypt(string $plaintext, string $key32): string
    {
        if (strlen($key32) !== 32) {
            throw new InvalidArgumentException('AES key must be 32 bytes');
        }
        $padded = $this->pkcs7_pad($plaintext);
        $raw = openssl_encrypt($padded, 'AES-256-ECB', $key32, OPENSSL_RAW_DATA | OPENSSL_ZERO_PADDING);
        if ($raw === false) {
            throw new RuntimeException('Encrypt failed');
        }
        return base64_encode($raw);
    }

    public function launchGame(Request $request)
    {
        // API credentials
        $apiUrl = config('services.igamingapi.url');
        $token = config('services.igamingapi.token');
        $secret = config('services.igamingapi.secret');
        // Payload

        $payload = [
            'user_id'       => 32323232,
            'balance'       => 500.00,
            'game_uid'      => $request->game_code,
            'token'         => $token,
            'timestamp'     => (int) round(microtime(true) * 1000),
            'return'        => url('/'),
            'callback'      => url('/callback'),
            'language'      => 'en',
            'currency_code' => 'INR',
        ];
  
        try {
            $jsonPayload = json_encode(
                $payload,
                JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
            );

            $encryptedPayload = $this->aes256ecb_encrypt(
                $jsonPayload,
                $secret
            );

            $body = [
                'token'   => $token,
                'payload' => $encryptedPayload,
            ];

            $response = Http::timeout(60)
                ->acceptJson()
                ->post($apiUrl, $body);

            $result = $response->json();
  
            if (
                $response->successful() &&
                // isset($result['code']) &&
                // (int) $result['code'] === 0 &&
                !empty($result['data']['url'])
            ) {
                return redirect()->route('launchGame')->with(['url' => $result['data']['url'], 'success' => 1]);
            }

            // Log::error('iGaming API Error', [
            //     'http_status' => $response->status(),
            //     'response' => $result,
            // ]);

            return back()->with(
                'error',
                'Unable to launch game. Please try again.'
            );
        } catch (\Throwable $e) {
            // Log::error('iGaming Exception', [
            //     'message' => $e->getMessage(),
            // ]);
            return back()->with(
                'error',
                $e->getMessage()
            );
        }
    }

    public function callback(Request $request)
    {
        $raw = $request->getContent();

        $json = json_decode($raw, true);

        if (!is_array($json)) {
            return response()->json([
                'code' => 1,
                'msg' => 'invalid json'
            ], 400);
        }

        // Encrypted wire format
        // { "payload": "<base64>", "timestamp": 123 }

        $event = $json;

        if (
            isset($json['payload']) &&
            is_string($json['payload']) &&
            $json['payload'] !== ''
        ) {
            try {
                $secret = config('services.igamingapi.secret');

                $dec = $this->aes256ecb_encrypt(
                    $json['payload'],
                    $secret
                );

                $event = json_decode($dec, true);

                if (!is_array($event)) {
                    throw new RuntimeException(
                        'bad plaintext json'
                    );
                }
            } catch (Throwable $e) {

                Log::error('Game callback decrypt failed', [
                    'error' => $e->getMessage()
                ]);

                return response()->json([
                    'code' => 1,
                    'msg' => 'decrypt failed'
                ], 400);
            }
        }

        // Extract event data

        $userId = (string) ($event['member_account'] ?? '');

        $betAmount = (float) ($event['bet_amount'] ?? 0);

        $winAmount = (float) ($event['win_amount'] ?? 0);

        $roundId = (string) ($event['game_round'] ?? '');

        $gameUid = (string) ($event['game_uid'] ?? '');

        $notifyOnly = !empty($event['notify_only']);

        return ['id' => $userId,'winammount' => $winAmount,'roundId'=>$roundId];
        // Database processing
        // TODO: Insert/update game transaction
        // Use roundId / serial_number for idempotency

        if ($roundId === '') {
            return response()->json([
                'code' => 1,
                'msg' => 'missing serial_number'
            ], 400);
        }

        // Notification-only callback: do not change wallet
        if ($notifyOnly) {
            return response()->json([
                'code' => 0,
                'msg' => 'OK'
            ]);
        }

        try {

            DB::transaction(function () use (
                $userId,
                $betAmount,
                $winAmount,
                $roundId,
                $gameUid,
            ) {

                // Find user and lock wallet row
                $user = DB::table('users')
                    ->where('member_account', $userId)
                    ->lockForUpdate()
                    ->first();

                if (!$user) {
                    throw new RuntimeException('User not found');
                }

                // Insert transaction only once
                $inserted = DB::table('game_transactions')
                    ->insertOrIgnore([
                        'provider' => 'game_provider',
                        'member_account' => $userId,
                        'game_round' => $roundId,
                        'game_uid' => $gameUid,
                        'bet_amount' => $betAmount,
                        'win_amount' => $winAmount,
                        'net_amount' => $winAmount - $betAmount,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                // Duplicate callback: do not update wallet
                if ($inserted === 0) {
                    return;
                }

                // Calculate new wallet balance
                $newBalance = (float) $user->balance
                    - $betAmount
                    + $winAmount;

                if ($newBalance < 0) {
                    throw new RuntimeException('Insufficient balance');
                }

                // Update wallet
                DB::table('users')
                    ->where('id', $user->id)
                    ->update([
                        'balance' => $newBalance,
                    ]);
            }, 3);

            return response()->json([
                'code' => 0,
                'msg' => 'OK'
            ]);
        } catch (Throwable $e) {

            Log::error('Game transaction failed', [
                'error' => $e->getMessage(),
                'serial_number' => $roundId,
            ]);

            return response()->json([
                'code' => 1,
                'msg' => 'transaction failed'
            ], 500);
        }
    }
}
