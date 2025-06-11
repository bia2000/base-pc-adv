export default{
  listProductClassify: {
    title: '获取产品分类列表',
    url: '/de-service/portal/productClassify/listProductClassify',
    method:'get',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  listBanner: {
    title: '获取轮播图列表',
    url: '/de-service/portal/banner/listBanner',
    method:'get'
  },
  listAreaProductPage: {
    title: '获取地区产品分页列表',
    url: '/de-service/portal/areaProduct/listAreaProductPage',
    method:'get'
  },
}
