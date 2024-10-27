import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
  },
  build: {
    rollupOptions: {
      // Add configuration for single-page app fallback
      input: {
        main: 'index.html',
      },
    },
  },
  // Configure for SPA fallback
  optimizeDeps: {
    exclude: ['vite-plugin-html'],
  },
});
