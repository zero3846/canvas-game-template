import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: "localhost",
        port: 3000
    },
    root: "app",
    publicDir: resolve(import.meta.dirname, "public"),
    build: {
        outDir: resolve(import.meta.dirname, "dist"),
        emptyOutDir: true
    }
})
