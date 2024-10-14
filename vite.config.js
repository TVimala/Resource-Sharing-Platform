import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase the chunk size limit to 1000 kB
    
    // Optional: Configure manual chunking (code splitting)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split large vendor libraries into their own chunks
            return 'vendor';
          }
        }
      }
    }
  }
})
