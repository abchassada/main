const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/show': {
        target: 'http://192.168.5.60:31089/show', // 后端接口
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '/show': ''
        }
      }
    }
  }
})
