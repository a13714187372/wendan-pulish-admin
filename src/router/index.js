import Vue from 'vue'
import VueRouter from 'vue-router'

// 在 VueCli 创建的项目中@表示src目录
// 它是src目录中的路径别名
// 好处：它不受当前文件路径影响
// 注意：@就是 src路径,后面别忘了写哪个斜杠
// 建议：凡是需要进行路径查找的都使用@
import Login from '@/views/login'

Vue.use(VueRouter)

//  路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
