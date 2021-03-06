module.exports = {
  transpileDependencies: ["vuetify"],
  //配置跨域请求
  devServer: {
    open: true,    //是否自动打开浏览器
    host: 'localhost',
    port: 8099,    //启动端口号
    https: false,    //是否开启https
    hotOnly: false,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://150.158.151.86:8090/api',
        ws: true,
        changOrigin: true,    //是否开启代理
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}