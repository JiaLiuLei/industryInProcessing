import config from "@/config"

const request = async (url, options = {}) => {
	// 获取登录token
	const token = uni.getStorageSync('token');
	
	// 合并选项
	if (options.header) {
		options.header = { ...options.header,  appkey: config.APP_KEY, token};
	} else {
		options.header = { appkey: config.APP_KEY, token };
	}
	
	uni.showLoading({
	    title: '加载中'
	});
	
	try{
		const [error, res] = await uni.request({
			url: `${config.BASE_URL}${url}`,
			...options
		});
		
		uni.hideLoading();
		
		if (error) {
			const { errMsg } = error;
			// console.log(errMsg)
			uni.showToast({
				title: errMsg,
				icon: "none",
				duration: 2000
			});
			return Promise.reject(error);
		}
		
		const { code, data, message } = res.data;
		
		switch(code){
			case 200:
				return Promise.resolve(data);
			case 302:
			case 303:
				//删除token
				uni.removeStorage({
					key: 'token',
					success: function () {
					}
				});
				//删除用户信息
				uni.removeStorage({
					key: 'userinfo',
					success: function () {
					}
				});
				//删除用户工作状态
				uni.removeStorage({
					key: 'storage_status',
					success: (res) => {
					}
				});
				//跳转登录页
				uni.reLaunch({
					url: '/pages/login/index'
				});
			default:{
				uni.showToast({
					title: message,
					icon: "none",
					duration: 2000
				});
				return Promise.reject(res);
			}
	
		}
		
	} catch(err) {
		uni.showToast({
			title: "发生未知问题，请稍后重试",
			icon: "none",
			duration: 2000
		});
		return Promise.reject(err);
	}
}

export default request;
