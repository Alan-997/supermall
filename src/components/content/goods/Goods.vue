<template>
  <div class="goods">
    <goods-item v-for="item in goods" :goodsitem="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  name: 'Goods',
  components: {
    GoodsItem
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>