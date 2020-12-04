/*
*项目的启动入口
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 加载全局样式
import './styles/index.less'
Vue.config.productionTip = false

// 创建vue根实例
// 把router配置到实例中
// 通过render方法把app根组件渲染到实例中。
new Vue({
  router,
  render: h => h(App)
  // el:'#app'//等价于 $mount('#app')
}).$mount('#app')
