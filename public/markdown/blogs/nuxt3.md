# Nuxt3学习

https://www.yuque.com/_h2o/vmv5lo/zfhleo



## 1.同构渲染

```
传统服务端渲染、客户端渲染、同构渲染

1.什么是模板渲染？
	动态网站 = 不同数据+模板 = 不同的html网页
	数据与模板拼接的动作叫模板渲染

2.在哪进行渲染？
	服务端渲染
	客户端渲染
	同构渲染
		有时候在服务端，有时候在客户端
		Nuxt3就是同构渲染

方式1：传统方式服务端渲染
	特点：
		浏览器获取的是服务端返回的完整的HTML，显示快
		所有的渲染工作都在服务器端，服务器压力大
		局部改变，返回整个页面，占用带宽
	
	
方式2：客户端渲染
	特点：
		服务器压力变小，只响应必要的数据。
		浏览器端有更大的灵活性，只请求必要的数据。
		后续接口仅获取ajax数据，不再需要获取所有的html页面，减少带宽占用。
		
 	缺点：
 		首屏渲染慢：首屏显示时，浏览器拿到的时空白页，需要ajax请求，再创建完整的HTML页面，体验上会慢一些。
 		不利于SEO：搜索引擎第1次请求网页，分析网页内容、记录，供别人搜索使用。客户端渲染导致搜索引擎第1次请求获取的是一个空页面，不利于分析和推荐。


方式3：同构渲染 SSR（Server Side Render）
	10%服务端渲染+90%的客户端渲染
	特点：
		解决了首屏渲染慢的问题
		解决了SEO优化问题
		兼备了客户端渲染灵活+请求数据少的优点
		
	相应的框架有：Nuxt.js Next.js
	
	Nuxt3基于Vue3
	Next.js基于React


什么情况下使用同构渲染？什么时候考虑首屏渲染&SEO优化？
	增加部署成本
	后台管理系统就不需要

```

![image-20250924100037030](C:\Users\1\AppData\Roaming\Typora\typora-user-images\image-20250924100037030.png)

![image-20250924102153317](C:\Users\1\AppData\Roaming\Typora\typora-user-images\image-20250924102153317.png)

![image-20250924105353379](C:\Users\1\AppData\Roaming\Typora\typora-user-images\image-20250924105353379.png)

## 2.nuxt3安装

```
npm create nuxt@latest nuxt3-all-project -- -t v3

在hosts文件中添加一列
185.199.108.133 raw.githubusercontent.com


```

![image-20250924153159815](C:\Users\1\AppData\Roaming\Typora\typora-user-images\image-20250924153159815.png)



## 3.路由

```vue
路由、视图、获取数据

1. 项目根组件
<template>
  <div>
  	<h1>项目根组件</h1>
    <nuxt-page />  <!-- 挖个洞,留个显示区域, 用于显示路由组件内容  -->
  </div>
</template>


2. 路由组件
创建 pages/about.vue - 对应路由地址为/about - 需要重启
<template>
  <h1>关于2023年前端发展方向的研讨</h1>
</template>

3. 带目录的路由组件 
创建pages/users/create-or-edit.vue - 对应地址为/users/create-or-edit
<template>
  <h1>创建或编辑用户信息</h1>
</template>

4. 默认路由组件
创建pages/index.vue - 对应地址为/
<template>
  <h1>路由组件1</h1>
</template>

创建pages/users/index.vue - 对应地址为/users
<template>
  <h1>用户列表信息</h1>
</template>

5. 父子路由
	1）创建pages/roles.vue - 对应路由地址为 /roles- 需要重启
        <template>
          <div>
            <h1>角色信息汇总</h1>
          </div>
        </template>
      
     2）给子路由组件留显示区域 - 编辑 roles.vue
     	<template>
          <div>
            <h1>角色信息汇总</h1>
            <nuxt-page />    <!--  挖洞  -->
          </div>
        </template>
        
      3）创建pages/roles/目录，以及pages/roles/ admin.vue
         <template>
          <div>
            <h1>角色-管理员</h1>
          </div>
        </template>
        
      4）创建 pages/roles/normal.vue
      	<template>
          <div>
            <h1>角色-普通用户</h1>
          </div>
        </template>




```

## 4.路由与导航

```javascript
编辑 app.vue - 设置跳转链接

<template>
  <div>
    <h1>我是根组件</h1>
    <!-- 
  		nuxt-link 会被编译成 a 标签, 但是不推荐直接使用 a 标签
    	直接用 a 标签，点击会刷新跳转，相当于一次全新的向服务端发起的请求
    	使用 nuxt-link 是浏览器端本地切换页面，即SPA
		nuxt-link是客户端渲染
		a标签会刷新页面，服务端渲染
  	-->
    <nuxt-link to="/">首页</nuxt-link>
    <nuxt-link to="/users">用户-列表</nuxt-link>
    <nuxt-link to="/users/create-or-edit">用户-添加或更新</nuxt-link>
    <nuxt-link to="/roles/admin">角色-管理员</nuxt-link>
    <nuxt-link to="/roles/normal">角色-普通用户</nuxt-link>
    <nuxt-link to="/about">关于</nuxt-link>
    <a href="/about">关于-原始a标签</a>
        
    <nuxt-page />
  </div>
</template>

<script setup>
</script>

<style>
  /* nuxt-link 会被编译成 a 标签 */
	a { margin: 20px; }
</style>




动态路由参数
创建 pages/course/[id].vue  - 对应路由为/course/:id

<template>
  <h1>课程编号:{{ route.params.id }}</h1>
</template>

<script setup>
   const route = useRoute()
   console.log(route)  // 刷新时，这个打印应该出现在服务端，为了调试 nuxt 使其同时输出到浏览器端
  // 也可以看到 route 中的 query  path  name  hash  matched
</script>

<style lang="scss"></style>




自定义路由
import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
  routes: (_routes) => [
    ..._routes,
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/home.vue')
    }
  ],
}

//或者这么写
const customRoutes = [
  {
    name: 'home',
    path: '/xxx',
    component: () => import('../pages/about.vue')
  }
]
export default  {
  routes: (_routes) => _routes.concat(customRoutes)
}





```

## 5.组件&布局

```vue
组件：
使用子组件
1. 在项目根目录中，创建  components/users/header.vue - 创建组件文件，在components中创建的文件默认就会成为组件，可以直接使用。
<template>
  <h1>用户头部-子组件</h1>
</template>

2.使用子组件 - 编辑 pages / users / index.vue
<template>
  <div>
  	<h1>用户列表信息</h1>
    <UsersHeader  />    <!--  目录加文件名称   -->
	</div>
</template>


布局：
（实际项目用不到，用布局的话不利于SEO，管理后台类的不合适用NUXT）
三种实现方式：
1、layout目录下创建default.vue文件，没有app.vue时会默认访问这个文件
在项目根目录中，创建默认布局组件 layouts / default.vue - 因为有「洞」，所以需要有一个根标签
<template>
    <app-header />
    <app-aside />
    <slot />    <!--  挖洞，显示不同子路由组件的内容 -->
    <app-footer />
</template>


2、或者app.vue中使用nuxt-page
<template>
  	<app-header />
    <app-aside />
    <nuxt-page></nuxt-page>
    <app-footer />
</template>

3、或者layout和app.vue结合使用
<template>
  <h1>我是根组件</h1>
  <nuxt-link to="/users">用户列表</nuxt-link>
  <nuxt-link to="/users/create-or-edit">添加或更新用户</nuxt-link>
  <nuxt-link to="/about">关于</nuxt-link>

  <!-- 
  	使用默认布局组件. 这里它只是有一个插槽，表示空的，可以添东西
    而里面的 nuxt-page 是把路由对应的页面组件替换到这里
  -->
  <NuxtLayout>
    <nuxt-page></nuxt-page>
  </NuxtLayout>
</template>


```

## 6.SEO配置

```vue
1.统一设置 - 编辑 nuxt.config.ts
export default defineNuxtConfig({
	app: {
    head: {
      charset: 'utf-8',   // 默认值, 可不写
      viewport: 'width=device-width, initial-scale=1', // 默认值, 可不写
      title: '水哥澎湃',
      meta: [
        // <meta name="description" content="一个适合初学者的网站">
        { name: 'description', content: '我的破网站' },
        { name: 'keywords', content: '编程,IT,前端,后端,培训,教程,视频' }
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
      	{ rel: 'stylesheet', href: 'https://awesome-lib.css' }
      ],
      style: [
        // <style type="text/css"> .xxx { color: red }</style>
      	{ children: '.xxx { color: red }', type: 'text/css' }
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
      	{ src: 'https://awesome-lib.js', body: true }
      ],
      noscript: [
        // <noscript>Javascript is required</noscript>
        { children: 'Javascript is required' }
      ]
    }
  }
})


2.单独设置 - useHead()
<script setup lang="ts">
// 内部值可以使用变量
useHead({
  title: 'My App',  // 可以使用变量
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { children: 'console.log(\'Hello world\')' } ]
})
</script>



3. 预定义组件
Nuxt 提供了一些组件，可以在用户组件中直接使用。注意大写
<Title>, <Base>, <Script>, <NoScript>, <Style>, <Meta>, <Link>, <Body>, <Html> and <Head>
（预定义组件与useHead在同一文件中使用时，预定义组件优先级高

<script setup>
	const title = ref('Hello World')
</script>
<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
      <Style type="text/css" children="body { background-color: green; }" />
    </Head>
    <h1>{{ title }}</h1>
  </div>
</template>


4. 动态标题
在 app.vue 或 layouts/default.vue 顶层组件中，进行配置，子页面设置的 title 将作为 titleChunk 传入
<script setup lang="ts">
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - 水哥澎湃` : '水哥澎湃';
    }
  })
</script>
    



```



## 7.静态资源

```vue
public  => /
磁盘路径  public/img/ 1.jpg
网站路径  <img src="/img/1.jpg" />

assets 
磁盘路径  assets/img/ 1.jpg
网站路径  <img src="~/assets/img/1.jpg" />



https://v3.nuxtjs.org/api/configuration/nuxt-config/





在 Vue 项目中，assets和public文件夹都是用于存放静态资源的，但它们在使用方式、处理机制和适用场景上有明显区别：
1. 处理方式不同
assets文件夹：
    里面的文件会被 Webpack 处理（打包压缩、重命名等）
    属于源代码的一部分，会被归类到打包后的dist文件夹中
    文件路径会被 Webpack 解析，支持模块依赖
public文件夹：
    里面的文件不会被 Webpack 处理，会被直接复制到dist文件夹根目录
    保持原始文件名和目录结构
    不会被 Webpack 解析，无法通过import导入
2. 引用方式不同
引用assets中的资源：	
<!-- 在模板中 -->
<img src="@/assets/logo.png" alt="Logo">

<!-- 在样式中 -->
<style>
  .bg { background-image: url('~@/assets/bg.jpg'); }
</style>

<!-- 在JS中 -->
<script>
  import img from '@/assets/image.png'
  export default {
    data() {
      return { imgUrl: img }
    }
  }
</script>
引用public中的资源：
<!-- 在模板中 -->
<img src="/static/logo.png" alt="Logo">

<!-- 在样式中（注意：CSS中无法直接引用public文件夹的资源） -->

<!-- 在JS中 -->
<script>
  export default {
    data() {
      return { 
        imgUrl: process.env.BASE_URL + 'static/logo.png'
      }
    }
  }
</script>

3. 适用场景不同
assets适用于：
    需要被 Webpack 处理的资源（如图片、字体、样式等）
    体积较小的资源
    需要在代码中通过import引用的资源
    会随着项目版本迭代更新的资源
public适用于：
    不需要 Webpack 处理的静态资源
    体积较大的资源（如视频）
    需要在 HTML 中直接引用的资源（如 favicon.ico）
    需要保持固定 URL 的资源（如第三方脚本）
    服务端渲染 (SSR) 时需要的资源
4. 路径处理不同
    assets中的资源路径会被 Webpack 处理，在打包时会根据配置自动添加正确的路径
    public中的资源路径是绝对路径，需要使用process.env.BASE_URL来确保路径正确性，特别是当项目部署在非根目录时


总结：assets适合存放需要被 Webpack 处理的源代码资源，public适合存放需要保持原始状态的静态资源。选择使用哪个文件夹主要取决于资源是否需要被构建工具处理以及引用方式。



```

## 8.环境变量配置与获取数据

```typescript
1.axio与useFetch
Nuxt中如使用axios，因Nuxt是同构渲染框架，会发现服务器获取了两次请求，一次是在服务端发起的，一次是客户端发起的。
所以建议使用自带的useFetch和useAsyncData，只请求一次。


const http = require('http')

// 1.创建 web服务器
let n = 0
const server = http.createServer((req, res) => {
	console.log(n++)
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end('拉勾教育')
})
// 2.设置 web服务器 监听3000端口
server.listen(80, () => {
    console.log('服务器运行了')
})
node  server.js

//2.编辑 pages / user / index.vue
<template>
  <h1>用户首页</h1>
</template>

<script setup> 
// 方式1: 使用 axios 请求
import axios from 'axios'
axios.get('http://localhost').then(res => {
  console.log(res)
})
// 方式2: 使用 内置函数 请求
/*  
useFetch('http://localhost').then(res => {
  console.log(res)
})
*/  
</script>


<script setup lang="ts">
const { data } = await useFetch('/api/data')

async function handleFormSubmit() {
  const res = await $fetch('/api/submit', {
    method: 'POST',
    body: {
      // 我的表单数据
    }
  })
}
</script>

<template>
  <div v-if="data == null">
    无数据
  </div>
  <div v-else>
    <form @submit="handleFormSubmit">
      <!-- 表单输入标签 -->
    </form>
  </div>
</template>




2.useFetch、useAsyncData
<template>
  <h1>用户首页</h1>
</template>

<script setup>
  useFetch('/posts', {
    method: 'GET',
    baseURL: 'https://jsonplaceholder.typicode.com'
  }).then(res => {
    console.log(res)
  })

  /*
    useAsyncData('获取文章', () => $fetch('/posts', {
      method: 'GET',
      baseURL: 'https://jsonplaceholder.typicode.com'
    })).then(res => {
      console.log(res.data)
    })
  */
</script>




3.useLazyFetch、useLazyAsyncData
Lazy
查看效果
0.使用 useFetch 请求数据
1.设置 Network / Slow 3G
2.从其它地址, 点击切换到 /user    (现象: 先卡住不动, 等请求完毕后, 切换)
3.改为 useLazyFetch 请求数据
4.从其它地址, 点击切换到 /user    (现象: 先切换,显示静态内容, 请求完毕后渲染数据)


<template>
  <h1>用户首页</h1>
  <h2>{{ data }}</h2>
</template>

<script setup> 
  const { data } = await useFetch('/posts', {
    method: 'GET',
    params: { id: 3},
    baseURL: 'https://jsonplaceholder.typicode.com'
  })
</script>

<style lang="scss"></style> 


```

```javascript

nuxt3 useFetch useAsyncData $fetch 区别
https://www.cnblogs.com/jocongmin/p/18658405

1. useFetch
useFetch 是一个用于获取数据的高层次工具，结合了 useAsyncData 和 $fetch 的功能，特别适用于需要与 Nuxt 3 的服务器端渲染（SSR）集成的情况。

特点：
自动处理状态：useFetch 会自动处理加载状态、错误状态以及数据缓存。
SSR支持：它默认支持 SSR，并会在服务器端预取数据。
返回对象：返回的对象包含 data（响应数据）、pending（加载状态）、error（错误状态）和 refresh（用于手动刷新请求）等属性。
使用场景：
适用于大多数页面和组件的数据请求，尤其是需要 SSR 的场景，比如页面初始化时需要从服务器拉取数据。

示例：
<script setup>
const { data, pending, error, refresh } = await useFetch('/api/users')
</script>
2. useAsyncData
useAsyncData 是一个更为通用的异步数据处理工具，可以处理任何类型的异步操作，不仅仅是 HTTP 请求。它是一个更灵活的 API，适合需要复杂异步操作控制的情况。

特点：
通用性强：可以处理任何异步操作，不仅限于 HTTP 请求。
SSR支持：支持 SSR，可以在页面渲染时进行数据预取。
更多控制：相较于 useFetch，提供了更多控制选项，例如自定义缓存行为和数据处理。
使用场景：
当你需要更多自定义控制（例如非 HTTP 异步操作，或者需要更复杂的错误处理和缓存逻辑）时，可以使用 useAsyncData。

示例：
<script setup>
const { data, pending, error, refresh } = await useAsyncData(
  'users',
  () => $fetch('/api/users')
)
</script>
3. $fetch
$fetch 是一个底层 API，封装了浏览器的 fetch，并为它提供了更好的类型支持。它是 Nuxt 3 中用于发起 HTTP 请求的最基础工具。

特点：
简单：它是一个基于原生 fetch API 的工具，处理的是单一的 HTTP 请求。
无SSR和缓存处理：它本身不处理 SSR 或数据缓存，更多的控制交给开发者。
返回 Promise：返回的是直接的 Promise，不包含加载状态或错误信息。
使用场景：
适用于简单的 HTTP 请求，尤其是在不关心 SSR 或自动缓存的情况下。如果你只需要发起一个请求并拿到数据，而不需要集成到 Nuxt 的渲染流程中，可以使用 $fetch。

示例：
<script setup>
const users = await $fetch('/api/users')
</script>
主要区别总结
特性	useFetch	useAsyncData	$fetch
SSR支持	支持	支持	不支持，需手动处理
自动缓存	支持	支持	不支持
使用场景	页面或组件数据获取，尤其是SSR场景	复杂的异步操作，支持SSR，更多控制选项	简单的HTTP请求，不关心SSR和缓存
返回值	返回包含 data、pending、error 等状态的对象	返回包含 data、pending、error 等状态的对象	返回 Promise，仅包含响应数据
总结
useFetch：适合大多数常规数据获取场景，特别是需要 SSR 的情况。它封装了数据加载、错误处理和缓存的功能，提供了一个简单的 API。
useAsyncData：更灵活且适用于更复杂的异步操作，可以自定义数据处理方式。它可以处理不仅仅是 HTTP 请求的任何异步任务，适用于更有控制需求的场景。
$fetch：最基础的请求工具，适用于不需要SSR和自动缓存的简单 HTTP 请求。
选择适合的工具取决于你的项目需求，是否需要 SSR，是否需要控制数据的缓存和刷新，或者只是简单地进行 HTTP 请求。

结论就是$fetch ajax请求，useFetch和useAsyncData都是可以服务端预请求用于服务端首次渲染，客户端渲染好后的请求就会变成异步请求了。

前端工程师、程序员
```



## 9. cookie、token

```typescript
同构渲染中，刷新页面，向接口请求数据的动作，将在服务器端发生，
如果请求时需要 cookie、token，服务器端是无法提供的，此时可以从 客户端请求头获取相应信息
useRequestHeaders()   获取所有请求头信息
useRequestHeaders(['cookie'])   获取指定的请求头信息

<script setup>
// 获取头部信息中的 cookie
const headers = useRequestHeaders(['cookie'])
// 将cookie作为本次请求的头部信息一同传递
const { data } = await useFetch('/api/me', { headers })
</script>


<script setup>
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization'])
})
</script>






```

## 10.Server API

```typescript
自动扫描相关目录:
~/server/api/
~/server/routes/
~/server/middleware/ 
目录中, 每个文件都应该导出一个用defineEventHandler()定义的默认函数
处理程序可以直接返回JSON数据、Promise或使用event.node.res.end()发送响应。

有/api前缀  访问路径：/api/aaaa
将文件存放到 server/api  目录下
创建server/api/aaaa.ts

无/api前缀 访问路径：/bbbb
将文件放在server/routes目录下
创建文server/routes/ bbbb.ts

获取路由参数 访问路径：/cccc/134
server/api/cccc/[age].ts
export default defineEventHandler((event) => `Hello, ${event.context.params.age}!`)

获取查询字符串 访问路径：http://localhost:3000/api/cccc?a=10&b=20&c=30
server/api/cccc/[name].js
export default defineEventHandler(event => {
  const query = getQuery(event)
  return query
})

请求方式
可以以.get、.post、.put、.delete…作为后缀，以匹配请求的HTTP方法
server / api / dddd.get.ts
export default defineEventHandler(event => 'GET请求方式')


请求 body
server/api/dddd.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body) // 后端接收的数据
  return true
})

<script setup lang="ts">
async function submit () {
  const { body } = await $fetch('/api/dddd', {
    method: 'post',
    body: { test: 123 },
  })
}
</script>


默认接口（没有任何匹配到时候的API地址）
~/server/api/foo/[...].ts
export default defineEventHandler((event) => {
  // event.context.path to get the route path: '/api/foo/bar/baz'
  // event.context.params._ to get the route segment: 'bar/baz'
  return `Default foo handler`
})
                  

```

## 11.状态管理

```typescript
1.定义需要-共享的数据 - 创建 composables / use-counter.ts
export const useCounter = () => useState('counter', () => 0)

2.操作改变-共享的数据 - 编辑 user / index.vue
<template>
  <h1>用户首页</h1>
  <h2>{{ counter }}</h2>
  <button @click="counter++">加1</button>
  <button @click="addCounter">加2</button>
</template>

<script setup>
const counter = useCounter()
const addCounter = () => {
  counter.value += 2
}
</script>

<style lang="scss"></style>



3.引入使用-共享的数据 - 编辑 user / create-or-edit.vue
<template>
  <h1>添加或更新用户信息</h1>
  <h2>{{ counter }}</h2>
</template>

<script lang="ts" setup>
let counter = useCounter()
</script>

<style lang="scss"></style>


4.点击按钮修改 counter 值, 切换到 添加或更新 组件查看值的变化







```

## 12.环境变量 nuxt.config.ts

```typescript
环境变量   nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    aaaa: '123',        // 只能在 服务端 使用
    isServer: true,
    public: {           // 服务端和客户端都可以使用
      apiBase: 'https://200.run'   
    }
  }
})

在其它地方 - 使用变量
<script setup>
  const runtimeConfig = useRuntimeConfig()
</script>

在 .env 中定义的数据可覆盖 nuxt.config.ts 中数据
export default defineNuxtConfig({
  runtimeConfig: {
    isServer: true,
    public: {
      apiBase: 'http://www.jd.com'
    }
  }
})

<script setup>
const runtimeConfig = useRuntimeConfig()
if (runtimeConfig.isServer) {
  console.log('只在服务器端执行, 因为客户端访问isServer时, 会得到 undefined')
}
</script>




```

## 13.app.config.ts

```typescript
export default defineAppConfig({
  title: 'Hello Nuxt',
  theme: {
    dark: true,
    colors: {
      primary: '#ff0000'
    }
  }
})


<script setup>
  const appConfig = useAppConfig()
</script>
```

## 14.部署 - Node.js Server

```typescript
需要一个独立的 node 服务器, 来满足同构渲染的需要. 也包括项目自有 API 实现的需要(如果有的话)
项目构建
npm  run  build      // 需要清空之前的 .nuxt 和 .output 目录

直接运行
node  .output/server/index.mjs
端口和地址可以通过 process.env 配置, 但没必要, 不要纠结

使用 PM2
可以用于生产环境的Nodejs的进程管理工具，并且它内置一个负载均衡。
它不仅可以保证服务不会中断一直在线，并且提供0秒reload功能，还有其他一系列进程管理、监控功能
更多参考:
https://www.jianshu.com/p/bab31fac7655
https://www.cnblogs.com/kunmomo/p/14990703.html
PM2 官网: https://pm2.keymetrics.io/

1. 安装 pm2
npm  i  pm2  -g      // 可能需要管理员权限
pm2  -v

2. 创建并编辑 运行配置文件 - ecosystem.config.js
module.exports = {
  "apps" : [{
    //"script": "./bin/www",
    //"args": ["-p", "3001"],  //node的args参数 等同于  node ./bin/ww  -p 30001    其中参数-p和3001，都可以有 process.argv 拿到，process.argv为一个数组
    //"node_args"   : "--harmony",    //node harmony模式启动
    //"merge_logs"  : true,
    //"cwd":"./",
    //"log_file": "./log/combined.outerr.log",
    //"out_file": "./log/out.log",
    //"error_file": "./log/err.log",
    name: "my-nuxt3",
    // exec_mode: 'cluster',
    // instances: 'max',
    script: './.output/server/index.mjs',
    env: {  //node的 env参数， 可以通过  process.env.xxx获取
      NODE_ENV: "production",
      PORT: 8080
    }
  }]
}


3. 基于配置文件 - 运行项目
pm2  start

4. 其它 pm2 命令  (xx 可以是 id , 也可以是名称)
pm2  stop   xx    /    pm2  stop  all  
pm2  delete  xx  /    pm2  delete  all
pm2  start   xx   /     pm2  start  all
pm2  ls
```





