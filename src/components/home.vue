<script setup>
import { ref, reactive } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { getNotice, getMenuList } from "./../api/user"
import TreeMenu from "./TreeMenu.vue"
import BreadCrumb from "./BreadCrumb.vue"
import storage from "../util/storage"
const store = useStore()
const router = useRouter()
let isCollapse = ref(false)
let userInfo = store.state.userInfo
let noticeCount = ref(0)
// let userMenu = ref([])
const state = reactive({
  userMenu: []
})

const handleLogout = key => {
  if (key == "email") {
    return
  }
  store.commit("saveUserInfo", "")
  userInfo = {}
  router.push("/login")
}
const notice = async () => {
  try {
    const res = await getNotice()
    store.commit("saveNoticeCount", res.data)
    noticeCount = res.data
  } catch (error) {
    console.error(error)
  }
}
const menuList = async () => {
  const res = await getMenuList()
  const menuList = res.data
  store.commit("saveMenuList", menuList)
  state.userMenu = menuList
}

notice()
menuList()
</script>

<template>
  <div class="basic-layout">
    <div class="nav-side" :class="isCollapse ? 'fold' : 'unfold'">
      <!-- 系统LOGO -->
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        default-active="activeMenu"
        class="nav-menu"
        router
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse"
      >
        <TreeMenu :userMenu="state.userMenu" />
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <el-icon class="menu-fold"
            ><Fold @click="isCollapse = !isCollapse"
          /></el-icon>
          <!-- <div class="userinfo">管理系统</div> -->
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>

        <div class="user-info">
          <el-badge
            :is-dot="noticeCount > 0 ? true : false"
            class="notice"
            type="danger"
          >
            <el-icon><Bell /></el-icon>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}
              <el-icon class="bottom"><ArrowRight /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱：
                  {{ userInfo.userEmail }}
                </el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
          cursor: pointer;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
          margin-top: 16px;
          .bottom {
            top: 2px;
          }
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>
