const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
      open: true,
      host: 'localhost',
      port: 8080,
      proxy: {
          '/kugou': {    //1
              target: 'http://m.kugou.com',    //2
              changOrigin: true,
              pathRewrite: {    //3
                  '^/kugou': ''
              }
          },
          '/kugou-api':{
            target:'http://mobilecdnbj.kugou.com/api',
            changOrigin: true,
            pathRewrite: {    //3
                '^/kugou-api': ''
            }
          }
          
      }
  }
}