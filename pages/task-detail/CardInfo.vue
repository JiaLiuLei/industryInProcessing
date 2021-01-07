<template>
	<view :class="$style.container">
		<view :class="$style.title">
			<view :class="$style.user">
				<u-image width="64rpx" height="64rpx" :class="$style.via" src="../../static/icon-via-default.png" shape="circle"></u-image>
				匿名报警
			</view>
			<view :class="$style.right">联系报警人<text :class="$style.arrow"></text></view>
		</view>
		<view :class="$style.content">刚才红旗河沟立交自西向东路口发生擦刮纠纷</view>
	</view>
</template>

<script>
	export default {
		name: "cardInfo"
	}
</script>

<style lang="scss" module>
	.container{
		padding-top: 30rpx;
		.title{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.user{
				display: flex;
				align-items: center;
				.via{
					margin-right: 20rpx;
				}
			}
		}
	}
	.right{
		display: flex;
		align-items: center;
	}
	.arrow{
		width: 44rpx;
		height: 44rpx;
		background: url(../../static/icon-arrow.png) center center no-repeat;
		background-size: contain;
	}
	.content{
		margin-top: 30rpx;
		padding: 20rpx;
		background: #F2F2F2;
		border-radius: 8rpx;
	}
</style>
