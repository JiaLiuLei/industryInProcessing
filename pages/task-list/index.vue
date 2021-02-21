<template>
	<view class="contentList">
		<view class="nav">
			<u-subsection inactive-color="#BDC1CC" active-color="#202536" :list="category" :current="currentTabIndex" @change="handleNavChange"></u-subsection>
		</view>
		<!-- 待处理 -->
		<view class="item" v-show="currentTabIndex === 0">
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
					<view class="action" @tap="handleNavigateToDetail(item.id)">接受</view>
				</view>
			</template>
			<u-empty margin-top="100" v-else mode="search" text="没有待处理的任务"></u-empty>
		</view>
		<!-- 处理中 -->
		<view class="item" v-show="currentTabIndex === 1">
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
					<view class="action" @tap="handleNavigateToDetail(item.id)">立即处理警情</view>
				</view>
			</template>
			<u-empty margin-top="100" v-else mode="search" text="没有处理中的任务"></u-empty>
		</view>
		<!-- 待回执 -->
		<view class="item" v-show="currentTabIndex === 2">
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
	import {
		getTask
	} from "@/api/task";

	export default {
		data() {
			return {
				unconfirmedTask: {
					total: 0,
					list: [],
					currentPage: 1,
					status: 2
				},
				inProgressTask: {
					total: 0,
					list: [],
					currentPage: 1,
					status: 3
				},
				completedTask: {
					total: 0,
					list: [],
					currentPage: 1,
					status: 0
				},
				listKeys: ["unconfirmedTask", "inProgressTask", "completedTask"],
				category: [{
						name: "待处理"
					},
					{
						name: "处理中"
					},
					{
						name: "已完成"
					}
				],
				currentTabIndex: 0,
				size: 10,
				loading: false
			}
		},
		onShow() {
			this.refresh();
		},
		onReachBottom() {
			if (this.loading) {
				this.loading = false;
				this.getTaskList();
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.refresh().then(() => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			async refresh() {
				const data = this[this.listKeys[this.currentTabIndex]];
				this[this.listKeys[this.currentTabIndex]] = {
					...data,
					total: 0,
					currentPage: 1,
					list: []
				}
				await this.getTaskList();
			},
			handleNavigateToDetail(id) {
				uni.navigateTo({
					url: `/pages/task-detail/index?id=${id}`
				})
			},
			handleNavChange(index) {
				this.currentTabIndex = index;
				const {
					total
				} = this[this.listKeys[this.currentTabIndex]];
				if (!total) {
					this.getTaskList();
				}
			},
			async getTaskList(index) {
				const data = this[this.listKeys[this.currentTabIndex]];
				const {
					total,
					list,
					currentPage,
					status
				} = data;

				if (total && list.length >= total) {
					return;
				}
				try {
					const result = await getTask({
						status,
						current: currentPage,
						size: this.size
					});
					console.log(result)
					this[this.listKeys[this.currentTabIndex]] = {
						...data,
						total: result.total,
						list: [...list, ...result.records],
						currentPage: currentPage + 1
					};
				} catch {}
				this.loading = true;
			},
			handlePhoneCall(number) {
				uni.makePhoneCall({
					phoneNumber: number
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contentList {
		padding-bottom: 50rpx;
	}

	.nav {
		padding: 20rpx 180rpx;
		background-color: #fff;
	}
	.item {
		padding: 0 50rpx;
	}

	.card {
		margin-top: 30rpx;
		padding: 20rpx;
		border-radius: 16rpx;
		background-color: #fff;

		.title {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;

			.user {
				display: flex;
				align-items: center;
				color: #424758;

				.via {
					margin-right: 10rpx;
				}

			}

			.relation {
				display: flex;
				align-items: center;
				color: #424758;
			}
		}

		.content {
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

		.action {
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

	.arrow {
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
