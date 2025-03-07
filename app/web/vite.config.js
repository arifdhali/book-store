import path from "path"
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src")
    }
  }

});
