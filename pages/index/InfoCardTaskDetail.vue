<template>
	<view :class="$style.container">
		<view :class="$style.card">
			<view :class="$style.title">
				<view :class="$style.user">
					<u-image width="48rpx" height="48rpx" shape="circle" :src="require('@/static/icon-via-default.png')"></u-image>
					<text :class="$style.name">{{sourceData.alarmPersonName ? sourceData.alarmPersonName : "匿名报警"}}</text>
				</view>
				<view :class="$style.right" @tap="handlePhoneCall(sourceData.alarmPersonPhone)">联系报警人<text :class="$style.arrow"></text></view>
			</view>
			<view :class="$style.content">
				<view :class="$style.text">{{sourceData.content}}</view>
			</view>
		</view>
		<u-slider
			v-model="sliderValue"
			min="11"
			max="94"
			inactive-color="#424758"
			active-color="#8FFF43"
			height="120"
			:use-slot="true"
			@click.native="handleSliderClick"
			@end="handleSliderEnd">
			<view>
				<view :class="$style.badge">
					<view :class="$style.icon"></view>
				</view>
			</view>
		</u-slider>
	</view>
</template>

<script>
	export default {
		name: "infoCardTaskDetail",
		props: {
			sourceData: Object
		},
		data() {
			return {
				sliderValue: 11
			}
		},
		methods: {
			handleSliderEnd() {
				if (this.sliderValue < 94) {
					this.sliderValue = 11;
				} else {
					console.log("成功")
					// const { id, status } = this.sourceData;
					// try{
					// 	await api.updateTaskStatus({
					// 		jqId: id,
					// 		status
					// 	});
					// 	this.getPageData(this.id);
					// }catch(error){
					// 	const { message } = error;
					// 	this.$refs.uToast.show({
					// 		title: message,
					// 		type: 'error'
					// 	})
					// }
				}
			},
			handleSliderClick() {
				this.sliderValue = 11;
			},
			handlePhoneCall(number){
				uni.makePhoneCall({
				    phoneNumber: number
				});
			}
		}
	}
</script>

<style lang="scss" module>
	.container {
		margin-top: 36rpx;
		border-top: 2rpx solid #3A3E4C;

		.card {
			margin-top: 30rpx;
			padding: 20rpx;
			border-radius: 16rpx;
			font-size: 28rpx;
			background-color: #fff;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #424758;

				.user {
					display: flex;
					align-items: center;

					.name {
						margin-left: 10rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;
				}
			}

			.content {
				margin-top: 20rpx;
				padding: 20rpx;
				color: #202536;
				border-radius: 8rpx;
				background-color: #F2F2F2;

				.text {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}

		:global {
			/deep/ .u-slider {
				margin-top: 30rpx;
				border-radius: 16rpx;

				&::after {
					content: '右划完成当前警情处理';
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 28rpx;
					color: #BDC1CC;
					z-index: 1;
				}

				.u-slider__gap {
					z-index: 2;
				}
			}
		}

		.badge {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 145rpx;
			height: 120rpx;
			background: url(../../static/icon-slider.png) no-repeat;
			background-size: cover;

			.icon {
				width: 48rpx;
				height: 48rpx;
				margin-right: 20rpx;
				background: url(../../static/icon-file-done.png) no-repeat;
				background-size: contain;
			}
		}
	}

	.arrow {
		display: block;
		width: 44rpx;
		height: 44rpx;
		background: url(../../static/icon-arrow.png) center center no-repeat;
		background-size: contain;
	}
</style>
