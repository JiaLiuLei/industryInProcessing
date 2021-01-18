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
						const {
							longitude,
							latitude
						} = res;
						// 上班状态{0}才传定位
						uni.getStorage({
							key: 'storage_status',
							success: (res) => {
								this.storageSta = res.data;
								if (res.data == 0) {
									this.uploadLocation({
										longitude,
										latitude
									})
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
			
			
			
			// var test = {
			// 	"__UUID__": "androidPushMsg257978179",
			// 	"title": "指调通",
			// 	"appid": "__UNI__1A8B5B2",
			// 	"content": "测试别名推送",
			// 	"payload": {
			// 		"type": "1",
			// 		"content": "测试别名推送",
			// 		"data": "{\"alarmPersonName\":\"测试\",\"alarmPersonPhone\":\"13500311048\",\"alarmSituationId\":\"ZJ202101091342479940000000001\",\"content\":\"测试测试12121212\",\"orgId\":\"500105372500\",\"staffId\":\"102050\"}"
			// 	}
			// }
			
			// setInterval(() => {
			// 	this.$store.dispatch("broadcastMessage", JSON.parse(test.payload.data));
			// }, 5000);
			
			const _handlePush = function(message) {
				/**  
				 * 通过 vuex 来同步页面的数据，仅做演示。  
				 * 实际开发中，这里可能是跳转到某个页面等操作，请根据自身业务需求编写。  
				 */
				// var test = {
				// 	"__UUID__": "androidPushMsg257978179",
				// 	"title": "指调通",
				// 	"appid": "__UNI__1A8B5B2",
				// 	"content": "测试别名推送",
				// 	"payload": {
				// 		"type": "1",
				// 		"content": "测试别名推送",
				// 		"data": "{\"alarmPersonName\":\"测试\",\"alarmPersonPhone\":\"13500311048\",\"alarmSituationId\":\"ZJ202101091342479940000000001\",\"content\":\"测试测试12121212\",\"orgId\":\"500105372500\",\"staffId\":\"102050\"}"
				// 	}
				// }

				// console.log(message);
				// const { payload } = message;
				// if (payload == "1") {
				// 	this.$store.dispatch("broadcastMessage", JSON.parse(payload.data));
				// }
				// uni.navigateTo({
				// 	url: `/pages/task-detail/index?id=${id}`
				// })

				uni.vibrateLong({
					success: function() {
						console.log('success');
					}
				});
				_self.updatePushMessage(message);
			};
			plus.push.addEventListener('click', function(message) {
				plus.nativeUI.toast('push click');
				const { payload } = message;
				const reuslt = JSON.parse(payload.data);
				uni.navigateTo({
					url: `/pages/task-detail/index?id=${reuslt.alarmSituationId}`
				});
				_handlePush(message);
			});
			plus.push.addEventListener('receive', function(message) {
				plus.nativeUI.toast('push receive');
				
				const { payload } = message;
				const reuslt = JSON.parse(payload.data);
				if (payload.type == "1") {
					this.$store.dispatch("broadcastMessage", reuslt);
				}
				
				_handlePush(message);
			});
			// #endif
		},
		methods: {
			async uploadLocation(location) {
				const {
					longitude,
					latitude
				} = location;
				const params = {
					type: "person",
					pushBaseElementParamList: [{
						no: "1",
						location: `${longitude},${latitude}`
					}]
				}
				// console.log(params)
				try {
					const result = await api.uploadLocation(params);
					// console.log(result);
				} catch (error) {
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
