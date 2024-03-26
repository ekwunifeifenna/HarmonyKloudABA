import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH,
 

  server: {
    proxy: {
      '/auth': 'http://localhost:3000',
      '/user': 'http://localhost:3000',
      '/doctor': 'http://localhost:3000',
      '/nurse': 'http://localhost:3000',
      '/appointment': 'http://localhost:3000',
      '/admin': 'http://localhost:3000',
    },
  },
})
