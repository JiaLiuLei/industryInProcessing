<template>
	<view class="container">
		<view :class="['item', { active: active >= 0 }]">
			<image src="../../static/icon-step-1.png" class="img" mode="aspectFit"></image>
			<view>接受警情</view>
		</view>
		<view class="space"></view>
		<view :class="['item', { active: active >= 1 }]">
			<image src="../../static/icon-step-2.png" class="img" mode="aspectFit"></image>
			<view>前往处理</view>
		</view>
		<view class="space"></view>
		<view :class="['item', { active: active >= 2 }]">
			<image src="../../static/icon-step-3.png" class="img" mode="aspectFit"></image>
			<view>完成警情</view>
		</view>
		<view class="space"></view>
		<view :class="['item', { active: active >= 3 }]">
			<image src="../../static/icon-step-4.png" class="img" mode="aspectFit"></image>
			<view>填写回执</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"stepNav",
		props:{
			active: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		margin-top: 20rpx;
		padding-bottom: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx solid #F0F0F0;
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 24rpx;
			opacity: .5;
			&.active{
				opacity: 1;
			}
		}
		.space{
			width: 40rpx;
			height: 8rpx;
			background: url(../../static/icon-step-space.png) no-repeat;
			background-size: contain;
		}
		.img{
			width: 48rpx;
			height: 48rpx;
			
		}
	}
</style>
