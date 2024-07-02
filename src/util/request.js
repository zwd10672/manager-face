import axios from 'axios';
import config from './../config';
import { ElMessage } from 'element-plus';
import router from './../router'
import storage from './storage';
const TOKEN_INVALIT = 'token验证失败，请重新登录'
const NETWORK_ERROR = '网络请求失败，请重新尝试'
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((req) => {
  const headers = req.headers
  const { token = '' } = storage.getItem('userInfo') || {}
  // const token = data.token || {}
  if (!headers.Authorization) headers.Authorization = 'Bearer ' + token
  return req
})
// 响应拦截器
service.interceptors.response.use((res) => {
  const { code, data, msg } = res
  if (data.code == 200) {
    return data
  } else if (data.code === 500001) {
    ElMessage.error(TOKEN_INVALIT)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALIT)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  let isMock = config.mock
  if (typeof options.mock != 'undefined') {
    isMock = options.mock
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options)
}


export default request