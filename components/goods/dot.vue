<template>
  <div class="dot" v-if="dotNum>0">
    <div class="content">
      {{dotNum}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dot',
    props: ['obj'],
    computed: {
      dotNum() {
        let dotNum = 0
        this.obj.forEach((item, index) => {
          if (item.count > 0) {
            dotNum += item.count
          }
        })
        return dotNum
      }
    }
  }
</script>

<style scoped lang="scss">
  .dot {
    position: absolute;
    top: 0rpx;
    right: 16rpx;
    width: 32rpx;
    height: 32rpx;
    background: rgba(245, 34, 45, 1);
    border-radius: 50%;
    z-index: 101;

    .content {
      font-size: 23rpx;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
    }
  }
</style>
