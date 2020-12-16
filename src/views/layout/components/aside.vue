<template>
  <el-menu
        class="nav-menu"
        default-active="2"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        >
        <el-menu-item index="/">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-menu"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="iconfont iconimage"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="iconfont iconpublish"></i>
          <span slot="title">发布项目文档</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="iconfont iconcomment"></i>
          <span slot="title">开发人员反馈</span>
        </el-menu-item>
        <el-menu-item index="fans">
          <i class="iconfont iconfanshuiliebiao"></i>
          <span slot="title">需求追踪</span>
        </el-menu-item>
        <el-menu-item index="/settings">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
</template>

<script>
export default {
  name: 'APPAside',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="less">
.nav-menu{
  .iconfont{
    margin-right: 10px;
    padding-left: 5px;
  }
}
</style>
