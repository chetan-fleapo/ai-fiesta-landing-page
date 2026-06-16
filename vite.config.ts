import { reactRouter } from '@react-router/dev/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '::',
    port: 8080
  },
  plugins: [reactRouter()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    minify: 'oxc',
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  }
});
