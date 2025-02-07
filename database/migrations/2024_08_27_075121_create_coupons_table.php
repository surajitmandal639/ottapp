<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCouponsTable extends Migration
{
    public function up()
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->enum('type', ['fixed', 'percent'])->default('percent'); // Discount type
            $table->decimal('value', 8, 2); // Discount value (e.g., $10.00 or 10%)
            $table->integer('usage_limit')->nullable(); // Max number of uses
            $table->dateTime('exp_date')->nullable(); // Expiration date
            $table->boolean('status')->default(1); // 1: Active, 0: Inactive
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('coupons');
    }
}
