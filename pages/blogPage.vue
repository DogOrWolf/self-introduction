<template>
  <div class="container">
    <div class="blog">
      <MdPreview
          :modelValue="blogContent"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const blogContent = ref("");
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
    toContent.value = `### 加载失败\n\n无法读取文件：${(error as Error).message}`
  }
}

/*************启动项****************/
onMounted(() => {
  loadPublicMdFile("/markdown/blogs/vue3.md",blogContent)
})
</script>

<style scoped >
.container{
  padding: 0 2rem 4rem 2rem;
}
</style>
