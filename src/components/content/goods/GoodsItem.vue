<template>
  <div class="goods-item">
    <img :src="goodsitem.show.img" alt="">
    <div class="goods-info">
      <p class="describe">{{goodsitem.title}}</p>
      <span class="price">￥{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goodsitem: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
  .goods-item {
    position: relative;
    padding-bottom: 40px;
    font-size: 12px;
    text-align: center;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .goods-info .describe {
    /* 文本溢出隐藏 */
    overflow: hidden;
    /* 溢出时显示省略标记...；需与overflow:hidden;一起使用 */
    text-overflow: ellipsis;
    /* 不换行显示 */
    white-space:nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
  }

  .goods-info .collect {
    position: relative;
    padding-left: 15px;
    margin-left: 5px;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 14px;
    height: 14px;
    background: url('~assets/images/common/collect.svg') 0 0/14px 14px;
  }
</style>