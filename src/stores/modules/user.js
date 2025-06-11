import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";

export const useUserStore = defineStore({
  id: "geeker-user",
  state: () => ({
    token: "",
    userInfo: { name: '',email:'',avatar:'' }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    async Logout() {
      if (!this.token) return
      // await Requests.logout({ apiLoading: '退出平台', apiReject: true })
      // // 重置路由
      // Router.resetRouter()
      // // 转回登录页面
      // const router = Router.default
      // const meta = router.currentRoute.value.meta

      // if (meta.confirmBeforeLeave) meta.confirmBeforeLeave = true
      // await router.push('/user/login')
      // // 断开websocket连接
      // resetStore()
      // if (meta.confirmBeforeLeave) delete meta.confirmBeforeLeave
    },
  },
  persist: piniaPersistConfig("geeker-user")
});
