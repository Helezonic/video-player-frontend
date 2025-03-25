import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'


// https://vite.dev/config/
export default defineConfig({
  servers: {
    https : {
      key: fs.readFileSync('/home/helezon/Fullstack/video-player/frontend/video-player-react/cert.key'),
      cert : fs.readFileSync('/home/helezon/Fullstack/video-player/frontend/video-player-react/cert.crt')
    }
  },
  plugins: [
    react(), 
    tailwindcss()
  ],
})
