import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MCSP-Portal-Admin/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
