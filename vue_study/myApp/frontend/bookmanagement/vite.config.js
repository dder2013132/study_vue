import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
  proxy: {
    '^/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      timeout: 10000,
      proxyTimeout: 10000,
      retry: true,
      configure: (proxy, options) => {
        proxy.on('error', (err, req, res) => {
          console.log('프록시 오류:', err);
        });
      }
    },
    '^/uploads': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
})