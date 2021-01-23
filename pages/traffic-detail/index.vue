<template>
	<view class="container">
		<view class="call-box">
			<view class="title">信息类型：</view>
			<view class="cell-db">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
		</view>
		<view class="call-box">
			<view class="title">所属路段：</view>
			<view class="input-db">
				<u-input type="text" v-model="road" placeholder="请输入路段名称" />
			</view>
		</view>
		<view class="call-box">
			<view class="title">详细地址：</view>
			<view class="input-db">
				<u-input type="text" v-model="addr" placeholder="请输入详细地址" />
			</view>
		</view>
		<view class="call-box">
			<view class="title">内容描述：</view>
			<view class="cell-db">
				<textarea v-model="description" :maxlength="-1" class="textarea" placeholder-style="color:#BDC1CC" placeholder="请输入上报信息内容" />
			</view>
		</view>
		<view class="flex-cell">
			<view class="upload">
				<view class="imglist" v-for="(val, idx) in fileList" :style="{marginRight: ((idx + 1) % 3 == 0 ? '0rpx' : '20rpx')}"><image :src="val" mode="aspectFill" class="picImg" @click="previewImg(idx)"></image><image src="../../static/delete-pic.png" mode="aspectFit" class="delete-pic" @click="deleteImg(idx)"></image></view>
				<view class="choose-img" @click="chooseImage1"><text class="add-icon">+</text></view>
			</view>
		</view>
		<view class="call-box">
			<view class="btn mg blue" @click="addTrafficInfo"><text class="btn-text cfff">提交</text></view>
		</view>
	</view>
</template>

<script>
	import * as api from "@/api/traffic";
	import config from "@/config";
	export default {
		name: "traffic-detail",
		components: {
		},
		data() {
			return {
				appkey: config.APP_KEY,
				base_url: config.BASE_URL,
				array: ['交通设施', '路面隐患', '标志标线', '交通组织建议', '其他工作建议'],
				index: 0,
				road: "",
				addr: "",
				description: "",
				status: 0,
				
				uploadAction: `${config.BASE_URL}/file/upload`,
				fileList: [],
				imgFile: [],
				noneHostFile: [],
				
				id: ""
			}
		},
		computed: {
		},
		async onNavigationBarButtonTap(val) {
			// console.log(val.index);
			// if (val.index == 1) {
			// 	console.log("第一个按钮");
			// }
			// if (val.index == 0) {
			// 	console.log("第二个按钮");
			// }
			uni.showModal({
			    title: '删除',
			    content: '确定删除本条交通安全信息？',
			    success: async (res) => {
			        if (res.confirm) {
			            console.log('用户点击确定');
						this.deleteTrafficInfo();
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		async onLoad(params) {
			this.id = params.id;
			this.getTrafficInfo();
		},
		onShow(){
		},
		onReachBottom(){
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			// 获取详情
			async getTrafficInfo() {
				try{
					const result = await api.getTrafficInfo(this.id);
					// console.log(result);
					this.index = result.type;
					this.road = result.road;
					this.addr = result.addr;
					this.description = result.description;
					this.status = result.status;
					if(result.picture.length > 0){
						this.fileList = result.picture.split(',').map((item) => {return this.base_url + item});
						this.imgFile = result.picture.split(',').map((item) => {return this.base_url + item});
						this.noneHostFile = result.picture.split(',');
					}
				}catch(res){
					console.log(res)
				}
			},
			// 删除信息
			async deleteTrafficInfo(){
				try{
					const result = await api.deleteTrafficInfo(this.id);
					// console.log(result);
					uni.showToast({
					    title: '删除成功',
					    duration: 2000,
						icon: 'success',
						success: () => {
						}
					});
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 2000)
				}catch(res){
					console.log(res)
				}
			},
			// 信息上报
			async addTrafficInfo() {
				if (!this.road) {
					uni.showToast({
					    title: '请输入路段名称',
					    duration: 2000,
						icon: 'none'
					});
					return
				}
				if (!this.addr) {
					uni.showToast({
					    title: '请输入详细地址',
					    duration: 2000,
						icon: 'none'
					});
					return
				}
				if (!this.description) {
					uni.showToast({
					    title: '请输入上报信息内容',
					    duration: 2000,
						icon: 'none'
					});
					return
				}
				// if (!this.fileList.length) {
				// 	uni.showToast({
				// 	    title: '请上传图片',
				// 	    duration: 2000,
				// 		icon: 'none'
				// 	});
				// 	return
				// }
				uni.getLocation({
					type: "gcj02",
					success: async res => {
						const {
							longitude,
							latitude
						} = res;
						try{
							const arr = {
								type: this.index,
								road: this.road,
								addr: this.addr,
								description: this.description,
								picture: this.noneHostFile,
								lng: longitude,
								lat: latitude,
								id: this.id
							};
							console.log(arr)
							const result = await api.updateTrafficInfo(arr);
							console.log(result);
							uni.showToast({
							    title: '修改成功',
							    duration: 2000,
								icon: 'success',
								success: () => {
								}
							});
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 2000)
						}catch(res){
							console.log(res)
						}
					}
				});
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
	.container{
		padding: 10rpx 0;
		.call-box{
			padding: 10rpx 30rpx;
			font-size: 32rpx;
			.cell-db{
				border: 3rpx solid #ddd;
				border-radius: 8rpx;
				padding: 16rpx 20rpx;
				margin-top: 10rpx;
				background-color: #fff;
				font-size: 28rpx !important;
				.textarea{
					width: 100%;
					height: 150rpx;
					font-size: 28rpx !important;
				}
			}
			.input-db{
				border: 3rpx solid #ddd;
				border-radius: 8rpx;
				padding: 0 20rpx;
				margin-top: 10rpx;
				background-color: #fff;
				font-size: 28rpx !important;
			}
		}
		.flex-cell{
			display: flex;
			.upload{
				margin-top: 40rpx;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 10rpx 30rpx;
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
	.btn{
		display: flex;
		height: 100rpx;
		border-radius: 16rpx;
		text-align: center;
		background-color: #F5F5F5;
		justify-content: center;
		align-items: center;
	}
	.btn-text{
		color: #6C6F7B;
		font-size: 32rpx;
	}
	.blue{
		background-color: #0055FE;
	}
	.cfff{
		color: #FFFFFF;
	}
	.mg{
		margin-top: 140rpx;
	}
	.mg-t30{
		margin-top: 30rpx;
	}
</style>
