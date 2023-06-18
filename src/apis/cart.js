// 封装购物车相关接口
import request from '@/utils/http'

// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return request({
    url: '/member/cart', // 请求的URL
    method: 'POST', // 请求方法为POST
    data: { // 请求的数据对象
      skuId, // 商品ID
      count // 数量
    }
  })
}

// 获取最新的购物车列表
export const findNewCartListAPI = () => {
  return request({
    url: '/member/cart' // 请求的URL
  })
}

// 删除购物车
export const delCartAPI = (ids) => {
  return request({
    url: '/member/cart', // 请求的URL
    method: 'DELETE', // 请求方法为DELETE
    data: { // 请求的数据对象
      ids // 要删除的购物车项ID
    }
  })
}

// 合并购物车
export const mergeCartAPI = (data) => {
  return request({
    url: '/member/cart/merge', // 请求的URL
    method: 'POST', // 请求方法为POST
    data // 请求的数据对象
  })
}
