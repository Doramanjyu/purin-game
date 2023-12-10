import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@doramanjyu/purin-game': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 8080,
      strictPort: true,
      host: '0.0.0.0',
    },
  }
})
