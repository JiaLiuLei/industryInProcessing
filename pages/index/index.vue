<template>
	<!-- <view class="container" v-if="pageData"> -->
	<view class="container">
		<view class="map">
			<AMap :targetPosition="targetPosition" toolbar></AMap>
		</view>
		<view class="detail">
			<view class="nav">
				<view class="item">
					<u-icon name="list"></u-icon>
					<navigator class="title" url="/pages/task-list/index" hover-class="none">
						警情任务
					</navigator>
					<u-badge
						size="mini"
						:absolute="false"
						v-if="taskTotal"
						type="error"
						:count="taskTotal">
					</u-badge>
				</view>
				<view class="item">
					<u-icon name="server-fill"></u-icon>
					<navigator class="title" url="/pages/upload-task/index" hover-class="none">
						警情上报
					</navigator>
				</view>
			</view>
			<InfoCard @onTaskStatusChange="handleTaskStatusChange" :sourceData="pageData"></InfoCard>
		</view>
	</view>
</template>

<script>
	import AMap from "@/components/AMap";
	import InfoCard from "./InfoCard.vue";
	import { getHomeInfo } from "@/api/public";
	import { getTask } from "@/api/task";
	export default {
		components: {
			AMap,
			InfoCard
		},
		data() {
			return {
				pageData: {},
				taskTotal: 0
			}
		},
		computed:{
			targetPosition(){
				let target = [];
				try{
					const { alarm: { lng, lat, status } } = this.pageData;
					if(lng && lat && status === 3) {
						target = [lng, lat];
					}
				}catch{
					target = []
				}
				return target;
			}
		},
		onShow() {
			this.getPageData();
			this.getTaskList();
		},
		methods: {
			handleTaskStatusChange(){
				this.getPageData();
			},
			async getPageData(){
				try{
					const res = await getHomeInfo();
					this.pageData = res;
				}catch(error){
					// console.log(error);
					this.pageData = null;
				}
			},
			async getTaskList() {
				try{
					const list = await getTask({status: 2});
					this.taskTotal = list.length;
				}catch{
					this.taskTotal = 0
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.nav{
		display: flex;
		.item{
			flex: 1;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 25rpx 0;
			.title{
				margin: 0 10rpx;
			}
			&::after{
				content: '';
				position: absolute;
				top: 50%;
				width: 1rpx;
				height: 30rpx;
				background-color: #eee;
				right: 0;
				transform: translateY(-50%);
			}
		}
	}
	.map {
		flex: 1;
		position: relative;
		z-index: 1;
	}

	.detail {
		flex-shrink: 0;
		position: relative;
		margin-top: -32rpx;
		border-radius: 32rpx 32rpx 0px 0px;
		z-index: 2;
		background-color: #fff;
	}
</style>
