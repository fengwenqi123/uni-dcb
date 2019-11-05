<template>
	<div class="container">
		<div class="select-time">
			<popup ref="dateTime">
				<van-datetime-picker title="就餐时间" type="datetime" :value="currentDate" :min-date="minDate" :max-date="maxDate" @confirm="timeConfirm" @cancel="timeCancel" />
			</popup>
		</div>
		<div class="picker">
			<popup ref="picker"><van-picker show-toolbar title="人数" :columns="array" @cancel="pickerCancel" @confirm="pickerConfirm" /></popup>
		</div>
		<scroll-view class="scroll-view_H" scroll-y>
			<div class="order-info">
				<ul>
					<li><div class="item header">订单信息</div></li>
					<li>
						<div class="item">
							<div class="content-left">就餐时间</div>
							<div class="content-right" @click="showTimeSelect"><input placeholder="请选择时间" v-model="time" disabled /></div>
						</div>
					</li>
					<li>
						<div class="item">
							<div class="content-left">就餐人数</div>
							<div class="content-right" @click="showPicker"><input placeholder="请选择人数" v-model="personNumber" disabled /></div>
						</div>
					</li>
					<li>
						<div class="item">
							<div class="content-left">订单备注</div>
							<div class="content-right" @click="goRemarks"><input placeholder="未选择" v-model="remarks" disabled /></div>
						</div>
					</li>
				</ul>
			</div>
			<div class="food-info">
				<ul>
					<li><div class="item header">菜品信息</div></li>
					<li v-for="(food, index) in selectFoods" :key="index">
						<div class="custom" v-if="food.type === -1">自定义菜品</div>
						<div class="item">
							<div class="img"><img :src="food.image" alt="" /></div>
							<div class="food-name">{{ food.name }}</div>
							<div class="number">x{{ food.count }}</div>
							<div class="price">
								<p v-if="food.type !== -1">¥{{ food.price }}</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</scroll-view>
		<div class="shop">
			<div class="title"><span class="tit">*不包含自定义菜品价格</span></div>
			<div class="shop-card">
				<div class="content">
					<div class="img">
						<img :src="img" alt="" />
						<dot :obj="selectFoods"></dot>
					</div>
					<div class="mid">
						<p>
							合计：
							<span>¥{{ totalPrice }}</span>
						</p>
					</div>
					<div class="btn"><button class="check" @click="submit">确认订单</button></div>
				</div>
			</div>
		</div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
import popup from '@/components/popup';
import { formatTime } from '@/utils/index.js';
import { mapGetters } from 'vuex';
import dot from '@/components/goods/dot';
import Toast from '@/wxcomponents/vant-weapp/toast/toast';
import { addOrder } from '@/api/order';
export default {
	config: {
		navigationBarTitleText: '确认订单'
	},
	components: {
		popup,
		dot
	},
	data() {
		return {
			time: null,
			personNumber: null,
			array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			index: 0,
			minDate: new Date().getTime(),
			maxDate: new Date().getTime() + 3600 * 24 * 7 * 1000,
			currentDate: new Date().getTime(),
			show: false,
			img: require('@/static/images/plate.png')
		};
	},
	computed: {
		...mapGetters(['selectFoods', 'totalPrice', 'remarks'])
	},
	methods: {
		showTimeSelect() {
			this.$refs.dateTime.showPopup();
		},
		timeConfirm(e) {
			this.time = formatTime(e.mp.detail);
			this.$refs.dateTime.onClose();
		},
		timeCancel() {
			this.$refs.dateTime.onClose();
		},
		showPicker() {
			this.$refs.picker.showPopup();
		},
		pickerConfirm(e) {
			this.personNumber = `${e.mp.detail.value}人`;
			this.$refs.picker.onClose();
		},
		pickerCancel() {
			this.$refs.picker.onClose();
		},
		goRemarks() {
			uni.navigateTo({
				url: '/pages/user/remarks',
				animationType: 'pop-in',
				animationDuration: 300
			});
		},
		submit() {
			if (!this.time) {
				Toast({
					message: '请先选择就餐时间',
					context: this
				});
				return;
			}
			if (!this.personNumber) {
				Toast({
					message: '请先选择就餐人数',
					context: this
				});
				return;
			}
			var arr = [];
			this.selectFoods.forEach(element => {
				let { name, price, count, picture: image, type } = element;
				const obj = {
					name,
					price,
					count,
					image,
					type
				};
				arr.push(obj);
			});
			var goodsList = `<${JSON.stringify(arr).substring(1, JSON.stringify(arr).length - 1)}>`;
			let dataList = `<${JSON.stringify({
				time: this.time,
				personNumber: this.personNumber,
				remarks: this.remarks,
				goodsList: goodsList
			})}>`;
			addOrder({
				dataList
			}).then(response => {
				Toast.success({
					message: '操作成功',
					context: this
				});
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/user/order',
						animationType: 'pop-in',
						animationDuration: 300
					});
					// this.$router.replace({
					// 	path: '/pages/user/order'
					// });
				}, 2000);
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	.scroll-view_H {
		height: calc(100% - 162rpx);
	}

	.order-info,
	.food-info {
		padding: 0 32rpx;
		margin-top: 16rpx;

		ul {
			background: rgba(255, 255, 255, 1);
			border-radius: 8rpx;
			padding: 0 24rpx;

			li {
				.item {
					display: flex;
					height: 64rpx;
					align-items: center;
					justify-content: space-between;

					.content-left {
						font-size: 26rpx;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}

					.content-right {
						text-align: right;
						font-size: 26rpx;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
				}

				.header {
					font-size: 26rpx;
					font-weight: 600;
					color: rgba(51, 51, 51, 1);
				}
			}
		}
	}

	.food-info {
		li {
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

			.item {
				height: 94rpx !important;

				.img {
					width: 76rpx;
					height: 76rpx;

					img {
						width: 76rpx;
						height: 76rpx;
					}
				}

				.food-name {
					width: 394rpx;
					margin-left: 15rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.number {
					width: 20rpx;
					font-size: 20rpx;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					margin-right: 54rpx;
				}

				.price {
					width: 100rpx;
					font-size: 26rpx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);

					p {
						text-align: right;
					}
				}
			}
		}
	}

	.shop {
		height: 162rpx;
		background: #333333;
		width: 100%;
		position: absolute;
		bottom: 0rpx;
		z-index: 200;

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
						background: #3399ff;
						border-radius: 0;
						font-size: 30rpx;
						font-weight: 500;
						height: 90rpx;
						line-height: 90rpx;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		}
	}
}
</style>
