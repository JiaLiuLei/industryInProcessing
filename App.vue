<script>
	export default {
		onLaunch: function() {
			uni.getLocation({
			    type: 'wgs84',
				geocode: true,
			    success: function (res) {
					// console.dir(res)
			    }
			});
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
