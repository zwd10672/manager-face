import request from './../util/request'

// 用户登录
// export default {
//   login(params) {
//     return request({
//       method: 'post',
//       url: '/login',
//       data: params
//     })
//   }
// }
export const login = (params) => {
  return request({
    method: 'post',
    url: '/login',
    data: params
  })
}