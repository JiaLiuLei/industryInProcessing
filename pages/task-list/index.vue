<template>
	<view>
		<view :class="$style.nav">
			<u-subsection inactive-color="#BDC1CC" active-color="#202536" :list="category" :current="current" @change="handleNavChange"></u-subsection>
		</view>
		<!-- 待处理 -->
		<view :class="$style.item" v-show="current === 0">
			<template v-if="unconfirmedTask.length">
				<view :class="$style.card" v-for="item in unconfirmedTask" :key="item.id">
					<view :class="$style.title">
						<view :class="$style.user">
							<u-image width="48rpx" height="48rpx" :class="$style.via" src="../../static/icon-via-default.png" shape="circle"></u-image>
							{{item.alarmPersonName ? item.alarmPersonName : "匿名报警"}}
						</view>
						<view :class="$style.relation" @tap="handlePhoneCall(item.alarmPersonPhone)">
							联系报警人
							<text :class="$style.arrow"></text>
						</view>
					</view>
					<view :class="$style.content">
						<view :class="$style.text">{{item.content}}</view>
					</view>
					<view :class="$style.action" @tap="handleNavigateToDetail(item.id)">立即处理警情</view>
				</view>
			</template>
			<u-empty margin-top="100" v-else mode="search" text="没有待处理的任务"></u-empty>
		</view>
		<!-- 处理中 -->
		<view :class="$style.item" v-show="current === 1">
			<template v-if="inProgressTask.length">
				<view :class="$style.card" v-for="item in inProgressTask" :key="item.id">
					<view :class="$style.title">
						<view :class="$style.user">
							<u-image width="48rpx" height="48rpx" :class="$style.via" src="../../static/icon-via-default.png" shape="circle"></u-image>
							{{item.alarmPersonName ? item.alarmPersonName : "匿名报警"}}
						</view>
						<view :class="$style.relation" @tap="handlePhoneCall(item.alarmPersonPhone)">
							联系报警人
							<text :class="$style.arrow"></text>
						</view>
					</view>
					<view :class="$style.content">
						<view :class="$style.text">{{item.content}}</view>
					</view>
					<view :class="$style.action" @tap="handleNavigateToDetail(item.id)">完成警情</view>
				</view>
			</template>
			<u-empty margin-top="100" v-else mode="search" text="没有处理中的任务"></u-empty>
		</view>
		<!-- 待回执 -->
		<view :class="$style.item" v-show="current === 2">
			<template v-if="completedTask.length">
				<view :class="$style.card" v-for="item in completedTask" :key="item.id">
					<view :class="$style.title">
						<view :class="$style.user">
							<u-image width="48rpx" height="48rpx" :class="$style.via" src="../../static/icon-via-default.png" shape="circle"></u-image>
							{{item.alarmPersonName ? item.alarmPersonName : "匿名报警"}}
						</view>
						<view :class="$style.relation" @tap="handlePhoneCall(item.alarmPersonPhone)">
							联系报警人
							<text :class="$style.arrow"></text>
						</view>
					</view>
					<view :class="$style.content">
						<view :class="$style.text">{{item.content}}</view>
					</view>
					<view :class="$style.action" @tap="handleNavigateToDetail(item.id)">填写回执</view>
				</view>
			</template>
			<u-empty margin-top="100" v-else mode="search" text="没有待回执的任务"></u-empty>
		</view>
	</view>
</template>

<script>
	import { getTask } from "@/api/task";
	
	export default {
		data() {
			return {
				unconfirmedTask: [],
				inProgressTask: [],
				completedTask: [],
				category: [
					{
						name: "待处理"
					},
					{
						name: "处理中"
					},
					{
						name: "已完成"
					}
				],
				current: 0
			}
		},
		onLoad(){
			this.getTaskList(0);
		},
		methods: {
			handleNavigateToDetail(id){
				uni.navigateTo({
					url: `/pages/task-detail/index?id=${id}`
				})
			},
			handleNavChange(index) {
				this.current = index;
				this.getTaskList(index);
			},
			async getTaskList(index) {
				let status, key;
				switch(index){
					case 0:
						status = 2;
						key = "unconfirmedTask";
					break;
					case 1:
						status = 3;
						key = "inProgressTask";
					break;
					case 2:
						status = 0;
						key = "completedTask"
					break;
				}
				console.log(this[key])
				try{
					this[key] = await getTask({status});
				}catch{
					this[key] = [];
				}
				
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
