<template>
	<view class="call-box">
		<view class="btn" @click="exitBtn"><text class="btn-text cfff">退出帐号</text></view>
	</view>
</template>

<script>
	import config from "@/config";
	export default {
		data() {
			return {
				appkey: config.APP_KEY,
				base_url: config.BASE_URL
			}
		},
		methods: {
			exitBtn(){
				uni.showModal({
				    title: '退出登录',
				    content: '确定要退出登录？',
				    success: async (res) => {
				        if (res.confirm) {
				            console.log('用户点击确定');
							//删除token
							uni.removeStorage({
								key: 'token',
								success: function () {
								}
							});
							//删除用户信息
							uni.removeStorage({
								key: 'userinfo',
								success: function () {
								}
							});
							//删除用户工作状态
							uni.removeStorage({
								key: 'storage_status',
								success: (res) => {
								}
							});
							//跳转登录页
							uni.reLaunch({
								url: '/pages/login/index'
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style>
	.call-box{
		padding: 30rpx 30rpx;
		font-size: 32rpx;
	}
	.btn{
		display: flex;
		height: 100rpx;
		border-radius: 16rpx;
		text-align: center;
		background-color: #FF6854;
		justify-content: center;
		align-items: center;
	}
	.btn-text{
		color: #6C6F7B;
		font-size: 32rpx;
	}
	.cfff{
		color: #FFFFFF;
	}
	.mg{
		margin-top: 140rpx;
	}
	.mg-t30{
		margin-top: 30rpx;
	}
</style>
