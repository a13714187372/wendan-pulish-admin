/*
*  用户相关请求模板
* */
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 请求体
    data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  return request({
    menthod: 'GET',
    url: '/mp/v1_0/user/profile',
    // axios可以通过 headers 选项设置请求头
    headers: {
    // 属性名和值都得看接口的要求
    // 属性名 Authorization 接口要求
    // 属性值 Bearer空格
      Authorization: 'Bearer '
    }
  })
}
