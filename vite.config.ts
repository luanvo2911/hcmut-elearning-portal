import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@services": `${path.resolve(__dirname, "./src/services")}`,
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@customTypes": `${path.resolve(__dirname, "./src/customTypes")}`,
      "@utils": `${path.resolve(__dirname, "./src/utils")}`,
      "@assets": `${path.resolve(__dirname, "./src/assets")}`,
    }
  },
  define: {
    // 'process.env': 'https://hcmut-open-online-learning-portal-services.vercel.app/api/v1/query-selector'
  }
})
