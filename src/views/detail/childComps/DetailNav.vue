<template>
  <div class="detail-nav">
    <nav-bar>
      <div slot="left" class="back-btn" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titleInfos" 
            class="title-item" 
            :class="{active: index === currentIndex}" 
            @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNav',
  components: {
    NavBar
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    titleInfos: {
      type: Array,
      default () {
        return ['商品', '参数', '评论', '推荐']
      }
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
    },
    backClick () {
      this.$router.back()
    }
  }
}
</script>

<style>
  .back-btn img{
    margin-top: 12px;
  }

  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
</style>