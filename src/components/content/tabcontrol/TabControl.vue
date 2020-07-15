<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
      class="item" 
      :class="{active: index === currentIndex}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      // 向父组件传递点击事件
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;

    height: 40px;
    line-height: 40px;
    text-align: center;

    background-color: #fff;
  }

  .tab-control .item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    padding: 3px 5px;
    border-bottom: 2px solid var(--color-tint);
  }
</style>