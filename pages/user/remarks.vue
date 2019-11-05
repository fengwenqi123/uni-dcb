<template>
  <div class="container">
    <div class="content">
      <textarea placeholder="请填写忌口等备注信息" v-model="textarea" auto-focus/>
      <div class="marks">
        <div class="item" v-for="(item,index) in marks" :key="index" @click="onCheck(item)">
          {{item}}
        </div>
      </div>
    </div>
    <div class="btn">
      <button class="check" @click="submit">确 定</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'remarks',
    data() {
      return {
        marks: [
          '不要葱',
          '不要姜',
          '不辣',
          '微辣',
          '重辣',
          '多点葱',
          '多点姜 '
        ],
        textarea: ''
      }
    },
    methods: {
      onCheck(name) {
        this.textarea += `${name} `
      },
      submit() {
        this.$store.commit('_getRemarks', this.textarea)
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    .content {
      background: #fff;
      padding: 24rpx 32rpx;

      textarea {
        height: 149rpx;
        width: calc(100% - 48rpx);
        padding: 16rpx 24rpx;
        background: rgba(245, 245, 245, 1);
        border-radius: 4rpx;
        font-size: 28rpx;
        font-weight: 400;
      }

      .marks {
        margin-top: 28rpx;
        display: flex;
        flex-wrap: wrap;

        .item {
          margin-top: 16rpx;
          margin-right: 20rpx;
          padding: 10rpx 30rpx;
          height: 25rpx;
          background: rgba(245, 245, 245, 1);
          border-radius: 5rpx;
          font-size: 26rpx;
          line-height: 25rpx;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }

    .btn {
      margin-top: 24rpx;

      .check {
        width: 686rpx;
        height: 94rpx;
        background: rgba(16, 142, 233, 1);
        border-radius: 4rpx;
        margin: 0 auto;
        font-size: 36rpx;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
</style>
