import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@diagrams': path.resolve(__dirname, './data/diagrams'),
    },
  },
  server: {
    port: 5180,
  },
});
