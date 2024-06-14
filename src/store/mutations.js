import storage from './../util/storage';

export default {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
    storage.setItem('userInfo', userInfo)
  }
}