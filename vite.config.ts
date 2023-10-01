import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), crx({manifest})],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        popup: './popup.html'
      }
    }
  }
})
