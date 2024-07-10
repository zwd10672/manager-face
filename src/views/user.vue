<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form ref="formRef" :inline="true" :model="user" class="demo-form-inline">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户Id"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state" placeholder="请选择状态">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('formRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination class="pagination" background layout="prev, pager, next" /> -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 用户新增弹窗 -->
    <el-dialog title="用户新增" v-model="showModal">
      <el-form ref="dialogFormRef" :model="user" label-width="100px" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="user.userName" :disabled="action == 'edit'" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="user.userEmail" :disabled="action == 'edit'" placeholder="请输入用户邮箱">
            <template #append>qq.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="user.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select v-model="user.roleList" placeholder="请选择用户系统角色" multiple style="width: 100%">
            <el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader
            v-model="user.deptId"
            placeholder="请选择所属部门"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { nextTick, reactive, ref, toRaw } from "vue"
import { usersList, usersDelete, usersOperate, deptsList, rolesList, rolesAllList } from "@/api/user.js"
import utils from "@/util/utils.js"
import { ElMessage } from "element-plus"
import { login } from "../api/user"
// 定义用户数据
const user = reactive({
  state: 1
})

// 定义页码信息
let pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 50
})
// 所有角色列表
const roleList = ref([])

// 所有部门列表
const deptList = ref([])

// 定义弹框的显示或隐藏
const showModal = ref(false)

// 定义动态表格-格式
const columns = reactive([
  {
    label: "用户ID",
    prop: "userId"
  },
  {
    label: "用户名",
    prop: "userName"
  },
  {
    label: "用户邮箱",
    prop: "userEmail"
  },
  {
    label: "用户角色",
    prop: "role",
    formatter(row, column, value) {
      return {
        0: "管理员",
        1: "普通用户"
      }[value]
    }
  },
  {
    label: "用户状态",
    prop: "state",
    formatter(row, column, value) {
      return {
        1: "在职",
        2: "离职",
        3: "试用期"
      }[value]
    }
  },
  {
    label: "注册时间",
    prop: "createTime",
    width: 180,
    formatter: (row, column, value) => {
      return utils.formateDate(new Date(value))
    }
  },
  {
    label: "最后登录时间",
    prop: "lastLoginTime",
    width: 180,
    formatter: (row, column, value) => {
      return utils.formateDate(new Date(value))
    }
  }
])

// 新增表单实例
const dialogFormRef = ref(null)

// 初始化用户列表数据
let userList = ref([])

// 定义表单校验规则
const rules = reactive({
  userName: [
    {
      required: true,
      message: "请输入用户名称",
      trigger: "blur"
    }
  ],
  userEmail: [{ required: true, message: "请输入用户邮箱", trigger: "blur" }],
  mobile: [
    {
      pattern: /1[3-9]\d{9}/,
      message: "请输入正确的手机号格式",
      trigger: "blur"
    }
  ],
  deptId: [
    {
      required: true,
      message: "请输入用户邮箱",
      trigger: "blur"
    }
  ]
})

// 创建或者编辑
const action = ref("")

// 选中用户信息
let checkedUserIds = ref([])
const formRef = ref(null)

// 获取部门列表
const getDeptsList = async () => {
  const res = await deptsList()
  deptList.value = res.data
}

// 获取角色列表
const getRoleList = async () => {
  const res = await rolesAllList()
  roleList.value = res.data
}

// 用户新增弹窗显示
const handleCreate = () => {
  action.value = "add"
  showModal.value = true
}

// 取消新增
const handleClose = () => {
  showModal.value = false
}
// 提交
const handleSubmit = () => {
  dialogFormRef.value.validate(async valid => {
    if (valid) {
      let params = toRaw(user)
      params.userEmail += "@qq.com"
      params.action = action.value
      let res = await usersOperate(params)
      showModal.value = false
      ElMessage.success("用户编辑成功")
      handleReset("dialogForm")
      getUserList()
    }
  })
}

// 获取用户列表数据
const getUserList = async () => {
  let params = { ...user, ...pager }
  const res = await usersList(params)
  const { list, page } = res.data
  console.log(page)
  userList.value = list
  pager.total = page.total
}

// 单个删除
const handleDel = async row => {
  const res = await usersDelete({
    userIds: row.userId
  })
  if (res.data.modifiedCount > 0) {
    ElMessage.success("删除成功")
  } else {
    ElMessage.error("删除失败")
  }
  getUserList()
}

// 批量删除
const handlePatchDel = async () => {
  if (checkedUserIds.value.length == 0) {
    ElMessage.error("请选择要删除的用户")
    return
  }
  const res = await usersDelete({
    userIds: checkedUserIds.value
  })
  if (res.data.modifiedCount > 0) {
    ElMessage.success("删除成功")
    getUserList()
  } else {
    ElMessage.error("删除失败")
  }
}

// 多选框选中
const handleSelectionChange = list => {
  let arr = []
  list.map(item => {
    arr.push(item.userId)
  })
  checkedUserIds.value = arr
}

// 搜索
const handleQuery = () => {
  getUserList()
}

// 搜索重置
const handleReset = formEl => {
  if (!formEl) return
  formRef.value.resetFields()
}

// 分页功能
const handleCurrentChange = currentPage => {
  pager.pageNum = currentPage
  console.log(currentPage)
  getUserList()
}

// 用户编辑
const handleEdit = row => {
  showModal.value = true
  action.value = "edit"
  nextTick(() => {
    Object.assign(user, row)
  })
}

getUserList()
getRoleList()
getDeptsList()
</script>

<style lang="scss">
.demo-form-inline .el-input {
  --el-input-width: 214px;
}

.demo-form-inline .el-select {
  --el-select-width: 150px;
}
</style>
