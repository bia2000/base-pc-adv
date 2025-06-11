import Http from './request'
import { message } from 'ant-design-vue'
import { exportFileFromBlob } from '_u/tools'

const modules = import.meta.glob('./*/*.js', {
  eager: true
})
console.log(import.meta.env);

const apiList = {}
for (const path in modules) {
  const apiObj = modules[path].default
  const a = Object.keys(apiObj).length
  const b = Object.keys(apiList).length
  Object.assign(apiList, apiObj)
  const c = Object.keys(apiList).length
  const urlList = Object.values(apiList).map(item => item.url)
  const setUrlList = new Set(urlList)
  if (c !== a + b) throw `${path}中存在重复的api命名`
  if (urlList.length !== setUrlList.size) throw `${path}中存在重复的api地址`
}

const http = new Http()
// 请求等待列队
const queue = {}
// 请求对象
const Requests = {}
for (const key in apiList) {
  Requests[key] = async (params = {}) => {
    const { apiLoading, apiReject, ...parameters } = params
    let res = null
    const url = apiList[key].url

    // 请求等待
    if (apiLoading) {
      queue[url] = true
      const awaitLoading = { id: url, text: '加载中' }
      if (typeof apiLoading === 'string') awaitLoading.text = apiLoading
      else Object.assign(awaitLoading, apiLoading)
      Bus.$emit('add-app-loading', awaitLoading)
    }
    try {
      res = await http.request({ ...apiList[key], parameters })
    } catch (err) {
      const errObj = {
        'Network Error': '网络不佳',
        'Request failed with status code 404': '服务器开小差了'
      }
      err.message = errObj[err.message] || err.message
      if (/timeout of/.test(err.message)) err.message = '服务器繁忙'
      res = err
    } finally {
      // 请求等待结束
      if (queue[url]) {
        Bus.$emit('remove-app-loading', url)
        delete queue[url]
      }
    }
    // blob成功返回data的情况下，下载文件
    if (res.request && res.request.responseType === 'blob' && res.data) {
      exportFileFromBlob(res)
      return { code: 0 }
    }
    // 请求错误反馈
    if (
      res.retCode !== '000' &&
      (!apiReject || (typeof apiReject === 'number' && res.code !== apiReject))
    ) {
      message.error(res.message || res.msg)
    }
    if (res.retCode === '000') console.log(`${apiList[key].title}成功`, res)
    else console.error(`${apiList[key].title}失败`, res, parameters)
    return res
  }
}

window.Requests = Requests

export default Requests






