import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import ViteFonts from 'unplugin-fonts/vite'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const devProxyTarget = env.VITE_DEV_PROXY_TARGET || 'http://127.0.0.1:5000'

    return {
        plugins: [
            vue(),
            vueDevTools(),
            vuetify(),
            ViteFonts({
                fontsource: {
                    families: [
                        {
                            name: 'Roboto',
                            weights: [100, 300, 400, 500, 700, 900],
                            styles: ['normal', 'italic'],
                        },
                    ],
                },
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: devProxyTarget,
                    changeOrigin: true,
                },
            },
        },
        build: {
            outDir: path.resolve(__dirname, '../static'),
            emptyOutDir: false,
        },
    }
})
