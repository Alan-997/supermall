<template>
  <div class="detail-images">
    <div class="image-describe">
      <div class="start"></div>
      <div class="desc">{{images.desc}}</div>
      <div class="end"></div>
      <div class="key">{{images.key}}</div>
    </div>
    <div v-for="item in images.imageList" class="imageList">
      <img :src="item" alt="" @load="detailImageLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailImages',
  props: {
    images: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    detailImageLoad () {
      this.$emit('detailImageLoad')
    }
  }
}
</script>

<style>
  .image-describe {
    padding: 10px 8px;
  }

  .start,.end {
    position: relative;
    width: 100px;
    height: 1px;
    background-color: #a3a3a5;
  }

  .start::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 0;
    width: 8px;
    height: 8px;
    background-color: #666;
  }

  .end {
    float: right;
  }

  .end::after {
    content: "";
    position: absolute;
    top: -4px;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #666;
  }

  .desc {
    padding: 20px 0;
    font-size: 14px;
  }

  .key {
    color: #222;
  }

  .imageList img {
    width: 100% ;
  }
</style>