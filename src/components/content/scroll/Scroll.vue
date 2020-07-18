<template>
  <div class="wrappeer" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    // pullUpLoad作用于做上拉加载功能，默认false，只有当值为true时，才会开启上拉加载功能
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    // 1.创建BScroll，存放在data中
    // 在开发中不建议使用这样的方式获得element，因为在组件的互用时，其他组件中可能也会存在相同的element，到时候得到的不能确定是哪一个element，所以一般情况下是使用ref来获取
    // let wrapper = document.querySelector('.wrapper')
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 在这里，probeType和pullUpLoad都不要将值写死，因为使用界面不同，所需要的值肯定是不一样的，都通过props传递
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 2.添加事件
    // 2.1. 添加滚动事件，实时监听滚动位置
    this.scroll.on('scroll', (porsition) => {
      // console.log(porsition);
      this.$emit('scroll', porsition) 
    });

    // 2.2. 添加上拉加载事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    // 以下的方法都要判断一下this.scroll && ，只有当this.scroll存在的时候才去执行其他，减少出错率
    // scrollTo()方法用于滚动到什么位置
    scrollTo (x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // refresh()函数是重新计算better-scroll，当DOM结构发生变化的时候一定要调用，确保滚动正常
    refresh () {
      this.scroll && this.scroll.refresh()
      // console.log('-----'); // 判断执行次数
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    }
  }
}
</script>

<style>

</style>