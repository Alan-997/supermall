<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-feature></home-feature>
    <tab-control :titles="['流行', '新款', '精品']" 
                  class="tab-control" 
                  @tabClick="tabClick"/>
    <goods :goods="showGoods"/>


    <ul>
      <li>垫高的内容1</li>
      <li>垫高的内容2</li>
      <li>垫高的内容3</li>
      <li>垫高的内容4</li>
      <li>垫高的内容5</li>
      <li>垫高的内容6</li>
      <li>垫高的内容7</li>
      <li>垫高的内容8</li>
      <li>垫高的内容9</li>
      <li>垫高的内容10</li>
    </ul>
  </div>
</template>

<script>
// 导入公共组件部分
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import Goods from 'components/content/goods/Goods'

// 导入子组件部分
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'

// 导入方法部分
// 当一个组件有很多请求方法时，可以以这样的方式导入
import {
  getHomeMultidata, 
  getHomeGoodsdata
} from 'network/homerequest'

export default {
  name: 'Home',
  data () {
    return {
      // result: null
      banners: [],
      recommends: [],
      // goods是用来存储商品列表中的数据的
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop'
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    TabControl,
    Goods,

    HomeSwiper,
    HomeRecommend,
    HomeFeature
  },
  // 当组件创建完成后执行的
  // 在created中只需要存在主要业务，至于业务逻辑就将他封装到methods中去吧，因为created是一个周期函数，不要太过于臃肿，至于是什么原因我也不知道，但是做就完了
  created () {
    this.getHomeMultidata()

    this.getHomeGoodsdata('pop')
    this.getHomeGoodsdata('new')
    this.getHomeGoodsdata('sell')
  },
  methods: {
    /* 
    * 事件相关的
    */
    tabClick (index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break
      }
    },

    /* 
    * 网络请求相关的
    */
    getHomeMultidata() {
      getHomeMultidata().then(
      res => {
        // console.log(res);
        // 将拿到的数据结果（result）存储在当前的data数据中
        // 当一个函数执行后会有一个垃圾回收的操作，如果不将得到的数据结果存储起来，将无法使用
        // this.result = res;
        // 由于我们home上用到的数据只是res里面的一部分，所以可以将所需的数据单独存储起来
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        }
      )
    },
    getHomeGoodsdata(type) {
      // page是跟着用户的上拉页面加载而变化的，所以在传入的时候，我们需要将不同page的数据请求过来
      const page = this.goods[type].page + 1
      getHomeGoodsdata(type, page).then(res => {
        // console.log(res);
        // 将请求到的数据存储在goods中，因为当res函数执行结束后，就会有一个垃圾回收，请求到的数据也将无法连接起来，this.goods[type].list是一个数组，res.data.list也是一个数组，将两个数组中的数据通过push方法推入存储
        this.goods[type].list.push(...res.data.list)
        // 这里是为了得到当前值页面的数据
        this.goods[type].page += 1
      })
    }
  }
}

</script>

<style>
  #home {
    padding-top: 44px;
  }

  .nav-bar {
    /* 这里是base.css中定义的 */
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>