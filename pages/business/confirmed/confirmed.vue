<template>
  <div class="container">
    <scroll-view
      class="scroll-view"
      scroll-y
    >
      <div class="orderList">
		   <mescroll-uni :down="downOption" @init="mescrollInit" @down="downCallback" :up="upOption" @up="upCallback">
        <div
          class="item"
          v-for="(item,index) in dataList"
          :key="index"
          @click="goDetail(item)"
        >
          <template v-if="dataList.length>0">
            <businessCard :goodsInfo="item"></businessCard>
          </template>
        </div>
		</mescroll-uni>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import businessCard from '@/components/businessCard'
import { queryCook } from '@/api/order'
import MescrollUni from 'mescroll-uni'
export default {
  name: 'cancel',
  components: {
    businessCard,
	MescrollUni
  },
  data() {
    return {
    mescroll: null, //mescroll实例对象
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
    }
    }
  },
  onShow() {
       this.mescroll.resetUpScroll();
  },
  methods: {
    goDetail(item) {
		uni.navigateTo({
			url: '/pages/business/confirmed/details?goodsInfo='+JSON.stringify(item),
			animationType: 'pop-in',
			animationDuration: 300
		});
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
		queryCook({
			status: 2,
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
		})
		.catch(() => mescroll.endErr());
	},
	mescrollInit(mescroll) {
		this.mescroll = mescroll;
	}
  }
}
</script>

<style scoped lang="scss">
.container {
  .scroll-view {
    height: 100%;
  }

  .orderList {
    padding: 0 32rpx;
    margin-top: 24rpx;
  }
}
</style>
