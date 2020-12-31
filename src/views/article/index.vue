<template>
  <div class="article-container">
    <el-card class="filter-card">
    <div slot="header" class="clearfix">
    <!-- 面包屑路径导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
  </el-breadcrumb>
    <!-- /面包屑路径导航 -->
   </div>
   <!-- 数据筛选表单 -->
  <el-form ref="form" :model="form" label-width="40px" size="mini">
          <el-form-item label="状态">
            <!--
             默认el-radio 默认是把文本的 loabel作为文本和选中之后的value值
             -->
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="form.region" placeholder="请选择频道">
              <el-option label="设计城市项目文档" value="1"></el-option>
              <el-option label="平安智慧城市项目文档" value="2"></el-option>
              <el-option label="i深圳政务项目文档" value="3"></el-option>
              <!-- <el-option
                  label="channel.name"
                 value="channel.id" v-for="(channel,index) in channels
                 :key="index"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="rangeDate"
                type="datetimerange"
                start-placeholder="开始日期"
               end-placeholder="结束日期"
              :default-time="['12:00:00']"
              format= "yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <!--
             button 按钮的click事件有个默认参数，没有指定参数的时候，它会默认传递一个没有用的数据
             -->
           <el-button
            type="primary"
            :disable="loading"
            @click="loadArticles(1)">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- /数据筛选表单 -->
        <!--
         table 表格组件
         1.把需要展示的数组列表数据进行绑定给表格 table 组件的data属性
            注意：你不需要v-for遍历，它自己会遍历
         2.设置表格列 el-table-column
            width可以设置表格列的宽度
            label可以设置列的标题
            prop 用来设定要渲染的列表项数据字段，默认只能渲染文本

         3.3、表格列默认只能渲染普通文本，如果需要展示其它内容，例如放个按钮啊、放个图片啊，那就需要自定义表格列模板了：https://element.eleme.cn/#/zh-CN/component/table#zi-ding-yi-lie-mo-ban
         -->
      </el-card>
       <el-card class="box-card">
            <div slot="header" class="clearfix">
              根据筛选条件共查询到 5 条结果：
            </div>
            <!-- 数据列表 -->
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              class="list-table"
              size="mini"
            >
              <el-table-column
                prop="date"
                label="封面"
                width="180">
                <template slot-scope="scope">
                 <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.address[0]"
                  fit="cover">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
              <!--  <img
                  v-if="scope.row.address[0]"
                  class="article-cover"
                  :scr="scope.row.address[0]" alt="">
                  <img
                  v-else class="article-cover"
                  scr="./no-cover.jpg" alt=""> -->
                  <!--
                   下面这种情况是在运行的时候期间进行动态运行的
                   而本地的图片必须要在打包的时候就存在-->
                  <!-- <img
                  class="article-cover"
                  :scr="scope.row.cover.images[0] || 'no.cover.jpg'" alt=""> -->
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="标题"
                width="180">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="180">
                <!-- 如果需要在自定义列模板中获取当前遍历项数据，那就在template上申明slot-scope="scope" -->
                <template slot-scope="scope">
                  <el-tag :type="articleStatus[scope.row.status].type" >{{ articleStatus[scope.row.status].text }}</el-tag>
                  <!-- <el-tag v-if="scope.row.status == 0" type="waring">草稿</el-tag>
                  <el-tag v-if="scope.row.status == 1">待审核</el-tag>
                  <el-tag v-if="scope.row.status == 2" type="success">审核通过</el-tag>
                  <el-tag v-if="scope.row.status == 3" type="danger">审核失败</el-tag>
                  <el-tag v-if="scope.row.status == 4" type="info">已删除</el-tag> -->
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="发布时间">
              </el-table-column>
              <el-table-column
                label="操作">
                <!-- 如果需要自定义表格模版，则需要自定义的内容放到 template里面 -->
                 <template>
                        <el-button
                          size="mini"
                          circle
                          icon="el-icon-edit"
                          type="primary"
                          ></el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          circle
                          icon="el-icon-delete"
                          @click="onDeleterArticle"
                          ></el-button>
                      </template>
              </el-table-column>
            </el-table>
            <!-- /数据列表 -->
            <!-- page-size每页显示条目的个数，支持和sync修饰符 -->
            <!-- 列表分页 :total="totalCount,pageSize: 20 每页大小" :page-size = 'pagesize'-->
            <el-pagination
              layout="prev, pager, next"
              background
              :total="1000"
              :page-size="2"
              :current-page.sync="page"
              @current-change= "onCurrentChange"
              :disable="loading"
              />
            <!-- /列表分页 -->
          </el-card>
        </div>
</template>

<script>
import {
  getArticles,
  getArtiChannels
} from '@/api/article.js'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '2016-05-02',
        status: '0'
      }, {
        date: '2020-08-01',
        name: '李小二',
        address: '2020-08-01',
        status: '1'
      }, {
        date: '1998-01-02',
        name: '张国山',
        address: '1998-01-02',
        status: '2'
      }, {
        date: '2021-09-30',
        name: '李春',
        images: '',
        address: '2021-09-30',
        status: '3'
      }, {
        date: '2021-09-30',
        name: '李春',
        address: '2021-09-30',
        status: '4'
      }],
      articles: [], // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      // totalCount: 0, // 总数据条数
      // pageSize: 0 // 每页大小
      // status: null // 查询文章的状态,不传默认就是全部
      // channels: [] // 文章频道
      // ChannelId：null 查询文章频道
      // rangeDate:[] 筛选的范围日期
      rangeDate: [],
      // loading: true // 表单加载数据中
      //
      page: 1 // 当前页码
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    this.loadArticles(1)
  },
  mounted () {},
  methods: {
    // 请求加载中
    // this.loading = false
    loadArticles (page = 1) {
      getArticles({
        page,
        per_page: 2, // this.pageSize,
        status: 0, // this.status
        channel_id: this.ChannelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pudbdate: this.rangeDate ? this.rangeDate[1] : null // 截至日期
      }).then(res => {
        // const { results, total_count: totalCount } = res.data.data
        // this.articles = results
        // this.totalCount = totalCount

        // 关闭加载中loading
        // this.loading = false
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      // console.log(page)
      // this.loadArticles(page)
    }
  },
  loadChannels () {
    getArtiChannels().then(res => {
      // console.log(res)
      // this.channels = res.data.data.channels
    })
  },
  onDeleterArticle () {
    console.log('onDeleterArticle')
    // 找到数据接口
    // 封装请求方法
    // 删除请求调用
    // 处理响应结果
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}

.article-cover {
  width: 100px;
  height: 100px;
  background-size: cover;
}
</style>
