<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.price}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discountDesc}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span v-for="index in goods.services.length-1" class="info-services-item">
        <img :src="goods.services[index - 1].icon" alt="">
        <span>{{goods.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
  .base-info {
    margin-top: 12px;
    padding: 0 8px;
  }
  
  .info-title {
    text-align: left;
    color: #222;
  }

  .info-price {
    margin-top: 10px;
    
  }

  .info-price span {
    padding-right: 10px;
  }

  .info-price .new-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .old-price {
    font-size: 14px;
    text-decoration: line-through;
  }

  .info-price .discount {
    position: relative;
    top: -7px;
    font-size: 12px;
    padding: 2px 8px;
    color: #fff;
    border-radius: 8px;
    background-color: #f13e3a;
  }

  .info-other {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    color: #999;
    font-size: 14px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(224, 224, 224);
  }

  .info-services {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #222;
    height: 60px;
    line-height: 60px;
  }

  .info-services-item img {
    position: relative;
    top: 2px; 
    width: 14px;
    height: 14px;
  }

  .info-services-item span {
    padding-left: 4px;
  }
</style>