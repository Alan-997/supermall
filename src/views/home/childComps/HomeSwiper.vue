<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'

  export default {
    name: 'HomeSwiper',
    data () {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      // 这里的imgLoad加载的次数是图片的张数，每一张图片都会进行一次加载，但是我们这里需要的只是图片的高度，所以只希望加载一次得到图片的高度即可，从而来增加性能
      imgLoad () {
        if(!this.isLoad) {
          this.$emit('swiperImgLoad');
          this.isLoad = true
        }
      }
    }
  }
</script>

<style>

</style>