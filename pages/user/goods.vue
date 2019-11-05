<template>
	<div class="container">
		<div class="header" @click="toSearch"><van-search readonly :placeholder="placeholder" /></div>
		<div class="goods">
			<!--      左侧列表-->
			<div class="menu-wrapper">
				<scroll-view class="menu-scroll-view" :scroll-into-view="navId" scroll-with-animation="true" scroll-y>
					<ul class="menu-ul">
						<li
							class="menu-item"
							v-for="(item, index) in goods"
							:id="'nav_' + index"
							:class="index === currentIndex ? 'current' : ''"
							:key="index"
							@click="selectMenu(index)"
						>
							<template v-if="item.foods.length > 0">
								<p class="name">{{ item.category }}</p>
								<dot :obj="item.foods"></dot>
							</template>
						</li>
					</ul>
				</scroll-view>
			</div>
			<!--      右侧列表-->
			<div class="foods-wrapper">
				<scroll-view scroll-y @scroll="onScroll" :scroll-into-view="contentId" scroll-with-animation="true" class="foods-scroll-view">
					<ul class="foods-ul">
						<li v-for="(item, i) in goods" :id="'con_' + i" class="foods-li" :key="i">
							<template v-if="item.foods.length > 0">
								<h1 id="title" class="title">{{ item.category }}</h1>
								<ul class="foods-ul-child">
									<li v-for="(food, index) in item.foods" class="food-list-hook foods-li-child" :key="index">
										<div class="icon"><img :src="food.picture" /></div>
										<div class="content">
											<h2 class="name">{{ food.name }}</h2>
											<p class="desc">{{ food.description || '暂无描述' }}</p>
											<div class="extra"><!-- <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span> --></div>
											<div class="price">
												<span class="now">￥{{ food.price }}</span>
											</div>
											<div class="cartcontrol-wrapper">
												<div class="cartcontrol">
													<div class="cart-decrease" v-if="food.count > 0" @click="del(i, index)"></div>
													<div class="cart-count" v-if="food.count > 0">{{ food.count }}</div>
													<div class="cart-add" @click="add(i, index)"></div>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</template>
						</li>
					</ul>
				</scroll-view>
			</div>
		</div>
		<div class="shop"><shopCard></shopCard></div>
	</div>
</template>

<script>
import shopCard from '@/components/goods/shopCard';
import dot from '@/components/goods/dot';
import { getGoodsList } from '@/api/goods.js';

let foods = {
	category: '自定义菜品',
	type: -10,
	foods: []
};
export default {
	name: 'goods',
	components: {
		shopCard,
		dot
	},
	data() {
		return {
			overlay: false,
			goods: [],
			placeholder: '搜索你需要的商品热门关键词',
			contentId: 'con_0', // 每个food-list的id，scroll-into-view滚动到对应的id
			navId: 'nav_0', // 导航模块对应的id，用来联动内容区域
			currentIndex: 0,
			scrollTop: 0, // 导航里ul高度
			navItemHeight: null // 每个导航高度
		};
	},
	watch: {
		goods: {
			//  深度监听，可监听到对象、数组的变化
			handler(newValue) {
				this.$store.commit('_getGoods', newValue);
			},
			deep: true
		}
	},
	mounted() {
		this.getGoods();
	},
	methods: {
		del(i, index) {
			this.goods[i].foods[index].count--;
		},
		add(i, index) {
			this.goods[i].foods[index].count++;
		},
		getGoods() {
			getGoodsList().then(response => {
				response.data.forEach(good => {
					good.foods.forEach(food => {
						food.count = 0;
					});
				});
				response.data.push(foods);
				this.goods = response.data;
				this.$store.commit('_getGoods', this.goods);
				setTimeout(() => {
					this.getFoodHeight();
				}, 500);
			});
		},
		selectMenu(index) {
			this.contentId = `con_${index}`;
			this.navId = `nav_${index}`;
			this.currentIndex = index;
		},
		onScroll(e) {
			this.scrollTop = e.target.scrollTop;
			var arr = this.navItemHeight.filter(item => {
				return item > this.scrollTop;
			});
			var index = this.navItemHeight.indexOf(arr[0]);
			this.navId = `nav_${index}`;
			this.currentIndex = index;
		},
		getFoodHeight() {
			var query = wx.createSelectorQuery();
			let arr = [];
			query
				.selectAll('.foods-li')
				.boundingClientRect(rect => {
					rect.forEach((item, index) => {
						arr.push(item.top + item.height - 54);
					});
					this.navItemHeight = arr;
				})
				.exec();
		},
		toSearch() {
			uni.navigateTo({
				url: '/pages/user/search',
				animationType: 'pop-in',
				animationDuration: 300
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	.header {
		height: 108rpx;
	}

	.goods {
		display: flex;
		position: absolute;
		top: 108rpx;
		bottom: 162rpx;
		width: 100%;
		overflow: hidden;

		.menu-wrapper {
			width: 168rpx;

			.menu-scroll-view {
				height: 100%;
				width: 168rpx;

				.menu-ul {
					.current {
						position: relative;
						z-index: 10;
						margin-top: -1rpx;
						background: #fff;
						font-weight: 700;
					}

					.menu-item {
						padding-left: 32rpx;
						position: relative;

						.name {
							font-size: 24rpx;
							font-weight: 600;
							height: 110rpx;
							line-height: 110rpx;
							color: rgba(51, 51, 51, 1);
						}

						.dot {
						}
					}
				}
			}
		}

		.foods-wrapper {
			flex: 1;

			.foods-scroll-view {
				height: 100%;

				.foods-ul {
					background: #fff;

					.foods-li {
						.title {
							padding-left: 14rpx;
							height: 46rpx;
							line-height: 46rpx;
							border-left: 6rpx solid #d9dde1;
							font-size: 26rpx;
							color: #93999f;
							background: #f3f5f7;
						}

						.foods-ul-child {
							.foods-li-child {
								display: flex;
								align-items: flex-start;
								margin: 18rpx;
								padding-bottom: 18rpx;
								position: relative;

								.icon {
									flex: 0 0 57rpx;
									margin-right: 10rpx;

									img {
										width: 132rpx;
										height: 132rpx;
									}
								}

								.content {
									flex: 1;

									.name {
										font-size: 30rpx;
										font-weight: 500;
										color: rgba(51, 51, 51, 1);
									}

									.desc {
										font-size: 26rpx;
										font-weight: 400;
										margin-top: 14rpx;
										margin-bottom: 6rpx;
										color: rgba(153, 153, 153, 1);
									}

									.extra {
										font-size: 26rpx;
										font-weight: 400;
										color: rgba(153, 153, 153, 1);
									}

									.price {
										.now {
											font-size: 30rpx;
											font-weight: 500;
											color: rgba(250, 84, 28, 1);
										}
									}

									.cartcontrol-wrapper {
										position: absolute;
										right: 0;
										bottom: 38rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	}

	.shop {
		height: 90rpx;
		background: #333333;
		width: 100%;
		position: absolute;
		bottom: 0rpx;
		z-index: 200;
	}

	.cartcontrol {
		display: flex;
		align-items: center;

		.cart-decrease {
			background: url('../../static/images/btn-minus.png') no-repeat;
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
			background: url('../../static/images/btn-add.png') no-repeat;
			background-size: 100% 100%;
			width: 40rpx;
			height: 40rpx;
		}
	}
}
</style>
