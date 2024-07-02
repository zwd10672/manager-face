<template>
  <div id="test_map"></div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
// 地图开始
// import { onMounted } from "vue"
// import AMapLoader from "@amap/amap-jsapi-loader"

// // 开发环境：配置JsCode
// // 如果是在 ts 的项目中，这一步会有类型错误，解决方案请移步 2.1.1
// window._AMapSecurityConfig = {
//   securityJsCode: "ff8e3cdd3ca5f0dec753fcd110546828"
// }

// onMounted(() => {
//   // AMapLoader => 加载器
//   // 资源加载完成后就会触发 then
//   AMapLoader.load({
//     key: "03df8ff47258f4ea400d6dca9db5f654", // 申请好的Web端开发者Key，首次调用 load 时必填
//     version: "2.0", // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
//     plugins: [] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
//   })
//     .then(AMap => {
//       // 初始化地图
//       const map = new AMap.Map("test_map", {
//         // 配置对象 - 配置地图的风格和缩放比例，请移步 2.2
//         viewMode: "2D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
//         zoom: 11, // 初始化地图层级
//         center: [116.397428, 39.90923] // 初始化地图中心点
//       })

//       const marker = new AMap.Marker({
//         position: [116.39, 39.9] //位置
//       })
//       map.add(marker) //添加到地图
//     })
//     .catch(e => {
//       console.log(e)
//     })
// })

// 地图结束

const formInline = reactive({
  user: "",
  region: "",
  date: ""
})

const onSubmit = () => {
  console.log("submit!")
}
</script>

<style>
#test_map {
  height: 100%;
  width: 100%;
}
</style>
