import config from "@/config"

const request = (url, options) => {
	const token = uni.getStorageSync('token');
	let header = { appkey: config.APP_KEY, token};
	if (options && options.header) {
		header = {...options.header, ...header};
		delete options.header;
	}
	return uni.request({
		header,
		url: `${config.BASE_URL}${url}`,
		...options
	}).then(response => {
		const [error, res]  = response;
		const { code, data } = res.data;
		
		switch(code){
			case 200:
				return Promise.resolve(data);
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
			default: 
				return Promise.reject(res.data);
		}
	})
}

export default request;
