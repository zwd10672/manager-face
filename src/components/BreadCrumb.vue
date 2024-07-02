<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link to="/welcome" v-if="index == 0">{{
        item.meta.title
      }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { computed } from "vue"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
const breadList = computed(() => {
  return route.matched
})
</script>
