<template>
  <div id="details">
    <detail-nav class="detail-nav"></detail-nav>
    <scroll class="wrapper">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
    </scroll>
  </div>
</template>

<script>
import DetailNav from './childComps/DetailNav'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import Scroll from 'components/content/scroll/Scroll'
import {getDetail, Goods, Shop} from 'network/detailrequest'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    }
  },
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,

    Scroll
  },
  created () {
    // 保存传入的iid
    this.iid = this.$route.params.iid;

    // 根据iid请求相应的数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages

      // 获取商品信息
      this.goods = new Goods (data.itemInfo, data.columns, data.shopInfo.services)

      // 获取商家基本信息
      this.shop = new Shop (data.shopInfo)
    })
  }
}
</script>

<style>
  #details {
    position: relative;
    z-index: 9;

    height: 100vh;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 9;

    background-color: #fff;
  }
  .wrapper {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>