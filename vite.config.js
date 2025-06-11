import modifyVars from './src/assets/style/antd.json'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL }  from 'node:url'
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers' //antdesign
export default defineConfig({
  // base:'/de-service',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      _root: fileURLToPath(new URL('./', import.meta.url)),
      _c: fileURLToPath(new URL('./src/components', import.meta.url)),
      // _setup: fileURLToPath(new URL('./src/composition', import.meta.url)),
      _img: fileURLToPath(new URL('./src/assets/img', import.meta.url)),
      _p: fileURLToPath(new URL('./src/views', import.meta.url)),
      _css: fileURLToPath(new URL('./src/assets/style', import.meta.url)),
      _u: fileURLToPath(new URL('./src/utils', import.meta.url))
    },
    extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  plugins: [vue(),
    AutoImport({
      imports: ['vue', 'vue-router']
  }),
    // 自动加载组件 默认自动注册src/components下的组件，可使用dts指定自动注册组件路径
    Components({
        resolvers: [
            AntDesignVueResolver({
                importStyle: false, // css in js
            }),
        ],
        //dts:["src/components"]
    })                  
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars,
        javascriptEnabled: true,
        additionalData: `@import '@/assets/style/var.less';`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://192.168.121.15:7999', // 鸿鑫本地
        target: 'http://de.rohest.cn/gateway', // 地址
        changeOrigin: true, // 改变请求源头
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      },
    },
  },
})
