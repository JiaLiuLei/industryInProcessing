<template>
	<view :class="$style.container">
		<view :class="$style.map">
			<AMap :targetPosition="[121.302412, 31.24755]" toolbar></AMap>
		</view>
		<view :class="$style.detail">
			<InfoCard></InfoCard>
		</view>
	</view>
</template>

<script>
	import AMap from "@/components/AMap";
	import InfoCard from "./InfoCard.vue"
	export default {
		components:{AMap,InfoCard},
		
		mounted(){
			 
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" module>
	.container{
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.map{
		flex: 1;
		position: relative;
		z-index: 1;
	}
	.detail{
		flex-shrink: 0;
		position: relative;
		margin-top: -32rpx;
		padding: 50rpx;
		border-radius: 32rpx 32rpx 0px 0px;
		background-color: #2C2F3A;
		z-index: 2;
	}
</style>
