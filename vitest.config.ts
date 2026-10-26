import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

// Its own config, so tests don't load vite.config.ts (the dev proxy and the admin mock).
export default defineConfig({
  plugins: [vue()],
  test: { include: ['tests/**/*.test.ts'], environment: 'node' },
})
