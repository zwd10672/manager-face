<template>
  <template v-for="menu in userMenu">
    <el-sub-menu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
      :key="menu._id"
      :index="menu.path"
    >
      <template #title>
        <el-icon><setting /></el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :userMenu="menu.children" />
    </el-sub-menu>
    <el-menu-item
      v-else-if="menu.menuType == 1"
      :index="menu.path"
      :key="menu.id"
      >{{ menu.menuName }}</el-menu-item
    >
  </template>
</template>

<script setup>
import { defineProps } from "vue"

const props = defineProps({
  userMenu: {
    type: Array,
    default: []
  }
})
</script>

<style lang="scss" scoped></style>
