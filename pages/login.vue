<template>
	<div class="container">
		<div class="logo">
			<image src="../static/images/logo.png">
			</image>
		</div>
		<view class="section phone"><input type="text" placeholder="用户名" placeholder-style="color:#cccccc" v-model="loginName" /></view>
		<view class="section"><input password type="text" placeholder="密码" placeholder-style="color:#cccccc" v-model="passWord" /></view>
		<div class="button" @click="login1">
			<van-button class="vbutton" round type="info" size="large">登录</van-button>
		</div>
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
	background: #fff;
	.logo{
		text-align: center;
		image{
			width: 240rpx;
			height:240rpx;
			margin:108rpx 0 96rpx 0;
		}
	}
	.section {
		height: 104rpx;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 1);
		padding-left: 40rpx;
border-bottom: 1rpx solid #eeeeee;
		input {
			width: 100%;
			height: 100%;
		}
	}

	.phone {
		border-bottom: 1rpx solid #eeeeee;
	}

	.button {
		margin: 140rpx auto;
		width: 686rpx;
		height: 88rpx;
	}
}
</style>
