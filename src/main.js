import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
// 引入基础样式
import 'assets/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
