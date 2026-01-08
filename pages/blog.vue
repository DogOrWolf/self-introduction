<template>
  <div class="container">
    <div class="blogs">
      <div class="classify">
        <div class="classify-items">
          <span class="title">分类：</span>
          <span v-for="item in classifies" :class="{'active': searchKeys.options.indexOf(item) != -1}"
                @click="optionClick(item)">{{ item }}</span>
        </div>
        <div class="classify-search">
          <el-input
              v-model="searchKey"
              class="responsive-input"
              placeholder="请输入搜索内容"
              size="small"
          >
            <template #suffix>
              <el-icon class="el-input__icon" @click="search">
                <Search/>
              </el-icon>
            </template>
          </el-input>
        </div>
      </div>
      <el-divider/>
      <div class="articles" v-loading="loading">
        <div v-for="item in articles" class="content" @click="toBlogPage(item)">
          <div class="article">
            <div class="left" v-if="item.img && item.img != ''">
              <img :src="item.img" alt="">
            </div>
            <div class="right">
              <div class="title">
                <span>原创</span>
                <span>{{ item.title }}</span>
              </div>
              <div class="introduce">
                <span>{{ item.introduce }}</span>
              </div>
              <div class="extra">
                <span class="time">发布时间 · {{ item.time }}</span>
                <span class="read">阅读 · {{ item.read }}</span>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";

const classifies = ["全部", "前端开发", "后端开发", "VUE3", "NUXT3", "Spring MVC"]
const searchKey = ref('')


/*************筛选框部分****************/
const searchKeys = reactive({
  options: ["全部"] as string[]
})
const optionClick = (option: string) => {
  searchKeys.options = [];
  if (!searchKeys.options.includes(option)) {
    searchKeys.options.push(option)
  }
  search();
}


/*************文章部分****************/
const articlesInit = [
  {
    title: "Vue2学习",
    img: "/article/vue2/img.png",
    introduce: "Vue学习笔记1.基本概览2.基本介绍2.1 简介2.2 特点2.3 vue官网tips3.基本使用3.1 简单实例3.2 模板3.3 Vue实例 el与data4.核心概念4.1 数据绑定 v-bind  v-model4.2 MVVM4.3计算属性 computed4.4 监视属性 watch4.5 样式绑定  :class   :style4.6 @表示的含义5.vue原理5.1 数据代理 defineProperty",
    time: "2022.1.26",
    read: "297",
    url:"/markdown/blogs/vue2.md"
  }, {
    title: "ES6-11学习",
    img: "/article/ecma6/img.png",
    introduce: "ES6学习笔记(6-11)1.ECMA介绍2.ES6新特性2.1  let2.2  const2.3  模板字符串2.4  rest参数   …args2.5  箭头函数   ()=>{ }2.6  扩展运算符  […array]2.7  Promise2.8  集合  Set、Map2.9  class 类2.10  模块化2.11  数值扩展2.12  对象扩展2.13 其他2.13.1 对象简化写法2.13.2 变量结构赋值2.13.3 Symbol.",
    time: "2022.6.18",
    read: "125",
    url:"/markdown/blogs/ES6-11.md"
  }, {
    title: "Angular学习",
    img: "/article/angular/img.png",
    introduce: "angular学习笔记1.基本概览模块 Module组件 Component指令 Directive服务 Service路由 Router2. 模块Module2.1 模块的含义2.1.1 declarations2.1.2 imports2.1.3  providers2.1.4  bootstrap2.1.5  exports2.1.6  entryComponents3.组件3.1 组件的含义3.1.1 装饰器-元数据3.1.2  模板3.",
    time: "2023.2.04",
    read: "323",
    url:"/markdown/blogs/angular.md"
  }, {
    title: "VUE3学习",
    img: "/article/vue3/img.png",
    introduce: "VCA 组合式api  VOA选项式api 跨级通信 provide inject $parent $root 动态组件 异步组件 插槽 pinia Vite nuxt.js vue3拦截 proxy拦截.",
    time: "2024.8.16",
    read: "419",
    url:"/markdown/blogs/vue3.md"
  }, {
    title: "Promise学习",
    img: "/article/promise/img.png",
    introduce: "Promise学习笔记1.promise含义2.基本使用3.常用方法API3.1 构造函数3.2 then()3.3 catch()3.4 Promise.resolve()3.5 Promise.reject()3.6 Promise.all()3.7 Promise.race()3.8 例子4. await 与 async4.1 await4.2  async 函数4.3 例子5.关键问题5.1 如何改变 promise 的状态?5.2 一个 pro.",
    time: "2022.5.12",
    read: "268",
    url:"/markdown/blogs/promise.md"
  }
]
let articles = []

const loading = ref(false)
const search = () => {
  loading.value = true;
  setTimeout(()=>{
    if(searchKey.value == "" || searchKey.value.trim() == ""){
      articles = articlesInit
    }else {
      articles = articlesInit.filter((item)=>{
        return item.title?.toLowerCase().includes(searchKey.value.toLowerCase()) || item.introduce?.toLowerCase().includes(searchKey.value.toLowerCase())
      })
    }
    loading.value = false;
  },600)
}

const router = useRouter()
const toBlogPage = (item: any) => {
  console.log(item)
  router.push({
    path: '/blogPage',
    query:{
      article:JSON.stringify(item)
    }
  })
}
/*************启动项****************/
onMounted(() => {
  search();
})

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f3f5;
  min-height: 100vh;

  .blogs {
    width: 8rem;
    border-radius: .06rem;
    margin-top: .2rem;
    background-color: white;
  }

  .classify {
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: .06rem;
    padding: .16rem;

    .classify-items {
      width: 6rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;

      span {
        height: .08rem;
        border: .5px solid #c5c5c5;
        border-radius: 5px;
        color: gray;
        margin: .06rem .06rem .06rem 0;
        padding: .07rem .1rem;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      span:nth-child(1) {
        border: 0;
        cursor: auto;
      }

      .active {
        background-color: #64d2ff;
        color: white;
        border: 0;
      }
    }

    .classify-search {
      width: 2rem;

      :deep(.el-input__wrapper) {
        border: 1px solid #e2e2e2;
        box-shadow: none;

        ::placeholder {
          font-size: 10px;
          font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
        }
      }

      :deep(.el-input--large) {
        height: .38rem;
      }

      :deep(.el-input__suffix) {
        cursor: pointer;
      }
    }

  }

  .articles {
    min-height: 10rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .content {
      padding: .2rem;

      .article {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: .2rem;
        cursor: pointer;

        .left {
          padding-right: .1rem;

          img {
            width: 1.6rem;
            height: 1rem;
          }
        }

        .right {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          .title {
            display: flex;
            justify-content: center;
            align-items: center;

            span:nth-child(1) {
              color: #e33e33;
              background: rgba(227, 62, 51, .1);
              font-size: 12px;
              margin-right: 8px;
              text-align: center;
              width: 34px;
              height: 20px;
              line-height: 20px;
              border-radius: 2px;
              padding: 2px;
            }

            span:nth-child(2) {
              font-size: 18px;
              font-weight: 500;
              line-height: 24px;
              color: #222226;
              overflow: hidden;
            }
          }

          .introduce{
            height: 38px;
            color: #555666;
            line-height: 19px;
            overflow: hidden;
            white-space: normal;
            word-break: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-size: 14px;
            margin: 8px 0;
          }

          .extra{
            .time{
              color: #555666;
              line-height: 20px;
              font-size: 14px;
              margin-right: 8px;
            }

            .read{
              color: #555666;
              font-size: 14px;
            }
          }
        }

      }
    }
  }

  :deep(.el-divider--horizontal) {
    margin: 0;
  }
}
</style>
