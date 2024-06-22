import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import path from 'path';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        plugins: [react(), svgr(), command === 'build' && removeConsole()],
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: path.resolve(__dirname, 'src'),
                },
            ],
        },
        server: {
            proxy: {
                '/websocket': {
                    target: 'https://api.babpool.com',
                    ws: true,
                },
            },
        },
    };
});
