import { useState, useEffect } from "react";

export function addRequiredMarkers() {
    $("input, select, textarea").each(function () {
        if ($(this).is("[required]")) {
            const $label = $(this).closest(".form-group").find("label");
            $label.find(".text-danger").remove();
            $label.append('<span class="text-danger"> *</span>');
        }
    });
}

export function exportTableToExcel(tableID, filename = '') {
    const $table = $('#' + tableID);

    // Remove href attributes from <a> tags
    $table.find('a').each(function() {
        const $link = $(this);
        $link.data('href', $link.attr('href')); // Store original href
        $link.removeAttr('href');
    });

    // Get the HTML table element
    const tableHTML = $table.prop('outerHTML');

    // Prepare a data URI with the Excel MIME type
    const dataType = 'application/vnd.ms-excel';
    const tableDataURI = 'data:' + dataType + ';charset=utf-8,' + encodeURIComponent(tableHTML);

    // Create a temporary download link and trigger the download
    const $downloadLink = $('<a></a>')
        .attr('href', tableDataURI)
        .attr('download', filename ? filename + '.xls' : 'table_export.xls')
        .appendTo('body')
        .get(0);

    $downloadLink.click();
    $downloadLink.remove();

    // Restore href attributes
    $table.find('a').each(function() {
        const $link = $(this);
        $link.attr('href', $link.data('href'));
    });
}

export function asset(path) {
    return `${asset_url}${path}`;
}




// resources/js/helper.js

import CryptoJS from 'crypto-js';

// Function to encrypt a string
export function encryptString(txt, secretKey = "0123546789SURAJI0123457689ghijkl") {
    let encryptData = '';
    if (txt != '' || txt != null) {
        let text = String(txt);
        const iv = CryptoJS.lib.WordArray.random(128 / 8); // Generate random IV
        const key = CryptoJS.enc.Utf8.parse(secretKey); // Parse the secret key
        
        // Encrypt the text
        const encrypted = CryptoJS.AES.encrypt(text, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        encryptData = CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext)).replaceAll('/', btoa('SlA'));
        // Return the IV + encrypted data as base64, replacing all '/' with btoa('SlA')
        
    }

    return encryptData;
}

// Function to decrypt a string
export function decryptString(encryptedData, secretKey = "0123546789SURAJI0123457689ghijkl") {
    // Replace 'btoa('SlA')' back to '/'
    const cleanedData = encryptedData.replaceAll(btoa('SlA'), '/');
    const decodedData = CryptoJS.enc.Base64.parse(cleanedData);

    // Extract IV and ciphertext
    const iv = CryptoJS.lib.WordArray.create(decodedData.words.slice(0, 4)); // Extract the first 4 words as IV
    const ciphertext = CryptoJS.lib.WordArray.create(decodedData.words.slice(4)); // Remaining words as ciphertext

    const key = CryptoJS.enc.Utf8.parse(secretKey); // Parse the secret key
    
    // Decrypt the ciphertext
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

export const loadStyle = (style) => {
    // const assetUrl = import.meta.env.VITE_ASSET_URL || '';

    // Remove any existing style link for cleanup
    document.head.querySelectorAll(`[href*="${style}.css"]`).forEach(el => el.remove());

    // Create and append the new link element
    const styleCSS = document.createElement('link');
    styleCSS.rel = 'stylesheet';
    styleCSS.href = `${asset_url}/frontend_asset/css/color-style/${style}.css`;
    document.head.appendChild(styleCSS);
};

