import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "primereact/resources/themes/lara-light-cyan/theme.css";`
      }
    }
  },
  server: {
    port: 3000,
    host: 'localhost',
    open: true
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'prime-vendor': ['primereact', 'primeicons', 'primeflex'],
          'three-vendor': ['three']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  define: {
    global: 'globalThis',
  }
})
