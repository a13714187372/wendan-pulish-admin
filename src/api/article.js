/*
 * 文章相关的请求模块
 *
*/
import request from '@/utils/request'

/**
 *  获取文章列表
 * */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles/:target',
    // body参数使用data设置
    // query参数使用params设置
    // headers 参数使用headers设置
    params
  })
}

/**
 *  获取文章频道
 * */
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
    // body参数使用data设置
    // query参数使用params设置
    // headers 参数使用headers设置
  })
}

/**
 * 删除文档
 * */
export const deleterArcticle = articleId => {
  return request({
    method: 'DELETE',
    // 接口文档中写的路径参数需要在url中传递
    // 凡是看见接口路径中有的 ：xxx格式的字段，则需要传递数据参数
    url: `/mp/v1_0/articles/${articleId}`
  })
}
