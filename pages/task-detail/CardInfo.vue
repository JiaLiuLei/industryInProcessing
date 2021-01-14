<template>
	<view class="container">
		<view class="title">
			<view class="user">
				<u-image width="64rpx" height="64rpx" class="via" src="../../static/icon-via-default.png" shape="circle"></u-image>
				{{sourceData.name ? sourceData.name : "匿名报警"}}
			</view>
			<view class="right" @tap="handlePhoneCall(sourceData.phone)">联系报警人<text class="arrow"></text></view>
		</view>
		<view class="content">{{sourceData.content}}</view>
	</view>
</template>

<script>
	export default {
		name: "cardInfo",
		props: {
			sourceData: Object
		},
		methods: {
			handlePhoneCall(number) {
				uni.makePhoneCall({
					phoneNumber: number
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding-top: 30rpx;

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.user {
				display: flex;
				align-items: center;

				.via {
					margin-right: 20rpx;
				}
			}
		}
	}

	.right {
		display: flex;
		align-items: center;
	}

	.arrow {
		width: 44rpx;
		height: 44rpx;
		background: url(../../static/icon-arrow.png) center center no-repeat;
		background-size: contain;
	}

	.content {
		margin-top: 30rpx;
		padding: 20rpx;
		background: #F2F2F2;
		border-radius: 8rpx;
	}
</style>
