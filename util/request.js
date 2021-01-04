const BASE_URL = process.env.NODE_ENV === "production" ? "//116.63.181.9" : "";
const request = (url, options) => {
	return uni.request({
		header: {
			appkey: 'jb.jxj.jwt',
			token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzM5MzExMTMxNTg3NTM4OTQ1IiwiZXhwIjoxNjA5ODQ4MTI5LCJ1c2VySWQiOjEzMzkzMTExMzE1ODc1Mzg5NDUsImlhdCI6MTYwOTc2MTcyOSwiYWNjb3VudCI6IjEwMDIwMCIsInVzZXJLZXkiOiJ5ei5hbmJhby55aWRvbmcifQ.rMHE1RKKUE0noiume8r2P3N7-vh7VNNf5majxQ-93t0Mrw-lrtLIsmlL9I31l-F172AstWp5vJt1CdZ8Z324VQ"
		},
		url: `${BASE_URL}${url}`,
		...options
	}).then(response => {
		const [error, res]  = response;
		const { code, data } = res.data;
		switch(code){
			case 200:
				return Promise.resolve(data);
			default: 
				return Promise.reject(res.data);
		}
	})
}

export default request;
