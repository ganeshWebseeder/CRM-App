import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 This line makes @ point to /src
    },
  },
  build: {
    // Raise the warning limit for large JS chunks (default is 500 kB)
    chunkSizeWarningLimit: 1000, // warns only if > 1 MB
  },
})
