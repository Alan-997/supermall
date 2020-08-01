<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精品']"  
                    @tabClick="tabClick"
                    ref="tabcontrol1" 
                    class="tab-control" v-show="isShowTabControl"/>
    <scroll class="wrapper" 
            ref="scroll" 
            :probeType="3" 
            @scroll="contentScroll"
            :pullUpLoad="true" 
            @pullingUp="loadMore">
      <home-swiper :banners="banners" 
                    @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control :titles="['流行', '新款', '精品']"  
                    @tabClick="tabClick"
                    ref="tabcontrol2" />
      <goods :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
// 导入公共组件部分
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import Goods from 'components/content/goods/Goods'
import Scroll from 'components/content/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

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
      currentType: 'pop',
      isShowBackTop: false,
      tabControlOffsetTop: 0,
      isShowTabControl: false,
      siteY: 0,
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
    Scroll,
    BackTop,

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
  activated () {
    this.$refs.scroll.scrollTo(0, this.siteY, 1)
    this.$refs.scroll.refresh()
    // console.log('activated');
  },
  deactivated () {
    this.siteY = this.$refs.scroll.scroll.y
    // console.log(this.siteY);
  },
  mounted () {
    let refresh = this.debounce(this.$refs.scroll.refresh, 30)
    // 接收事件总线中发射出来的事件
    this.$bus.$on('itemImgLoad', () => {
      refresh();
    }); 
  },
  methods: {
    /* 
    * 事件相关的
    */
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
    // tab栏切换事件
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
      // 让两个tabControl的点击保持一致
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    // 返回顶部事件
    backClick () {
      // 通过ref设置scroll，得到scroll组件，然后再访问定义的scroll，再调用scrollTo()方法
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      // 这里的简化是在scroll组件中封装了一层scrollTo方法，从而可以直接通过this.$refs.scroll调用其中的方法
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 滚动事件的位置实时监听
    contentScroll (porsition) {
      // 1.backTop返回顶部的显示和隐藏
      // console.log(porsition);
      this.isShowBackTop = (-porsition.y) > 1000

      // 2. tabcontrol的吸顶效果的判断
      this.isShowTabControl = this.tabControlOffsetTop < (-porsition.y)
      
    },
    // 上拉加载更多
    loadMore () {
      // console.log('上拉加载更多');
      this.getHomeGoodsdata(this.currentType)
    },
    // swiperImgLoad()是swiper的图片加载完后所做的事情
    swiperImgLoad () {
      this.tabControlOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
      // console.log(this.$refs.tabcontrol.$el.offsetTop);
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

        // 当上拉加载数据完成以后，需要调用一个方法（finishPullUp()）来告诉better-scroll数据加载完毕，才能继续执行下一次加载
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}

</script>

<style scoped>
  #home {
    /* height:100vh;是指高为视口的100% */
    height: 100vh;
    /* padding-top: 44px; */
    position: relative;
  }

  .nav-bar {
    /* 这里是base.css中定义的 */
    background-color: var(--color-tint);
    color: #fff;
    /* 这里的fixed定位是用于浏览器默认滚动的 */
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0; */
    position: relative;
    z-index: 9;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }

  .wrapper {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* 这里有两种方法设置wrapper的高度 */
  /* .wrapper {
    height: calc(100% - 49px);
    overflow: hidden;
  } */
</style>