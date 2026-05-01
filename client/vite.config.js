import { defineConfig } from "vite"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
    plugins: [reactRouter(), tailwindcss()],
    base: '/Capstone_REACT/',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
