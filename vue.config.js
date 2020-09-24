module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://shopeach.lqtt.icu:8888/api/',// 要跨域的域名
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          '^/api': ''//请求的时候使用这个api就可以
      }
      }
    }
  }
}