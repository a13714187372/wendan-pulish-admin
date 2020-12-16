<template>
  <el-container class="layout-container">
  <el-aside
    class="aside"
    width="200px"
    >
    <app-aside class="aside-menu"/>
    </el-aside>
    <el-container>
     <el-header class="header">
      <div>
        <i class="el-icon-s-fold"></i>
       <span>广东白云学院项目文档管理系统</span>
       </div>
       <el-dropdown>
             <div class="avatar-wrap">
               <img :src="user.photo" alt="">
               <span>{{ user.name }}</span>
               <i class="el-icon-arrow-down el-icon--right"></i>
             </div>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>设置</el-dropdown-item>
               <el-dropdown-item>退出</el-dropdown-item>
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
      user: {} // 当前登录用户信息
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
