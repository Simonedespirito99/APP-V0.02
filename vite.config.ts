import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base: "./"' è fondamentale per far funzionare l'app in sottocartelle di GitHub Pages
  base: './',
  server: {
    // Assicura che i file TSX vengano trattati correttamente in locale
    fs: {
      strict: false
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});