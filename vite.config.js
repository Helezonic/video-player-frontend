import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import basicSsl from '@vitejs/plugin-basic-ssl';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    basicSsl()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://your-railway-app.railway.app',
        changeOrigin: true, // Important for virtual hosted sites
        secure: true, // Set to false if your Railway backend's SSL has issues with localhost (usually okay)
      },
    },
    https: true, // Enable HTTPS for the Vite dev server
    port: 5173
  },
})
