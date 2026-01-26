<template>
  <main class="container">
    <header class="search-key">
      <el-input
          v-model="searchKey"
          class="responsive-input"
          placeholder="请输入项目名称"
          size="large"
      >
        <template #suffix>
          <el-icon class="el-input__icon" @click="search"><Search /></el-icon>
        </template>
      </el-input>
    </header>
    <section class="search-options">
      <div v-for="item in searchOptions" class="search-options-row">
        <div class="search-options-row-title">
          <span>{{ item.name }}:</span>
        </div>
        <div class="search-options-row-itms">
          <span v-for="itm in item.options" @click="optionClick(itm)"
                :class="{'active': searchKeys.options.indexOf(itm) != -1}">{{ itm }}</span>
        </div>
      </div>
      <span class="reset" @click="reset">重置筛选</span>
    </section>
    <section class="project-items">
      <div class="head">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>全部结果</el-breadcrumb-item>
          <el-breadcrumb-item>
            <span class="head-item">{{ selectType }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="result" v-loading="loading">
        <div class="project" v-for="item in projects" :key="item.id">
          <el-image
              class="image"
              :src="item.image"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              show-progress
              :preview-src-list="getPreviewList(item)"
              :initial-index="0"
              :scale="0.6"
              :fit="item.type == 3 ?'contain':'fill'"
              :lazy="true"
          />
          <span class="name">{{ item.name }}</span>
          <span class="tips">{{ item.tips }}</span>
          <div class="btn" @click="toProject(item)">
            <span class="button">详情</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination layout="prev, pager, next" :total="projects.length" background size="small" />
      </div>
      <div class="types">
        <span v-for="item in types" @click="changeType(item)">{{ item }}</span>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {aesEncrypt} from "~/utils/encrypt";

const searchKey = ref('')
const searchOptions = [
  {
    name: "产品端",
    options: ["web", "管理后台", "小程序", "h5", "网站"]
  },
  {
    name: "技术栈",
    options: ["vue2", "vue3", "angular", "uniapp", "react", "echarts", "nuxt", "java", "mvc", "mybatis"]
  }
]
const types = ["研发项目", "源码项目"]
const selectType = ref("研发项目")
const projectsInit = [
  {
    id: 1,
    name: "体育考试系统管理平台",
    tips: "针对中招体育考试实现智慧体育考场定制。",
    type: 1, //1管理平台 2网站 3小程序
    image: "/projects/1/1-cp.png"
  },
  {
    id: 2,
    name: "样叽3.0管理平台",
    tips: "帮助用户发现好物、推荐好物的软件,帮助发现更多美好的事物。",
    type: 1, //1管理平台 2网站 3小程序
    image: "/projects/2/1-cp.png"
  },
  {
    id: 3,
    name: "book-blog旅游网站(外文网站)",
    tips: "一款外网旅游平台网站，帮助用户选择喜欢的旅游地点。",
    type: 2, //1管理平台 2网站 3小程序
    image: "/projects/3/1-cp.png"
  },
  {
    id: 4,
    name: "系统大屏",
    tips: "系统数据大屏，实时可视化核心数据，赋能决策高效可控。",
    type: 2, //1管理平台 2网站 3小程序
    image: "/projects/4/1-cp.png"
  },
  {
    id: 5,
    name: "北京马术协会官网",
    tips: "赛事育人，推动马术专业化普及。",
    type: 2, //1管理平台 2网站 3小程序
    image: "/projects/5/1-cp.png"
  },
  {
    id: 6,
    name: "上门家教小程序",
    tips: "一键预约家教，上门授课省心高效提优。",
    type: 3, //1管理平台 2网站 3小程序
    image: "/projects/6/1-cp.png"
  },
  {
    id: 7,
    name: "花店商城小程序",
    tips: "指尖选花，同城速达，仪式感即刻送达。",
    type: 3, //1管理平台 2网站 3小程序
    image: "/projects/7/1-cp.png"
  },
  {
    id: 8,
    name: "壳牌化工会议邀请函",
    tips: "壳牌化工行业峰会，共探产业链协同新机遇！",
    type: 3, //1管理平台 2网站 3小程序
    image: "/projects/8/1-cp.png"
  },
]
let projects = []
const searchKeys = reactive({
  type: "前端项目",
  options: [] as string[]
})
const router = useRouter()

/*************筛选框部分****************/
const optionClick = (option: string) => {
  if (!searchKeys.options.includes(option)) {
    searchKeys.options.push(option)
  } else {
    const index = searchKeys.options.indexOf(option);
    if (index > -1) {
      searchKeys.options.splice(index, 1);
    }
  }
  search();
}
const changeType = (type: string) => {
  selectType.value = type;
  search();
}
const reset = () => {
  selectType.value = "";
  searchKeys.options = [];
  searchKey.value = "";
  search();
}


/*************列表部分****************/
const loading = ref(false)
const getPreviewList = (item: any) => {
  let obj: Record<number, string[]> = {
    1: [
      "/projects/1/1-cp.png",
      "/projects/1/2-cp.png",
      "/projects/1/3-cp.png",
      "/projects/1/4-cp.png",
      "/projects/1/5-cp.png",
      "/projects/1/6-cp.png",
      "/projects/1/7-cp.png",
    ],
    2: [
      "/projects/2/1-cp.png",
      "/projects/2/2-cp.png",
      "/projects/2/3-cp.png",
      "/projects/2/4-cp.png",
      "/projects/2/5-cp.png",
      "/projects/2/6-cp.png",
    ],
    3: [
      "/projects/3/1-cp.png",
      "/projects/3/2-cp.png",
      "/projects/3/3-cp.png",
      "/projects/3/4-cp.png",
      "/projects/3/5-cp.png",
      "/projects/3/6-cp.png",
      "/projects/3/7-cp.png",
      "/projects/3/8-cp.png",
    ],
    4: [
      "/projects/4/1-cp.png",
      "/projects/4/2-cp.png",
    ],
    5: [
      "/projects/5/1-cp.png",
      "/projects/5/2-cp.png",
      "/projects/5/3-cp.png",
      "/projects/5/4-cp.png",
      "/projects/5/5-cp.png",
      "/projects/5/6-cp.png",
      "/projects/5/7-cp.png",
      "/projects/5/8-cp.png",
    ],
    6: [
      "/projects/6/1-cp.png",
      "/projects/6/2-cp.png",
      "/projects/6/3-cp.png",
    ],
    7: [
      "/projects/7/1-cp.png",
      "/projects/7/2-cp.png",
      "/projects/7/3-cp.png",
    ],
    8: [
      "/projects/8/1-cp.png",
      "/projects/8/2-cp.png",
      "/projects/8/3-cp.png",
      "/projects/8/4-cp.png",
    ]
  }
  return obj[item.id] ? obj[item.id] : [item.image]
}
const search = () => {
  loading.value = true;
  setTimeout(()=>{
    if(searchKey.value == "" || searchKey.value.trim() == ""){
      projects = projectsInit
    }else {
      projects = projectsInit.filter((item)=>{
        return item.name?.includes(searchKey.value) || item.tips?.includes(searchKey.value)
      })
    }
    loading.value = false;
  },600)
}
const toProject = (item: any) => {
  console.log(item)
  router.push({
    path: '/project',
    query:{
      project:aesEncrypt(item)
    }
  })
}

/*************启动项****************/
onMounted(() => {
  search();
})

</script>

<style scoped lang="scss">
.pc{
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f3f5;
    min-height: 100vh;
    padding-bottom: 1.8rem;

    .search-key {
      width: 4.8rem;
      margin: .4rem;

      :deep(.el-input__wrapper) {
        border: 1px solid #64d2ff;
        border-radius: .24rem;
        box-shadow: none;

        ::placeholder {
          font-size: 12px;
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

    .search-options {
      width: 8.3rem;
      padding: .12rem .1rem;
      background-color: white;
      border-radius: 5px 5px 5px 5px;
      box-shadow: 8px 14px 20px 6px rgba(39, 44, 49, .06), 1px 3px 8px 6px rgba(39, 44, 49, .03);
      position: relative;

      &-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        font-size: 12px;
        margin: .08rem 0;

        &-title {
          padding-right: .1rem;
        }

        &-itms {
          display: flex;
          align-items: center;

          span {
            cursor: pointer;
            padding-right: .16rem;

            &:hover {
              color: coral;
            }
          }

          .active {
            color: coral;
          }
        }
      }

      .reset {
        position: absolute;
        right: 0.2rem;
        bottom: 0.2rem;
        font-size: 12px;
        cursor: pointer;

        &:hover {
          color: crimson;
        }
      }
    }

    .project-items {
      width: 8.3rem;
      position: relative;

      .head {
        padding: .2rem 0;

        .head-item{
          color: coral;
        }
      }

      .result {
        width: 8.3rem;
        display: grid;
        align-items: center;
        grid-template-columns: repeat(auto-fill, 1.5rem);
        justify-content: space-between;
        gap: .2rem;

        .project {
          width: 1.5rem;
          height: 2.44rem;
          background-color: white;
          border-radius: .04rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          box-shadow: 8px 14px 20px 6px rgba(39, 44, 49, .06), 1px 3px 8px 6px rgba(39, 44, 49, .03);
          transition: all .3s linear;

          .image {
            width: 1.5rem;
            height: 1.2rem;
          }

          .name {
            color: #34495e;
            font-size: 13px;
            font-weight: 900;
            padding: 8px;
            text-align: center;
            font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
          }

          .tips {
            font-size: 10px;
            padding: 2px 4px;
            text-align: left;
            text-indent: 1em;
            color: #888;

          }

          .btn {
            width: 100%;
            position: absolute;
            bottom: .1rem;

            .button {
              background: #64d2ff;
              border: none;
              border-radius: 7px;
              box-shadow: 0 6px 14px rgba(30, 128, 255, .25);
              color: #fff;
              cursor: pointer;
              display: flex;
              font-size: 12px;
              justify-content: center;
              line-height: 1;
              margin: 0 auto;
              padding: 8px 14px;
              transition: transform .15s ease, box-shadow .2s ease, background .2s ease;
              user-select: none;
              white-space: nowrap;
              width: 1rem;

              &:hover {
                background: #64d2ff;
                box-shadow: 0 10px 20px rgba(30, 128, 255, .3);
                transform: translateY(-1px);
              }
            }
          }


        }
      }

      .pagination{
        height: .4rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .types {
        position: absolute;
        left: -1.4rem;
        top: .1rem;

        width: .8rem;
        height: 3rem;
        background-color: white;
        border-radius: .1rem;
        display: flex;
        flex-direction: column;
        padding: .14rem .1rem .2rem .1rem;
        align-items: center;

        span {
          font-size: 12px;
          padding: .08rem 0;
          cursor: pointer;

          &:hover {
            color: cornflowerblue;
          }
        }

      }


    }
  }
}

.mobile{
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f3f5;
    min-height: 100vh;
    padding-bottom: 1.8rem;

    .search-key {
      margin: .2rem .4rem;

      :deep(.el-input__wrapper) {
        border: 1px solid #64d2ff;
        border-radius: .24rem;
        box-shadow: none;

        ::placeholder {
          font-size: 12px;
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

    .search-options {
      width: 3.4rem;
      padding: .12rem .1rem;
      background-color: white;
      border-radius: 5px 5px 5px 5px;
      box-shadow: 8px 14px 20px 6px rgba(39, 44, 49, .06), 1px 3px 8px 6px rgba(39, 44, 49, .03);
      position: relative;

      &-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        row-gap:.08rem;
        font-size: 12px;
        margin: .08rem 0;

        &-title {
          padding-right: .1rem;
        }

        &-itms {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          row-gap:.08rem;

          span {
            cursor: pointer;
            padding-right: .06rem;

            &:hover {
              color: coral;
            }
          }

          .active {
            color: coral;
          }
        }
      }

      .reset {
        position: absolute;
        right: 0.2rem;
        top:0.2rem;
        font-size: 12px;
        cursor: pointer;

        &:hover {
          color: crimson;
        }
      }
    }

    .project-items {
      position: relative;
      width: 90%;

      .head {
        padding: .2rem 0;

        .head-item{
          color: coral;
        }
      }

      .result {
        padding: 0 .1rem;
        display: grid;
        align-items: center;
        grid-template-columns: repeat(auto-fill, 1.5rem);
        justify-content: space-between;
        gap: .2rem;

        .project {
          width: 1.5rem;
          height: 2.44rem;
          background-color: white;
          border-radius: .04rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          box-shadow: 8px 14px 20px 6px rgba(39, 44, 49, .06), 1px 3px 8px 6px rgba(39, 44, 49, .03);
          transition: all .3s linear;

          .image {
            width: 1.5rem;
            height: 1.2rem;
          }

          .name {
            color: #34495e;
            font-size: 13px;
            font-weight: 900;
            padding: 8px;
            text-align: center;
            font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
          }

          .tips {
            font-size: 10px;
            padding: 2px 4px;
            text-align: left;
            text-indent: 1em;
            color: #888;

          }

          .btn {
            width: 100%;
            position: absolute;
            bottom: .1rem;

            .button {
              background: #64d2ff;
              border: none;
              border-radius: 7px;
              box-shadow: 0 6px 14px rgba(30, 128, 255, .25);
              color: #fff;
              cursor: pointer;
              display: flex;
              font-size: 12px;
              justify-content: center;
              line-height: 1;
              margin: 0 auto;
              padding: 8px 14px;
              transition: transform .15s ease, box-shadow .2s ease, background .2s ease;
              user-select: none;
              white-space: nowrap;
              width: 1rem;

              &:hover {
                background: #64d2ff;
                box-shadow: 0 10px 20px rgba(30, 128, 255, .3);
                transform: translateY(-1px);
              }
            }
          }


        }
      }

      .pagination{
        height: .4rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .types {
        display: none !important;
        position: absolute;
        left: -1.4rem;
        top: .1rem;

        width: .8rem;
        height: 3rem;
        background-color: white;
        border-radius: .1rem;
        display: flex;
        flex-direction: column;
        padding: .14rem .1rem .2rem .1rem;
        align-items: center;

        span {
          font-size: 12px;
          padding: .08rem 0;
          cursor: pointer;

          &:hover {
            color: cornflowerblue;
          }
        }

      }


    }
  }
}
</style>
