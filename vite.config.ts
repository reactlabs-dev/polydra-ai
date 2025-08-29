import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/app/components'),
      '@/pages': path.resolve(__dirname, './src/app/pages'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "primereact/resources/themes/lara-light-cyan/theme.css";`
      }
    }
  },
  optimizeDeps: {
    include: ['primeicons', 'primereact', 'primeflex']
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
    chunkSizeWarningLimit: 1000
  },
  define: {
    global: 'globalThis',
  }
})
