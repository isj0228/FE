import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: 'C:/KB_FinalProject/BE/src/main/webapp/resources',
    },
    // 커스텀 요소 설정 추가
    define: {
        vue: {
            compilerOptions: {
                isCustomElement: (tag) => tag.startsWith('v-'), // Vuetify 태그를 커스텀 요소로 인식
            },
        },
    },
});
