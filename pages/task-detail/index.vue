<template>
	<view :class="$style.container">
		<StepNav :active="activeIndex"></StepNav>
		<CardInfo></CardInfo>
		<template  v-if="activeIndex !== 3">
			<view :class="$style.map">
				<AMap :targetPosition="[121.302412, 31.24755]"></AMap>
			</view>
			<view :class="$style.cell">
				<text>警情位置</text>
				<text :class="$style.msg">红旗河沟立交桥武装检查站</text>
			</view>
			<view :class="$style.cell">
				<text>警情时间</text>
				<text :class="$style.msg">2020/11/12 12:32</text>
			</view>
		</template>
		<template v-if="activeIndex === 1">
			<view :class="[$style.btn, $style.mg]" blue>立即处理</view>
			<view :class="$style.btn">稍后处理</view>
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
				@click.native="handleSliderClick"
				@end="handleSliderEnd">
				<view>
					<view :class="$style.badge">
						<view :class="$style.icon"></view>
					</view>
				</view>
			</u-slider>
		</template>
		<template v-if="activeIndex === 3">
			<view :class="$style.update">
				<view :class="$style.title">回执说明内容</view>
				<textarea auto-height :maxlength="-1" :class="$style.textarea" placeholder-style="color:#BDC1CC" placeholder="添加更加详细的回执说明"/>
				<view :class="$style.upload">
					<u-upload width="195" height="195" ref="uUpload" :action="upLoadaction"></u-upload>
				</view>
			</view>
			<view :class="[$style.btn, $style.mg]" blue>上传回执</view>
			<view :class="$style.btn">稍后填写回执</view>
		</template>
	</view>
</template>

<script>
	import StepNav from "./StepNav.vue";
	import CardInfo from "./CardInfo.vue";
	import AMap from "@/components/AMap.vue";
	export default {
		name: "task-detail",
		components: {
			StepNav,
			CardInfo,
			AMap
		},
		data() {
			return {
				activeIndex: 3,
				sliderValue: 9,
				upLoadaction: 'http://www.example.com/upload'
			} 
		},
		methods:{
			handleSliderEnd() {
				if (this.sliderValue < 94) {
					this.sliderValue = 9;
				} else {
					console.log('成功')
				}
			},
			handleSliderClick() {
				this.sliderValue = 9;
			}
		}
	}
</script>

<style lang="scss" module>
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
