<template>
  <div>
    <xw-header></xw-header>
    <nuxt-page></nuxt-page>
    <xw-footer></xw-footer>
  </div>
</template>

<script setup lang="ts">
import XwHeader from "~/components/xw-header.vue";
</script>

<style lang="scss">
html{
  font-size: 100px;
}

body{
  font-size: 16px;
  margin: 0;
  min-height: 100vh;
  min-width: 1264px;
  /* 标准属性（现代浏览器） */
  user-select: none;
  /* webkit 内核浏览器（Chrome、Safari、Edge） */
  -webkit-user-select: none;
  /* Firefox */
  -moz-user-select: none;
  /* IE10+ / Edge 旧版 */
  -ms-user-select: none;
  /* 可选：禁止长按弹出复制菜单（移动端） */
  -webkit-touch-callout: none;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
</style>
