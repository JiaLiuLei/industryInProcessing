<template>
	<view>
		<view :class="$style.nav">
			<u-subsection inactive-color="#BDC1CC" active-color="#202536" :list="category" :current="current" @change="handleNavChange"></u-subsection>
		</view>
		<!-- 处理 -->
		<view :class="$style.item" v-show="!current">
			<view :class="$style.card">
				<view :class="$style.title">
					<view :class="$style.user">
						<u-image width="48rpx" height="48rpx" :class="$style.via" src="../../static/icon-via-defualt.png" shape="circle"></u-image>
						匿名报警
					</view>
					<view :class="$style.relation">
						联系报警人
						<text :class="$style.arrow"></text>
					</view>
				</view>
				<view :class="$style.content">
					<view :class="$style.text">刚才红旗河沟立交自西向东路口发生擦刮纠纷</view>
				</view>
				<view :class="$style.action">立即处理警情</view>
			</view>
		</view>
		<!-- 回执 -->
		<view :class="$style.item" v-show="current">
			<view :class="$style.card">
				<view :class="$style.title">
					<view :class="$style.user">
						<u-image width="48rpx" height="48rpx" :class="$style.via" src="../../static/icon-via-defualt.png" shape="circle"></u-image>
						匿名报警
					</view>
					<view :class="$style.relation">
						联系报警人
						<text :class="$style.arrow"></text>
					</view>
				</view>
				<view :class="$style.content">
					<view :class="$style.text">刚才红旗河沟立交自西向东路口发生擦刮纠纷</view>
				</view>
				<view :class="$style.action">填写回执</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				category: [
					{
						name: "待处理"
					},
					{
						name: "待回执"
					}
				],
				current: 0
			}
		},
		methods: {
			handleNavChange(index) {
				this.current = index;
			}
		}
	}
</script>

<style lang="scss" module>
	.nav{
		padding: 20rpx 180rpx;
		background-color: #fff;
	}
	.item{
		padding: 0 50rpx;
	}
	.card{
		margin-top: 30rpx;
		padding: 20rpx;
		border-radius: 16rpx;
		background-color: #fff;
		.title{
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			.user{
				display: flex;
				align-items: center;
				color: #424758;
				.via{
					margin-right: 10rpx;
				}
				
			}
			.relation{
				display: flex;
				align-items: center;
				color: #424758;
			}
		}
		.content{
			margin-top: 20rpx;
			padding: 20rpx;
			background: #F2F2F2;
			border-radius: 8rpx;
			.text {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
		.action{
			margin-top: 20rpx;
			padding: 28rpx;
			text-align: center;
			font-size: 32rpx;
			border-radius: 16rpx;
			color: #0055FE;
			background-color: #F5F5F5;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
		}
	}
	.arrow{
		display: block;
		width: 44rpx;
		height: 44rpx;
		background: url(../../static/icon-arrow.png) center center no-repeat;
		background-size: contain;
	}
</style>
<style>
	page {
	  background-color: #FAFAFA;
	} 
</style>
