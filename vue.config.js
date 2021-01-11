module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://116.63.181.9'
      },
	  '/file': {
		  target: 'http://116.63.181.9'
	  }
    },
  }
}