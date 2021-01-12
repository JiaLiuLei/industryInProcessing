import config from "@/config"
const token = uni.getStorageSync('token');
const request = (url, options) => {
	let header = { appkey: config.APP_KEY, token};
	if (options && options.header) {
		header = {...options.header, ...header};
		delete options.header;
	}
	return uni.request({
		header: header,
		url: `${config.BASE_URL}${url}`,
		...options
	}).then(response => {
		const [error, res]  = response;
		const { code, data } = res.data;
		switch(code){
			case 200:
				return Promise.resolve(data);
			case 303:
				uni.removeStorage({
					key: 'token',
					success: function () {
						uni.navigateTo({
						    url: '/pages/login/index'
						});
					}
				});
			default: 
				return Promise.reject(res.data);
		}
	})
}

export default request;
