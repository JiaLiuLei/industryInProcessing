<template>
	<view class="container">
		<u-navbar z-index="1" title="上报警情"></u-navbar>
		<u-cell-item title="警情位置" value="当前位置"></u-cell-item>
		<u-cell-item title="警情类型" :value="typeText" @tap="selectShow = true">
			<u-select
				slot="right-icon"
				v-model="selectShow"
				:default-value="[typeValue.extra || 0]"
				mode="single-column"
				:list="typeOptions"
				@confirm="handleTypeChange">
			</u-select>
		</u-cell-item>
		<view class="update">
			<view class="title">警情描述</view>
			<textarea v-model="describe" auto-height :maxlength="-1" class="textarea" placeholder-style="color:#BDC1CC"
			 placeholder="添加更加详细的警情描述" />
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
		<view class="btn mg" blue @tap="handleUpload">上报警情</view>
		<u-toast ref="uToast" />
		<SearchSite></SearchSite>
	</view>
</template>

<script>
	import config from "@/config";
	import * as api from "@/api/task";
	import SearchSite from "./SearchSite";
	export default {
		name: "update-task",
		components:{
			SearchSite
		},
		data() {
			return {
				uploadAction: `${config.BASE_URL}/file/upload`,
				fileList: [],
				appkey: config.APP_KEY,
				describe: "",
				selectShow: false,
				typeValue: {},
				typeOptions: [
					{
						label: '交通拥堵',
						value: 3,
						extra: 0
					},
					{
						label: '交通事故',
						value: 4,
						extra: 1
					},
					{
						label: '公民求助',
						value: 5,
						extra: 2
					},
					{
						label: '先期处置',
						value: 6,
						extra: 3
					},
					{
						label: '其他类型',
						value: 7,
						extra: 4
					},
				]
			}
		},
		computed:{
			typeText(){
				let text = "";
				if (this.typeValue) {
					text = this.typeValue.label;
				}
				return text;
			}
		},
		mounted() {
			this.typeValue = this.typeOptions[0];
		},
		methods:{
			handleTypeChange(args){
				this.typeValue = args[0];
			},
			handleImageUploadSuccess(data){
				const {data: { attachPath }} = data;
				const fullUrl = `${config.BASE_URL}${attachPath}`;
				this.fileList.push(fullUrl);
			},
			handleDeleteImage(index){
				this.fileList.splice(index, 1);
			},
			async handleUpload(){
				if (!this.describe) {
					this.$u.toast('请填写详细的描述');
					return
				}
				if(!this.fileList.length) {
					this.$u.toast('请上传图片');
					return
				}
				try{
					await api.uploadTask({
						alarmClass: this.typeValue.value,
						caseAddr: "测试警情地址",
						content: this.describe,
						lat: 0,
						lng: 0,
						pictures: this.fileList
					});
					uni.redirectTo({url: "/pages/index/index"});
				}catch(error){
					const { message } = error;
					this.$refs.uToast.show({
						title: message,
						type: 'error'
					})
				}
				console.log('提交')
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 52rpx;
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
		.btn{
			margin-top: 320rpx;
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
	}
</style>
