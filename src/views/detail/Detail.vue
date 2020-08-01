<template>
  <div id="details">
    <detail-nav class="detail-nav"></detail-nav>
    <scroll class="wrapper"
            ref="scroll"
            :probeType="3" 
            @scroll="detailScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-images :images="images" @detailImageLoad="detailImageLoad"/>
      <detail-goods-params :goodsParams="goodsParams" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar />
  </div>
</template>

<script>
import DetailNav from './childComps/DetailNav'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailImages from './childComps/DetailImages'
import DetailBottomBar from './childComps/DetailBottomBar'
import DetailGoodsParams from './childComps/DetailGoodsParams'

import Scroll from 'components/content/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'
import {getDetail, Goods, Shop, Images, GoodsParams} from 'network/detailrequest'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      images: {},
      goodsParams: {},
      isShowBackTop: false,
      detailRefresh: null
    }
  },
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImages,
    DetailBottomBar,
    DetailGoodsParams,

    Scroll,
    BackTop
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

      // 获取穿着效果图片信息
      this.images = new Images (data.detailInfo)

      // 获取商品的参数信息
      this.goodsParams = new GoodsParams (data.itemParams)
    })
  },
  methods: {
     // 防抖函数debounce()
    debounce (func, delay) {
      let timer = null;
      return (...args) => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay)
      }
    },
    backClick () {
      this.$refs.scroll.scrollTo(0,0)
    },
    detailScroll (porsition) {
      this.isShowBackTop = (-porsition.y) > 1000
    },
    detailImageLoad () {
      // 这里的防抖功能没有做成功，还不知道是为什么
      this.detailRefresh = this.debounce(this.$refs.scroll.refresh,100)
      this.detailRefresh()
    }
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