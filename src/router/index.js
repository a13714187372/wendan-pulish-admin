import Vue from 'vue'
import VueRouter from 'vue-router'

// 在 VueCli 创建的项目中@表示src目录
// 它是src目录中的路径别名
// 好处：它不受当前文件路径影响
// 注意：@就是 src路径,后面别忘了写哪个斜杠
// 建议：凡是需要进行路径查找的都使用@
import Login from '@/views/login/'
import Home from '@/views/home/'
import layout from '@/views/layout/layout.vue'
import Article from '@/views/article/'

Vue.use(VueRouter)

//  路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // z正确做法，有默认子路由，就不要给父路由起名
    // name: 'layout',
    component: layout,
    children: [
      {
        path: '', // path为空，会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫： 说白了所有的页面的导航都会经过这里
// 守卫页面的导航的
// to:要去的路由信息
// form:来自哪里的路由信息
// next:放行方法
// router.beforeEach((to, from, next) => {
// 如果要访问的页面不是 /login，校验登录状态
// 如果没有登录，则跳转到登录页面
// 如果登录了，则允许通过
// 允许通过
// const user = JSON.parse(window.localStorage.getItem('user'))
// 校验非登录页面的登录状态
//   if (to.path !== '/login') {
//     if (user) {
//       // 已登录，允许通过
//       next()
//     } else {
//       // 没有登录，跳转到登录页面
//       next('/login')
//     }
//   } else {
//     // 登录页面，正常允许通过
//     next()
//   }
// })
export default router
