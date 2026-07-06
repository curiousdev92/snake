import { defineConfig } from "vite-plus";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { lazyPlugins } from "vite-plus";

// https://vite.dev/config/
export default defineConfig({
  plugins: lazyPlugins(() => [svelte()]),
});
