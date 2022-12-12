import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: { port: +env.PORT },
    resolve: {
      alias: {
        '@app/common': path.resolve(__dirname, './src/common'),
        '@app/modules': path.resolve(__dirname, './src/modules')
      }
    },
    build: {
      outDir: 'build',
      sourcemap: true
    },
    plugins: [
      react(),
      VitePWA({
        strategies: 'injectManifest',
        registerType: 'prompt',
        srcDir: 'src',
        filename: 'raptorSW.ts',
        manifestFilename: 'manifest.json',
        manifest: {
          short_name: 'RaptorMap',
          name: 'RaptorMap - Real Time Map',
          description: 'RaptorMap - Real Time Map',
          start_url: '/',
          display: 'standalone',
          theme_color: '#23232c',
          background_color: '#23232c',
          orientation: 'landscape',
          icons: [
            {
              src: 'favicon.ico',
              sizes: '48x48',
              type: 'image/x-icon'
            },
            {
              src: 'logo192.png',
              type: 'image/png',
              sizes: '192x192'
            },
            {
              src: 'logo512.png',
              type: 'image/png',
              sizes: '512x512'
            }
          ]
        },
        workbox: {
          sourcemap: true,
          globIgnores: ['**/config.js', '**/.version']
        },
        devOptions: {
          enabled: true,
          type: 'module',
          navigateFallback: 'index.html'
        }
      }),
      svgrPlugin()
    ]
  }
})
