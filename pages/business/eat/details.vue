<template>
	<div class="container" v-if="normalList">
		<scroll-view class="scroll-view_H" scroll-y>
			<div class="main">
				<div class="foodsInfo items">
					<div class="title">菜品信息</div>
					<ul>
						<li v-for="(item, index) in normalList" :key="index">
							<div class="item" v-if="item.status !== 4 && item.dishCount > 0">
								<div class="img"><image :src="item.image" class="imgs"></image></div>
								<div class="name">{{ item.dishName }}</div>
								<div class="num">
									<div class="cartcontrol">
										<div class="cart-decrease" @click="delNum(item)"></div>
										<div class="cart-count">{{ item.dishCount }}</div>
										<div class="cart-add" @click="addNum(item)"></div>
									</div>
								</div>
								<div class="price">￥{{ item.dishPrice }}</div>
							</div>
						</li>
					</ul>
					<div class="tag tag1">自定义菜品</div>
					<ul>
						<li v-for="(item, index) in normalList" :key="index">
							<div class="item" v-if="item.status === 4 && item.dishCount > 0">
								<div class="img"></div>
								<div class="name">{{ item.dishName }}</div>
								<div class="num">
									<div class="cartcontrol">
										<div class="cart-decrease" @click="delNum(item)"></div>
										<div class="cart-count">{{ item.dishCount }}</div>
										<div class="cart-add" @click="addNum(item)"></div>
									</div>
								</div>
								<div class="price"><input type="digit" placeholder="单价" v-model="item.dishPrice" /></div>
							</div>
						</li>
					</ul>
					<div class="total">
						<p class="add" @click="add">添加菜品</p>
						<div class="total-right">
							<span>合计：</span>
							<span>￥{{ normalTotal }}</span>
						</div>
					</div>
				</div>
				<div class="changes items">
					<div class="title">变更记录</div>
					<div style="margin-top: 9rpx;"></div>
					<div class="tag tag2" v-if="goodsInfo.map.addList.length > 0">新增菜品</div>
					<ul>
						<li v-for="(item, index) in goodsInfo.map.addList" :key="index">
							<div class="item">
								<div class="img"><image :src="src" class="imgs"></image></div>
								<div class="name">{{ item.dishName }}</div>
								<div class="num">x{{ item.dishCount }}</div>
								<div class="price">￥{{ item.dishPrice }}</div>
							</div>
						</li>
					</ul>
					<div class="tag tag3" v-if="goodsInfo.map.deletedList.length > 0">删除菜品</div>
					<ul>
						<li v-for="(item, index) in goodsInfo.map.deletedList" :key="index">
							<div class="item">
								<div class="img"></div>
								<div class="name">{{ item.dishName }}</div>
								<div class="num">x{{ item.dishCount }}</div>
								<div class="price">￥{{ item.dishPrice }}</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="orderInfo items">
					<div class="orderTitle">订单信息</div>
					<ul>
						<li>
							<div class="item">
								<van-cell-group style="width: 100%;">
									<van-cell title="订单号" :value="goodsInfo.id" />
									<van-cell title="就餐时间" :value="goodsInfo.dinnerTimeString" />
									<van-cell title="就餐人数" :value="goodsInfo.dinnerNumber" />
									<van-cell title="订单备注" :value="goodsInfo.description" />
									<van-cell title="下单时间" :value="goodsInfo.addTimeString" />
								</van-cell-group>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</scroll-view>
		<div class="button"><van-button size="large" class="submit" type="info" @click="submitOrder">完成审核</van-button></div>
		<van-popup :show="show" @close="onClose">
			<div class="addFoods">
				<van-cell-group>
					<input type="text" v-model="food.dishName" placeholder="请输入菜名" />
					<input type="digit" v-model="food.dishPrice" placeholder="请输入单价" />
					<input type="number" v-model="food.dishCount" placeholder="请输入数量" />
					<van-button type="info" size="large" @click="submit">确 认</van-button>
				</van-cell-group>
			</div>
		</van-popup>
	</div>
</template>

<script>
import { editOrderWithCook, editOrderActive } from '@/api/order';
import Toast from '@/wxcomponents/vant-weapp/toast/toast';
export default {
	name: 'orderDetails',
	config: {
		navigationBarTitleText: '已就餐'
	},
	data() {
		return {
			goodsInfo: null,
			normalTotal: 0,
			normalList: null,
			show: false,
			food: {
				dishName: null,
				dishPrice: null,
				dishCount: null,
				image: null,
				status: 4
			}
		};
	},
	watch: {
		normalList: {
			//  深度监听，可监听到对象、数组的变化
			handler(newValue) {
				this.getTotal();
			},
			deep: true
		}
	},
	onLoad(option) {
		this.goodsInfo = JSON.parse(option.goodsInfo);
		this.normalList = this.goodsInfo.map.normalList;
		this.getTotal();
	},
	methods: {
		delNum(item) {
			item.dishCount--;
		},
		addNum(item) {
			item.dishCount++;
		},
		getTotal() {
			this.normalTotal = 0;
			if (this.normalList.length > 0) {
				this.normalList.forEach((item, index) => {
					this.normalTotal += item.dishPrice * item.dishCount;
					console.log(this.normalTotal);
				});
			}
		},
		submitOrder() {
			var arr = [];
			this.normalList.forEach((item, index) => {
				let { dishName, dishPrice, dishCount, image, status } = item;
				const obj = {
					dishName,
					dishPrice,
					dishCount,
					image,
					status
				};
				if (obj.dishCount > 0) {
					arr.push(obj);
				}
			});
			var goodsList = `<${JSON.stringify(arr).substring(1, JSON.stringify(arr).length - 1)}>`;
			var data = {
				orderId: this.goodsInfo.id,
				totalPrice: this.normalTotal,
				goodsList
			};
			editOrderWithCook({
				data: JSON.stringify(data)
			}).then(response => {
				this._editOrderActive();
				// Toast.success('操作成功')
			});
		},
		_editOrderActive() {
			editOrderActive({
				orderId: this.goodsInfo.id,
				status: 4
			}).then(response => {
				Toast.success({
					message: '操作成功',
					context: this
				});
				setTimeout(() => {
					wx.switchTab({
						url: '/pages/business/over/over'
					});
				}, 1500);
			});
		},
		add() {
			this.show = true;
		},
		onClose() {
			this.show = false;
		},
		submit() {
			this.normalList.push(this.food);
			this.onClose();
			this.food = {
				dishName: null,
				dishPrice: null,
				dishCount: null,
				image: null,
				status: 4
			};
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	.scroll-view_H {
		height: calc(100% - 130rpx);

		.main {
			padding: 0 32rpx;

			.items {
				margin-top: 16rpx;
			}

			.foodsInfo,
			.changes,
			.orderInfo {
				padding: 18rpx 24rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 8rpx;

				.title {
					height: 37rpx;
					font-size: 26rpx;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
					line-height: 37rpx;
					padding-bottom: 16rpx;
					border-bottom: 1rpx solid #eeeeee;
				}

				.tag {
					display: inline-block;
					padding: 10rpx;
					height: 20rpx;
					line-height: 20rpx;
					text-align: center;
					border-radius: 5rpx;
					font-size: 24rpx;
					font-weight: 300;
				}
				.tag1 {
					background: rgba(24, 144, 255, 0.2);
					color: rgba(27, 130, 210, 1);
				}
				.tag2 {
					background: rgba(56, 158, 13, 0.2);
					color: rgba(35, 120, 4, 1);
				}
				.tag3 {
					background: rgba(245, 34, 45, 0.2);
					color: rgba(207, 19, 34, 1);
				}
				ul {
					margin-top: 15rpx;

					li {
						.item {
							padding-bottom: 16rpx;
							width: 100%;
							display: flex;
							align-items: center;

							.img {
								width: 76rpx;

								.imgs {
									width: 76rpx;
									height: 76rpx;
								}
							}

							.name {
								width: 415rpx;
								height: 37rpx;
								font-size: 26rpx;
								font-weight: 400;
								color: rgba(51, 51, 51, 1);
								line-height: 37rpx;
								margin-left: 22rpx;
							}

							.num {
								font-size: 20rpx;
								font-weight: 400;
								color: rgba(153, 153, 153, 1);
								margin-right: 56rpx;
							}

							.price {
								font-size: 26rpx;
								font-weight: 500;
								color: rgba(51, 51, 51, 1);
								width: 170rpx;
								text-align: right;

								input {
									width: 170rpx;
									text-align: right;
								}
							}
						}
					}
				}

				.total {
					border-top: 1rpx solid #eeeeee;
					display: flex;
					height: 70rpx;
					justify-content: space-between;
					align-items: center;
					.total-right {
						span {
							height: 42rpx;
							font-size: 30rpx;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
							line-height: 42rpx;
							margin-left: 14rpx;
						}
					}

					.add {
						font-size: 24rpx;
						font-weight: 400;
						color: rgba(27, 130, 210, 1);
					}
				}
			}
			.orderInfo {
				.orderTitle {
					height: 37rpx;
					font-size: 26rpx;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
					line-height: 37rpx;
					padding-bottom: 16rpx;
				}
			}
		}
	}

	.button {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 120rpx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;

		.submit {
			width: 686rpx;
			height: 88rpx;
		}
	}
	.cartcontrol {
		display: flex;
		align-items: center;

		.cart-decrease {
			background: url('../../../static/images/btn-minus.png') no-repeat;
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
			background: url('../../../static/images/btn-add.png') no-repeat;
			background-size: 100% 100%;
			width: 40rpx;
			height: 40rpx;
		}
	}
	.addFoods {
		padding: 40rpx;
		background: #fff;
		width: 500rpx;
		input {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
		}
	}
}
</style>
