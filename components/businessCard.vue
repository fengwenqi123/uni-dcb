<template>
  <div class="components">
    <div class="goodsInfo">
      <div class="imgs">
        <image
          v-if="goodsInfo.map.normalList.length>0"
          class="images"
          :mode='mode'
          :src="goodsInfo.map.normalList[0].image + '?type=small'"
        ></image>
      </div>
      <div class="info">
        <div class="user">
          <p>下单用户：<span>{{goodsInfo.userName}}</span></p>
        </div>
        <div class="times">
          <p>就餐时间：<span>{{goodsInfo.dinnerTimeString}}</span></p>
        </div>
        <div class="count">
          <p>就餐人数：<span>{{goodsInfo.dinnerNumber}}</span></p>
        </div>
        <div class="goodsNum">
          <p>{{goodsInfo.map.normalList.length}}件商品</p>
        </div>
      </div>
      <div class="type_price">
        <div
          class="tag active1"
          v-if="goodsInfo.status===1"
        >待确认</div>
        <div
          class="tag active2"
          v-if="goodsInfo.status===2"
        >已确认</div>
        <div
          class="tag active3"
          v-if="goodsInfo.status===3"
        >已就餐</div>
        <div
          class="tag active4"
          v-if="goodsInfo.status===5"
        >已取消</div>
        <div
          class="tag active5"
          v-if="goodsInfo.status===4"
        >已结束</div>
        <p class="price">¥{{goodsInfo.actualAmount}}</p>
      </div>
    </div>
    <div
      class="check"
      v-if="goodsInfo.status===1||goodsInfo.status===3||goodsInfo.status===5"
    >
      审核订单
    </div>
  </div>
</template>

<script>
export default {
  props: ['goodsInfo']
}
</script>

<style scoped lang="scss">
.components {
  padding: 36rpx 24rpx 0 24rpx;
  background: #fff;
  border-radius: 8rpx;
  margin-top: 16rpx;

  .goodsInfo {
    display: flex;
    position: relative;
    align-items: flex-start;
    border-bottom: 1rpx solid #eeeeee;
    padding-bottom: 20rpx;

    .imgs {
      width: 76rpx;

      .images {
        width: 76rpx;
        height: 76rpx;
      }
    }

    .info {
      margin: 0 20rpx;
      width: 464rpx;

      .times,
      .user {
        margin-bottom: 14rpx;

        p {
          height: 42rpx;
          font-size: 30rpx;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 42rpx;
        }
      }
      .times {
        p {
          height: 42rpx;
          font-size: 30rpx;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 42rpx;
          span {
            font-size: 26rpx;
          }
        }
      }

      .count,
      .goodsNum,
      .changes {
        margin-bottom: 14rpx;

        p {
          height: 37rpx;
          font-size: 26rpx;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 37rpx;
        }
      }
    }

    .type_price {
      .tag {
        width: 85rpx;
        height: 44rpx;
        border-radius: 10rpx;
        text-align: center;
        line-height: 44rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }

      .active1 {
        background: rgba(250, 140, 22, 1);
      }

      .active2 {
        background: rgba(56, 158, 13, 1);
      }

      .active3 {
        background: rgba(51, 153, 255, 1);
      }

      .active4 {
        background: rgba(117, 117, 117, 1);
      }

      .active5 {
        background: rgba(235, 47, 150, 1);
      }

      .price {
        margin-top: 70rpx;
        height: 37rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 37rpx;
        position: absolute;
        bottom: 34rpx;
        right: 0rpx;
      }
    }
  }

  .check {
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: rgba(74, 144, 226, 1);
  }
}
</style>
