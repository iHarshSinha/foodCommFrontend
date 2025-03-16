import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      '1d1a-119-161-98-68.ngrok-free.app',
    ],
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL, // Use process.env here
        changeOrigin: true,
        rewrite: (path) => {
          const rewrittenPath = path.replace(/^\/api/, '');
          console.log(`Rewriting ${path} to ${rewrittenPath}`);
          return rewrittenPath;
        },
      },
    },
  },
})