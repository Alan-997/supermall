// 专门用来处理home里的数据
import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoodsdata(type, page) {
  return request({
    url: '/home/data',
    // params 参数个数
    params: {
      type,
      page
    }
  })
}
