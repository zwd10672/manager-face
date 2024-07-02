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
// 登录
export const login = (params) => {
  return request({
    method: 'post',
    url: '/users/login',
    // url: '/login',
    data: params,
  })
}
// 消息通知列表
export const getNotice = (params) => {
  return request({
    method: 'get',
    url: '/leave/count',
    data: params,
    mock: true
  })
}
// 菜单列表
export const getMenuList = (params) => {
  return request({
    method: 'get',
    url: '/menu/list',
    data: params,
    mock: false
  })
}
// 用户列表
export const usersList = (params) => {
  return request({
    method: 'get',
    url: '/users/list',
    data: params,
    mock: false
  })
}
// 用户删除
export const usersDelete = (params) => {
  return request({
    method: 'post',
    url: '/users/delete',
    data: params,
    mock: false
  })
}
// 用户新增
export const usersOperate = (params) => {
  return request({
    method: 'post',
    url: '/users/operate',
    data: params,
    mock: false
  })
}
// 部门列表
export const deptsList = (params) => {
  return request({
    method: 'get',
    url: '/dept/list',
    data: params,
    mock: true
  })
}
// 角色名称列表
export const rolesAllList = (params) => {
  return request({
    method: 'get',
    url: '/roles/allList',
    data: params,
    mock: true
  })
}
// 角色列表
export const rolesList = (params) => {
  return request({
    method: 'get',
    url: '/roles/list',
    data: params,
    mock: true
  })
}