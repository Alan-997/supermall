<template>
  <div class="back-top">
    <img src="~assets/images/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 5px;
    bottom: 70px;
    z-index: 9;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>