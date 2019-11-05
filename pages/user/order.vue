<template>
	<div class="container">
		<div class="NoticeBar"><van-notice-bar @click="close" :left-icon="icon" mode="closeable" :text="title" /></div>
		<scroll-view class="scroll-view_H" :class="{ scroll_view_active: active }" scroll-y>
			<div class="orderList">
				<mescroll-uni :down="downOption" @init="mescrollInit" @down="downCallback" :up="upOption" @up="upCallback">
					<cards v-for="(item, index) in dataList" :goodsInfo="item" :key="index" @cancelOrder="cancelOrder"></cards>
				</mescroll-uni>
			</div>
		</scroll-view>
		<div class="button"><van-button size="large" class="submit" type="info" @click="toGoods">我要点菜</van-button></div>
		<van-dialog id="van-dialog" />
	</div>
</template>

<script>
import cards from '@/components/card.vue';
import { getOrderList, getSumOfMoney ,editOrderActive} from '@/api/order';
import MescrollUni from 'mescroll-uni';
import { getUserInfo } from '@/utils/cache.js';
import Dialog from '@/wxcomponents/vant-weapp/dialog/dialog';
export default {
	name: 'order',
	data() {
		return {
			active: false,
			mescroll: null, //mescroll实例对象
			title: '',
			icon: require('@/static/images/notice_title.png'),
			dataList: [],
			// 下拉刷新的常用配置
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
				auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
			},
			// 上拉加载的常用配置
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量,默认10
				},
				bottom: 20,
				noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				},
				textNoMore: '—— 到底了 ——'
			},
			userInfo: getUserInfo()
		};
	},
	components: {
		cards,
		MescrollUni
	},
	onShow() {
		this.reload();
		this._getSumOfMoney();
		uni.setNavigationBarTitle({
			title: this.userInfo.name + ',您好'
		});
	},
	methods: {
		// 关闭noticebar 重新调整容器高度
		close() {
			this.active = true;
		},
		toGoods() {
			uni.navigateTo({
				url: '/pages/user/goods',
				animationType: 'pop-in',
				animationDuration: 300
			});
		},
		_getSumOfMoney() {
			getSumOfMoney().then(response => {
				this.title = `您合计消费：￥${response.data.sum}元`;
			});
		},
		// 取消订单
		cancelOrder(orderId, status) {
			Dialog.confirm({
				title: '提示',
				message: '是否确认取消订单？取消后无法恢复此订单',
				context: this,
				asyncClose: true
			})
				.then(() => {
					editOrderActive({
						orderId,
						status
					}).then(response => {
						Dialog.close();
						uni.showToast({
							title: '操作成功',
							icon: 'success'
						});
						setTimeout(() => {
							this.reload()
						}, 1500);
					});
				})
				.catch(() => {
					Dialog.close();
				});
		},
		reload() {
			this.mescroll.resetUpScroll();
		},
		downCallback(mescroll) {
			mescroll.resetUpScroll();
		},
		/*上拉加载的回调*/
		upCallback(mescroll) {
			// 此时mescroll会携带page的参数:
			let pageNum = mescroll.num; // 页码, 默认从1开始
			let pageSize = mescroll.size; // 页长, 默认每页10条
			console.log(pageNum, pageSize);
			getOrderList({
				pageNum,
				pageSize
			}).then(response => {
				let totalPage = Math.ceil(response.data.page.total / response.data.page.pageSize);
				// 接口返回的当前页数据列表 (数组)
				let curPageData = response.data.dataList;
				// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
				let totalSize = response.data.page.total;
				if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				mescroll.endByPage(curPageData.length, totalPage);
			});
		},
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	.scroll-view_H {
		height: calc(100% - 190rpx);
	}
	.scroll_view_active {
		height: calc(100% - 60rpx);
	}
	.orderList {
		padding: 0 32rpx;
		margin-top: 16rpx;
		position: relative;
		height: 100%;
	}

	.button {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		height: 100rpx;
		/*background: #fff;*/
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
