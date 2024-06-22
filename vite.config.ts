import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import path from 'path';
import removeConsole from 'vite-plugin-remove-console';

// 개발용 설정
const devConfig = {
    plugins: [react(), svgr()] as PluginOption[],
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

// 빌드용 설정
const buildConfig = {
    plugins: [react(), svgr(), removeConsole()] as PluginOption[],
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

export default defineConfig(({ command }) => {
    if (command === 'build') {
        return buildConfig;
    } else {
        return devConfig;
    }
});
