import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', '.next/', 'coverage/', '**/*.d.ts', '**/*.config.*', '**/mockData']
    }
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './components'),
      '@lib': path.resolve(__dirname, './lib'),
      '@features': path.resolve(__dirname, './features'),
      '@styles': path.resolve(__dirname, './styles'),
      '@type': path.resolve(__dirname, './types'),
      '@services': path.resolve(__dirname, './services'),
      '@': path.resolve(__dirname, './')
    }
  }
});