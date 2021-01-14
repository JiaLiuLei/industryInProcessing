<template>
	<view class="container">
		<view class="map" id="map-search"></view>
		<view class="tool">
			<view class="list">
				1
			</view>
			<input @input="handleSearchInput" type="text" />
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "searchSite",
		data() {
			return {
				placeSearch: null,
				addressList: []
			}
		},
		mounted() {
			this.loadMap();
			window.mapInit = () => {
				const map = new AMap.Map('map-search', {
					resizeEnable: true
				});

				// const auto = new AMap.Autocomplete({
				// 	input: "tipinput"
				// });

				this.placeSearch = new AMap.PlaceSearch({ map }); //构造地点查询类
				// AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
				// // AMap.event.addListener(placeSearch, "markerClick", (e) => {
				// // 	console.log(e.data.location.lng, e.data.location.lat) // 经纬度
				// // })
				// function select(e) {
				// 	placeSearch.setCity(e.poi.adcode);
				// 	placeSearch.search(e.poi.name); //关键字查询查询
				// }
			}
		},
		methods: {
			handleSearchInput(e) {
				const keywords = e.target.value;
				AMap.plugin('AMap.Autocomplete', () => {
					// 实例化Autocomplete
					const autoOptions = { city: "重庆" }
					const autoComplete = new AMap.Autocomplete(autoOptions);
					autoComplete.search(keywords, function(status, result) {
						const { tips } = result;
						this.addressList = tips;
					})
				})
			},
			loadMap() {
				let script = document.createElement('script');
				script.charset = 'utf-8';
				script.src =
					"//webapi.amap.com/maps?v=1.4.15&key=5ac241df3e69cf12873e39951fa15208&plugin=AMap.Autocomplete,AMap.PlaceSearch&callback=mapInit";
				document.body.appendChild(script);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		left: 0;
		top: 0;
		height: 100vh;
		width: 100vw;

		.map {
			position: relative;
			width: 100%;
			height: 100%;
			z-index: 1;
		}

		.tool {
			background-color: #fff;
			position: absolute;
			bottom: 400rpx;
			left: 100rpx;
			z-index: 2;
		}
	}
</style>
