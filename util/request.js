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
				if (token) {
					uni.removeStorage({
						key: 'token',
						success: function () {
							uni.reLaunch({
							    url: '/pages/login/index'
							});
						}
					});
				} else {
					uni.reLaunch({
					    url: '/pages/login/index'
					});
				}
				
			default: 
				return Promise.reject(res.data);
		}
	})
}

export default request;
