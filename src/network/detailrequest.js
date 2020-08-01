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

export class Images {
  constructor (detailInfo) {
    this.desc = detailInfo.desc;
    this.key = detailInfo.detailImage[0].key;
    this.imageList = detailInfo.detailImage[0].list
  }
}


// export class GoodsParams {
//   constructor(info, rule) {
//     // 注: images可能没有值(某些商品有值, 某些没有值)
//     this.image = info.images ? info.images[0] : '';
//     this.infos = info.set;
//     this.tables = rule.tables;
//   }
// }

export class GoodsParams {
  constructor (itemParams) {
    this.image = itemParams.info.images ? itemParams.info.images[0] : '';
    this.infos = itemParams.info.set;
    this.tables = itemParams.rule.tables;
  }
}
