const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// vue.config.js
// 跨域处理
// module.exports = {
//   devServer: {
//
//   }
// }
// vue.config.js
module.exports = {
  devServer: {
    proxy: 'http://127.0.0.1:8080' // 将请求代理到后端服务地址
  }
}

