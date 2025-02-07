// resources/js/bootstrap.js

import axios from 'axios';
import $ from 'jquery';
import { asset, encryptString } from '@/helper'; 

// Make axios available globally
window.axios = axios;

// Set default headers for axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Make jQuery available globally
window.$ = window.jQuery = $;

// Make asset function available globally
window.asset = asset; // Now you can access `asset` in any component

// Make encryptString function available globally
window.encryptString = encryptString; // Now you can access `encrypSttring` in any component

window.asset_url = import.meta.env.VITE_ASSET_URL || '';
window.app_url = import.meta.env.VITE_APP_URL || '';
