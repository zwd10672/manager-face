<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userFormRef" :model="userForm" status-icon :rules="rules">
        <div class="title">火星</div>
        <el-form-item prop="userName">
          <el-input
            type="text"
            v-model="userForm.userName"
            prefix-icon="user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            type="password"
            prefix-icon="view"
            v-model="userForm.userPwd"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="submit(userForm)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { login } from "@/api/user.js"
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
const router = useRouter()
const store = useStore()
const userForm = ref({
  userName: "",
  userPwd: ""
})
const rules = ref({
  userName: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }
  ],
  userPwd: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }
  ]
})
const userFormRef = ref(null)
// 登录处理函数
const submit = () => {
  userFormRef.value.validate(async valid => {
    console.log(this)
    if (valid) {
      const res = await login({
        username: userForm.value.userName,
        userPwd: userForm.value.userPwd
      })
      store.commit("saveUserInfo", res)
      console.log(res)
      ElMessage.success("登录成功")
      setInterval(() => {
        router.push("/welcome")
      }, 1500)
    } else {
      ElMessage.error()
      ;("表单验证失败")
      return false
    }
  })
}
</script>
<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
