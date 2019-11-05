<template>
  <div class="order-info">
    <div class="title">
      订单信息
    </div>
    <ul>
      <li>
        <div class="item">
          <div class="label">订单号</div>
          <div class="con"></div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">就餐时间</div>
          <div class="con">2019-03-20 19:00</div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">就餐人数</div>
          <div class="con">3 人</div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">订单备注</div>
          <div class="con">不吃葱，微辣</div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">下单时间</div>
          <div class="con">2019-03-19 19:00</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: 'orderInfo'
    }
</script>

<style scoped lang="scss">
  .order-info{
    background:rgba(255,255,255,1);
    border-radius:8rpx;
    padding: 18rpx 24rpx;
    margin-top: 16rpx;
    .title{
      font-size:26rpx;
      font-weight:600;
      color:rgba(51,51,51,1);
    }
    ul{
      li{
        .item{
          display: flex;
          height: 62rpx;
          align-items: center;
          justify-content: space-between;
          .label{
            font-size:26rpx;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
          .con{
            font-size:26rpx;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
  }
</style>
