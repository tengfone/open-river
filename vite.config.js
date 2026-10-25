import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Keep exposing the existing REACT_APP_* variables (e.g. REACT_APP_ETHERSCAN_TOKEN)
  // so no Vercel environment variables need renaming.
  envPrefix: ['VITE_', 'REACT_APP_'],
  build: {
    // Same output directory as react-scripts so the Vercel project settings keep working
    outDir: 'build',
    // web3 v4 and the IPFS client bundle their crypto deps; the app is a single chunk
    chunkSizeWarningLimit: 2000
  },
  server: {
    port: 3000,
    open: true
  }
})
