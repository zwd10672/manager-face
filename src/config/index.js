/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'https://apifoxmock.com/m1/4647664-4298320-default'
  },
  test: {
    baseApi: '',
    mockApi: 'https://apifoxmock.com/m1/4647664-4298320-default'
  },
  prod: {
    baseApi: '',
    mockApi: 'https://apifoxmock.com/m1/4647664-4298320-default'
  }
}
console.log(EnvConfig);
export default {
  env,
  // mock: true,
  mock: false,
  namespace: 'manager',
  ...EnvConfig[env]
}