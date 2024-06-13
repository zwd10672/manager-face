<script setup>
import request from "./../util/request"
import storage from "./../util/storage"
const fn = () => {
  storage.setItem(name, "jack")
  console.log(storage.getItem(name))
  storage.clearItem(name)
  console.log(storage.getItem(name))

  request({
    method: "get",
    url: "login",
    data: {
      name: "Jack"
    }
  }).then(res => {
    console.log(res)
  })
}
fn()
</script>

<template>
  <div>
    <h2>登录页面</h2>
    <el-button>
      <router-link to="/">返回首页</router-link>
    </el-button>
  </div>
</template>

<style scoped></style>
