<template lang="html">
  <!-- header start-->
  <nav class="header">
    <div class="logo" @click="toHome">
      <img src="../assets/logo.jpg" alt=""/>
      <span>小猫爱钓鱼</span>
    </div>
    <div class="header-center">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#fff"
          active-text-color="#64d2ff"
      >
        <el-menu-item index="1">项目案例</el-menu-item>
        <el-menu-item index="2">学习博客</el-menu-item>
      </el-menu>
    </div>
    <div class="header-right">
      xxx
    </div>
  </nav>
  <!-- header end-->
</template>

<script setup>
import {onBeforeRouteUpdate} from 'nuxt/app';
const activeIndex = ref('1')
const router = useRouter()

const handleSelect = (key) => {
  if (key === "1") {
    router.push({path: '/home'})
  }

  if (key === "2") {
    router.push({path: '/blog'})
  }
}
const toHome = () => {
  router.push({path: '/home'})
}

onBeforeRouteUpdate((to, from) => {
  console.log('路由跳转完成：', to.path);
  if ( to.path === "/home") {
    activeIndex.value = "1"
  }
  if ( to.path === "/blog") {
    activeIndex.value = "2"
  }
});
</script>

<style lang="scss" scoped>
.header {
  height: .64rem;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  justify-content: space-between;
  padding: 0 1.12rem;
  background: #FEFEFE;
  color: rgba(26, 26, 26, 0.60);
  font-weight: 500;

  .logo {
    display: flex;
    align-items: center;
    margin-left: .32rem;
    cursor: pointer;

    img {
      width: .48rem;
    }

    span {
      color: #64d2ff;
    }
  }

  .header-center {
    flex: 1;
    padding-left: .4rem;

    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      background-color: #ECF5FF;
    }

    .el-menu--horizontal.el-menu {
      border-bottom: 0;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
  }
}
</style>
