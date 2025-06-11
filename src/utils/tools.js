/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}
// 导出数据流为文件
export const exportFileFromBlob = res => {
  const fileName = decodeURIComponent(
    res.headers['content-disposition'].replace(/^(.*?)=/, '')
  )
  const blob = new Blob([res.data], { type: res.headers['content-type'] })
  const downloadLinkTab = document.createElement('a')
  const href = URL.createObjectURL(blob)
  downloadLinkTab.href = href
  downloadLinkTab.download = fileName
  document.body.appendChild(downloadLinkTab)
  downloadLinkTab.click()
  document.body.removeChild(downloadLinkTab)
  window.URL.revokeObjectURL(href)
}
// 地址转base64位数据方法
export const urlToBase64 = url => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    // 允许跨域操作
    img.setAttribute('crossOrigin', 'anonymous')
    img.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight
      // 将图片插入画布并开始绘制
      canvas.getContext('2d').drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => {
      reject(new Error('图片流异常'))
    }
  })
}
// base64转文件对象方法
export const base64ToFile = (base64Data, name) => {
  const arr = base64Data.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], name, { type: mime })
}
