<template>
  <div class="shop-info">
    <div class="shop-name">
      <img :src="shop.shopLogo" alt="">
      <span class="name">{{shop.name}}</span>
    </div>
    <div class="sells-info">
      <div class="sells-info-item sells-info-left" >
        <div class="sells">
          <p class="count">{{shop.cSells | sellCountFilter}}</p>
          <p class="text">总销量</p>
        </div>
        <div class="goods">
          <p class="count">{{shop.cGoods}}</p>
          <p class="text">全部宝贝</p>
        </div>
      </div>
      <div class="sells-info-item sells-info-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">
        <a :href="shop.allGoodsUrl">进店逛逛</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter: (value) => {
      if (value < 10000) return value;
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>
  .shop-info {
    border-top: 5px solid #f2f5f8;
    border-bottom: 5px solid #f2f5f8;
    padding: 25px 8px;
  }

  .shop-name img {
    width: 45px;
    height: 45px;
    /* border-radius: 100%; */
  }

  .shop-name .name {
    position: relative;
    top: -15px;
    left: 15px;
    color: var(--color-text);
  }

  .sells-info {
    display: flex;
    align-items: center;
    padding: 10px 25px ;
    text-align: center;
  }

  .sells-info-item {
    flex: 1;
  }

  .sells-info-left {
    display: flex;
    justify-content: space-evenly;
    color: #222;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  .sells {
    margin-right: 10px;
  }

  .count {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .text {
    font-size: 12px;
  }

  .sells-info-right {
    font-size: 13px;
    color: #333;
  }

  .sells-info-right table {
    width: 120px;
    margin-left: 30px;
  }

  .sells-info-right table td {
    padding: 5px 0;
  }

  .sells-info-right .score {
    color: #5ea732;
  }

  .sells-info-right .score-better {
    color: #f13e3a;
  }

  .sells-info-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .sells-info-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>