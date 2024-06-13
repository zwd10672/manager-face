<script setup>
import request from "./../util/request"
const fn = () => {
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
