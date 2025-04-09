import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    host: true, // Expose on 0.0.0.0
    port: process.env.PORT ? Number(process.env.PORT) : 5173, // Use PORT from Render or default to 5173
    strictPort: true, // Ensures Vite fails if the port is unavailable
    allowedHosts: ['talenttinder.onrender.com'],
  }
});