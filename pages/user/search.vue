<template>
	<div class="container">
		<div class="search"><van-search :value="value" :placeholder="placeHolder" show-action @search="onSearch" @cancel="onCancel" /></div>
		<div class="select-history" v-show="hisFlag">
			<div class="title">
				<span>搜索记录</span>
				<span @click='deleteHistory()'>
					<image class="delete-icon" src="../../static/images/delete.png" mode=""></image>
				</span>
			</div>
			<div class="content">
				<span v-for="(item,index) in selectHistory" :key="index" @click="clickHistory(item)">{{item}}</span>
			</div>
		</div>
		<div v-if="showCustom===2" class="add"><van-button size="large" class="submit" type="info" @click="addCustom">添加自定义菜品</van-button></div>
		<div class="food-list" v-if="showCustom===1">
			<scroll-view scroll-y scroll-with-animation="true" class="foods-scroll-view">
				<ul v-if="searchFoods.length > 0">
					<li v-for="(food, index) in searchFoods" :key="index">
						<div class="icon"><image :src="food.picture + '?type=small'" /></div>
						<div class="content">
							<h2 class="name">{{ food.name }}</h2>
							<p class="desc">{{ food.description }}</p>
							<div class="price">
								<span class="now">￥{{ food.price }}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<div class="cartcontrol">
									<div class="cart-decrease" v-if="food.count > 0" @click="del(index)"></div>
									<div class="cart-count" v-if="food.count > 0">{{ food.count }}</div>
									<div class="cart-add" @click="add(index)"></div>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="sub">
					<van-button size="large" class="submit" type="info" @click="addCustom">添加自定义菜品</van-button>
				</div>
			</scroll-view>
		</div>
		<div class="show-custom" v-if="showCustom===0">
			<div class="content">
				<div class="img"><image :src="customImg" alt="" /></div>
				<p class="con1">暂无搜索结果</p>
				<p class="con2">换个关键词试试</p>
				<p class="con3">或</p>
				<div class="button"><van-button size="large" class="submit" type="info" @click="addCustom">添加自定义菜品</van-button></div>
			</div>
		</div>
		<div class="shop"><shopCard></shopCard></div>
	</div>
</template>

<script>
import shopCard from '@/components/goods/shopCard';

export default {
	components: {
		shopCard
	},
	mounted() {
		this.searchFoods = [];
		this.getHistory()
	},
	name: 'search',
	data() {
		return {
			value: null,
			placeHolder: '搜索你需要商品的关键词',
			searchFoods: [],
			showCustom: 2,
			customImg: require('@/static/images/custom-404.png'),
			selectHistory : [],
			hisFlag:true
		};
	},
	methods: {
		del(index) {
			this.searchFoods[index].count--;
		},
		add(index) {
			this.searchFoods[index].count++;
		},
		// 获取搜索记录
		getHistory(){
			let selectHistory=uni.getStorageSync('select-history')
		    this.selectHistory=selectHistory!==''?JSON.parse(selectHistory):[]
			if(this.selectHistory.length>0){
				this.hisFlag=true
			}else{
				this.hisFlag=false
			}
		},
		// 删除历史记录
		deleteHistory(){
			this.selectHistory=[]
			 uni.removeStorageSync('select-history');
			 this.hisFlag=false
		},
		clickHistory(item){
			this.hisFlag=false
			this.value=item
			let goods = this.$store.state.goods.goodsData;
			goods.forEach(good => {
				good.foods.forEach(food => {
					if (food.name.indexOf(this.value) !== -1) {
						this.searchFoods.push(food);
					}
				});
			});
			if (this.searchFoods.length === 0) {
				this.showCustom = 0;
			} else {
				this.showCustom = 1;
			}
		},
		onSearch(event) {
			this.searchFoods = [];
			this.hisFlag=false
			  const detail=event.mp.detail
			  if(!this.selectHistory.includes(detail)){
				    this.selectHistory.unshift(detail)
			  }
			 uni.setStorageSync('select-history', JSON.stringify(this.selectHistory));
			let goods = this.$store.state.goods.goodsData;
			goods.forEach(good => {
				good.foods.forEach(food => {
					if (food.name.indexOf(detail) !== -1) {
						this.searchFoods.push(food);
					}
				});
			});
			if (this.searchFoods.length === 0) {
				this.showCustom = 0;
			} else {
				this.showCustom = 1;
			}
		},
		onCancel() {
			wx.navigateBack({
				delta: 1
			});
		},
		addCustom() {
			uni.navigateTo({
				url: '/pages/user/custom',
				animationType: 'pop-in',
				animationDuration: 300
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	background: rgba(245,245,245,0.5);

	.search {
		height: 108rpx;
	}
	.select-history{
		background: #fff;
		padding: 0 20rpx;
		padding-bottom: 10rpx;
		.title{
			display:flex;
			justify-content: space-between;
			align-items: center;
			span{
				font-size: 24rpx;
			}
		}
		.content{
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			span{
				display: block;
				margin:7rpx 10rpx;
				padding: 4rpx 14rpx;
				background: rgba(220,220,220, 0.5);
				font-size:24rpx;
				border-radius: 8rpx;
			}
		}
	}


	.food-list {
		position: absolute;
		top: 108rpx;
		bottom: 162rpx;
		width: 100%;

		.foods-scroll-view {
			height: 100%;
		}

.sub{
	width: 686rpx;
	margin: 20rpx auto;
}
			.submit {
				width: 686rpx;
				height: 94rpx;
				border-radius: 4rpx;
				background: rgba(16, 142, 233, 1);
				font-size: 36rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}
		ul {
			width: 100%;
			background: #fff;
			padding-top: 1rpx;

			li {
				padding: 0 32rpx;
				display: flex;
				margin-top: 32rpx;
				position: relative;


				.icon {
					width: 174rpx;
					height: 174rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.content {
					padding-left: 24rpx;

					.name {
						font-size: 36rpx;
						font-weight: 500;
						color: rgba(51, 153, 255, 1);
						margin: 10rpx 0;
					}

					.desc {
						margin: 22rpx 0;
						font-size: 36rpx;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}

					.price {
						margin: 22rpx 0;
						font-size: 40rpx;
						font-weight: 500;
						color: rgba(250, 84, 28, 1);
					}

					.cartcontrol-wrapper {
						position: absolute;
						bottom: 20rpx;
						right: 32rpx;

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

	.show-custom {
		.content {
			text-align: center;
			padding-top: 54rpx;

			.img {
				width: 100%;
				height: 100%;

				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.con1 {
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-top: 14rpx;
			}

			.con2,
			.con3 {
				font-size: 26rpx;
				font-weight: 400;
				margin-top: 14rpx;
				color: rgba(153, 153, 153, 1);
			}

			.button {
				width: 686rpx;
				margin: 32rpx auto;

				.submit {
					width: 686rpx;
					height: 94rpx;
					border-radius: 4rpx;
					background: rgba(16, 142, 233, 1);
					font-size: 36rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
}
.delete-icon{
	width: 40rpx;
	height: 40rpx;
}
.add{
	width:700rpx;
	margin: 280rpx auto
}
</style>
