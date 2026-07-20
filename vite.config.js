import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      // Compress PNGs aggressively
      optipng:   { optimizationLevel: 7 },
      pngquant:  { quality: [0.6, 0.75], speed: 4 },
      // Compress JPEGs
      mozjpeg:   { quality: 75 },
      // Convert everything to WebP (best mobile format)
      webp:      { quality: 75 },
      // SVGs
      svgo:      { plugins: [{ removeViewBox: false }] },
    }),
  ],
  assetsInclude: ['**/*.glb'],
})
