<template>
	<view class="container">
		<u-image width="550rpx" height="550rpx" src="http://tgi1.jia.com/120/186/20186891.jpg"></u-image>
		<view class="plate">渝·A0008<text class="sign">警</text></view>
		<view class="user">
			<text class="tip">当前使用人</text>
			<u-image width="88rpx" height="88rpx" src="http://tgi1.jia.com/120/186/20186891.jpg" shape="circle"></u-image>
			<text class="name">周警官</text>
		</view>
		<!-- 绑定 -->
		<template v-if="status === 0">
			<view class="affirm" @tap="handleBind">确认绑定</view>
			<view class="cancel">
				<navigator open-type="navigateBack" hover-class="none">
					取消绑定
				</navigator>
			</view>
		</template>
		<!-- 解绑 -->
		<template v-else>
			<view class="affirm">解除绑定</view>
		</template>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as api from "@/api/user";
	
	export default {
		name: "relevance",
		data() {
			return {
				status: 0
			}
		},
		onLoad(params){
			this.status = ~~params.status;
		},
		methods:{
			async handleBind(){
				try{
					await api.bindPolice({"carNo": "渝AV770B","date": "20200202"})
				}catch(error){
					const { message } = error;
					this.$refs.uToast.show({
						title: message,
						type: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 120rpx 50rpx 54rpx;
	}
	.plate{
		margin-top: 50rpx;
		padding: 20rpx 50rpx;
		font-size: 36rpx;
		border: 4rpx solid #BDC1CC;
		border-radius: 8rpx;
		color: #000;
		background-color: #fff;
		.sign{
			color: #FF6854;
		}
	}
	.user{
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 170rpx;
		padding: 24rpx 30rpx;
		font-size: 32rpx;
		border-radius: 16rpx;
		box-sizing: border-box;
		color: #6C6F7B;
		background-color: #EEF0F5;
		.tip{
			flex: 1;
		}
		.name{
			margin-left: 28rpx;
			color: #202536;
		}
	}
	.affirm, .cancel{
		width: 100%;
		margin-top: 30rpx;
		font-size: 32rpx;
		padding: 28rpx 0;
		border-radius: 16rpx;
		text-align: center;
	}
	.affirm{
		background-color: #0055FE;
		color: #fff;
	}
	.cancel{
		background-color: #fff;
		color: #6C6F7B;
	}
</style>
