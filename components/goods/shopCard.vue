<template>
  <div class="content">
    <div
      class="overlay"
      catchtouchmove="ture"
      v-if="overlay"
      @click="overlay=false"
    ></div>
    <div
      class="popup"
      catchtouchmove="ture"
    >
      <div class="title">
        <span class="tit">
          *不包含自定义菜品价格
        </span>
      </div>
      <div
        class="main"
        :class="overlay?'active':''"
      >
        <div class="header">
          <div class="select-food">
            <p>已选商品
              <span>（共{{selectFoods.length}}件）</span>
            </p>
          </div>
          <div
            class="clear-food"
            @click="clearFood"
          >
            清空
          </div>
        </div>
        <div class="div">
        </div>
        <div class="content">
          <scroll-view
            class="scroll-view_H"
            scroll-y
          >
            <ul class="card-ul">
              <li
                class="card-li"
                v-for="(food,index) in selectFoods"
                :key="index"
              >
                <div class="item">
                  <div class="name">{{food.name}}</div>
                  <div class="price">
                    <div
                      class="custom"
                      v-if="food.type===-1"
                    >自定义菜品</div>
                    <div
                      class="prices"
                      v-else
                    >
                      ¥{{food.price}}
                    </div>
                  </div>
                  <div class="select">
                    <div class="cartcontrol">
                      <div
                        class="cart-decrease"
                        v-if="food.count>0"
                        @click="food.count--"
                      ></div>
                      <div
                        class="cart-count"
                        v-if="food.count>0"
                      >{{food.count}}</div>
                      <div
                        class="cart-add"
                        @click="food.count++"
                      ></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </scroll-view>
        </div>
      </div>
    </div>
    <div class="shop-card">
      <div class="content">
        <div
          class="img"
          @click="showPopup"
        >
          <img
            :src="img"
            alt=""
          >
          <dot :obj="selectFoods"></dot>
        </div>
        <div
          class="mid"
          @click="showPopup"
        >
          <p>合计：
            <span>¥{{totalPrice}}</span>
          </p>
        </div>
        <div class="btn">
          <button
            class="check has"
            v-if="selectFoods.length>0"
            @click="check"
          >核对订单</button>
          <button
            class="check"
            v-else
          >核对订单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dot from '@/components/goods/dot'

export default {
  name: 'shopCard',
  data() {
    return {
      img: require('@/static/images/plate.png'),
      overlay: false,
      selectFoods: []
    }
  },
  components: {
    dot
  },
  computed: {
    goodsData() {
      return this.$store.state.goods.goodsData
    },
    totalPrice() {
      let total = 0
      let foodList = []
      this.goodsData.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count > 0) {
            total += food.price * food.count
            foodList.push(food)
          }
        })
      })
      this.selectFoods = foodList
      if (this.selectFoods.length === 0) {
        this.overlay = false
      }
      return total
    }
  },
  methods: {
    showPopup() {
      if (this.selectFoods.length > 0) {
        this.overlay = !this.overlay
      }
    },
    check() {
      this.$store.commit('_getSelectFoods', this.selectFoods)
      this.$store.commit('_getTotalPrice', this.totalPrice)
	  uni.navigateTo({
	  	url: '/pages/user/confirmOrder',
	  	animationType: 'pop-in',
	  	animationDuration: 300
	  });
    },
    clearFood() {
      this.goodsData.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count > 0) {
            food.count = 0
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  .overlay {
    position: fixed;
    top: 0rpx;
    bottom: 90rpx;
    width: 100%;
    background: #000;
    opacity: 0.4;
    z-index: 99;
  }

  .cartcontrol {
    display: flex;
    align-items: center;

    .cart-decrease {
      background: url("../../static/images/btn-minus.png") no-repeat;
      background-size: 100% 100%;
      width: 40rpx;
      height: 40rpx;
    }

    .cart-count {
      width: 50rpx;
      height: 40rpx;
      line-height: 40rpx;
      text-align: center;
      font-size: 30rpx;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }

    .cart-add {
      background: url("../../static/images/btn-add.png") no-repeat;
      background-size: 100% 100%;
      width: 40rpx;
      height: 40rpx;
    }
  }

  .shop-card {
    .content {
      margin-left: 30rpx;
      display: flex;

      .img {
        width: 150rpx;
        height: 100rpx;
        margin-top: -20rpx;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 101;
        }
      }

      .mid {
        width: 356rpx;
        padding-right: 30rpx;
        text-align: right;

        p {
          height: 90rpx;
          line-height: 90rpx;
          font-size: 30rpx;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);

          span {
            font-size: 40rpx;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.9);
            margin-left: 20rpx;
          }
        }
      }

      .btn {
        flex: 1;

        .check {
          background: #999999;
          border-radius: 0;
          font-size: 30rpx;
          font-weight: 500;
          height: 90rpx;
          line-height: 90rpx;
          color: rgba(255, 255, 255, 1);
        }

        .has {
          background: #3399ff;
        }
      }
    }
  }

  .popup {
    position: absolute;
    left: 0rpx;
    width: 100%;
    background: #fff;
    bottom: 90rpx;
    z-index: 100;

    .title {
      height: 72rpx;
      background: rgba(254, 252, 235, 1);

      .tit {
        display: block;
        height: 72rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(249, 106, 14, 1);
        line-height: 72rpx;
        text-align: right;
        padding-right: 30rpx;
      }
    }

    .main {
      min-height: 0rpx;
      overflow: hidden;
      max-height: 0rpx;
      transition: 0.2s;
    }

    .active {
      min-height: 0rpx;
      overflow: auto;
      max-height: 580rpx;
    }

    .header {
      display: flex;
      height: 80rpx;
      padding: 0 30rpx;

      .select-food {
        flex: 1;

        p {
          height: 80rpx;
          font-size: 30rpx;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 80rpx;

          span {
            height: 80rpx;
            font-size: 20rpx;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 80rpx;
          }
        }
      }

      .clear-food {
        flex: 1;
        text-align: right;
        height: 80rpx;
        font-size: 30rpx;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 80rpx;
      }
    }

    .content {
      .scroll-view_H {
        min-height: 0rpx;
        overflow-y: auto;
        max-height: 580rpx;
      }

      .card-ul {
        padding: 0 30rpx;

        .card-li {
          margin-top: 20rpx;

          .item {
            display: flex;
            height: 76rpx;
            align-items: center;

            .name {
              width: 290rpx;
              height: 76rpx;
              font-size: 30rpx;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              margin-right: 36rpx;
              display: flex;
              align-items: center;
            }

            .price {
              width: 240rpx;
              height: 76rpx;
              font-size: 30rpx;
              font-weight: 500;
              color: rgba(250, 84, 28, 1);
              display: flex;
              align-items: center;
            }

            .custom {
              width: 130rpx;
              height: 40rpx;
              line-height: 40rpx;
              text-align: center;
              background: rgba(24, 144, 255, 0.2);
              border-radius: 5rpx;
              font-size: 24rpx;
              font-weight: 400;
              color: rgba(27, 130, 210, 1);
            }
          }
        }
        .card-li:last-child {
          margin-bottom: 80rpx;
        }
      }
    }
  }
}
</style>
