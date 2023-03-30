import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./resources/js', import.meta.url)),
			"@assets": fileURLToPath(new URL("./public/assets", import.meta.url)),
		},
	},
  server: {
    port: process.env.DEV_PORT || 3001
  }
});

