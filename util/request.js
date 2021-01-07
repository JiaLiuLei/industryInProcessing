const BASE_URL = process.env.NODE_ENV === "production" ? "//116.63.181.9" : "";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzQ2ODE1NzE2ODA3OTY2NzIxIiwiZXhwIjoxNjEwMDI3MjY0LCJ1c2VySWQiOjEzNDY4MTU3MTY4MDc5NjY3MjEsImlhdCI6MTYwOTk0MDg2NCwiYWNjb3VudCI6IjMwMjc4MiIsInVzZXJLZXkiOiJqYi5qeGouand0In0.1_NU9o-Hce54pgoSoEDvQYYGrFq9lHbic0zyxx46RraIc4q-jd_tiOxosd1Nyomc5bSSFNRKmVkZqQYEngIDWw";
const request = (url, options) => {
	return uni.request({
		header: {
			appkey: 'jb.jxj.jwt',
			token
		},
		url: `${BASE_URL}${url}`,
		...options
	}).then(response => {
		const [error, res]  = response;
		const { code, data } = res.data;
		switch(code){
			case 200:
				return Promise.resolve(data);
			case 302:
				uni.navigateTo({
				    url: '/pages/login/index'
				});
			default: 
				return Promise.reject(res.data);
		}
	})
}

export default request;
