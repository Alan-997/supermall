<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div class="service">
        <i class="icon"></i>
        <div class="text">客服</div>
      </div>
      <div class="store">
        <i class="icon"></i>
        <div class="text">店铺</div>
      </div>
      <div class="collection">
        <i class="icon"></i>
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DetailBottomBar'
}
</script>

<style>
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 58px;
    font-size: 14px;
    background-color: #fff;

    display: flex;
    align-items: center;
  }

  .icon {
    position: relative;
    left: 4px;

    display: block;
    width: 22px;
    height: 22px;
    margin-bottom: 5px;
    background: url('~assets/images/detail/detail_bottom.png') no-repeat 0 0/100%;
  }

  .service .icon {
    background-position: 0 -53px;
  }

  .store .icon {
    background-position: 0 -100px;
  }

  .collection .icon {
    background-position: 0 0;
  }

  .bar-item {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
  }

  .bar-right {
    text-align: center;
    color: #fff;
    line-height: 38px;
  }
  
  .bar-right div {
    flex: 1;
    border-radius: 21px;
  }

  .cart {
    background-color: #f2140c;
    margin-right: 5px;
  }
  .buy {
    background-color: #ffba0d;
  }
</style>