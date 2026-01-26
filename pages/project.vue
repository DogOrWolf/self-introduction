<template>
  <div class="container">
    <div class="project">
      <div class="title">
        <div class="tag">
          <span>#</span>
          自研
        </div>
        {{project.name}}
      </div>
      <div class="content">
        <div class="left">
          <div class="screenshot">
            <div class="screenshot-header">
                <img src="@/assets/icon/info.png" alt="">
                <span>项目截图</span>
            </div>
            <div class="screenshot-content">
              <div class="carousel">
                <el-carousel :interval="1300" arrow="never">
                  <el-carousel-item v-for="item in projectImages" :key="item"  class="carousel-item">
                    <el-image
                        class="image"
                        :src="item"
                        :zoom-rate="1.2"
                        :max-scale="7"
                        :min-scale="0.2"
                        show-progress
                        :preview-src-list="projectImages"
                        :initial-index="0"
                        :scale="0.6"
                        preview-teleported
                        fit="contain"
                        :lazy="true"
                    />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
          <div class="guide">
            <div class="guide-header">
              <img src="@/assets/icon/info.png" alt="">
              <span>项目介绍</span>
            </div>
            <div class="guide-content">
              <MdPreview
                  :modelValue="guideContent"
              />
            </div>
          </div>
          <div class="detail">
            <div class="detail-header">
              <img src="@/assets/icon/info.png" alt="">
              <span>项目详情</span>
            </div>
            <div class="detail-content">
              <MdPreview
                  :modelValue="detailContent"
              />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="project-info">
            <h3 class="section-title">
              <svg viewBox="0 0 24 24" width="16" height="16" class="section-icon">
                <path fill="currentColor"
                      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
                ></path>
              </svg>
              项目信息
            </h3>
            <div class="tech-section">
              <h4 class="tech-title">前端技术</h4>
              <div class="tech-tags">
                <span class="tech-tag primary">微信小程序原生 (MINA)</span>
                <span class="tech-tag primary">网页(Vue)</span>
                <span class="tech-tag primary">ElementUI</span>
              </div>
            </div>
            <div class="tech-section">
              <h4 class="tech-title">后端技术</h4>
              <div class="tech-tags">
                <span class="tech-tag success">Node.js</span>
                <span class="tech-tag success">Express</span>
                <span class="tech-tag success">Java</span>
                <span class="tech-tag success">SpringBoot</span></div>
            </div>
            <div class="tech-section">
              <h4 class="tech-title">数据库</h4>
              <div class="tech-tags">
                <span class="tech-tag info">MySQL</span>
                <span class="tech-tag info">Redis</span>
              </div>
            </div>
            <div class="tech-section">
              <h4 class="tech-title">开发工具</h4>
              <div class="tech-tags">
                <span class="tech-tag warning">微信开发者工具</span>
                <span class="tech-tag warning">VSCode</span>
                <span class="tech-tag warning">Node.js</span>
                <span class="tech-tag warning">IntelliJ</span>
                <span class="tech-tag warning">IDEA</span>
              </div>
            </div>
            <div class="tech-section">
              <h4 class="tech-title">难度评级</h4>
              <div class="difficulty-stars">
                <span class="star active">⭐</span>
                <span class="star active">⭐</span>
                <span class="star active">⭐</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import {aesDecrypt} from "~/utils/encrypt";

const route = useRoute();
console.log(route)
interface Project {
  id: number,
  name: string,
  tips: string,
  type: number,
  image: string
}
const project = ref<Project>(null);
const projectImages = ref([]);
project.value = aesDecrypt(route.query?.project || "");
const getPreviewList = (item: any) => {
  let obj: Record<number, string[]> = {
    1: [
      "/projects/1/1.png",
      "/projects/1/2.png",
      "/projects/1/3.png",
      "/projects/1/4.png",
      "/projects/1/5.png",
      "/projects/1/6.png",
      "/projects/1/7.png",
    ],
    2: [
      "/projects/2/1.png",
      "/projects/2/2.png",
      "/projects/2/3.png",
      "/projects/2/4.png",
      "/projects/2/5.png",
      "/projects/2/6.png",
    ],
    3: [
      "/projects/3/1.png",
      "/projects/3/2.png",
      "/projects/3/3.png",
      "/projects/3/4.png",
      "/projects/3/5.png",
      "/projects/3/6.png",
      "/projects/3/7.png",
      "/projects/3/8.png",
    ],
    4: [
      "/projects/4/1.png",
      "/projects/4/2.png",
    ],
    5: [
      "/projects/5/1.png",
      "/projects/5/2.png",
      "/projects/5/3.png",
      "/projects/5/4.png",
      "/projects/5/5.png",
      "/projects/5/6.png",
      "/projects/5/7.png",
      "/projects/5/8.png",
    ],
    6: [
      "/projects/6/1.png",
      "/projects/6/2.png",
      "/projects/6/3.png",
    ],
    7: [
      "/projects/7/1.png",
      "/projects/7/2.png",
      "/projects/7/3.png",
    ],
    8: [
      "/projects/8/1.png",
      "/projects/8/2.png",
      "/projects/8/3.png",
      "/projects/8/4.png",
    ]
  }
  return obj[item.id] ? obj[item.id] : [item.image]
}
projectImages.value = getPreviewList(project.value);
console.log(project.value)
console.log(projectImages.value)

/*************markdown****************/
import {MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const guideContent = ref("");
const detailContent = ref("");
// 加载 public 目录下的 test.md 文件
const loadPublicMdFile = async (path:string, toContent:any) => {
  try {
    // public/test.md → 访问路径为 /test.md
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`文件加载失败：${response.status}`)
    }
    // 读取文件内容为字符串
    toContent.value = await response.text()
  } catch (error) {
    console.error('加载public文件失败：', error)
    toContent.value = `#### 待更新`
  }
}

/*************启动项****************/
onMounted(() => {
  loadPublicMdFile(`/markdown/projects/${project.value.id}-1.md`,guideContent)
  loadPublicMdFile(`/markdown/projects/${project.value.id}-2.md`,detailContent)
})

</script>

<style lang="scss" scoped>
.pc{
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f3f5;
    min-height: 100vh;

    .project {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2.6rem;

      .title {
        width: 11rem;
        height: .8rem;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .06rem;
        padding: .16rem;
        margin: .1rem 0;
        font-size: 22px;
        font-weight: 900;

        .tag{
          font-weight: normal;
          background: #67C23A;
          border-radius: .14rem;
          color: #fff;
          font-size: .12rem;
          height: .28rem;
          line-height: .28rem;
          overflow: hidden;
          padding-left: .3rem;
          padding-right: .1rem;
          position: relative;
          margin-right: .1rem;

          span{
            background: #fff;
            border-radius: 50%;
            color: #67C23A;
            font-size: .12rem;
            height: .2rem;
            left: 5px;
            line-height: .2rem;
            overflow: hidden;
            position: absolute;
            text-align: center;
            top: .04rem;
            width: .2rem;
          }
        }
      }

      .content {
        min-height: 9.2rem;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        position: relative;

        .left {
          .screenshot {
            width: 8.4rem;
            height: 4rem;
            padding: .16rem;
            border-radius: 5px;
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: .1rem;

            &-header{
              display: flex;
              align-items: center;
              justify-content: flex-start;

              img{
                width: .3rem;
                margin-right: .02rem;
              }
              span{
                font-size: .14rem;
                font-weight: 900;
              }
            }

            &-content{
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              .carousel{
                width: 90%;
                height: 90%;

                &-item{
                  display: flex;
                  align-items: center;
                  justify-content: center;

                  .image{
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }

          .guide {
            width: 8.4rem;
            min-height: 4rem;
            padding: .16rem .16rem .2rem .16rem;
            border-radius: 5px;
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: .1rem;

            &-header{
              display: flex;
              align-items: center;
              justify-content: flex-start;

              img{
                width: .3rem;
                margin-right: .02rem;
              }
              span{
                font-size: .14rem;
                font-weight: 900;
              }
            }

            &-content{
              width: 8rem;
            }
          }

          .detail{
            width: 8.4rem;
            min-height: 4rem;
            padding: .16rem .16rem .2rem .16rem;
            border-radius: 5px;
            background-color: white;

            &-header{
              display: flex;
              align-items: center;
              justify-content: flex-start;

              img{
                width: .3rem;
                margin-right: .02rem;
              }
              span{
                font-size: .14rem;
                font-weight: 900;
              }
            }

            &-content{
              width: 8rem;
            }
          }
        }

        .right {
          flex-shrink: 0;
          overflow-y: auto;
          position: sticky;
          top: .2rem;
          width: 2.2rem;
          height: 4rem;
          padding: .16rem;
          margin-left: 8px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, .05);

          &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background: #c5c5c5;
          }

          &::-webkit-scrollbar-track {
            border-radius: 0;
            background: #f2f3f5;
          }

          .project-info {

            .section-title {
              align-items: center;
              color: #333;
              display: flex;
              font-size: .14rem;
              font-weight: 600;
              margin: 0 0 16px;

              .section-icon {
                color: #4285f4;
                margin-right: 4px;
              }
            }

            .tech-section {
              margin-bottom: 16px;

              .tech-title {
                color: #666;
                font-size: 12px;
                font-weight: 600;
                margin: 0 0 8px;
              }

              .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;

                .tech-tag {
                  border-radius: 4px;
                  display: inline-block;
                  font-size: .1rem;
                  font-weight: 500;
                  padding: 4px 8px;
                  white-space: nowrap;
                }

                .primary {
                  background-color: #e3f2fd;
                  border: 1px solid #bbdefb;
                  color: #1976d2;
                }

                .success {
                  background-color: #e8f5e8;
                  border: 1px solid #c8e6c9;
                  color: #2e7d32;
                }

                .info {
                  background-color: #e0f2f1;
                  border: 1px solid #b2dfdb;
                  color: #00695c;
                }

                .warning {
                  background-color: #fff3e0;
                  border: 1px solid #ffcc02;
                  color: #ef6c00;
                }
              }

              .difficulty-stars{
                .star{
                  color: gold;
                  font-size: .14rem;
                }
              }
            }
          }
        }
      }



    }


  }
}

.mobile{
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f3f5;
    min-height: 100vh;

    .project {
      width: 94%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2.6rem;

      .title {
        width: 100%;
        height: .8rem;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .06rem;
        margin: .1rem 0;
        font-size: 18px;
        font-weight: 900;

        .tag{
          font-weight: normal;
          background: #67C23A;
          border-radius: .14rem;
          color: #fff;
          font-size: .12rem;
          height: .28rem;
          line-height: .28rem;
          overflow: hidden;
          padding-left: .3rem;
          padding-right: .1rem;
          position: relative;
          margin-right: .1rem;

          span{
            background: #fff;
            border-radius: 50%;
            color: #67C23A;
            font-size: .12rem;
            height: .2rem;
            left: 5px;
            line-height: .2rem;
            overflow: hidden;
            position: absolute;
            text-align: center;
            top: .04rem;
            width: .2rem;
          }
        }
      }

      .content {
        width: 100%;
        min-height: 9.2rem;
        display: flex;
        flex-direction: column;
        position: relative;

        .left {
          width: 100%;

          .screenshot {
            width: 100%;
            height: 4rem;
            border-radius: 5px;
            background-color: white;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: .1rem;
            padding: 0.16rem 0.16rem 0.2rem 0.16rem;

            &-header{
              display: flex;
              align-items: center;
              justify-content: flex-start;

              img{
                width: .2rem;
                margin-right: .02rem;
              }
              span{
                font-size: .14rem;
                font-weight: 900;
              }
            }

            &-content{
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              .carousel{
                width: 90%;
                height: 90%;

                &-item{
                  display: flex;
                  align-items: center;
                  justify-content: center;

                  .image{
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }

          .guide {
            width: 100%;
            min-height: 4rem;
            padding: .16rem .16rem .2rem .16rem;
            box-sizing: border-box;
            border-radius: 5px;
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: .1rem;

            &-header{
              display: flex;
              align-items: center;
              justify-content: flex-start;

              img{
                width: .3rem;
                margin-right: .02rem;
              }
              span{
                font-size: .14rem;
                font-weight: 900;
              }
            }

            &-content{
              width: 100%;
            }
          }

          .detail{
            width: 100%;
            min-height: 4rem;
            padding: .16rem .16rem .2rem .16rem;
            box-sizing: border-box;
            border-radius: 5px;
            background-color: white;

            &-header{
              display: flex;
              align-items: center;
              justify-content: flex-start;

              img{
                width: .3rem;
                margin-right: .02rem;
              }
              span{
                font-size: .14rem;
                font-weight: 900;
              }
            }

            &-content{
              width: 100%;
            }
          }
        }

        .right {
          display: none !important;
          flex-shrink: 0;
          overflow-y: auto;
          position: sticky;
          top: .2rem;
          width: 2.2rem;
          height: 4rem;
          padding: .16rem;
          margin-left: 8px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, .05);

          &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background: #c5c5c5;
          }

          &::-webkit-scrollbar-track {
            border-radius: 0;
            background: #f2f3f5;
          }

          .project-info {

            .section-title {
              align-items: center;
              color: #333;
              display: flex;
              font-size: .14rem;
              font-weight: 600;
              margin: 0 0 16px;

              .section-icon {
                color: #4285f4;
                margin-right: 4px;
              }
            }

            .tech-section {
              margin-bottom: 16px;

              .tech-title {
                color: #666;
                font-size: 12px;
                font-weight: 600;
                margin: 0 0 8px;
              }

              .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;

                .tech-tag {
                  border-radius: 4px;
                  display: inline-block;
                  font-size: .1rem;
                  font-weight: 500;
                  padding: 4px 8px;
                  white-space: nowrap;
                }

                .primary {
                  background-color: #e3f2fd;
                  border: 1px solid #bbdefb;
                  color: #1976d2;
                }

                .success {
                  background-color: #e8f5e8;
                  border: 1px solid #c8e6c9;
                  color: #2e7d32;
                }

                .info {
                  background-color: #e0f2f1;
                  border: 1px solid #b2dfdb;
                  color: #00695c;
                }

                .warning {
                  background-color: #fff3e0;
                  border: 1px solid #ffcc02;
                  color: #ef6c00;
                }
              }

              .difficulty-stars{
                .star{
                  color: gold;
                  font-size: .14rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
