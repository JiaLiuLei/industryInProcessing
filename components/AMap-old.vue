<template>
	<view class="container">
		<view class="map" id="amap-container"></view>
		<view class="actions" v-if="toolbar">
			<!-- <view icon="refresh" @click="handleRefreshClick"></view> -->
			<view icon="position" @click="handlePositionClick"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			targetPosition: Array,
			toolbar: Boolean
		},
		data() {
			return {
				timer: null,
				init: false,
				map: null,
				coordinate: [],
				angle: 0,
				currentPositionMarker: null
			};
		},
		mounted() {
			this.loadMap();
			window.mapInit = () => {
				this.map = new AMap.Map('amap-container', {
					resizeEnable: true
				});
				// 罗盘
				uni.onCompassChange(res => {
					this.angle = res.direction;
				});
				
				// 定位
				this.setPosition(this.map);
			}
		},
		methods:{
			loadMap(){
				let script = document.createElement('script');
				script.charset = 'utf-8';
				script.src = "//webapi.amap.com/maps?v=1.4.15&key=5ac241df3e69cf12873e39951fa15208&callback=mapInit";
				document.body.appendChild(script);
			},
			setPosition(map) {
				if(!map) return;
				const onComplete = result => {
					const { position: {lat, lng} } = result;
					this.coordinate = [lng, lat];
					if(!this.init) {
						this.init = true;
						// 添加当前定位点
						this.currentPositionMarker = new AMap.Marker({
							content: "<div class='current-position'></div>",
							position:  this.coordinate,
							anchor: "center"
						});
						map.add(this.currentPositionMarker);
						map.setZoomAndCenter(13, this.coordinate);
						this.addTargetMarker(map, this.targetPosition);
					} else {
						this.currentPositionMarker.setAngle(this.angle);
					}
				}
				const onError = error => {
					console.log(error)
				}
				
				map.plugin('AMap.Geolocation',  () => {
					const options = {
				        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				        showButton: false,        //显示定位按钮，默认：true
				        showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
				        showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
				        panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
				        zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				    }
				    const geolocation = new AMap.Geolocation(options);

				    map.addControl(geolocation);
					
					geolocation.getCurrentPosition();
					
					this.timer = setInterval(() => {
						geolocation.getCurrentPosition();
					}, 3000)
					
				    AMap.event.addListener(geolocation, 'complete', onComplete);
				    AMap.event.addListener(geolocation, 'error', onError);
				});
			},
			// 添加目标点
			addTargetMarker(map, options) {
				if(Array.isArray(options) || !options.length) return;
				const marker =  new AMap.Marker({
					content: "<div class='target-position'></div>",
					position: options,
					anchor: "bottom-center"
				});
				map.add(marker);
				const bounds = new AMap.Bounds(this.coordinate, this.targetPosition);
				map.setBounds(bounds);
			},
			handlePositionClick() {
				this.map.setCenter(this.coordinate)
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
			this.map.destroy();
			uni.stopCompass();
			this.map = null;
			this.timer = null;
		}
	}
</script>

<style lang="scss">
.container{
	position: relative;
	width: 100%;
	height: 100%;
}
.map{
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 1;
	:global{
		/deep/ .amap-marker{
			transition: transform .3s;
			transform-origin: 50% 50% !important;
		}
		/deep/ .target-position{
			width: 88rpx;
			height: 100rpx;
			background: url(../static/icon-position-target.png) no-repeat;
			background-size: contain;
		}
		/deep/ .current-position{
			width: 60rpx;
			height: 64rpx;
			background: url(../static/icon-position-current.png) no-repeat;
			background-size: contain;
		}
	}
}
.actions{
	position: absolute;
	bottom: 50rpx;
	right: 50rpx;
	z-index: 2;
	[icon]{
		margin-top: 20rpx;
		width: 100rpx;
		height: 100rpx;
		background: #fff;
		box-shadow: 0px 0px 16rpx 0px rgba(235,235,235,1);
		border-radius: 16rpx;
		background-size: 48rpx;
		background-repeat: no-repeat;
		background-position: center;
		&:first-child{
			margin-top: 0;
		}
	}
	[icon="refresh"]{
		background-image: url(../static/icon-refresh.png);
		transition: transform .3s;
	}
	[icon="position"]{
		background-image: url(../static/icon-position.png);
	}
}
</style>
