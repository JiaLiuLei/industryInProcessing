import config from "@/config"
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzM5MzExMTMxNTg3NTM4OTQ1IiwiZXhwIjoxNjEwNDU3MTYxLCJ1c2VySWQiOjEzMzkzMTExMzE1ODc1Mzg5NDUsImlhdCI6MTYxMDM3MDc2MSwiYWNjb3VudCI6IjEwMDIwMCIsInVzZXJLZXkiOiJ5ei5hbmJhby55aWRvbmcifQ.ROsljPR0fp2B30hMoxYSkmJYklCW8-zm9LgdVljKsQxCAadn7UBrkXjAbWUe45e1KrQTRYrzm-IxK9LYPvCJgA";
const request = (url, options) => {
	return uni.request({
		header: {
			appkey: config.APP_KEY,
			token
		},
		url: `${config.BASE_URL}${url}`,
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
