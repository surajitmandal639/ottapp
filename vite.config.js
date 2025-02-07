import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/js/app.jsx",
                "resources/css/backend.css",
                "resources/js/backend.js",
                "resources/css/frontend.css",
                "resources/js/frontend.js",
            ],
            refresh: true,
        }),
        react(),
    ],
});
