<template>
  <div>
<!--    <h1>根组件</h1>-->
<!--    <div class="link">-->
<!--      <nuxt-link to="/">首页</nuxt-link>-->
<!--      <nuxt-link to="/users">用户-列表</nuxt-link>-->
<!--      <nuxt-link to="/users/create-or-edit">用户-添加或更新</nuxt-link>-->
<!--      <nuxt-link to="/roles/admin">角色-管理员</nuxt-link>-->
<!--      <nuxt-link to="/roles/normal">角色-普通用户</nuxt-link>-->
<!--      <nuxt-link to="/about">关于</nuxt-link>-->
<!--      <a href="/about">关于-原始a标签</a>-->

<!--      <nuxt-link to="/course/879">课程</nuxt-link>-->
<!--    </div>-->

    <nuxt-page></nuxt-page>
    <!--    <NuxtRouteAnnouncer />-->
    <!--    <NuxtWelcome />-->
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.link {
  margin-bottom: 20px;

  a {
    margin-right: 10px;
  }
}

html,body{
  background-color: black;
}
</style>
