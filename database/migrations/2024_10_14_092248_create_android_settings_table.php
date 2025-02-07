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
        Schema::create('android_settings', function (Blueprint $table) {
            $table->id();
            $table->string('app_name');
            $table->string('app_logo')->nullable();
            $table->string('app_email');
            $table->string('app_company')->nullable();
            $table->string('app_website')->nullable();
            $table->string('app_contact')->nullable();
            $table->string('app_version')->nullable();
            $table->text('about_us')->nullable();
            $table->text('privacy_policy')->nullable();
            $table->string('onesignal_app_id')->nullable();
            $table->string('onesignal_rest_key')->nullable();
            $table->boolean('app_update_popup')->default(false);
            $table->integer('app_update_version_code')->nullable();
            $table->text('app_update_desc')->nullable();
            $table->string('app_update_link')->nullable();
            $table->boolean('app_update_cancel_option')->default(false);
            $table->text('terms_of_use')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('android_settings');
    }
};
