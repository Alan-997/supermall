<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="green">
      <img slot="item-icon" src="~assets/images/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/images/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/images/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/images/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart"  activeColor="orange">
      <img slot="item-icon" src="~assets/images/tabbar/cart.svg" alt="">
      <img slot="item-icon-active" src="~assets/images/tabbar/cart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deepPink">
      <img slot="item-icon" src="~assets/images/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/images/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>

</style>