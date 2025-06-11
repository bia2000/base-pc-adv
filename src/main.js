import { createApp } from 'vue'
import App from './App.vue'
// vue Router
import router from "@/routers";
// pinia store
import pinia from "@/stores";
import Requests from '@/api'
import Bus from '_u/bus'
import I18n from "@/languages";

const app= createApp(App).use(router).use(pinia).use(I18n)
// 设置全局变量
app.config.globalProperties.Bus = Bus
app.config.globalProperties.Requests = Requests
app.mount('#app')
