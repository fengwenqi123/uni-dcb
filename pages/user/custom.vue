<template>
	<div class="container">
		<div class="cell">
			<van-cell-group><van-field :value="foodName" label="菜品名称" :placeholder="placeholder" :border="border" @change="onChange" /></van-cell-group>
		</div>
		<div class="button"><van-button size="large" class="submit" type="info" @click="add">确定添加</van-button></div>
		<div class="shop"><shopCard></shopCard></div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
import shopCard from '@/components/goods/shopCard';
import Toast from '@/wxcomponents/vant-weapp/toast/toast';
export default {
	config: {
		navigationBarTitleText: '自定义菜品'
	},
	components: {
		shopCard
	},
	data() {
		return {
			foodName: null,
			placeholder: '请输入菜品名称',
			border: false,
			value: null
		};
	},
	methods: {
		onChange(e) {
			this.value = e.mp.detail;
		},
		add() {
			var goodsData = this.$store.state.goods.goodsData;
			var foodObj = {};
			if (this.value) {
				let foods = goodsData[goodsData.length - 1].foods;
				if (foods.length > 0) {
					let isTrue = foods.some(food => {
						return food.name === this.value;
					});
					if (isTrue) {
						foods.forEach(food => {
							if (food.name === this.value) {
								food.count++;
							}
						});
					} else {
						foodObj.count = 1;
						foodObj.price = 0;
						foodObj.type = -1;
						foodObj.name = this.value;
						foodObj.description = '自定义菜品';
						foods.push(foodObj);
					}
				} else {
					foodObj.count = 1;
					foodObj.price = 0;
					foodObj.type = -1;
					foodObj.name = this.value;
					foodObj.description = '自定义菜品';
					foods.push(foodObj);
				}
				Toast.success({
					mask: false,
					message: '添加成功',
					forbidClick: true,
					duration: 1000,
					context: this
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	.button {
		width: 686rpx;
		margin: 16rpx auto;

		.submit {
			width: 686rpx;
			height: 94rpx;
			border-radius: 4rpx;
			font-size: 36rpx;
			background: rgba(16, 142, 233, 1);
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
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
}
</style>
