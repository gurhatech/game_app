<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("diposits",function (Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->OnDelete('cascade');
            $table->string('Order_id')->nullable();
            $table->decimal('amount',10,2)->default(0);
            $table->decimal('wager_amount',10,2)->nullable();
            $table->enum('payment_type',['qr_code','upi'])->default('qr_code');
            $table->enum('status',['pending','faild','processing','success','timeout'])->default('pending');
            $table->string('utr')->nullable()->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diposits');
    }
};
