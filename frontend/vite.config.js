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
  test: {
    globals: true,        // Active le mode global pour Vitest
    environment: 'jsdom', // Utilise jsdom pour simuler un navigateur
    setupFiles: './tests/setup.js', // Ajoute un fichier de configuration pour les tests
  },
})
