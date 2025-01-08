import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
// import Markdown from "vite-plugin-md";
import Markdown from "vite-plugin-vue-markdown";
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url';
import path from 'path';


import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown(),
    vueJsx(), // 针对测试用例中jsx的编译


    ////////////////
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      dts: true,
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [
        ElementPlusResolver(),
    
      ],
      // dts: '/auto-import.d.ts',
      eslintrc: {
        enabled: true, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
      },
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
     ////////////////

  ],
  build: {
    rollupOptions: {
      // 外部化那些库中不需要的依赖
      external: ["vue", "pinia", "sass", "vite-plugin-vue-markdown", "vue-router", "@vitejs/plugin-vue", "vite", "highlight.js"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
    outDir: './ctf-ics-ui-dist/dist',
    lib: {
      entry: "./packages/index.js",
      name: "ctf-ics-ui",
      fileName: 'ctf-ics-ui',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "src"),
      'ctf-ics-ui': path.resolve(dirname, "packages/index.js")
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@use "./src/styles/style.scss" as *;',
        additionalData: '@use "./style/element-plus/index.scss" as *;',
      },
    },
  },
  // vitest
  test: {
    clearMocks: true,
    include: ['./packages/**/__test__/*.jsx'],
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  }
});
