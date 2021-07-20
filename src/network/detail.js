import {request} from "./requests";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    if (itemInfo) {
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.oldPrice = itemInfo.oldPrice;
      this.realPrice = itemInfo.lowNowPrice;
      this.discount = itemInfo.discountDesc;
      this.discountColor = itemInfo.discountBgColor;
    }
    if (columns) this.columns = columns;
    if (services) this.services = services;
  }
}

export class Shop {
  constructor(shopInfo) {
    if (shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods;
    }
  }
}

export class GoodsParam {
  constructor(info, rule) {
    if (info) {
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
    }
    if (rule) this.sizes = rule.tables;
  }
}
