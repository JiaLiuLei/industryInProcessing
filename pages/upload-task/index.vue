<template>
	<view class="container">
		<u-navbar z-index="1" title="上报警情"></u-navbar>
		<u-cell-item title="警情位置" :value="address.name" @click="handleChosenPosition "></u-cell-item>
		<u-cell-item title="警情类型" :value="typeText" @click="selectShow = true">
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
			<textarea v-model="describe" :maxlength="-1" class="textarea" placeholder-style="color:#BDC1CC"
			 placeholder="添加更加详细的警情描述" />
			<!-- <view class="upload">
				<u-upload
					ref="upload"
					width="195"
					height="195"
					:form-data="{type: 'image'}"
					:header="{appkey}"
					:action="uploadAction"
					@on-success="handleImageUploadSuccess"
					@on-remove="handleDeleteImage">
				</u-upload>
			</view> -->
			<view class="flex-cell">
				<view class="upload">
					<view class="imglist" v-for="(val, idx) in fileList" :style="{marginRight: ((idx + 1) % 3 == 0 ? '0rpx' : '20rpx')}"><image :src="val" mode="aspectFill" class="picImg" @click="previewImg(idx)"></image><image src="../../static/delete-pic.png" mode="aspectFit" class="delete-pic" @click="deleteImg(idx)"></image></view>
					<view class="choose-img" @click="chooseImage1"><text class="add-icon">+</text></view>
				</view>
			</view>
		</view>
		<view class="btn mg" blue @click="handleUpload">上报警情</view>
	</view>
</template>

<script>
	import config from "@/config";
	import * as api from "@/api/task";
	export default {
		name: "update-task",
		data() {
			return {
				uploadAction: `${config.BASE_URL}/file/upload`,
				base_url: config.BASE_URL,
				fileList: [],
				imgFile: [],
				noneHostFile: [],
				appkey: config.APP_KEY,
				describe: "",
				selectShow: false,
				typeValue: {},
				address: {},
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
		onShow() {
			this.typeValue = this.typeOptions[0];
			uni.getLocation({
				geocode: true,
				success: res => {console.log(res)
					const { latitude, longitude } = res;
					this.address = { longitude, latitude, name: "当前位置", address: res.address.city + res.address.district + res.address.street + res.address.poiName }
				}
			})
		},
		methods:{
			handleChosenPosition(){
				uni.chooseLocation({
					success: (res) => {console.log(res)
						const { longitude, latitude, name, address } = res;
						this.address = { longitude, latitude, name: address, address };
					}
				})
			},
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
				const { longitude, latitude, name, address } = this.address;
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
						caseAddr: address,
						content: this.describe,
						lat: latitude,
						lng: longitude,
						picture: this.noneHostFile.toString(),
					});
					uni.showModal({
					    title: '提交成功',
					    content: '是否继续上报？',
					    success: (res) => {
					        if (res.confirm) {
					            console.log('用户点击确定');
								// 清空图片，清空文案
								// this.fileList = [];
								// this.$refs.upload.clear();
								this.imgFile = [];
								this.fileList = [];
								this.noneHostFile = [];
								this.describe = "";
					        } else if (res.cancel) {
					            console.log('用户点击取消');
								uni.redirectTo({url: "/pages/index/index"});
					        }
					    }
					});
				}catch{}
			},
			
			chooseImage1() {
				if(this.imgFile.length >= 9) {
					uni.showToast({
					    title: '最多上传9张图片',
					    duration: 2000,
						icon: 'none'
					});
					return false;
				} else{
					//选择图片
					uni.chooseImage({
						count: 9 - this.imgFile.length, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success: (res) => {
							// console.log(JSON.stringify(res.tempFilePaths));
							let temps = res.tempFilePaths
							this.imgFile.push(...temps);
							console.log(this.imgFile);
							//上传图片
							uni.showLoading({
							    title: '上传中...'
							});
							for(let i=0; i<temps.length; i++){
								uni.uploadFile({
									url: this.uploadAction,
									filePath: temps[i],
									name: 'file',
									formData: {
										'type': 'image',
										'file': temps[i]
									},
									header: {appkey: this.appkey},
									success: (uploadFileRes) => {
										// console.log(uploadFileRes.data);
										let res = JSON.parse(uploadFileRes.data);
										if(res.code == 200){
											this.fileList.push(this.base_url + res.data.attachPath);
											this.noneHostFile.push(res.data.attachPath);
										} else{
											uni.showToast({
											    title: '图片上传失败',
											    duration: 2000,
												icon: 'none'
											});
											this.imgFile = this.imgFile.filter((item, index) => index !== i);
										}
										if(i + 1 == temps.length) uni.hideLoading();
									}
								});
							}
						}
					});
				}
			},
			previewImg(current){
				// 预览图片
				uni.previewImage({
					current: current,
					urls: this.fileList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			deleteImg(idx){
				//删除图片
				this.imgFile = this.imgFile.filter((item, index) => index !== idx);
				this.fileList = this.fileList.filter((item, index) => index !== idx);
				this.noneHostFile = this.noneHostFile.filter((item, index) => index !== idx);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 52rpx;
		.update{
			margin-top: 50rpx;
			.title{
				font-size: 32rpx;
				color: #202536;
			}
			.textarea{
				height: 150rpx;
				font-size: 28rpx !important;
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
		.flex-cell{
			display: flex;
			.upload{
				margin-top: 40rpx;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			}
			.choose-img{
				display: flex;
				width: 202rpx;
				height: 202rpx;
				border-width: 2rpx;
				border-style: dashed;
				border-color: #ddd;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;
			}
			.add-icon{
				font-size: 52rpx;
				font-weight: 300;
				color: #BDC1CC;
			}
			.imglist{
				width: 202rpx;
				height: 202rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				background-color: #eee;
				position: relative;
			}
			.picImg{
				width: 202rpx;
				height: 202rpx;
				border-radius: 4rpx;
			}
			.delete-pic{
				width: 202rpx;
				height: 53rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 2;
			}
		}
	}
</style>
