// #ifdef APP-PLUS
const Fly = require("flyio/dist/npm/weex")
// #endif

// #ifdef MP-WEIXIN
var Fly = require("flyio/dist/npm/wx")
// #endif
const fly = new Fly
import {
	getToken
} from '@/utils/cache.js'

const host = 'https://api.cjbe88.com'
const timeout = 6000

// 添加请求拦截器
fly.interceptors.request.use(request => {
	request.headers['accessToken'] = getToken()
	uni.showLoading({
		title: '正在加载...',
		mask: false
	});
	return request
}, error => {
	console.log(error)
	Promise.reject(error)
})

// 添加响应拦截器
fly.interceptors.response.use(response => {
	uni.hideLoading();
	const res = response.data
	switch (res.code) {
		case 200:
			return response.data
		case 500:
			uni.showModal({
				content: res.msg,
				showCancel: false,
				confirmText: "确定"
			})
			return Promise.reject('error')
		case 502:
			return Promise.reject('error')
		case 503:
			uni.showModal({
				content: '未登录，请重新登录!',
				showCancel: false,
				confirmText: "确定"
			})
			return Promise.reject('error')
		case 401:
			uni.showModal({
				content: '未授权',
				showCancel: false,
				confirmText: "确定"
			})
			return Promise.reject('error')
		case 403:
			uni.showModal({
				content: '非法请求',
				showCancel: false,
				confirmText: "确定"
			})
			return Promise.reject('error')
		default:
			uni.showModal({
				content: '未知错误',
				showCancel: false,
				confirmText: "确定"
			})
			return Promise.reject('error')
	}
}, err => {
	uni.hideLoading();
	uni.showToast({
		title: err.message,
		icon: "none",
		duration: 1500
	});
	return Promise.reject(err)
})

fly.config.baseURL = host
fly.config.timeout = timeout;

export default fly
