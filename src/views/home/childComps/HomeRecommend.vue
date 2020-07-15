<template>
  <div class="recommend"> 
    <div v-for="item in recommends" class="item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      defalut () {
        return []
      }
    }
  }
}
</script>

<style>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;
    width: 100%;
    padding: 15px 0 30px;
    border-bottom: 10px solid #ccc;
  }

  .recommend .item {
    flex: 1;
  }

  .recommend .item img {
    width: 72px;
    height: 72px;
  }
</style>