<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="formRef" :inline="true" :model="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" width="180px" style="width: 180px" prop="menuState">
          <el-select v-model="queryForm.menuState">
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="2" label="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getMenuList">查询</el-button>
          <el-button @click="handleReset('formRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">新增</el-button>
      </div>
      <el-table :data="menuListData" row-key="_id" :tree-props="{ children: 'children' }">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button @click="handleAdd(2, scope.row)" type="primary">新增</el-button>
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="用户新增" v-model="showModal" :before-close="handleClose">
      <el-form ref="dialogFormRef" :model="menuForm" label-width="100px" :rules="rules">
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuListData"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
          />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :value="1">菜单</el-radio>
            <el-radio :value="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-show="menuForm.menuType == 1">
          <el-input v-model="menuForm.icon" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="路由地址" prop="path" v-show="menuForm.menuType == 1">
          <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item label="权限标识" prop="menuCode" v-show="menuForm.menuType == 2">
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component" v-show="menuForm.menuType == 1">
          <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState" v-show="menuForm.menuType == 1">
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :value="1">正常</el-radio>
            <el-radio :value="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import utils from "@/util/utils.js"
import { getMenuList } from "@/api/user.js"
import { ref, reactive, nextTick } from "vue"
import { ElMessage } from "element-plus"
// 定义用户数据
const queryForm = reactive({
  menuState: 1
})
const menuListData = ref([])
const columns = ref([
  {
    label: "菜单名称",
    prop: "menuName",
    width: 150
  },
  {
    label: "图标",
    prop: "icon"
  },
  {
    label: "菜单类型",
    prop: "menuType",
    formatter(row, column, value) {
      return {
        1: "菜单",
        2: "按钮"
      }[value]
    }
  },
  {
    label: "权限标识",
    prop: "menuCode"
  },
  {
    label: "路由地址",
    prop: "path"
  },
  {
    label: "组件路径",
    prop: "component"
  },
  {
    label: "菜单状态",
    prop: "menuState",
    width: 90,
    formatter(row, column, value) {
      return {
        1: "正常",
        2: "停用"
      }[value]
    }
  },
  {
    label: "创建时间",
    prop: "createTime",
    formatter(row, column, value) {
      return utils.formateDate(new Date(value))
    }
  }
])
const showModal = ref(false)
const menuForm = reactive({
  parentId: [null],
  menuType: 1,
  menuState: 1
})
const action = ref("")
const rules = ref({
  menuName: [
    {
      required: true,
      message: "请输入菜单名称",
      trigger: "blur"
    },
    {
      min: 2,
      max: 10,
      message: "长度在2-8个字符",
      trigger: "blur"
    }
  ]
})
// 查询表单实例
const formRef = ref(null)
// 新增表单实例
const dialogFormRef = ref(null)
// 获取菜单列表
const menuList = async () => {
  const list = await getMenuList(queryForm.value)
  menuListData.value = list.data
}
// 表单重置
const handleReset = () => {
  formRef.value.resetFields()
}
// 新增菜单
const handleAdd = (type, row) => {
  showModal.value = true
  action.value = "add"
  if (type == 2) {
    menuForm.parentId = [...row.parentId, row._id].filter(item => item)
  }
}
// 编辑菜单
const handleEdit = row => {
  showModal.value = true
  action.value = "edit"
  nextTick(() => {
    Object.assign(menuForm, row)
  })
}
// 删除
const handleDel = async () => {
  const res = await menuSubmit({ _id, action: "delete" })
  if (res.data) {
    ElMessage.success("删除成功")
    menuList()
  }
  {
    ElMessage.info("删除失败")
  }
}
// 菜单操作
const handleSubmit = () => {
  console.log(dialogFormRef)
  dialogFormRef.value.validate(async valid => {
    if (valid) {
      let params = { ...menuForm, action }
      const res = await menuSubmit(params)
      if (res.data) {
        showModal.value = false
        ElMessage.success("操作成功")
        handleClose()
        menuList()
      }
    }
  })
}
// 弹框关闭
const handleClose = () => {
  showModal.value = false
  dialogFormRef.value.resetFields()
  handleReset("dialogFormRef")
}
menuList()
</script>

<style lang="scss"></style>
