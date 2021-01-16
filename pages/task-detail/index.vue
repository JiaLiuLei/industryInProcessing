<template>
	<view class="container" v-if="pageData">
		<StepNav :active="activeIndex"></StepNav>
		<CardInfo :sourceData="cardData"></CardInfo>
		<template  v-if="activeIndex !== 3">
			<view class="map">
				<!-- <AMap :targetPosition="targetPosition"></AMap> -->
			</view>
			<view class="cell">
				<text>警情位置</text>
				<text class="msg">{{pageData.caseAddr}}</text>
			</view>
			<view class="cell">
				<text>警情时间</text>
				<text class="msg">{{pageData.createTime}}</text>
			</view>
		</template>
		<template v-if="activeIndex === 1">
			<view class="btn mg" blue @tap="handleImmediateProcessing(pageData.id, pageData.status)">立即处理</view>
			<view class="btn" @tap="handleLaterProcessing">稍后处理</view>
		</template>
		<template v-if="activeIndex === 2">
			<u-slider
				v-model="sliderValue"
				min="9"
				max="94"
				inactive-color="#F5F5F5"
				active-color="#8FFF43"
				height="120"
				:use-slot="true"
				@tap.native="handleSliderClick"
				@end="handleSliderEnd">
				<view>
					<view class="badge">
						<view class="icon"></view>
					</view>
				</view>
			</u-slider>
		</template>
		<template v-if="activeIndex === 3">
			<view class="update">
				<view class="title">回执说明内容</view>
				<textarea
					v-model="receiptContent"
					auto-height
					:maxlength="-1"
					class="textarea"
					placeholder-style="color:#BDC1CC"
					placeholder="添加更加详细的回执说明"/>
				<view class="upload">
					<u-upload
						width="195"
						height="195"
						:form-data="{type: 'image'}"
						:header="{appkey}"
						:action="uploadAction"
						@on-success="handleImageUploadSuccess"
						@on-remove="handleDeleteImage">
					</u-upload>
				</view>
			</view>
			<view class="btn mg" blue @tap="handleUploadReceipt">上传回执</view>
			<view class="btn" @tap="handleLaterProcessing">稍后填写回执</view>
		</template>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import StepNav from "./StepNav.vue";
	import CardInfo from "./CardInfo.vue";
	// import AMap from "@/components/AMap.vue";
	import * as api from "@/api/task";
	import config from "@/config";
	export default {
		name: "task-detail",
		components: {
			StepNav,
			CardInfo,
			// AMap
		},
		data() {
			return {
				activeIndex: 3,
				sliderValue: 9,
				pageData: null,
				finished: true,
				id: "",
				receiptContent: "",
				uploadAction: `${config.BASE_URL}/file/upload`,
				fileList: [],
				appkey: config.APP_KEY
			} 
		},
		computed:{
			cardData(){
				const { alarmPersonName, alarmPersonPhone, content } = this.pageData;
				return {
					name: alarmPersonName,
					phone: alarmPersonPhone,
					content
				}
			},
			targetPosition(){
				let target = [];
				try{
					const { lng, lat } = this.pageData;
					if(lng && lat) {
						target = [lng, lat];
					}
				}catch{
					target = []
				}
				return target;
			}
		},
		onLoad(params) {
			this.id = params.id;
			this.getPageData(params.id);
		},
		methods:{
			handleImageUploadSuccess(data){
				const {data: { attachPath }} = data;
				const fullUrl = `${config.BASE_URL}${attachPath}`;
				this.fileList.push(fullUrl);
			},
			handleDeleteImage(index){
				this.fileList.splice(index, 1);
			},
			// 上传回执
			async handleUploadReceipt(){
				if (!this.receiptContent) {
					this.$u.toast('请填写回执说明内容');
					return
				}
				if(!this.fileList.length) {
					this.$u.toast('请上传图片');
					return
				}
				try{
					await api.uploadReceipt({
						jqId: this.pageData.id,
						feedbackContent: this.receiptContent,
						feedbackUrls: this.fileList
					});
					this.handleLaterProcessing();
				}catch(error){
					const { message } = error;
					this.$refs.uToast.show({
						title: message,
						type: 'error'
					})
				}
			},
			async getPageData(id) {
				try{
					const result = await api.getTaskDetail({jqId: id});
					this.pageData = result;
					this.changeNavIndex(result.status);
				}catch(error){
					const { message } = error;
					this.$refs.uToast.show({
						title: message,
						type: 'error'
					})
				}
			},
			// 右滑完成当前警情
			async handleSliderEnd() {
				if (this.sliderValue < 94) {
					this.sliderValue = 9;
				} else {
					const { id, status } = this.pageData;
					try{
						await api.updateTaskStatus({
							jqId: id,
							status
						});
						this.getPageData(this.id);
					}catch(error){
						const { message } = error;
						this.$refs.uToast.show({
							title: message,
							type: 'error'
						})
					}
				}
			},
			changeNavIndex(status){
				let index = 1;
				switch(status){
					case 0:
					    index = 3;
					break;
					case 2:
						index = 1;
						break;
					case 3:
						index = 2;
						break;
				}
				this.activeIndex = index;
			},
			handleSliderClick() {
				this.sliderValue = 9;
			},
			handleLaterProcessing(){
				uni.navigateBack();
			},
			async handleImmediateProcessing(id, status){
				if(!this.finished) {
					return;
				}
				this.finished = false;
				try{
					await api.dealWithTask({jqId: id});
					uni.navigateTo('/pages/index/index');
				}catch(error){
					const { message } = error;
					this.$refs.uToast.show({
						title: message,
						type: 'error'
					})
				}
				this.finished = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding: 0 50rpx 50rpx;
		.map{
			margin-top: 30rpx;
			width: 100%;
			height: 300rpx;
			border-radius: 16rpx;
			border: 2rpx solid #D7D7D7;
			overflow: hidden;
		}
		.cell{
			margin-top: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32rpx;
			color: #BDC1CC;
			.msg{
				color: #424758;
			}
		}
		.btn{
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 16rpx;
			font-size: 32rpx;
			text-align: center;
			background-color: #F5F5F5;
			color: #6C6F7B;
			&[blue]{
				background-color: #0055FE;
				color: #fff;
			}
		}
		.btn + .btn{
			margin-top: 30rpx;
		}
		.mg{
			margin-top: 140rpx;
		}
		
		:global {
			/deep/ .u-slider {
				margin-top: 240rpx;
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
			width: 120rpx;
			height: 120rpx;
			background: url(../../static/icon-slider2.png) no-repeat;
			background-size: cover;
			.icon {
				width: 48rpx;
				height: 48rpx;
				background: url(../../static/icon-file-done.png) no-repeat;
				background-size: contain;
			}
		}
		.update{
			margin-top: 50rpx;
			.title{
				font-size: 32rpx;
				color: #202536;
			}
			.textarea{
				font-size: 28rpx;
				padding: 20rpx 0;
			}
			.upload{
				margin-top: 120rpx;
			}
		}
		
		
	}
</style>
