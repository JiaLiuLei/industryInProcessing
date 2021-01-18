<script>
	import * as api from "@/api/public";
	
	export default {
		data() {
			return {
				timer: null
			}
		},
		onLaunch: function() {
			// 10秒上传一次定位
			this.timer = setInterval(() => {
				uni.getLocation({
					type: "gcj02",
					geocode: true,
				    success: (res) => {
						const { longitude, latitude } = res;
						// 上班状态{0}才传定位
						uni.getStorage({
						    key: 'storage_status',
						    success: (res) => {
								this.storageSta = res.data;
								if(res.data == 0){
									this.uploadLocation({longitude, latitude})
								}
						    }
						});
				    }
				});
			}, 10000);
			
			
			
			// #ifdef APP-PLUS
			var pinf = plus.push.getClientInfo();
			var cid = pinf.clientid; //客户端标识
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
				uni.navigateTo({
					url: 'pages/index/index'
				});
			});
			plus.push.addEventListener('receive', function(message) {
				plus.nativeUI.toast('push receive');
				_handlePush(message);
				uni.navigateTo({
					url: 'pages/index/index'
				});
			});
			// #endif
		},
		methods:{
			async uploadLocation(location) {
				const { longitude, latitude } = location;
				const params = {
					type: "person",
					pushBaseElementParamList: [
						{
							no: "1",
							location: `${longitude},${latitude}`
						}
					]
				}
				// console.log(params)
				try{
					const result = await api.uploadLocation(params);
					// console.log(result);
				}catch(error){
					console.log(error);
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
