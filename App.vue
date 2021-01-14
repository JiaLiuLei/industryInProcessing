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
			
			// #ifdef APP-PLUS
			const _self = this;
			const _handlePush = function(message) {
				/**  
				 * 通过 vuex 来同步页面的数据，仅做演示。  
				 * 实际开发中，这里可能是跳转到某个页面等操作，请根据自身业务需求编写。  
				 */  
				_self.updatePushMessage(message);
			};
			plus.push.addEventListener('click', function(message) {
				plus.nativeUI.toast('push click');
				_handlePush(message);
			});
			plus.push.addEventListener('receive', function(message) {
				plus.nativeUI.toast('push receive');
				_handlePush(message);
			});
			// #endif
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
