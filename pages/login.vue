<template>
	<div class="container">
		<view class="section phone"><input type="text" placeholder="用户名" placeholder-style="color:#cccccc" v-model="loginName" /></view>
		<view class="section"><input password type="text" placeholder="密码" placeholder-style="color:#cccccc" v-model="passWord" /></view>
		<div class="button" @click="login1"><button type="primary" size="default">登录</button></div>
	</div>
</template>

<script>
import { getLogin, getOnline, getPersonnelDetails } from '@/api/login';
import { saveToken, saveUserInfo } from '@/utils/cache';

export default {
	name: 'login',
	data() {
		return {
			loginName: null,
			passWord: null
		};
	},
	methods: {
		res(){
		return new Promise((resolve,reject)=>{
			wx.requestSubscribeMessage({
				tmplIds: ['curCJOYeXU1HxImYq4L5xyFrjZaJWRlGswo6RHQPTKw'],
				success: function(res) {
					//成功
					resolve()
				},
				fail(err) {
					//失败
					console.error(err);
					reject()
				}
			});
		})	
		},
		login() {
			this.res().then(()=>{
				this.login1()
			})
		},
		login1() {
			if (!this.loginName || this.loginName === '') {
				uni.showToast({
					title: '请输入用户名',
					icon: 'none'
				});
				return;
			} else if (!this.passWord || this.passWord === '') {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return;
			}
			const loginType = 0;
			const loginSource = 1;
			getLogin(this.loginName, this.passWord, loginType, loginSource).then(response => {
				saveToken(response.data);
				getOnline(response.data).then(response1 => {
					saveUserInfo(response1.data);
					getPersonnelDetails(response1.data.id).then(response2 => {
						if (response2.data.length > 0) {
							if (response2.data[0].name === '厨师') {
								uni.switchTab({
									url: '/pages/business/cancel/cancel',
									animationType: 'pop-in',
									animationDuration: 300
								});
							} else {
								uni.navigateTo({
									url: '/pages/user/order',
									animationType: 'pop-in',
									animationDuration: 300
								});
							}
						} else {
							uni.navigateTo({
								url: '/pages/user/order',
								animationType: 'pop-in',
								animationDuration: 300
							});
						}
					});
				});
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	.section {
		height: 104rpx;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 1);
		padding-left: 40rpx;

		input {
			width: 100%;
			height: 100%;
		}
	}

	.phone {
		border-bottom: 1rpx solid #eeeeee;
	}

	.button {
		margin: 24rpx auto;
		width: 686rpx;
		height: 88rpx;
		border-radius: 4rpx;
	}
}
</style>
