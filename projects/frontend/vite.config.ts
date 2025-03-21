import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({ include: /\.(js|jsx|ts|tsx)$/ }),
  ],
  server: {
    allowedHosts: ['frontend'],
    hmr: { port: 3000 },
    host: true,
    port: 3000,
  },
});
