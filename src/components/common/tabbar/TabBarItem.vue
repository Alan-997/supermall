<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 这里的两张图片插槽，需要判断什么时候显示active -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- 当处于active状态时，文字的颜色也会发生变化 -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  // 动态传入path
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data () {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive () {
      // /home  ->  item1(home) = true
      // /home  ->  item1(category) = false
      // /home  ->  item1(cart) = false
      // /home  ->  item1(profile) = false
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    height: 49px;
    margin-top: 3px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
</style>