
const Bus ={
  // 动态获取图片
  getAssetsFile(url) {
    return new URL(`../assets/img/${url}`, import.meta.url).href
  },
  getRequestFile(url) {
    return 'http://de.rohest.cn/data'+url
  },
  getDict(type){
    if(type)
     return new Promise(resolve=>{
      Requests.getDict({ dictionaryType: type }).then(res=>{
        if(res.retCode==='000'){
          let data = res.result.map(item=>{
            return {[item.code]:item.value}
          })
          resolve(...data)
        }
      })
    }) 
  },
}
window.Bus = Bus
export default Bus
