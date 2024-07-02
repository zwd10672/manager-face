import { createStore, createLogger } from 'vuex';
import mutations from './mutations';
import storage from '../util/storage';

const state = {
  userInfo: {} || storage.getItem('userInfo'),
  menuList: storage.getItem('menuList'),
  actionList: storage.getItem('actionList'),
  noticeCount: 0
}
const debug = import.meta.env !== 'production'
export default createStore({
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})