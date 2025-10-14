<template>
  课程id为：{{ route.params.id }}
</template>

<script setup>
const route = useRoute()
console.log(route)  // 刷新时，这个打印应该出现在服务端，为了调试 nuxt 使其同时输出到浏览器端
// 也可以看到 route 中的 query  path  name  hash  matched


</script>

<style lang="scss"></style>
