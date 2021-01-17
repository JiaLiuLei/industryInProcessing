<template>
	<view>
		<view class="nav">
			<u-subsection inactive-color="#BDC1CC" active-color="#202536" :list="category" :current="current" @change="handleNavChange"></u-subsection>
		</view>
		<!-- 待处理 -->
		<view class="item" v-show="current === 0">
			<template v-if="unconfirmedTask.total">
				<view class="card" v-for="item in unconfirmedTask.list" :key="item.id">
					<view class="title">
						<view class="user">
							<u-image width="48rpx" height="48rpx" class="via" src="../../static/icon-via-default.png" shape="circle"></u-image>
							{{item.alarmPersonName ? item.alarmPersonName : "匿名报警"}}
						</view>
						<view class="relation" @tap="handlePhoneCall(item.alarmPersonPhone)">
							联系报警人
							<text class="arrow"></text>
						</view>
					</view>
					<view class="content">
						<view class="text">{{item.content}}</view>
					</view>
					<view class="action" @tap="handleNavigateToDetail(item.id)">立即处理警情</view>
				</view>
			</template>
			<u-empty margin-top="100" v-else mode="search" text="没有待处理的任务"></u-empty>
		</view>
		<!-- 处理中 -->
		<view class="item" v-show="current === 1">
			<template v-if="inProgressTask.total">
				<view class="card" v-for="item in inProgressTask.list" :key="item.id">
					<view class="title">
						<view class="user">
							<u-image width="48rpx" height="48rpx" class="via" src="../../static/icon-via-default.png" shape="circle"></u-image>
							{{item.alarmPersonName ? item.alarmPersonName : "匿名报警"}}
						</view>
						<view class="relation" @tap="handlePhoneCall(item.alarmPersonPhone)">
							联系报警人
							<text class="arrow"></text>
						</view>
					</view>
					<view class="content">
						<view class="text">{{item.content}}</view>
					</view>
					<view class="action" @tap="handleNavigateToDetail(item.id)">完成警情</view>
				</view>
			</template>
			<u-empty margin-top="100" v-else mode="search" text="没有处理中的任务"></u-empty>
		</view>
		<!-- 待回执 -->
		<view class="item" v-show="current === 2">
			<template v-if="completedTask.total">
				<view class="card" v-for="item in completedTask.list" :key="item.id">
					<view class="title">
						<view class="user">
							<u-image width="48rpx" height="48rpx" class="via" src="../../static/icon-via-default.png" shape="circle"></u-image>
							{{item.alarmPersonName ? item.alarmPersonName : "匿名报警"}}
						</view>
						<view class="relation" @tap="handlePhoneCall(item.alarmPersonPhone)">
							联系报警人
							<text class="arrow"></text>
						</view>
					</view>
					<view class="content">
						<view class="text">{{item.content}}</view>
					</view>
					<view class="action" @tap="handleNavigateToDetail(item.id)">填写回执</view>
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
				unconfirmedTask: {total: 0, list: []},
				inProgressTask: {total: 0, list: []},
				completedTask: {total: 0, list: []},
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
				current: 0,
				currentPage: 1,
				size: 20,
				loading: false
			}
		},
		onBackPress(){
			this.getTaskList(this.current);
		},
		onShow(){
			this.getTaskList(this.current);
		},
		onReachBottom(){
			if (this.loading) {
				this.loading = false;
				this.getTaskList(this.current);
			}
		},
		methods: {
			handleNavigateToDetail(id){
				uni.navigateTo({
					url: `/pages/task-detail/index?id=${id}`
				})
			},
			handleNavChange(index) {
				this.current = index;
				this.currentPage = 1;
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
				if (this[key].total && this[key]['list'].length >= this[key].total) {
					return;
				}
				uni.showLoading({
				    title: '加载中'
				});
				try{
					const result = await getTask({status, current: this.currentPage, size: this.size});
					const { total, records } = result;
					if (this.currentPage === 1) {
						this[key] = {
							total,
							list: records
						};
					} else {
						this[key]['list'] = [...this[key]['list'], ...records];
					}
					this.currentPage += 1;
				}catch{
					this[key] = {};
				}
				this.loading = true;
				uni.hideLoading();
			},
			handlePhoneCall(number){
				uni.makePhoneCall({
				    phoneNumber: number
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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
