// vite.config.ts / .js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  base: '/',                 // ensures absolute asset paths on Vercel
  plugins: [
    react(),
    federation({
      name: 'myva_auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/AuthApp.jsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,     // avoids extra preload requests that can 404 in MF setups
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) =>
          chunkInfo.name === 'remoteEntry' ? 'assets/remoteEntry.js' : '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    }
  },
  server: { port: 8084, strictPort: true, cors: true },
  preview: { port: 8084, strictPort: true, cors: true }
})
