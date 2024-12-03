import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'aws-amplify': ['aws-amplify'],
          'aws-amplify-react': ['@aws-amplify/ui-react'],
          'react-dom': ['react-dom/client'],
        },
      },
    },
  },
})
