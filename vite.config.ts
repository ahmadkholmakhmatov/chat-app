import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://67.205.184.13:8000', // Replace with your backend URL
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS on your backend
      },
    },
  },
});
