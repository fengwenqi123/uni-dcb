<template>
	<div class="container" v-if="goodsInfo">
		<scroll-view class="scroll-view_H" :class="{ active: heightAll }" scroll-y>
			<div class="main">
				<div class="foodsInfo items">
					<div class="title">菜品信息</div>
					<ul>
						<li v-for="(item, index) in goodsInfo.map.normalList" :key="index">
							<div class="item" v-if="item.status !== 4">
								<div class="img"><image :src="item.image" class="imgs"></image></div>
								<div class="name">{{ item.dishName }}</div>
								<div class="num">x{{ item.dishCount }}</div>
								<div class="price">￥{{ item.dishPrice }}</div>
							</div>
						</li>
					</ul>
					<div class="tag tag1">自定义菜品</div>
					<ul>
						<li v-for="(item, index) in goodsInfo.map.normalList" :key="index">
							<div class="item" v-if="item.status === 4">
								<div class="img"></div>
								<div class="name">{{ item.dishName }}</div>
								<div class="num">x{{ item.dishCount }}</div>
								<div class="price">￥{{ item.dishPrice }}</div>
							</div>
						</li>
					</ul>
					<div class="total">
						<p>合计：</p>
						<span>￥{{ normalTotal }}</span>
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
								<div class="img"><image :src="src" class="imgs"></image></div>
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
		<van-dialog id="van-dialog" />
		<div class="button" v-if="active === 1 || active === 2"><van-button size="large" class="submit" type="info" @click="cancelOrder">取消订单</van-button></div>
	</div>
</template>

<script>
import { editOrderActive } from '@/api/order';
import Dialog from '@/wxcomponents/vant-weapp/dialog/dialog';
export default {
	name: 'orderDetails',
	data() {
		return {
			active: null,
			goodsInfo: null,
			normalTotal: 0
		};
	},
	computed: {
		heightAll() {
			if (this.active !== 1 && this.active !== 2) {
				return true;
			} else {
				return false;
			}
		}
	},
	onLoad(option) {
		this.goodsInfo = JSON.parse(option.goodsInfo);
		this.active = this.goodsInfo.status;
		this.getTotal();
		wx.setNavigationBarTitle({
			title: this.active === 1 ? '待确认' : this.active === 2 ? '已确认' : this.active === 3 ? '已就餐' : this.active === 4 ? '已结束' : '已取消'
		});
	},
	methods: {
		getTotal() {
			this.normalTotal = 0;
			if (this.goodsInfo.map.normalList.length) {
				this.goodsInfo.map.normalList.forEach((item, index) => {
					this.normalTotal += item.dishPrice * item.dishCount;
					console.log(this.normalTotal);
				});
			}
		},
		cancelOrder() {
			Dialog.confirm({
				title: '提示',
				message: '是否确认取消订单？取消后无法恢复此订单',
				context: this,
				asyncClose: true
			})
				.then(() => {
					editOrderActive({
						orderId: this.goodsInfo.id,
						status: 5
					}).then(response => {
						Dialog.close();
						uni.showToast({
							title: '操作成功',
							icon: 'success'
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1,
								animationType: 'pop-out',
								animationDuration: 300
							});
						}, 1500);
					});
				})
				.catch(() => {
					Dialog.close();
				});
			// var _this=this
			// uni.showModal({
			// 	title: '提示',
			// 	content: '是否确认取消订单？取消后无法恢复此订单',
			// 	success: function(res) {
			// 		if (res.confirm) {
			// 			editOrderActive({
			// 				orderId: _this.goodsInfo.id,
			// 				status: 5
			// 			}).then(response => {
			// 				uni.showToast({
			// 					title: '操作成功',
			// 					icon: 'success'
			// 				});
			// 			setTimeout(() => {
			// 				uni.navigateBack({
			// 					delta: 1,
			// 					animationType: 'pop-out',
			// 					animationDuration: 300
			// 				});
			// 			}, 1500);
			// 			});
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 		}
			// 	}
			// });
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	.active {
		height: calc(100% - 20rpx) !important;
	}
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
								height: 28rpx;
								font-size: 20rpx;
								font-weight: 400;
								color: rgba(153, 153, 153, 1);
								line-height: 28rpx;
								margin-right: 52rpx;
							}

							.price {
								height: 37rpx;
								font-size: 26rpx;
								font-weight: 500;
								color: rgba(51, 51, 51, 1);
								line-height: 37rpx;
							}
						}
					}
				}

				.total {
					border-top: 1rpx solid #eeeeee;
					display: flex;
					height: 70rpx;
					justify-content: flex-end;
					align-items: center;

					span {
						height: 42rpx;
						font-size: 30rpx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 42rpx;
						margin-left: 34rpx;
					}

					p {
						height: 28rpx;
						font-size: 30rpx;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 28rpx;
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
}
</style>
