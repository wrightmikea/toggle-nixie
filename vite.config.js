import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import os from 'os'

// Get build information
const getGitCommitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch (e) {
    return 'unknown'
  }
}

const getBuildTimestamp = () => {
  return new Date().toISOString()
}

const getBuildHost = () => {
  return os.hostname()
}

export default defineConfig({
  plugins: [react()],
  base: '/toggle-nixie/',
  define: {
    __BUILD_SHA__: JSON.stringify(getGitCommitHash()),
    __BUILD_TIMESTAMP__: JSON.stringify(getBuildTimestamp()),
    __BUILD_HOST__: JSON.stringify(getBuildHost())
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true
  }
})
