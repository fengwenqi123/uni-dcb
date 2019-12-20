<template>
	<div class="components">
		<div class="goodsInfo" @click="toDetalis">
			<div class="imgs"><image v-if="goodsInfo.map.normalList.length > 0" class="images" :mode="mode" :src="goodsInfo.map.normalList[0].image + '?type=small'"></image></div>
			<div class="info">
				<div class="times">
					<p>
						就餐时间：
						<span>{{ goodsInfo.dinnerTimeString }}</span>
					</p>
				</div>
				<div class="count">
					<p>
						就餐人数：
						<span>{{ goodsInfo.dinnerNumber }}</span>
					</p>
				</div>
				<div class="goodsNum">
					<p>{{ goodsInfo.map.normalList.length }}件商品</p>
				</div>
				<div class="changes">
					<p v-if="goodsInfo.map.deletedList.length > 0">{{ goodsInfo.map.deletedList.length }}件 菜品删除</p>
					<p v-if="goodsInfo.map.addList.length > 0">{{ goodsInfo.map.addList.length }}件 菜品新增</p>
				</div>
			</div>
			<div class="type_price">
				<div class="tag active1" v-if="goodsInfo.status === 1">待确认</div>
				<div class="tag active2" v-if="goodsInfo.status === 2">已确认</div>
				<div class="tag active3" v-if="goodsInfo.status === 3">已就餐</div>
				<div class="tag active4" v-if="goodsInfo.status === 5">已取消</div>
				<div class="tag active5" v-if="goodsInfo.status === 4">已结束</div>
				<p class="price">¥{{ goodsInfo.actualAmount }}</p>
			</div>
		</div>
		<div class="cancel" v-if="goodsInfo.status === 1 || goodsInfo.status === 2" @click="cancelOrder"><span>取消订单</span></div>
		<van-dialog id="van-dialog" />
	</div>
</template>

<script>

import Dialog from '@/wxcomponents/vant-weapp/dialog/dialog';
export default {
	props: ['goodsInfo'],
	data() {
		return {
			mode: 'aspectFit'
		};
	},
	methods: {
		toDetalis() {
			uni.navigateTo({
				url: '/pages/user/orderDetails?goodsInfo=' + JSON.stringify(this.goodsInfo),
				animationType: 'pop-in',
				animationDuration: 300
			});
		},
		cancelOrder() {
			this.$emit('cancelOrder',this.goodsInfo.id,5);
			// Dialog.confirm({
			// 	title: '标题',
			// 	message: '弹窗内容',
			// 	context: this,
			// 	asyncClose: true
			// })
			// 	.then(() => {
			// 		setTimeout(() => {
			// 			Dialog.close();
			// 		}, 1000);
			// 	})
			// 	.catch(() => {
			// 		Dialog.close();
			// 	});
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
			// 				setTimeout(() => {
			// 					_this.$emit('reload');
			// 				}, 1500);
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
.components {
	padding: 36rpx 24rpx 0 24rpx;
	background: #fff;
	border-radius: 8rpx;
	margin-top: 16rpx;

	.goodsInfo {
		display: flex;
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

			.times {
				margin-bottom: 14rpx;

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
			margin-top: -10rpx;

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
			}
		}
	}

	.cancel {
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		span {
			height: 40rpx;
			font-size: 28rpx;
			font-weight: 600;
			color: rgba(74, 144, 226, 1);
			line-height: 40rpx;
			display: inline-block;
		}
	}
}
</style>
