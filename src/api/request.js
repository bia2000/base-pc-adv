import axios from 'axios'
import Qs from 'qs'
import { useUserStore } from '@/stores/modules/user'
// import { rv } from '@/config'
class Http {
  config() {
    const userStore = useUserStore()
    // 基础配置
    const config = {
      timeout: 10000,
      method: 'post',
      headers: {
        // rv: import.meta.env.MODE === 'development' ? rv : undefined,
        accessToken: userStore.token, // token
      }
    }
    return config
  }

  interceptors(instance) {
    // 请求拦截
    instance.interceptors.request.use(
      request => {
        const userStore = useUserStore()
        // 配置请求参数
        let requestData = request.parameters || {}
        // 上传文件时，对象处理
        if (request.headers['Content-Type'] === 'multipart/form-data') {
          requestData = requestData.formData
        }
        // 退出后删除token，规避重复logout
        // if (request.url === '/web/shc/auth/logout') userStore.token = ''

        if (
          request.headers['Content-Type'] ===
          'application/x-www-form-urlencoded'
        ) {
          requestData = Qs.stringify(requestData, {
            allowDots: true,
            arrayFormat: 'repeat'
          })
          if (request.method === 'get') {
            request.url = `${request.url}?${requestData}`
          } else request.data = { data: requestData }
        } else {
          if (request.method === 'get') request.params = requestData
          else if (request.headers['Content-Type'] === 'multipart/form-data') {
            request.data = requestData // 上传文件格式
          } else {
            request.data = { data: requestData }
          }
        }

        delete request.parameters
        return request
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      async res => {
        const userStore = useUserStore()
        if (res.request.responseType === 'blob') {
          const blob = new Blob([res.data], {
            type: res.headers['content-type']
          })
          try {
            const _res = JSON.parse(await blob.text())
            if (_res.code !== undefined) res.data = _res
          } catch (error) {
            console.log(error)
          }
        }
        // 根据返回码执行响应逻辑
        // 登录已失效则退出
        if (
          res.data.code === 10403 &&
          res.config.url !== '/web/shc/security/auth/logout' &&
          userStore.token
        ) {
          userStore.Logout()
        }
        return res.request.responseType === 'blob' &&
          res.data.code === undefined
          ? res
          : res.data
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  request(options) {
    // 实例化
    const instance = axios.create()
    // 合并配置
    const config = this.config()
    options = {
      ...config,
      ...options,
      headers: { ...config.headers, ...options.headers },
      baseURL:'/api'
    }

    // 拦截器
    this.interceptors(instance)
    return instance(options)
  }
}

export default Http
