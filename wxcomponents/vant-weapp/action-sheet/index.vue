<template>
	<view class="lifeWater">
		<div class="top">
			<p @click="showCityPicker">
				<span>地区1</span>
				<image class="downImg" src="../../../static/img/down.png"></image>
			</p>
			<p @click="showCityPicker">
				<span>排污类型</span>
				<image class="downImg" src="../../../static/img/down.png"></image>
			</p>
		</div>
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
import mpvueCityPicker from 'mpvue-citypicker';
export default {
	data() {
		return {
			pickerValueDefault: [0, 0, 1]
		};
	},
	components: {
		mpvueCityPicker
	},
	methods: {
		showCityPicker() {
			this.$refs.mpvueCityPicker.show();
		},
		onChange(e) {
			console.log(e);
		},
		onCancel(e) {
			console.log(e);
		},
		onConfirm(e) {
			console.log(e);
		}
	}
};
</script>
<style lang="scss" scoped>
.lifeWater {
	width: 100%;
	.top {
		display: flex;
		width: 100%;
		p{
		  font-size:30rpx;	
		}
	}
}
</style>
