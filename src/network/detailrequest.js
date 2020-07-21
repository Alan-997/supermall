import {request} from './request'

export function getDetail (iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.desc = itemInfo.desc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services
  }
}

export class Shop {
  constructor (shopInfo) {
    this.shopLogo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.cSells = shopInfo.cSells;
    this.cGoods = shopInfo.cGoods;
    this.cFans = shopInfo.cFans;
    this.allGoodsUrl = shopInfo.allGoodsUrl;
    this.score = shopInfo.score
  }
}
