import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// DOM interaction tests (tests/dom): the UI is driven through the public interface in jsdom. The pure-logic tests
// (tests/*.test.mjs) keep running with `node --test` (npm run test:unit).
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        include: ['tests/dom/**/*.test.jsx'],
        setupFiles: ['tests/dom/setup.js'],
        testTimeout: 20000,
        restoreMocks: true,
        unstubGlobals: true,
    },
})
