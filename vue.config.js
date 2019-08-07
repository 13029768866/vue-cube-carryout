const appData = require('./data.json')
const { seller, goods, ratings} = appData
// 配置别名依赖
const path = require('path');
const resolve = dir => path.resolve(__dirname, `src/${dir}/`);

module.exports = {
  // 关闭eslint
  lintOnSave: false,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack: config => {
    // 配置别名: 这里配置的多了会影响打包性能
    config.resolve
      .alias
      .set('@', resolve(''))
      .set('views', resolve('views'))
      .set('components', resolve('components'))
      .set('assets', resolve('assets'))
      .set('http', resolve('http'))
      .set('api', resolve('api'))
      .end();
  },
  devServer: {
    before(app){
      app.get('/api/seller',function(req,res) {
        res.json({
          error: 0,
          data: seller
        })
      })
      app.get('/api/goods',function(req,res) {
        res.json({
          error: 0,
          data: goods
        })
      })
      app.get('/api/ratings',function(req,res) {
        res.json({
          error: 0,
          data: ratings
        })
      })
    }
  }
 
}
