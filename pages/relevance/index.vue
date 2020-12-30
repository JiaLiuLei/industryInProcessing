<template>
	<view :class="$style.container">
		<u-image width="550rpx" height="550rpx" src="http://tgi1.jia.com/120/186/20186891.jpg"></u-image>
		<view :class="$style.plate">渝·A0008<text :class="$style.sign">警</text></view>
		<view :class="$style.user">
			<text :class="$style.tip">当前使用人</text>
			<u-image width="88rpx" height="88rpx" src="http://tgi1.jia.com/120/186/20186891.jpg" shape="circle"></u-image>
			<text :class="$style.name">周警官</text>
		</view>
		<view :class="$style.affirm">确认绑定</view>
		<view :class="$style.cancel">取消绑定</view>
	</view>
</template>

<script>
	export default {
		name: "relevance"
	}
</script>

<style lang="scss" module>
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
