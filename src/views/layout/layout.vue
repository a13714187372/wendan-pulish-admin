<template>
  <el-container class="layout-container">
  <el-aside
    class="aside"
    width="auto"
    >
    <app-aside
    class="aside-menu"
    :is-collapse="isCollapse"/>
    </el-aside>
    <el-container>
     <el-header class="header">
      <div>
        <!--
         class 样式处理{
           css类名：布尔值
         }
         true:作用类名
         false不作用
         -->
        <i
        :class="{
          'el-icon-s-fold': isCollapse,
          'el-icon-s-unfold': !isCollapse
        }"
        @click="isCollapse = !isCollapse"></i>
       <span>项目文档管理系统</span>
       </div>
       <el-dropdown>
             <div class="avatar-wrap">
               <img :src="user.photo" alt="">
               <span>{{ user.name }}</span>
               <i class="el-icon-arrow-down el-icon--right"></i>
             </div>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>设置</el-dropdown-item>
               <!-- 组件默认是不识别原生事件的，除非内部进行了处理 可以加上native进行处理-->
               <el-dropdown-item
               @click.native="onLogout">退出</el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由接口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边菜单栏展开
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化，请求获取用户资料
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 除了登录接口都需要别的接口都需要身份验证
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.localStorage.removeItem('user')

        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .layout-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .aside{
    background-color: #d3dec6;
    .aside-menu{
      height: 100%;
    }
  }

  .header{
    // background-color: #b3c0d1;
    border-bottom: 1px soild #ccc ;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }
  .main{
    background-color:  #e9eef3;
  }
  .avatar-wrap{
    display: flex;
    align-items: center;
    .avatar{
      width: 40px;
      height: 40px;
      border-right: 50%;
      margin-right: 50%;
    }
  }
</style>
