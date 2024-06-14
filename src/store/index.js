import { createStore, createLogger } from 'vuex';
import mutations from './mutations';
import storage from '../util/storage';

const state = {
  userInfo: "" || storage.getItem('userInfo')
}
const debug = import.meta.env !== 'production'
export default createStore({
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})