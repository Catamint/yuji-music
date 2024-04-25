const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

//为避免跨域问题,访问api和后端服务器要走代理
module.exports = {
  devServer: {
      open: true,
      host: '0.0.0.0',
      port: 8080,
      allowedHosts: 'all',
      proxy: {
          '/kugou': {
              target: 'https://m.kugou.com',
              changOrigin: true,
              pathRewrite: {
                  '^/kugou': ''
              }
          },
          '/mobilecdngz-kugou':{
            target:'http://mobilecdngz.kugou.com',
            changOrigin: true,
            pathRewrite: {
                '^/mobilecdngz-kugou': ''
            }
          },
          '/flask':{
            target:'localhost:5000',
            changOrigin: true,
            pathRewrite: {
                '^/flask': ''
            }
          }
          
      }
  }
}