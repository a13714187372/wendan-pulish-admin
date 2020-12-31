/*
*项目的启动入口
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载element组件库
import ElementUI from 'element-ui'

// 加载 element组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式
import './styles/index.less'

// import JSONBIg from 'json-bigint'

// const str = '{"id":13234232323232323232}'

// console.log(JSON.parse(str))
// console.log(JSONBIg.parse(str)) 将超出范围的大数据通过BigNumber.toString()得到原来正确的数据

// // JSON.parse()
// JSONBIg.parse()
// // JSON.stringify()
// JSONBIg.stringify()

// 全局注册element的组件库
Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建vue根实例
// 把router配置到实例中
// 通过render方法把app根组件渲染到实例中。
new Vue({
  router,
  render: h => h(App)
  // el:'#app'//等价于 $mount('#app')
}).$mount('#app')
