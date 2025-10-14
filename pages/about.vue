<template>
  about

  <el-button type="success" @click="handleClick">gogogo</el-button>
</template>


<script setup lang="ts">

  const handleClick = () => {
    ElMessage.success("hahahah")
  }
</script>
