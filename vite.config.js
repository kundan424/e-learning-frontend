import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // This maps 'events' to the 'events' npm package
      events: 'events',
    },
  },
  define: {
    // This polyfills the 'global' variable (needed by 'buffer')
    'global': 'window',
    // This handles the 'util.debuglog' and 'util.inspect'
    'process.env.DEBUG': 'false',
  },
})



