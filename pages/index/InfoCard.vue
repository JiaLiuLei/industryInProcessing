<template>
	<view class="containerInfo">
		<view class="user">
			<view class="info">
				<u-image width="64rpx" height="64rpx" shape="circle" :src="require('@/static/icon-via-default.png')"></u-image>
				<text class="name">{{alarm.handlePolice}}</text>
			</view>
			<text class="greeting">下午好，欢迎使用交巡警智能管理平台</text>
		</view>
		<!-- 执行任务中 -->
		<template v-if="isBusy">
			<view class="driving">
				<view>
					<text class="mileage">{{sourceData.todayPatrolDistance}}</text>km
					<view>今日累计巡逻里程</view>
				</view>
				<view class="plate">渝·{{cardNumber}}<text>警</text></view>
			</view>
			<view class="task">
				<view>
					<text class="completed">{{sourceData.totalHandleAlarm}}</text>起
					<view>警情处置数</view>
				</view>
				<view class="state" busy>
					正在进行接处警
					<text class="arrow"></text>
				</view>
			</view>
		</template>
		<!-- 空闲状态 -->
		<template v-else>
			<view class="generalize">
				<view>
					<text class="mileage">{{sourceData.todayPatrolDistance}}</text>km
					<view>今日累计巡逻里程</view>
				</view>
				<view>
					<text class="completed">{{sourceData.totalHandleAlarm}}</text>起
					<view>警情处置数</view>
				</view>
			</view>
			<view class="action">
				<view class="relevance" @tap="handleRelevanceClick(cardNumber)">
					<text class="icon"></text>
					{{cardNumber ? "解绑" : "绑定"}}巡逻车辆
				</view>
				<view class="state" Idle>
					当前正在巡逻中
					<text class="arrow"></text>
				</view>
			</view>
		</template>
		<InfoCardTaskDetail @change="$emit('onTaskStatusChange')" v-if="isBusy" :sourceData="alarm"></InfoCardTaskDetail>
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
			alarm() {
				return this.sourceData.alarm || {};
			},
			isBusy(){
				let status = false;
				const { alarm } = this.sourceData;
				if (alarm && alarm.status === 2) {
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
						const item = card.no;
						number = item.substring(1, item.length - 1);
					}catch{
						number = 0
					}
				}
				return number;
			}
		},
		methods: {
			handleRelevanceClick(status){
				if(status) { // 解绑
					uni.navigateTo({
						url: "/pages/relevance/index?status=1"
					})
				} else { // 绑定
					uni.scanCode({
						success(res){
							console.log(res);
						},
						fail(){
							
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.containerInfo{
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
