import axios from 'axios';
import config from './../config';
import { ElMessage } from 'element-plus';
import router from './../router'
const TOKEN_INVALIT = 'token验证失败，请重新登录'
const NETWORK_ERROR = '网络请求失败，请重新尝试'
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((req) => {
  const headers = req.headers
  if (!headers.Authorization)
    headers.Authorization = 'Bear Jack'
  return req
})
// 响应拦截器
service.interceptors.response.use((res) => {
  const { status, data, msg } = res
  if (status == 200) {
    return data
  } else if (code === 500001) {
    ElMessage.error(TOKEN_INVALIT)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase === 'get') {
    options.params = options.data
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}


export default request