<template>
    <div class="popup">
      <van-popup
        :show="show"
        :z-index="index"
        position="bottom"
        @close="onClose"
		close-on-click-overlay
      >
        <slot></slot>
      </van-popup>
    </div>
</template>

<script>
    export default {
      name: 'popup',
      data() {
        return {
          show: false,
          index: 9999
        }
      },
      methods: {
        onClose() {
          this.show = false
        },
        showPopup() {
          this.show = true
        }
      }
    }
</script>

<style scoped>

</style>
