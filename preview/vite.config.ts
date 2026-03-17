import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { dslCanvasPlugin } from './plugins/vite-plugin-dsl-canvas'
import path from 'path'

export default defineConfig({
  plugins: [react(), viteSingleFile(), dslCanvasPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
