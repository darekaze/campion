import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	plugins: [vue(), VitePWA({ registerType: 'autoUpdate' })],
})
