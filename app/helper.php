<?php

use App\Models\GeneralSetting;
use Illuminate\Support\Facades\Log;


function decryptString($encryptedText, $secretKey = "0123546789SURAJI0123457689ghijkl")
{
    if (is_numeric($encryptedText)) {
        return (int) $encryptedText;
    }

    if (!is_string($encryptedText)) {
       return null;
    }
    
    $encryptedData = base64_decode(str_replace(base64_encode('SlA'), '/', $encryptedText));

    if ($encryptedData === false) {
        return null; // Handle invalid base64
    }

    $iv = substr($encryptedData, 0, 16);
    $cipherText = substr($encryptedData, 16);

    $decrypted = openssl_decrypt(
        $cipherText,
        'AES-256-CBC',
        $secretKey,
        OPENSSL_RAW_DATA,
        $iv
    );

    return $decrypted;
}

function encryptString($plainText, $secretKey = "0123546789SURAJI0123457689ghijkl")
{
    // Generate a random IV (Initialization Vector)
    $iv = openssl_random_pseudo_bytes(16); // 16 bytes for AES-256-CBC

    // Encrypt the plaintext
    $cipherText = openssl_encrypt(
        $plainText,
        'AES-256-CBC',
        $secretKey,
        OPENSSL_RAW_DATA,
        $iv
    );

    // Combine IV and CipherText
    $encryptedData = $iv . $cipherText;

    // Base64 encode the combined data
    return base64_encode($encryptedData);
}

function getImageUrl($type, $filename, $fallbackImage = 'no_img.png')
{
    // dd($type, $filename, $fallbackImage = 'no_img.png');
    try {
        $filePath = storage_path("app/public/upload/images/{$type}/{$filename}");

        if ($filename && file_exists($filePath)) {
            return asset("storage/upload/images/{$type}/{$filename}");
        }

        return asset("images/{$fallbackImage}");
    } catch (\Throwable $th) {
        throw $th;
    }
}

function formatDate($date)
{
    if (empty($date)) {
        return '';
    }

    try {
        $dateTime = new DateTime($date);
        return $dateTime->format('Y-m-d');
    } catch (\Throwable $th) {
        throw $th;
    }
}

function getFavicon()
{
    try {
        $favicon = GeneralSetting::first()->value('favicon');
        return $favicon;
    } catch (\Throwable $th) {
        Log::error('Error in getFavicon function: ' . $th->getMessage());
    }
}

function getLogo()
{
    try {
        $favicon = GeneralSetting::first()->value('logo');
        return $favicon;
    } catch (\Throwable $th) {
        Log::error('Error in getFavicon function: ' . $th->getMessage());
    }
}

function getStyling()
{
    try {
        return optional(GeneralSetting::first())->styling;
    } catch (\Throwable $th) {
        throw $th;
    }
}
