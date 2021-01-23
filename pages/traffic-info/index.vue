<template>
	<view class="container" v-if="list.length > 0">
		<navigator :url="'/pages/traffic-detail/index?id=' + item.id" hover-class="navigator-hover" class="traffic-li" v-for="item in list" :key="item.id">
			<view class="box">
				<view class="p"><text class="lab">信息类型：</text><text class="val">{{ typeVal[item.type] }}</text></view>
				<view class="p"><text class="lab">所属路段：</text><text class="val">{{ item.road }}</text></view>
				<view class="p"><text class="lab">详细地址：</text><text class="val">{{ item.addr }}</text></view>
				<view class="p"><text class="lab">内容描述：</text><text class="val">{{ item.description }}</text></view>
				<view class="p"><text class="lab">审核状态：</text><text class="val blue">{{ statusVal[item.status] }}</text></view>
				<view class="p"><text class="lab">上报时间：</text><text class="val">{{ item.createTime }}</text></view>
			</view>
		</navigator>
	</view>
	<u-empty margin-top="100" v-else mode="search" text="没有交通安全信息"></u-empty>
</template>

<script>
	import * as api from "@/api/traffic";
	import config from "@/config";
	export default {
		name: "traffic-info",
		components: {
		},
		data() {
			return {
				appkey: config.APP_KEY,
				typeVal:[
					"交通设施",
					"路面隐患",
					"标志标线",
					"交通组织建议",
					"其他工作建议",
				],
				statusVal: [
					"待审核",
					"审核通过"
				],
				total: 0,
				currentPage: 1,
				size: 40,
				loading: false,
				list: []
			}
		},
		computed: {
		},
		onLoad(params) {
			
		},
		async onShow(){
			this.total = 0;
			this.currentPage = 0;
			this.trafficList();
		},
		onNavigationBarButtonTap(val) {
			// console.log(val.index);
			// if (val.index == 1) {
			// 	console.log("第一个按钮");
			// }
			// if (val.index == 0) {
			// 	console.log("第二个按钮");
			// }
			uni.navigateTo({
				url: '/pages/traffic-add/index'
			})
		},
		onReachBottom(){
			if (this.loading) {
				this.loading = false;
				this.trafficList();
			}
		},
		methods: {
			// 信息上报列表
			async trafficList() {
				if (this.total && this.list.length >= this.total) {
					return;
				}
				try{
					//用户信息
					const userinfo = uni.getStorageSync('userinfo');
					// console.log({
					// 	current: this.currentPage,
					// 	size: this.size,
					// 	policeNo: userinfo.unique
					// })
					const result = await api.getTrafficList({
						current: this.currentPage,
						size: this.size,
						policeNo: userinfo.unique
					});
					console.log(result);
					this.currentPage = this.currentPage + 1;
					this.total = result.total;
					this.list = result.records;
				}catch(res){
					console.log(res)
				}
				this.loading = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding: 10rpx 0;
		.traffic-li{
			border-bottom: 2rpx solid #eee;
			.box{
				padding: 10rpx 30rpx;
				.p{
					padding: 10rpx 0;
					font-size: 28rpx;
					.val{
						color: #999;
						&.blue{
							color: #0055FE;
						}
					}
				}
			}
		}
	}
</style>
