<template>
	<view :class="$style.container">
		<view :class="$style.user">
			<view :class="$style.info">
				<u-image width="64rpx" height="64rpx" shape="circle" :src="require('@/static/icon-via-default.png')"></u-image>
				<text :class="$style.name">周警官</text>
			</view>
			<text :class="$style.greeting">下午好，欢迎使用交巡警智能管理平台</text>
		</view>
		<!-- 执行任务中 -->
		<template v-if="isBusy">
			<view :class="$style.driving">
				<view>
					<text :class="$style.mileage">{{sourceData.todayPatrolDistance}}</text>km
					<view>今日累计巡逻里程</view>
				</view>
				<view :class="$style.plate">渝·{{cardNumber}}<text>警</text></view>
			</view>
			<view :class="$style.task">
				<view>
					<text :class="$style.completed">{{sourceData.totalHandleAlarm}}</text>起
					<view>警情处置数</view>
				</view>
				<view :class="$style.state" busy>
					正在进行接处警
					<text :class="$style.arrow"></text>
				</view>
			</view>
		</template>
		<!-- 空闲状态 -->
		<template v-else>
			<view :class="$style.generalize">
				<view>
					<text :class="$style.mileage">{{sourceData.todayPatrolDistance}}</text>km
					<view>今日累计巡逻里程</view>
				</view>
				<view>
					<text :class="$style.completed">{{sourceData.totalHandleAlarm}}</text>起
					<view>警情处置数</view>
				</view>
			</view>
			<view :class="$style.action">
				<view :class="$style.relevance">
					<text :class="$style.icon"></text>
					{{cardNumber ? "解绑" : "绑定"}}巡逻车辆
				</view>
				<view :class="$style.state" Idle>
					当前正在巡逻中
					<text :class="$style.arrow"></text>
				</view>
			</view>
		</template>
		<InfoCardTaskDetail v-if="isBusy" :sourceData="sourceData.alarm"></InfoCardTaskDetail>
	</view>
</template>

<script>
	import InfoCardTaskDetail from "./InfoCardTaskDetail.vue";
	export default{
		name:"infoCard",
		props:{
			sourceData: Object
		},
		components: {
			InfoCardTaskDetail
		},
		computed:{
			isBusy(){
				let status = false;
				const { alarm } = this.sourceData;
				if (alarm && alarm.status === 3) {
					status = true;
				}
				return status;
			},
			cardNumber(){
				let number = 0;
				const { bindCard } = this.sourceData;
				if (Array.isArray(bindCard) && bindCard.length) {
					const card = bindCard[0];
					try{
						number = card.slice(1, card.length - 1);
					}catch{
						number = 0
					}
				}
				return number;
			}
		}
	}
</script>

<style lang="scss" module>
	.container{
		padding: 50rpx;
		font-size: 24rpx;
		border-radius: 32rpx 32rpx 0px 0px;
		background-color: #2C2F3A;
		color: #6C6F7B;
	}
	.user{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.info{
			display: flex;
			align-items: center;
			.name{
				margin-left: 20rpx;
				font-size: 36rpx;
				color: #fff;
			}
		}
		.greeting{
			font-size: 24rpx;
			color: #BDC1CC;
		}
	}
	.mileage{
		font-size: 100rpx;
		line-height: 1;
		color: #fff;
		font-family: Helvetica;
	}
	.completed{
		font-size: 60rpx;
		line-height: 1;
		color: #fff;
		font-family: Helvetica;
	}
	.driving{
		margin-top: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.plate{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 300rpx;
		height: 88rpx;
		font-size: 36rpx;
		border-radius: 8rpx;
		border: 4rpx solid #BDC1CC;
		box-sizing: border-box;
		background-color: #fff;
		color: #000;
		uni-text{
			color: #FF6854;
		}
	}
	.task{
		margin-top: 34rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.state{
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #fff;
		&::before{
			content: '';
			width: 16rpx;
			height: 16rpx;
			margin-right: 20rpx;
			border-radius: 50%;
		}
		&[Idle]:before{
			background-color: #55FF00;
		}
		&[busy]:before{
			background-color: #FF6854;
		}
		.arrow{
			width: 44rpx;
			height: 44rpx;
			background: url(../../static/icon-arrow.png) center center no-repeat;
			background-size: contain;
		}
	}
	.generalize{
		margin-top: 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.action{
		margin-top: 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.relevance{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 300rpx;
			height: 88rpx;
			font-size: 28rpx;
			color: #BDC1CC;
			background: #424758;
			border-radius: 8rpx;
			.icon{
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
				background: url(../../static/icon-relevance.png);
			}
		}
	}
</style>
