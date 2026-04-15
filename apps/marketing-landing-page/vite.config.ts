import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/agent-first-fizzbuzz-scalable/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
