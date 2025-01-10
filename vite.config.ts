import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    server: {
        hmr: true,
        watch: {
            usePolling: true,
        },
    },
})

