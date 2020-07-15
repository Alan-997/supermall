<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
  #tab-bar {
    /* 开启flex布局 */
    display: flex;

    background-color: #f6f6f6;

    /* 定位到底部 */
    position: fixed;
    bottom: 0;
    /* left right的设置是保证tabbar宽度与屏幕同宽 */
    left: 0;
    right: 0;

    box-shadow: 0 -2px 1px  rgba(100, 100, 100, 0.1);
  }

</style>