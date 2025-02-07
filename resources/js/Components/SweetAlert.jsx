// utils/notify.js
import Swal from 'sweetalert2';
import 'bootstrap';

/**
 * Display a success alert with a given message.
 * @param {string} message - The success message to display.
 */
export const showSuccessAlert = (message, timer = 3000) => {
    if (message) {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                container: 'success-alert-container',
            },
            timer: timer,
        });
    }else{
        Swal.close();
    }
};

/**
 * Display an error alert with a given message.
 * @param {string} message - The error message to display.
 */
export const showErrorAlert = (message) => {
    if (message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                container: 'error-alert-container',
            },
            timer: 3000, // Optional: Auto-dismiss after 3 seconds
        });
    }
};

/**
 * Display a confirmation dialog with a given message.
 * @param {string} message - The confirmation message to display.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if confirmed, false otherwise.
 */
export const showConfirmAlert = async (message) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, proceed!',
        cancelButtonText: 'No, cancel!',
    });

    return result.isConfirmed;
};

/**
 * Display a prompt alert for user input.
 * @param {string} message - The prompt message to display.
 * @param {string} [placeholder=''] - Placeholder text for the input.
 * @returns {Promise<string|null>} - Returns a promise that resolves to the entered value, or null if canceled.
 */
export const showPromptAlert = async (message, placeholder = '') => {
    
    const { value } = await Swal.fire({
        color: 'rgb(255, 255, 255)',
        background: 'rgb(26, 34, 52)',
        title: 'Are you sure you want to delete your account?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, proceed!',
        cancelButtonText: 'No, cancel!',
        input: 'text',
        inputPlaceholder: placeholder,
        inputAttributes: {
            style: 'background: #fff; border: 1px solid #d7d7d7; padding: 0.3125rem 1.25rem; color: #6e6e6e; height: 3.5rem; border-radius: 0.5rem;'
        },
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!';
            }
        },
    });

    return value || null; // Returns the input value, or null if canceled
};
