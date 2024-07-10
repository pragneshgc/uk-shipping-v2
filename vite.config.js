import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/assets/sass/app.scss",
                "resources/assets/js/app.js",
            ],
            refresh: true,
        }),
        vue(),
    ],
    build: {
        sourcemap: true
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./resources/assets/js")
        }
    }
});
