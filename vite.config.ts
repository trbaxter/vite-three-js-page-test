import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    server: {
        hmr: { overlay: true },
        watch: {
            usePolling: true,
            interval: 100
        },
    },
});
