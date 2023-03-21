import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: 'https://stablediffusionapi.com/api/v3/text2img/',
    //             changeOrigin: true,
    //             secure: false,
    //             rewrite: (path) => path.replace(/^\/api/, '')
    //         },
    //     },
    // },
    plugins: [react()],
    resolve: {
        alias: {
            '@icon/': new URL('./src/assets/icons/', import.meta.url).pathname,
            '@type/': new URL('./src/types/', import.meta.url).pathname,
            '@store/': new URL('./src/store/', import.meta.url).pathname,
            '@hooks/': new URL('./src/hooks/', import.meta.url).pathname,
            '@constants/': new URL('./src/constants/', import.meta.url).pathname,
            '@api/': new URL('./src/api/', import.meta.url).pathname,
            '@components/': new URL('./src/components/', import.meta.url).pathname,
            '@utils/': new URL('./src/utils/', import.meta.url).pathname,
            '@src/': new URL('./src/', import.meta.url).pathname,
        },
    },
});
