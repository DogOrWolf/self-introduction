

## VUE3知识点总结


### 一、基础知识

```
	Vue 是一套渐进式JavaScript前端框架，Vue3 是 Vue 的最新稳定版本（目前主流版本是 Vue3.4+），也是目前前端开发最主流、最热门的框架之一。
	
✅ 核心语法
	模板语法
	响应式数据（ref/reactive）
	本地存储
	Composition API
	新特性Teleport、Fragments、Suspense
	类型定义
	组件Props类型
✅ 计算属性
✅ 侦听器
✅ 生命周期钩子
https://blog.csdn.net/m0_74488469/article/details/149675351

```

#### 1.核心语法

##### 1.1 模板语法

```vue
	Vue3模板语法就是Vue提供的一套在HTML模板中书写的、能让你把JavaScript数据和逻辑无缝融入页面的语法规则，核心作用是让你用更简洁的方式实现数据到视图的绑定。
	模板语法的特点：
	1）声明式：你只需要描述 “数据和视图的关系”，不用手动操作 DOM（比如 document.getElementById）；
	2）兼容性：最终会被 Vue 编译成原生 HTML 和 JavaScript，能在所有浏览器运行；
	3）简洁性：相比原生 JS 操作 DOM，模板语法更简洁，降低了前端开发的复杂度。
		
	本质上是增强版的HTML，它在标准HTML基础上扩展了一些特殊的指令和语法，主要分为两大类：
	1. 插值语法（插值表达式/文本渲染）
   		1) {{ }} 内部只能写单个表达式（有返回值的代码），不能写多行语句或复杂逻辑；
    	2）数据是响应式的，变量值变化时，页面会自动更新。
        <template>
          <!-- 直接渲染变量 -->
          <div>{{ message }}</div>

          <!-- 支持简单的表达式运算 -->
          <div>{{ count + 1 }}</div>
          <div>{{ isShow ? '显示' : '隐藏' }}</div>

          <!-- 不支持语句（如 if/for）和复杂逻辑 -->
          <!-- ❌ 错误示例：{{ if (count > 0) { return '正数' } }} -->
        </template>

        <script setup>
            import { ref } from 'vue'
            // 定义模板中要使用的数据
            const message = ref('Hello Vue3!')
            const count = ref(5)
            const isShow = ref(true)
        </script>


	2. 指令语法（逻辑 / 行为绑定）
	指令是 Vue 提供的以 v- 开头的特殊属性，用于给 DOM 元素绑定特殊行为（如事件、样式、条件渲染等），是模板语法的核心。
	1）常用核心指令
        <template>
          <!-- 1. v-bind：绑定属性（可简写为 :） -->
          <a :href="url">点击跳转</a>
          <img :src="imgSrc" :alt="imgAlt">

          <!-- 2. v-on：绑定事件（可简写为 @） -->
          <button @click="handleClick">点击按钮</button>
          <input @input="handleInput">

          <!-- 3. v-if/v-else：条件渲染 -->
          <div v-if="score >= 60">及格</div>
          <div v-else>不及格</div>

          <!-- 4. v-for：列表渲染 -->
          <ul>
            <li v-for="(item, index) in list" :key="index">
              {{ index + 1 }}. {{ item }}
            </li>
          </ul>

          <!-- 5. v-model：双向数据绑定（表单专用） -->
          <input v-model="username" type="text" placeholder="请输入用户名">
          <p>你输入的用户名：{{ username }}</p>
        </template>

        <script setup>
        import { ref } from 'vue'
        // 指令绑定的数据
        const url = ref('https://vuejs.org')
        const imgSrc = ref('https://vuejs.org/images/logo.png')
        const imgAlt = ref('Vue Logo')
        const score = ref(75)
        const list = ref(['Vue3', 'React', 'Angular'])
        const username = ref('')

        // 事件处理函数
        const handleClick = () => {
          alert('按钮被点击了！')
        }
        const handleInput = (e) => {
          console.log('输入的内容：', e.target.value)
        }
        </script>
	
	2）指令的特殊用法
		a) 动态参数
            <button @[eventName]="handleClick">动态事件</button>
            <script setup>
                const eventName = ref('click') // 可改为 'mouseover' 等
            </script>

		b) 修饰符
            <!-- 阻止默认行为 -->
            <a @click.prevent="handleLinkClick" href="/">跳转</a>
            <!-- 双向绑定去除首尾空格 -->
            <input v-model.trim="username">

<!---- 事件修饰符（最常用，配合 @/v-on 使用））---->
.stop	阻止事件冒泡（阻止事件向上级元素传递）	@click.stop="handleClick"
.prevent	阻止浏览器默认行为（如 a 标签跳转、表单提交）	@submit.prevent="handleSubmit"
.capture	开启事件捕获模式（事件从外层向内层触发，默认是冒泡）	@click.capture="handleClick"
.self	只有事件触发在当前元素本身（而非子元素）时才执行	@click.self="handleClick"
.once	事件只触发一次	@click.once="handleClick"
.passive	告诉浏览器该事件不会调用 preventDefault()，提升移动端滚动性能	@scroll.passive="handleScroll"

<!---- v-model 修饰符（专用于表单双向绑定）---->
.trim	自动过滤输入内容的首尾空格	<input v-model.trim="username">
.number	将输入的字符串转为数字（若无法转数字则返回原始值）	<input v-model.number="age" type="text">
.lazy	把 input 事件改为 change 事件触发（失去焦点 / 回车时才更新数据）

<!---- 常见的事件类型 ---->	
1. 鼠标事件
    @click：单击元素时触发，适用于按钮点击、菜单选择等场景。
    @dblclick：双击元素时触发，可用于文件打开、特殊操作等场景。
    @mouseenter：鼠标进入元素时触发，常用于悬停效果、下拉菜单显示等。
    @mouseleave：鼠标离开元素时触发，适用于悬停效果消失、菜单隐藏等。
    @mouseover：鼠标悬停在元素上时触发，类似mouseenter但会冒泡。
    @mouseout：鼠标移出元素时触发，类似mouseleave但会冒泡。
    @mousedown：鼠标按钮按下时触发，可用于拖拽操作开始等场景。
    @mouseup：鼠标按钮释放时触发，适用于拖拽操作结束等场景。
2. 键盘事件
    @keydown：按下任意键时触发，常用于键盘快捷键、游戏控制等。
    @keyup：释放按键时触发，适用于表单提交、字符输入确认等。
    @keypress：按下字符键时触发，用于字符输入处理（已不推荐使用）。
    @keyup.enter：按下回车键时触发，可用于表单提交、换行等场景。
    @keyup.tab：按下 Tab 键时触发，适用于焦点切换等场景。
    @keyup.delete：按下删除键时触发，用于删除操作等场景。
    @keyup.esc：按下 ESC 键时触发，适用于取消操作、关闭弹窗等场景。
3. 表单事件
    @input：输入框内容改变时触发，可实时获取输入值（如实时显示用户输入内容）。
    @change：表单元素值改变并失去焦点时触发，适用于下拉选择、复选框状态改变等场景。
    @focus：元素获得焦点时触发，常用于输入框激活状态处理等。
    @blur：元素失去焦点时触发，可用于表单验证、自动保存等场景。
    @submit：表单提交时触发，适用于表单数据提交等场景。
4. 窗口事件
    @resize：窗口大小改变时触发，常用于响应式布局调整等场景。
    @scroll：滚动条滚动时触发，适用于滚动监听、懒加载等场景。
    @load：页面或资源加载完成时触发，可用于图片加载完成、初始化操作等。
    @unload：页面卸载时触发，适用于数据保存、清理工作等场景。
5. 触摸事件
    @touchstart：触摸开始时触发，适用于移动端触摸操作的起始阶段。
    @touchmove：触摸移动时触发，常用于手势操作、滑动等场景。
    @touchend：触摸结束时触发，适用于触摸操作完成的场景。


模板语法总结：
    Vue3 模板语法是 HTML 的增强版，核心是插值语法（{{}}） 和指令语法（v - 开头）；
    插值语法用于渲染文本，指令语法用于绑定属性、事件、条件 / 列表渲染、双向绑定等逻辑；
    模板语法的核心价值是声明式绑定数据与视图，无需手动操作 DOM，提升开发效率。

```

##### 1.2 组合式API

```vue
	Vue3 组合式 API（Composition API），简单来说就是 Vue3 推出的一套全新的代码组织方式，核心是把分散在不同选项（如 data、methods、watch）里的同一块业务逻辑聚合到一起，解决了 Vue2 选项式 API 在复杂组件中代码分散、难维护的问题。

1.为什么会有组合式API
	Vue2 选项式 API（Options API）的问题
	一个简单的 “计数逻辑”，被拆到 data、methods、watch 等多个选项里；
	组件越复杂（比如同时处理 “计数”+“请求数据”+“表单验证”），代码就越分散，找一块逻辑要在多个选项间来回跳，维护成本高。
	<!-- Vue2 选项式 API -->
    <template>
      <div>{{ count }} <button @click="add">+1</button></div>
    </template>

    <script>
    export default {
      // 数据
      data() {
        return { count: 0 }
      },
      // 方法
      methods: {
        add() { this.count++ }
      },
      // 监听
      watch: {
        count(newVal) { console.log('count变了：', newVal) }
      },
      // 生命周期
      mounted() { console.log('挂载完成') }
    }
    </script>
	
	Vue3 组合式 API 的解决思路
	把 “计数逻辑” 的所有代码（数据、方法、监听、生命周期）集中写在一起，哪怕组件有 10 块不同的业务逻辑，也能各自聚合，结构更清晰：
	<!-- Vue3 组合式 API（核心是 <script setup>） -->
    <template>
      <div>{{ count }} <button @click="add">+1</button></div>
    </template>

    <script setup>
        // 1. 导入需要的API
        import { ref, watch, onMounted } from 'vue'
        // 2. 聚合“计数逻辑”的所有代码
        // 数据
        const count = ref(0)
        // 方法
        const add = () => { count.value++ }
        // 监听
        watch(count, (newVal) => { console.log('count变了：', newVal) })
        // 生命周期
        onMounted(() => { console.log('挂载完成') })
    </script>

2.组合式 API 的核心概念和常用 API
    1)setup 函数：
        a）<script setup></script> 语法糖（简化写法)
        b）组件的入口，在 created 之前执行，无 this 指向（this 为 undefined）
        c）接收两个参数：props（父传子的属性，只读）、context（包含 attrs、emit、slots）
        d）返回值：对象（模板可直接使用）、渲染函数
    2)响应式数据
        a）ref：定义简单类型（数字、字符串、布尔）或复杂类型（对象、数组）的响应式数据，访问/修改需用.value。
        b）reactive：定义复杂类型（对象、数组）的响应式数据，直接访问/修改即可，用于对象/数组，返回代理对象，无需.value；不能直接赋值（会丢失响应式），可通过解构或Object.assign解决。
        c）readonly：创建只读的响应式数据，修改会报警告
        d）computed：计算属性，支持 getter/setter
        e）toRef：从响应式对象中提取单个属性，创建一个对应的 ref，且与原对象保持响应式关联。
        f）toRefs：将响应式对象的所有属性转为 ref，返回一个包含所有 ref 的普通对象，与原对象保持响应式关联。
        g）watch：监听数据变化
        h）watchEffect：简单来说就是一个自动追踪依赖的响应式副作用函数—— 它会立即执行一次，同时自动收集执行过程中用到的响应式数据作为依赖，当这些依赖发生变化时，函数会重新执行。watchEffect 会返回一个停止函数，调用后可手动停止监听，常用于组件卸载前清理副作用（如定时器、事件监听）。

        <script setup>
            import { ref, reactive } from 'vue'

            // 简单类型响应式
            const name = ref('Vue3')
            name.value = 'Composition API' // 修改
            // 复杂类型响应式 ref
            const user = ref({ name: '张三', age: 20 })
            user.value.age = 21 // 修改深层属性

            // 复杂类型响应式 reactive
            const user = reactive({
              age: 3,
              hobby: ['前端', '框架']
            })
            user.age = 4 // 直接修改
            user.hobby.push('组合式API')

            //computed计算属性
            import { ref, computed } from 'vue'
            const count = ref(0)
            // 只读计算属性
            const doubleCount = computed(() => count.value * 2)
            // 可写计算属性
            const fullName = computed({
              get: () => `${firstName.value} ${lastName.value}`,
              set: (val) => {
                const [first, last] = val.split(' ')
                firstName.value = first
                lastName.value = last
              }
            })

            // toRef toRefs
            import { reactive, toRef , toRefs } from 'vue'

            const user = reactive({ name: '张三', age: 20 })
            const ageRef = toRef(user, 'age')
            ageRef.value = 21 // 原对象age同步变为21
            user.age = 22 // ageRef.value 同步变为22

            const { name, age } = toRefs(user) // 解构后仍为响应式
            name.value = '李四' // 原对象name同步更新
            age.value = 21 // 原对象age同步更新

            //watch监听
            import { ref, watch } from 'vue'
            const count = ref(0)
            // 监听单个值
            watch(count, (newVal, oldVal) => {
              console.log(`count 从 ${oldVal} 变到 ${newVal}`)
            }, { immediate: true, deep: true }) // immediate：立即执行；deep：深度监听

            // 监听多个值
            watch([count, user], ([newCount, newUser], [oldCount, oldUser]) => {
              // 处理逻辑

            })


            //watchEffect
            import { ref, watchEffect, onUnmounted } from 'vue'
            const count = ref(0)

            // 启动监听，获取停止函数
            const stopWatch = watchEffect(() => {
              console.log('count:', count.value)
            })

            // 手动停止（比如点击按钮）
            const handleStop = () => {
              stopWatch()
            }

            // 组件卸载时停止（防止内存泄漏）
            onUnmounted(() => {
              stopWatch()
            })
        </script>

    核心创建 API：ref（单个值 / 任意类型）、reactive（复杂对象 / 数组）、computed（推导型响应式数据）；
    工具判断 API：isRef/isReactive/isReadonly/isProxy（判断响应式状态）；
    转换修改 API：readonly（只读保护）、shallowReactive/shallowReadonly（浅响应式 / 浅只读）、unref/toRef/toRefs（解包 / 提取 ref）；
    选型原则：简单值用 ref，复杂对象用 reactive，推导值用 computed，需保护数据用 readonly。

```

##### 1.3 样式处理

```vue
1.Class绑定
	动态绑定 class 时，可以使用对象、数组或字符串形式，根据条件切换类名。
	方式一：对象语法（根据条件添加类名）
		:class = "{变量名2:布尔值变量1，变量名1:布尔值变量2.......}"
	 	<h1 :class="{active:isActive,error:hasError}">我是对象型语法的class绑定</h1>
	方式二：数组语法（列表形式添加类名）
		:class = "[变量1,变量2.......]"（注意：变量绑定是属性的类名，可以通过改变类名来改变样式）
		<template>
          <div :class="[baseClass, activeClass]">
            数组形式Class绑定
          </div>
          <button @click="activeClass = activeClass === 'active' ? '' : 'active'">改变动态的样式</button>
        </template>
	方式三：数组 + 对象结合（条件性添加数组中的类名）
		<template>
          <!--    数组类型            对象类型的class绑定    -->
          <div :class="[baseClass, isActive ? activeClass : '']">
            混合形式Class绑定
          </div>
          <button @click="changeActive">点击切换成动态样式</button>
        </template>

2.样式处理
    a）作用域样式：<style scoped></style>（样式仅作用于当前组件）
    b）全局样式：<style></style>（无 scoped）或 <style global></style>
    c）深度选择器：::v-deep（Vue2）/ :deep()（Vue3），穿透 scoped 样式     
    <style scoped>
        :deep(.el-button) {
          color: red;
        }
    </style>
	d）CSS 变量：Vue3 支持在样式中使用组件的响应式数据（v-bind 绑定）
    <script setup>
    	const color = ref('red')
    </script>
    <style>
        .box {
          color: v-bind(color); // 绑定响应式变量
        }
    </style>
        

3.预处理器Less/Sass
	待学习

        
```

##### 1.4 新特性

```
Teleport、Fragments、Suspense
	待学习
	
provide/inject
	带学习

```

### 二、进阶知识

```
✅ 组件化开发：
	组件的定义、导入、使用
	父子组件通信（Props/emit）
	插槽
	组件懒加载
	
✅ 路由
	VueRouter4
	路由跳转
	
✅ 状态管理
	Pinia
	全局数据共享
	
✅ 组合式API进阶	
	provide/inject
	toRefs
	computed进阶
	
✅ 其他	
	动画与过渡
	自定义指令
	组合式函数
	动态组件
	递归组件
	高阶组件(HOC)
	大列表优化
	计算属性缓存
	
✅ UI库	
	Element Plus
	Vant4
	
	
	https://blog.csdn.net/student66666666/article/details/156462528
	https://blog.csdn.net/qw123456789e/article/details/146516226
```

##### 2.1组件

```vue
	Vue3组件是构成 Vue 应用的核心单元，它基于 Vue2 的组件体系做了优化（尤其是适配 Composition API），核心围绕组件封装、复用、通信、生命周期展开。

1. 组件的核心概念
	组件是可复用的 Vue 实例 / 代码块，拥有独立的模板、逻辑、样式，能将复杂页面拆分为多个独立、可维护的小单元（比如按钮组件、表单组件、卡片组件）。

2.组件的分类（按使用场景）
分类		特点											示例
根组件		应用入口组件，唯一								App.vue
全局组件	注册后全项目可用，无需导入						通用按钮、图标组件
局部组件	仅在注册的组件内可用，需导入						页面内的子组件
异步组件	按需加载，优化性能								大型弹窗、路由页面组件
函数式组件	无状态、无生命周期，轻量高效						纯展示型列表项组件

3. 组件的定义
（1）单文件组件（SFC，最常用）
（2）全局组件注册
（3）异步组件（按需加载）
（4）函数式组件（Vue3 简化版）

<!-------------------------- 1.单文件组件 ------------------------->
<!-- MyButton.vue：标准单文件组件 -->
<template>
  <button class="my-btn" @click="handleClick">{{ label }}</button>
</template>

<!-- setup 语法糖（Vue3 推荐） -->
<script setup>
    // 接收父组件传参
    defineProps({
      label: {
        type: String,
        default: '按钮'
      }
    })

    // 定义事件
    const emit = defineEmits(['click'])

    // 内部方法
    const handleClick = () => {
      emit('click', '按钮被点击了')
    }
</script>

<style scoped>
    .my-btn {
      padding: 8px 16px;
    }
</style>

<!-------------------------- 2.全局组件注册 --------------------------->
<script	>
    // 在 main.js 中注册，全项目无需导入即可使用
    // main.js
    import { createApp } from 'vue'
    import App from './App.vue'
    import MyButton from './components/MyButton.vue'

    const app = createApp(App)
    // 注册全局组件
    app.component('MyButton', MyButton)
    app.mount('#app')
</script>

<!-------------------- 3.异步组件（按需加载） ---------------->
	异步组件是指不会在页面初始化时立即加载，而是在需要渲染时（或提前预加载）才动态加载的组件。Vue3 提供了专门的 API 来定义异步组件，核心价值是代码分割（把大组件拆成小块，按需加载），降低首屏加载时间。

特点：
1）按需加载：只有组件被渲染时，才会加载对应的代码块；
2）支持加载状态：可配置加载中、加载失败、超时等状态；
3）支持 Suspense 配合：可与 <Suspense> 组件结合实现异步加载的统一处理；
4）Vue3 对比 Vue2：API 更简洁，新增 defineAsyncComponent 方法，配置项更丰富。
   
适用场景：
1）大型组件：如弹窗、详情页、Tab面板等 “非首屏必须” 的组件；
2）路由级别的异步组件（最常用）：结合 Vue Router 实现路由懒加载

<!-- 父组件中使用异步组件 -->
<!-- 父组件 App.vue -->
<template>
  <div>
    <button @click="showAsync = true">加载异步组件</button>
    <!-- 只有 showAsync 为 true 时，才会加载 AsyncComponent 代码 -->
    <AsyncComponent v-if="showAsync" />
  </div>

    <div>
        <Suspense>
          <!-- 异步组件的默认插槽 -->
          <template #default>
            <AsyncComponent1 />
            <AsyncComponent2 />
          </template>

          <!-- 加载中插槽（所有异步组件加载完成前显示） -->
          <template #fallback>
            <div>页面加载中...</div>
          </template>
        </Suspense>
    </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

// 方式1：定义异步组件：动态导入组件文件
const AsyncComponent = defineAsyncComponent(() => {
  // 返回 Promise（import() 本身返回 Promise）
  return import('./components/MyAsyncComponent.vue')
})

const showAsync = ref(false)

// 方式2：带加载/错误处理
const AsyncDialog = defineAsyncComponent({
  loader: () => import('./components/AsyncDialog.vue'), // 加载组件的函数
  loadingComponent: () => import('./components/Loading.vue'), // 加载中时显示的组件
  errorComponent: () => import('./components/Error.vue'), // 加载失败时显示的组件
  delay: 200, // 延迟显示加载组件（默认 200ms，避免短暂加载闪烁）
  timeout: 3000  // 超时时间（默认 Infinity，超过时间触发失败）
  retry: true,  // 加载失败时是否重试（默认 false）
  maxRetries: 3, // 重试次数（默认 Infinity）
  suspensible: true // 是否挂起（配合 Suspense，默认 true）
})

// 方式3：配合 Suspense 使用
// <Suspense> 是 Vue3 提供的专门处理异步依赖的组件，可统一管理多个异步组件的加载状态：
import { defineAsyncComponent } from 'vue'
const AsyncComponent1 = defineAsyncComponent(() => import('./components/Async1.vue'))
const AsyncComponent2 = defineAsyncComponent(() => import('./components/Async2.vue'))
</script>

<!--------------------------- 4.函数式组件（Vue3 简化版） ------------------------>
	函数式组件是无状态、无实例、轻量的组件，本质是一个返回 VNode 的纯函数 —— 没有响应式数据、没有生命周期、没有 this，仅接收 props 和上下文，渲染开销极低。Vue3 对函数式组件的设计做了简化，更贴合 “函数” 的本质。
    特点：
        1）无状态：不能定义 ref/reactive 等响应式数据；
        2）无实例：没有组件实例（this 为 undefined）；
        3）无生命周期：不能使用 onMounted 等生命周期钩子；
        4）纯函数：输入（props）决定输出（VNode），无副作用；
        5）性能高：渲染开销远低于普通组件，适合简单、高频渲染的场景。
        6）写法：纯函数 + h 函数，接收 props 和上下文，返回 VNode；
	使用场景：
        1）简单的展示型组件：如按钮、列表项、图标等无状态、仅接收 props 渲染的组件；
        2）高频渲染的组件：如表格单元格、下拉选项等，用函数式组件提升性能；
        3）动态渲染的组件：结合 component 标签动态渲染不同类型的简单组件；
        4）注意：不适合复杂组件（需要响应式数据、生命周期、插槽复杂逻辑的场景）。
<!-- 父组件 App.vue -->
<template>
  <div>
    <!-- 使用函数式组件 -->
    <FunctionalButton 
      text="点击我" 
      @click="handleClick" 
      type="primary"
    />
  </div>
</template>

<script setup>
import { h } from 'vue'
import FunctionalButton from './components/FunctionalButton.js'

const handleClick = () => {
  alert('函数式组件被点击')
}
</script>

// 子组件 FunctionalButton.js（函数式组件）
import { h } from 'vue'

// 函数式组件：接收 props 和上下文
export default function FunctionalButton(props, context) {
  // props：接收父组件传递的属性
  // context：包含 attrs、emit、slots 等
  const { text, type = 'default' } = props
  const { emit } = context

  // 用 h 函数创建 VNode（虚拟DOM）
  return h(
    'button', // 标签名/组件
    {
      // 属性/事件
      class: `btn btn-${type}`,
      onClick: () => emit('click') // 触发父组件事件
    },
    text // 子节点（内容）
  )
}

// 声明 props（可选，但推荐，提升类型提示）
export const props = {
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'default'
  }
}

<!-- 旧写法（兼容 Vue2）：已不推荐 -->
<!-- 
<template functional>
  <div>{{ props.text }}</div>
</template> 
-->

```

##### 2.2 组件间通信

按组件层级和数据共享范围选择最合适的方式。

| 通信场景              | 推荐方式            | 核心特点                             | 适用场景                           |
| --------------------- | ------------------- | ------------------------------------ | ---------------------------------- |
| 父 → 子               | Props               | 单向数据流，子组件只读               | 父组件给子组件传值/配置            |
| 子 → 父               | Emits               | 子组件触发事件，父组件监听           | 子组件向父组件传递操作结果/数据    |
| 父子双向绑定          | v-model（多绑定）   | 简化 Props+Emits，支持多个 v-model   | 表单组件、可编辑组件的双向绑定     |
| 跨级通信（爷孙/深层） | provide / inject    | 顶层提供、任意层级注入，打破层级限制 | 主题配置、全局权限、深层组件传值   |
| 任意组件（无层级）    | Pinia（推荐）/ mitt | 全局状态管理/事件总线，跨组件共享    | 全局用户信息、购物车、跨页面通信   |
| 父子透传（属性/事件） | $attrs / $listeners | 自动透传非 props 属性/未监听的事件   | 封装第三方组件、透传原生属性       |
| 父调用子方法/拿数据   | ref + defineExpose  | 获取子组件实例，调用方法/访问数据    | 子组件主动触发刷新、获取子组件状态 |

###### 1.父传子：props

```vue
父传子：props（setup 中通过 defineProps 定义）
<!-- 子组件 -->
<script setup>
    const props = defineProps({
      title: {
        type: String,
        required: true,
        default: '默认标题'
      }
    })
</script>
<template>
  <h1>{{ title }}</h1>
</template>

<!-- 父组件 -->
<template>
  <Child :title="parentTitle" />
</template>
```

###### 2.子传父：emit

```vue
子传父：emit（setup 中通过 defineEmits 定义）
<!-- 子组件 -->
<script setup>
    const emit = defineEmits(['change'])
    const handleClick = () => {
      emit('change', '子组件传递的值')
    }
</script>

<!-- 父组件 -->
<template>
  <Child @change="handleChange" />
</template>
```

###### 3.祖孙组件通信：provide/inject

```js
跨组件通信：provide/inject（祖孙组件通信）
允许祖先组件直接向任意深层子组件传递数据 / 方法，跳过中间层级，简化跨层级通信。

特点：
    1）跨层级：支持任意深度的组件通信（祖先→所有后代）；
    2）灵活性：可传递响应式数据、普通数据、方法；
    3）响应式：默认情况下，传递的响应式数据仍保持响应式（子组件注入后，数据变化会同步更新）；
    4）按需注入：子组件可选择是否注入，也可设置默认值。

适用场景：	
    1）跨多层级组件通信（如：主题切换、语言切换、全局配置）；
    2）组件库开发（如：表单组件的上下文传递、弹窗的上下文控制）；
    3）全局状态管理（简单场景，复杂场景推荐 Pinia/Vuex）。

注意事项：
    1）不要过度使用：provide/inject 会增加组件间的耦合性，简单的父子通信优先用 props/emit；
    2）响应式问题：务必传递 ref/reactive 对象，而非原始值，否则丢失响应式；
    3）类型提示：TypeScript 中可通过泛型增强 inject 的类型提示：

<!-- 顶层组件 -->
<script setup>
    import { provide, ref } from 'vue'
    const theme = ref('dark')
    provide('theme', theme) // 提供响应式数据
    provide('changeTheme', () => theme.value = 'light') // 提供方法
</script>	

<!-- 深层子组件 -->
<script setup>
    import { inject } from 'vue'
    const theme = inject('theme') // 接收响应式数据
    const changeTheme = inject('changeTheme') // 接收方法
</script>
	点击父组件或子组件的 “切换主题” 按钮，theme 会响应式变化，所有组件的主题样式同步更新；
深层子组件无需通过 props 接收，直接注入即可使用祖先组件的数据 / 方法。
    a) 保证响应式的注意事项
        provide 传递ref/reactive 响应式数据时，子组件注入后会自动保持响应式；
        ❌ 错误：如果传递的是响应式数据的 “原始值”（如 theme.value），会丢失响应式：

        // 父组件错误写法：传递原始值，子组件无法响应更新
        provide('theme', theme.value) // 传递的是字符串，非响应式

        ✅ 正确：直接传递响应式对象 / 引用（ref/reactive）：
        provide('theme', theme) // 传递 ref 对象，保持响应式

    b) 注入时设置默认值
        当祖先组件可能未提供某个键时，可给 inject 设置默认值，避免报错：
        // 方式1：基础默认值
        const pageSize = inject('pageSize', 10)

        // 方式2：复杂默认值（如对象/数组，需用工厂函数避免重复创建）
        const userInfo = inject('userInfo', () => ({ name: '默认用户', age: 0 }))

    c) 只读保护（防止子组件篡改数据）
        如果希望子组件只能读取数据，不能修改，可结合 readonly 提供只读的响应式数据：
        <!-- 父组件 -->
        <script setup>
        import { ref, provide, readonly } from 'vue'

        const user = reactive({ name: '张三', age: 20 })
        // 提供只读版本，子组件无法直接修改
        provide('readonlyUser', readonly(user))

        // 提供修改方法，子组件只能通过方法修改
        provide('updateUser', (newName) => {
          user.name = newName
        })
        </script>

        <!-- 子组件 -->
        <script setup>
            import { inject } from 'vue'

            const readonlyUser = inject('readonlyUser')
            const updateUser = inject('updateUser')

            // ❌ 直接修改会警告（readonly 保护）
            // readonlyUser.name = '李四'

            // ✅ 通过方法修改
            updateUser('李四')
        </script>

    d）跨多个组件提供 / 注入（命名空间）
        如果多个祖先组件都提供了相同键的数据，子组件会注入最近的祖先组件提供的值；若需区分不同来源，可使用 “命名空间”（如唯一的 Symbol 或前缀）：
    <script>
        // 父组件1
        const THEME_KEY = Symbol('theme')
        provide(THEME_KEY, ref('light'))

        // 父组件2
        provide('appTheme', ref('dark'))

        // 子组件
        const theme1 = inject(THEME_KEY) // 注入父组件1的主题
        const theme2 = inject('appTheme') // 注入父组件2的主题
    </script>

    e）配合组合式函数复用
    可将 provide/inject 逻辑抽成组合式函数，实现跨组件复用：

    // hooks/useTheme.js
    import { ref, provide, inject } from 'vue'

    // 定义唯一键
    const THEME_KEY = Symbol('theme')
    const CHANGE_THEME_KEY = Symbol('changeTheme')

    // 提供主题的函数（给祖先组件用）
    export function useProvideTheme() {
      const theme = ref('light')
      const changeTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
      }
      provide(THEME_KEY, theme)
      provide(CHANGE_THEME_KEY, changeTheme)
      return { theme, changeTheme }
    }

    // 注入主题的函数（给子组件用）
    export function useInjectTheme() {
      const theme = inject(THEME_KEY, ref('light'))
      const changeTheme = inject(CHANGE_THEME_KEY)
      return { theme, changeTheme }
    }

    组件中使用：
    <!-- 父组件 -->
    <script setup>
    import { useProvideTheme } from './hooks/useTheme'
    useProvideTheme()
    </script>

    <!-- 子组件 -->
    <script setup>
    import { useInjectTheme } from './hooks/useTheme'
    const { theme, changeTheme } = useInjectTheme()
    </script>
```

###### 4.全局通信：Pinia

```vue
Pinia（全局通信推荐）
// 1. 创建 Store
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({ name: '张三' }),
  actions: { updateName(newName) { this.name = newName } }
})

// 2. 任意组件使用
<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
console.log(userStore.name) // 读
userStore.updateName('李四') // 写
</script>

详细内容请见2.5状态管理
```

###### 5.事件总线：mitt

```js
mitt（事件总线，任意组件）
Vue3 移除了 $on/$off，需用第三方库 mitt 实现轻量级全局事件通信。	

npm install mitt -S
// 1. 创建总线
// utils/bus.js
import mitt from 'mitt'
export const bus = mitt()

// 2. 组件 A 触发事件
bus.emit('msg', 'Hello')

// 3. 组件 B 监听事件
bus.on('msg', (data) => console.log(data)) // Hello
```

###### 6.父调子：ref + defineExpose

```vue
ref + defineExpose（父调子）
	父组件通过给子组件绑定 ref 属性，配合 ref 变量，能获取子组件的实例，进而调用子组件暴露的方法、访问子组件的属性
	整个流程分为 3 步：父组件定义 ref 变量 → 子组件绑定 ref 属性 → 子组件暴露方法 / 属性 → 父组件通过 ref 调用。
	注意事项：
        1. 子组件实例的访问时机
          	子组件的 ref 只有在组件挂载完成后才能获取到实例（childRef.value 不为 null），常见的时机：
            1）手动触发（如点击按钮）：此时组件已挂载，可安全调用；
            2）生命周期钩子：onMounted 钩子中（组件挂载完成）；
            3）禁止在 setup 顶层直接调用（此时 childRef.value 为 null）。
		2. 响应式同步：父组件修改子组件暴露的响应式数据
			子组件暴露的 ref 数据是响应式的，父组件直接修改其 .value 也会同步更新子组件视图。
		3.如果子组件暴露的是 reactive 包裹的复杂对象，父组件可直接修改其属性（无需 .value）：

   	<!-- 父组件 Parent.vue -->
    <template>
      <!-- 给子组件绑定 ref 属性，值与脚本中的 ref 变量名一致 -->
      <Child ref="childRef" />

      <!-- 调用子组件方法的按钮 -->
      <button @click="callChildIncrement">子组件计数+1</button>
      <button @click="callChildDecrement">子组件计数-1</button>
      <button @click="getChildCount">获取子组件计数</button>
    </template>

    <script setup>
    import { ref } from 'vue'
    import Child from './Child.vue'

    // 1. 定义 ref 变量，初始值为 null（用于关联子组件实例）
    const childRef = ref(null)

    // 2. 调用子组件的 increment 方法
    const callChildIncrement = () => {
      // 注意：用 ?. 可选链操作符，防止组件未挂载时调用（避免报错）
      childRef.value?.increment()
    }

    // 3. 调用子组件的 decrement 方法
    const callChildDecrement = () => {
      childRef.value?.decrement()
    }

    // 4. 访问子组件暴露的 count 属性
    const getChildCount = () => {
      alert(`子组件当前计数：${childRef.value?.count}`)
    }
    </script>
    
   <!-- 子组件 Child.vue -->
    <template>
      <div>
        <p>子组件计数：{{ count }}</p>
      </div>
    </template>

    <script setup>
        import { ref } from 'vue'

        // 1. 子组件内部的响应式数据
        const count = ref(0)

        // 2. 子组件内部的方法
        const increment = () => {
          count.value++
        }

        const decrement = () => {
          count.value--
        }

        // 3. 关键：用 defineExpose 暴露给父组件的属性/方法
        defineExpose({
          count, // 暴露响应式数据
          increment, // 暴露方法
          decrement
        })
    </script>



注意事项示例：
	1.调用时机：
	<script setup>
        import { ref, onMounted } from 'vue'
        import Child from './Child.vue'

        const childRef = ref(null)

        // ❌ 错误：setup 顶层调用，childRef.value 为 null
        // childRef.value.increment()

        // ✅ 正确：onMounted 中调用（组件已挂载）
        onMounted(() => {
          childRef.value.increment() // 挂载后自动调用子组件方法
        })
	</script>

	2.父组件修改子组件暴露的响应式数据
    <!-- 父组件新增按钮 -->
    <button @click="resetChildCount">重置子组件计数为0</button>

    <script setup>
        // 重置子组件计数
        const resetChildCount = () => {
          childRef.value?.count.value = 0 // 注意：子组件的 count 是 ref，需加 .value
        }
    </script>
	
	3.如果子组件暴露的是 reactive 包裹的复杂对象，父组件可直接修改其属性（无需 .value）：
    <!-- 子组件新增 -->
    <script setup>
    const user = reactive({ name: '张三', age: 20 })
    defineExpose({ user })
    </script>

    <!-- 父组件调用 -->
    const updateChildUser = () => {
      childRef.value?.user.age = 21 // 直接修改 reactive 对象属性
    }
	

	3.循环渲染的子组件（多个 ref）
	如果父组件循环渲染多个子组件，需用 ref 数组来存储每个子组件的实例：
    <template>
      <!-- 循环渲染子组件，ref 绑定到数组的每一项 -->
      <Child 
        v-for="(item, index) in list" 
        :key="index" 
        :ref="(el) => (childRefs[index] = el)" 
      />
      <button @click="callAllChildIncrement">所有子组件计数+1</button>
    </template>

    <script setup>
        import { ref } from 'vue'
        import Child from './Child.vue'

        // 1. 定义 ref 数组，存储多个子组件实例
        const childRefs = ref([])
        // 2. 循环数据
        const list = ref([1, 2, 3])

        // 3. 调用所有子组件的 increment 方法
        const callAllChildIncrement = () => {
          childRefs.value.forEach(child => {
            child?.increment()
          })
        }
    </script>


	2.异步组件中使用 ref
	如果子组件是异步组件，需等待组件加载完成后才能调用：
	<script setup>
        import { ref, defineAsyncComponent, onMounted } from 'vue'

        // 定义异步组件
        const AsyncChild = defineAsyncComponent(() => import('./Child.vue'))

        const childRef = ref(null)

        // 异步组件加载完成后调用
        const callAsyncChildMethod = async () => {
          // 等待组件挂载
          await new Promise(resolve => onMounted(resolve))
          childRef.value?.increment()
        }
    </script>

    <template>
      <AsyncChild ref="childRef" />
      <button @click="callAsyncChildMethod">调用异步子组件方法</button>
    </template>


注意事项：
	1）忘记用 defineExpose 暴露：子组件未暴露的方法 / 属性，父组件访问时会提示 undefined，这是最常见的错误；
	2）过早访问 ref：在 setup 顶层、onBeforeMount 中调用 childRef.value，此时值为 null，需用 ?. 或等待 onMounted；
	3）循环 ref 绑定错误：循环子组件时，直接写 ref="childRefs[index]" 无效，必须用函数形式；
	4）修改子组件非暴露数据：父组件只能访问子组件 defineExpose 暴露的内容，未暴露的内部数据无法访问（符合封装原则）；
	5）TypeScript 类型提示：如果用 TS，可给 ref 加类型注解，提升开发体验：

    // 子组件定义类型
    interface ChildInstance {
      count: Ref<number>
      increment: () => void
    }
    // 父组件 ref 注解
    const childRef = ref<ChildInstance | null>(null)
```



##### 2.3 生命周期钩子

###### 2.3.1 vue3钩子

| 钩子函数      | 执行时机                             | 核心用途                                   |
| ------------- | ------------------------------------ | ------------------------------------------ |
| beforeCreate  | 实例创建前（数据/方法未初始化）      | 极少用，可做无依赖的初始化（如配置加载）   |
| created       | 实例创建完成（数据/方法已初始化）    | 数据请求、初始化变量、调用方法（无 DOM）   |
| beforeMount   | 挂载开始前（模板已编译，DOM 未生成） | 最后一次修改数据（不触发更新）             |
| mounted       | 挂载完成（DOM 已渲染到页面）         | 操作 DOM、初始化第三方插件（如 ECharts）   |
| beforeUpdate  | 数据更新后，DOM 重新渲染前           | 查看更新前的 DOM 状态                      |
| updated       | DOM 重新渲染完成                     | 操作更新后的 DOM（避免修改数据导致死循环） |
| beforeUnmount | 组件卸载前                           | 清除定时器、取消事件监听、销毁第三方插件   |
| unmounted     | 组件卸载完成                         | 最终清理工作（如关闭 websocket）           |



| 选项式 (声明式)API | 组合式 API（setup 中） | 说明                          |
| ------------------ | ---------------------- | ----------------------------- |
| beforeCreate       | 无需（setup 中直接写） | 组件创建前                    |
| created            | 无需（setup 中直接写） | 组件创建后                    |
| beforeMount        | onBeforeMount          | 挂载前                        |
| mounted            | onMounted              | 挂载后（可操作 DOM）          |
| beforeUpdate       | onBeforeUpdate         | 更新前                        |
| updated            | onUpdated              | 更新后                        |
| beforeUnmount      | onBeforeUnmount        | 卸载前                        |
| unmounted          | onUnmounted            | 卸载后（清理定时器/事件监听） |

```vue
	Vue 组件的生命周期，就是组件从创建到挂载、更新、销毁的整个过程，Vue 提供了一系列 “生命周期钩子函数”，让你能在特定阶段执行自定义逻辑。

注意事项：
	1）mounted 不保证父组件先挂载：如果需要等父组件挂载完成，可在 mounted 中使用 nextTick；
	2）updated 避免修改数据：否则会触发无限更新循环；
	3）组合式 API 钩子只能在 setup 内调用：不能在普通函数中调用，否则会报错；
	4）Vue3 移除了 Vue2 的几个钩子：如 beforeDestroy（改为 beforeUnmount）、destroyed（改为 unmounted），	5）activated/deactivated 仍保留（用于 keep-alive）。

<!-- 1.组合式 API -->
<template>
  <div>{{ count }}</div>
  <button @click="count++">加1</button>
</template>

<script setup>
    import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from "vue";

    // 替代 beforeCreate + created：setup 内的代码优先执行
    const count = ref(0);
    console.log("setup：", count.value); // 0（数据已初始化）

    // 挂载前
    onBeforeMount(() => {
      console.log("onBeforeMount：DOM未挂载");
    });

    // 挂载完成
    onMounted(() => {
      console.log("onMounted：DOM已挂载");
      // 操作DOM、初始化插件
    });

    // 更新前
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate：数据变了，DOM未更");
    });

    // 更新完成
    onUpdated(() => {
      console.log("onUpdated：DOM已更新");
    });

    // 卸载前
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount：清理定时器/事件");
    });

    // 卸载完成
    onUnmounted(() => {
      console.log("onUnmounted：组件已销毁");
    });
</script>


<!-- 2.选项式/声明式 API -->
<template>
  <div>{{ count }}</div>
  <button @click="count++">加1</button>
</template>

<script>
export default {
  // 数据初始化
  data() {
    return {
      count: 0
    };
  },

  // 1. 实例创建前（数据/方法未挂载）
  beforeCreate() {
    console.log("beforeCreate：", this.count); // undefined
  },

  // 2. 实例创建完成（数据/方法已挂载）
  created() {
    console.log("created：", this.count); // 0
    // 这里可以发请求，因为数据已初始化，但DOM还没渲染
  },

  // 3. 挂载前（模板编译完成，DOM未挂载）
  beforeMount() {
    console.log("beforeMount：", document.querySelector("div")?.innerText); // null
  },

  // 4. 挂载完成（DOM已渲染）
  mounted() {
    console.log("mounted：", document.querySelector("div")?.innerText); // 0
    // 操作DOM、初始化插件的核心阶段
  },

  // 5. 更新前（数据变了，DOM还没更）
  beforeUpdate() {
    console.log("beforeUpdate：", document.querySelector("div")?.innerText); // 旧值
  },

  // 6. 更新完成（DOM已更新）
  updated() {
    console.log("updated：", document.querySelector("div")?.innerText); // 新值
  },

  // 7. 卸载前（组件还在，可清理资源）
  beforeUnmount() {
    console.log("beforeUnmount：组件即将卸载");
    // 清除定时器、取消事件监听
  },

  // 8. 卸载完成（组件销毁，DOM移除）
  unmounted() {
    console.log("unmounted：组件已卸载");
  }
};
</script>
```

###### 2.3.2 vue3 与 vue2区别

```vue
核心特点：
	1）Vue3 移除了 Vue2 的几个钩子：如 beforeDestroy（改为 beforeUnmount）、destroyed（改为 unmounted），activated/deactivated 仍保留（用于 keep-alive）。
	
	2）Vue2 的初始化阶段依赖 beforeCreate 和 created，而 Vue3 的 setup 函数完全替代了这两个钩子，且执行时机更早：
	执行顺序：Vue3 setup → Vue2 beforeCreate → Vue2 created
	原因：setup 是 Vue3 组合式 API 的入口，在组件实例创建前就执行，此时已能访问 ref、reactive 等响应式数据，无需再用 beforeCreate/created。
	
	3）Vue2 只有 “选项式 API” 一种核心写法，钩子函数是组件选项的一部分，与 data、methods 平级；
        Vue3 分两种写法，核心差异体现在组合式 API 上：
        Vue2 选项式：钩子是 “固定选项”，只能按名称声明，无法拆分或复用；
        Vue3 组合式：钩子是 “可导入的函数”，可在 setup 内按需调用，还能抽离到外部函数中复用。

	4）Vue2 中，mounted 钩子执行时，子组件的 mounted 已执行完成（父→子）；
       Vue3 中，onMounted 执行时，子组件的 mounted 可能还未执行（子→父），如果需要等所有子组件挂载完成，可配合 nextTick：
       
        // Vue3 确保父组件在子组件挂载后执行逻辑
        onMounted(() => {
          nextTick(() => {
            console.log("所有子组件已挂载");
          });
        });



<!-- 1.vue3 setup可以获取ref中的值  vue2 beforeCreate、created不行-->
// Vue2 初始化逻辑
export default {
  data() { return { msg: "Vue2" } },
  beforeCreate() {
    console.log("Vue2 beforeCreate：", this.msg); // undefined（数据未初始化）
  },
  created() {
    console.log("Vue2 created：", this.msg); // Vue2（数据已初始化）
    // 这里写初始化逻辑（请求数据、定义变量）
  }
}

// Vue3 组合式写法（替代上述两个钩子）
<script setup>
    import { ref } from "vue";
    const msg = ref("Vue3");
    console.log("Vue3 setup：", msg.value); // Vue3（直接初始化，无需等待created）
    // 所有初始化逻辑（请求数据、定义变量）直接写在setup里即可
    
</script>

<!-- 2.Vue3 可抽离生命周期逻辑 -->
<script setup>
    import { onMounted, onBeforeUnmount } from "vue";

    // 抽离通用的“定时器逻辑”（包含挂载/卸载钩子）
    function useTimer() {
      let timer = null;
      onMounted(() => {
        timer = setInterval(() => console.log("定时器运行中"), 1000);
      });
      onBeforeUnmount(() => {
        clearInterval(timer);
      });
    }

    // 组件内直接调用，复用生命周期逻辑
    useTimer();
</script>	


```

###### 2.3.3 vue3 父子组件onMounted加载顺序

```vue
	Vue3 中父组件的 onMounted 执行时，子组件的 mounted/onMounted 可能还没执行，这是 Vue3 对比 Vue2 的一个重要变化。简单说就是：
	vue2 父 mounted 执行时，子组件一定已经挂载完成；
	vue3 父 mounted 执行时，子组件不一定挂载完成，如需需要用nextTick；
	
	一、核心原因是 Vue3 对挂载流程做了优化，执行顺序和 Vue2 相反：
		Vue2：挂载顺序是「父 beforeMount → 子 beforeMount → 子 mounted → 父 mounted」，所以父 mounted 执行时，子组件一定已经挂载完成；
		Vue3：挂载顺序是「父 beforeMount → 子 beforeMount → 父 mounted → 子 mounted」, Vue3 引入了「异步组件渲染」和「更新批次优化」，实际执行时父组件的 onMounted 会被优先放入执行队列，导致父 onMounted 可能比子 onMounted 先执行（尤其是子组件包含异步逻辑、或项目开启了 async setup 时）
		
		简单说：Vue3 为了性能优化，把生命周期钩子的执行拆分成了「微任务队列」，父组件的 onMounted 可能在子组件的 onMounted 执行前就触发了。
		
	Vue2：严格按 “子组件任务单先入队，父组件后入队”，所以执行顺序是「子 mounted → 父 mounted」；
	Vue3：Vue3 引入了「组件实例优先级」机制 —— 父组件作为 “容器”，其生命周期任务会被标记为 “高优先级”；为了性能优化，调整了入队逻辑 —— 父组件的 onMounted 任务单会 “插队” 到子组件前面，导致执行顺序变成「父 onMounted → 子 onMounted」。
				
<script setup>
    import { onMounted } from "vue";
    console.log("子组件 setup 执行");
    onMounted(() => {
      console.log("子组件 onMounted 执行");
    });
</script>

<template>
  <div>我是子组件</div>
</template>
	
<script setup>
    import { onMounted } from "vue";
    import Child from "./Child.vue";
    console.log("父组件 setup 执行");
    onMounted(() => {
      console.log("父组件 onMounted 执行");
      // 尝试获取子组件DOM（可能获取不到）
      const childDom = document.querySelector(".child");
      console.log("父组件获取子组件DOM：", childDom);
    });
</script>

<template>
  <div>
    <div>我是父组件</div>
    <Child class="child" />
  </div>
</template>
	
执行结果:
    父组件 setup 执行
    子组件 setup 执行
    父组件 onMounted 执行
    父组件获取子组件DOM： null  // 子组件还没挂载，DOM不存在
    子组件 onMounted 执行
	

方案 1：用 nextTick（最简单，推荐）
	nextTick 会等待下一次 DOM 更新循环完成，确保所有子组件都已挂载：
	<script setup>
        import { onMounted, nextTick } from "vue";
        import Child from "./Child.vue";

        onMounted(async () => {
          // 等待DOM更新完成（子组件挂载）
          await nextTick();
          console.log("父组件 onMounted + nextTick 执行");
          const childDom = document.querySelector(".child");
          console.log("父组件获取子组件DOM：", childDom); // 能正常获取
        });
    </script>

方案 2：通过子组件的自定义事件通知父组件
	子组件挂载完成后主动告诉父组件，适合复杂场景（比如子组件有异步请求）：

<!-- 子组件 Child.vue -->
<script setup>
    import { onMounted, defineEmits } from "vue";
    const emit = defineEmits(["mounted"]);

    onMounted(() => {
      console.log("子组件 onMounted 执行");
      emit("mounted"); // 通知父组件：我挂载完成了
    });
</script>

<!-- 父组件 Parent.vue -->
<script setup>
    import { onMounted } from "vue";
    import Child from "./Child.vue";

    const handleChildMounted = () => {
      console.log("父组件收到子组件挂载完成通知");
      const childDom = document.querySelector(".child");
      console.log("父组件获取子组件DOM：", childDom); // 能正常获取
    };
</script>

<template>
  <div>
    <Child @mounted="handleChildMounted" class="child" />
  </div>
</template>

方案 3：使用 ref 引用子组件（Vue3 推荐）
	通过 ref 获取子组件实例，配合 nextTick 确保子组件挂载：
<script setup>
    import { onMounted, ref, nextTick } from "vue";
    import Child from "./Child.vue";

    // 定义ref引用子组件
    const childRef = ref(null);

    onMounted(async () => {
      await nextTick();
      console.log("子组件实例：", childRef.value); // 能拿到子组件实例
      // 如果子组件暴露了方法，也能直接调用：childRef.value.xxx()
    });
</script>

<template>
  <div>
    <Child ref="childRef" class="child" />
  </div>
</template>
```



##### 2.4 路由

###### 2.4.1 路由基础

```vue
	Vue Router 4 是 Vue3 官方唯一的路由管理器，专门解决单页面应用（SPA）的页面切换问题，核心价值是：在不刷新浏览器的前提下，实现 URL 与页面组件的映射。当用户在应用中浏览不同页面时，URL 会随之更新，但页面不需要从服务器重新加载。

一、核心基础
安装与创建
    1）安装：npm install vue-router@4（必须指定 v4 版本适配 Vue3）
    2）创建API：
		createRouter（创建路由实例）、
		createWebHistory（HTML5 历史模式，无 # 号）/createWebHashHistory（哈希模式，带 # 号）
    3）挂载：在 Vue 实例上通过 app.use(router) 挂载路由
    4）核心API:
        <router-view>：路由出口，匹配的组件会渲染到这里（嵌套路由需在父组件中再次使用）
        <router-link>：声明式导航，自动渲染为 <a> 标签，通过 to 属性指定跳转目标
        useRouter()：组合式 API 中获取路由实例（用于编程式导航）
        useRoute()：组合式 API 中获取当前路由信息（参数、路径等）

<!-- 1.路由安装 -->
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: () => import('@/views/About.vue') } // 懒加载
]
const router = createRouter({
  history: createWebHistory(), // 替代 Vue2 的 mode: 'history'
  routes
})
export default router    

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app') 
             
            
<!-- 2.路由核心API -->
 <script setup>
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()
    // 编程式导航
    const goToAbout = () => {
      router.push('/about')
      // 带参数
      router.push({ path: '/about', query: { id: 1 } })
    }
    // 获取路由参数
    console.log(route.query.id)
</script>	           

<template>
	<router-link to="/">首页</router-link>
	<router-view />
</template>

	
```

###### 2.4.2 路由配置与导航

```js
1.路由规则（routes 数组）
const routes = [
  { path: '/', name: 'Home', component: Home }, // 基础路由
  { path: '/user/:id', name: 'User', component: () => import('@/views/User.vue') }, // 带参数+懒加载
  { path: '/:pathMatch(.*)*', redirect: '/' }, // 404 重定向
  {
    path: '/dashboard',
    component: Dashboard,
    children: [{ path: 'profile', component: Profile }] // 嵌套路由
  }
]

2.路由导航
    声明式：
        <router-link to="/user/1"> 
        <router-link :to="{ name: 'User', params: { id: 1 } }">
    编程式：
        router.push('/user/1') 
        router.push({ 
            name: 'User', 
            params: { 
                id: 1 
            } 
        }) 
        router.go(-1)（返回）
```



###### 2.4.3 路由传参

```vue
<!---------------- 1.URL 显式传参  ---------------->

// 1. query传参
	参数以 ?key=value 形式拼接在 URL 末尾（如 /list?type=goods&page=1），无需在路由规则中声明。
<script>
    // 编程式导航（可用path/name跳转）
    router.push({ 
        path: '/list', 
        query: { 
            type: 'goods', 
            page: 1 
        } 
    })
</script>

// 声明式导航
<router-link :to="{ path: '/list', query: { type: 'goods', page: 1 } }">商品列表</router-link>


//2. params传参
	将参数嵌入 URL 路径中（如 /detail/1001），需在路由规则中用 :参数名 声明。
	
	//需要在路由配置
    // router/index.js
    {
      path: '/detail/:id', // 声明动态参数id
      name: 'Detail',
      component: () => import('../views/Detail.vue')
    }

	// 编程式导航（推荐用name跳转）
	router.push({ 
		name: 'Detail', 
		params: {
			id: 1001 
		} 
	})
	// 声明式导航
	<router-link :to="{ name: 'Detail', params: { id: 1001 } }">详情</router-link>		


<!---------------- 1.隐式传参  ---------------->
//1. state传参
	通过 state 传递参数（基于 History API），参数不会显示在 URL 中，但页面刷新后参数会丢失，适合临时传递数据。
	<script setup>
        import { useRouter } from 'vue-router'
        const router = useRouter()

        const goToUser = () => {
          router.push({
            path: '/user',
            // state 传参（刷新页面后丢失）
            state: { 
              age: 20,
              isVip: true
            }
          })
        }
    </script>

    <!-- 接收参数 -->
    <script setup>
        import { useRoute } from 'vue-router'
        const route = useRoute()
        console.log(route.history.state.age) // 20
        console.log(route.history.state.isVip) // true
    </script>


```



###### 2.4.4 路由监听

```js
一、全局路由守卫
// 1. 全局前置守卫（所有路由跳转前触发）
router.beforeEach((to, from, next) => {
  // to：目标路由；from：当前路由；next：放行/跳转方法
  const hasToken = localStorage.getItem('token') // 模拟登录状态
  // 白名单：无需登录就能访问的路由
  const whiteList = ['Login', 'Register']
  
  if (hasToken) {
    // 已登录：如果跳登录页，重定向到首页
    if (to.name === 'Login') {
      next({ name: 'Home' })
    } else {
      next() // 正常放行
    }
  } else {
    // 未登录：只放行白名单路由，否则跳登录
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
})

// 2. 全局解析守卫（在beforeEach之后、组件内守卫之前触发）
router.beforeResolve((to, from) => {
  console.log('全局解析守卫：', to.path)
  // 常用场景：加载异步路由、验证路由解析前的状态
})

// 3. 全局后置守卫（跳转完成后触发，无next）
router.afterEach((to, from) => {
  console.log('路由跳转完成：', to.path)
})


二、组件内路由监听
	组件内路由监听本质是利用 Vue 的 watch 响应式监听能力，监听 useRoute() 返回的路由实例（包含 path、params、query 等响应式属性），从而在路由变化时执行自定义逻辑。

1. 基础写法：监听整个路由对象
<template>
  <div>当前页面：{{ route.path }}</div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

// 1） 获取路由实例（响应式对象）
const route = useRoute()

// 2） 监听整个路由对象
watch(
  // 监听目标：用箭头函数返回路由对象（避免直接监听响应式对象本身）
  () => route,
  // 回调函数：newRoute 新路由，oldRoute 旧路由
  (newRoute, oldRoute) => {
    console.log('路由整体变化：', {
      旧路径: oldRoute.path,
      新路径: newRoute.path,
      旧参数: oldRoute.params,
      新参数: newRoute.params,
      旧查询: oldRoute.query,
      新查询: newRoute.query
    })
    // 示例：路由变化后重新请求页面数据
    // fetchData(newRoute.params.id)
  },
  // 配置项：deep 为 true 才能监听到 params/query 等嵌套属性变化
  { deep: true, immediate: false }
)
</script>

2. 精准写法：只监听指定路由属性
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 场景1：只监听路由路径（比如 /home → /about）
watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log(`路径变化：${oldPath} → ${newPath}`)
  }
)

// 场景2：只监听路由参数（比如 /detail/1 → /detail/2）
watch(
  () => route.params.id, // 只监听 id 参数
  (newId, oldId) => {
    console.log(`商品ID变化：${oldId} → ${newId}`)
    // 核心场景：参数变化后重新请求对应数据
    if (newId) {
      // getGoodsDetail(newId)
    }
  },
  { immediate: true } // 初始化时执行一次，加载页面默认数据
)

// 场景3：只监听查询参数（比如 /list?page=1 → /list?page=2）
watch(
  () => route.query.page,
  (newPage, oldPage) => {
    console.log(`页码变化：${oldPage} → ${newPage}`)
    // 核心场景：分页查询，页码变化后重新加载列表
    // getListData(newPage)
  }
)
</script>
```



##### 2.5 状态管理

###### 1.Pinia

```js
	Pinia 是 Vue 官方取代 Vuex 的新一代状态管理库，专为 Vue3 设计（也兼容 Vue2），核心用于管理跨组件 / 跨页面的全局共享状态，解决组件间通信复杂、状态分散的问题。
	
1.安装
# npm
npm install pinia
# yarn
yarn add pinia
# pnpm
pnpm add pinia

2.全局注册
// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
// 创建 Pinia 实例并挂载
app.use(createPinia())
app.mount('#app')

3.定义 Store
// src/stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 方式1：选项式 API（类似 Vue2 选项式）
export const useCounterStore = defineStore('counter', {
  // 状态（相当于 Vue 的 data）
  state: () => ({
    count: 0,
    name: 'Pinia'
  }),
  // 计算属性（相当于 Vue 的 computed）
  getters: {
    doubleCount: (state) => state.count * 2,
    // 访问其他 getter 用 this（需指定返回值类型，TS 友好）
    doubleCountPlusOne() {
      return this.doubleCount + 1
    }
  },
  // 方法（同步/异步都可，相当于 Vue 的 methods）
  actions: {
    increment() {
      this.count++
    },
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment()
    }
  }
})

// 方式2：组合式 API（更贴合 Vue3 setup，推荐）
export const useCounterStore = defineStore('counter', () => {
  // 状态：用 ref/reactive 定义
  const count = ref(0)
  const name = ref('Pinia')
  
  // 计算属性：用 computed 定义
  const doubleCount = computed(() => count.value * 2)
  
  // 方法：普通函数（同步/异步）
  const increment = () => {
    count.value++
  }
  const incrementAsync = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    increment()
  }
  
  // 暴露需要的状态/计算属性/方法
  return { count, name, doubleCount, increment, incrementAsync }
})

//4.组件中使用 Store
<template>
  <div>
    <p>计数：{{ counterStore.count }}</p>
    <p>双倍计数：{{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment">+1</button>
    <button @click="counterStore.incrementAsync">异步+1</button>
  </div>
</template>

<script setup>
    // 导入定义的 store
    import { useCounterStore } from '@/stores/counter'

    // 创建 store 实例（Pinia 会自动缓存，多次调用返回同一个实例）
    const counterStore = useCounterStore()
    
    // 直接使用
    // 访问状态
    console.log(counterStore.count)
    // 调用 action
    counterStore.increment()

    // 解构状态（保持响应式）
    // 可选：解构 store 并保持响应式（用 storeToRefs）
    import { storeToRefs } from 'pinia'
    const { count, doubleCount } = storeToRefs(counterStore)
    const { increment } = counterStore // 方法无需 storeToRefs
</script>
    
4.核心特性（关键知识点）
1） State 状态管理
	读取状态：直接通过 store 实例访问（store.count）；
	修改状态：
		直接修改：store.count = 10（Pinia 允许直接修改，无需像 Vuex 那样用 mutations）；
		批量修改：用 $patch（性能更优，适合多状态修改）；
        
        // 方式1：对象形式
        counterStore.$patch({
          count: counterStore.count + 2,
          name: 'Pinia Update'
        })
        // 方式2：函数形式（支持复杂逻辑）
        counterStore.$patch((state) => {
          state.count += 2
          state.name = 'Pinia Update'
        })
        重置状态：用 $reset（仅选项式 API 生效，组合式需手动重置）；
        counterStore.$reset() // 恢复到初始状态

2）Getters 计算属性
    本质是基于 state 推导的响应式数据，缓存结果（依赖不变时不重复计算）；
    访问其他 store 的 getter：直接在 getter 中导入并使用；
        import { useUserStore } from './user'
        export const useCounterStore = defineStore('counter', {
          getters: {
            userCount() {
              const userStore = useUserStore()
              return this.count + userStore.userList.length
            }
          }
        })
        
3）Actions 方法
    支持同步 / 异步（可直接写 async/await）；
    可调用自身 / 其他 store 的 actions；
        import { useUserStore } from './user'
        export const useCounterStore = defineStore('counter', {
          actions: {
            async fetchData() {
              const res = await fetch('/api/data')
              const data = await res.json()
              this.$patch({ count: data.count })

              // 调用其他 store 的 action
              const userStore = useUserStore()
              await userStore.updateUser()
            }
          }
        })
    可通过 this 访问 state/getters，也可接收参数；

4)解构 Store 保持响应式
	直接解构 store 会丢失响应式，需用 storeToRefs 包裹（仅对 state/getters 生效，方法无需）：
    import { storeToRefs } from 'pinia'
    const counterStore = useCounterStore()

    // ❌ 错误：解构后失去响应式
    const { count } = counterStore
    // ✅ 正确：保持响应式
    const { count, doubleCount } = storeToRefs(counterStore)
    // 方法可直接解构
    const { increment } = counterStore
    

特点：
1. 多 Store 模块化
    Pinia 无嵌套模块，通过创建多个 store 文件实现模块化，更清晰：
    src/stores/
      ├── counter.js   // 计数相关 store
      ├── user.js      // 用户相关 store
      ├── cart.js      // 购物车相关 store

2. Store 持久化（常用）
	Pinia 本身不支持持久化，需借助 pinia-plugin-persistedstate 插件：
    npm install pinia-plugin-persistedstate

	// src/main.js
    import { createPinia } from 'pinia'
    import persist from 'pinia-plugin-persistedstate'

    const pinia = createPinia()
    pinia.use(persist) // 注册插件

	// 定义 store 时开启持久化
    export const useCounterStore = defineStore('counter', {
      state: () => ({ count: 0 }),
      // 持久化配置
      persist: {
        key: 'counter-store', // 本地存储的 key（默认是 store id）
        storage: localStorage, // 存储方式（localStorage/sessionStorage，默认 localStorage）
        paths: ['count'] // 只持久化 count 字段（默认所有 state）
      }
    })

3. 监听 Store 变化
	用 $subscribe 监听 state 变化（比 watch 更高效，适合监听整个 store）：	
    const counterStore = useCounterStore()

    // 监听 state 变化
    const unsubscribe = counterStore.$subscribe((mutation, state) => {
      console.log('state 变化：', mutation, state)
      // mutation.type：'direct'（直接修改）/'patch object'/'patch function'
      // mutation.storeId：store 的唯一 ID
    })

    // 组件卸载时取消监听
    import { onUnmounted } from 'vue'
    onUnmounted(() => {
      unsubscribe()
    })

    // 也可用 watch 监听单个状态
    import { watch } from 'vue'
    watch(() => counterStore.count, (newVal) => {
      console.log('count 变化：', newVal)
    })

4.动态注册 Store（按需加载）
// 异步导入 store
const useCounterStore = () => import('@/stores/counter')

// 组件中按需使用
const loadStore = async () => {
  const counterStore = await useCounterStore()
  counterStore.increment()
}


注意事项：
    1）单一职责：一个 Store 对应一个业务模块（如用户、购物车、订单），避免一个 Store 包含所有逻辑；
    2）避免滥用全局状态：组件内私有状态无需放入 Store，仅跨组件共享的状态才用 Store；
    3）Actions 封装业务逻辑：所有修改 state 的逻辑都放在 Actions 中，组件只调用 Actions，不直接修改 state（便于维护和调试）；
    4）TS 类型约束：定义 Store 时给 state/getters/actions 加类型注解，提升代码健壮性；
    5）持久化按需配置：只持久化必要的字段，避免存储大量无关数据；
    6）调试技巧：利用 Vue Devtools 的 Pinia 面板，可查看 Store 状态、追踪 Actions 调用、重置 Store。


总结：
    1）核心定位：Pinia 是 Vue3 官方状态管理库，替代 Vuex，轻量、TS 友好、语法简洁；
    2）核心用法：defineStore 定义 Store，组件中导入使用，storeToRefs 解构保持响应式；
    3）核心特性：State 支持直接修改 / 批量修改 / 重置，Getters 做计算属性，Actions 处理同步 / 异步逻辑；
    4）进阶技巧：模块化拆分、持久化插件、监听状态变化；
    5）最佳实践：单一职责、Actions 封装逻辑、按需使用全局状态。
    
 
```

###### 2.vuex

```js
	Vuex 是 Vue2 官方的集中式状态管理库，专为解决跨组件 / 跨页面的全局状态共享问题设计，其核心围绕「单一数据源、状态只读、变更可追踪」三大原则，通过 5 个核心模块（State、Mutation、Action、Getter、Module）实现完整的状态管理闭环。
一、Vuex 核心设计原则
	Vuex 的所有功能都围绕以下 3 个原则展开，也是其区别于普通全局变量的核心：
		1）单一数据源：所有全局共享状态都集中存储在一个 store 实例中，避免状态分散在多个组件中导致混乱；
		2）State 只读：不能直接修改 state（如 store.state.count = 1），必须通过 mutation 修改，保证状态变更有唯一入口；
		3）变更可追踪：所有状态修改都通过 mutation 完成（异步逻辑先过 action 再到 mutation），DevTools 可完整记录每一次状态变更的轨迹，便于调试。

二、核心功能模块（5 大核心）
    State：全局响应式状态容器，单一数据源；
    Mutation：同步修改 State 的唯一入口，保证变更可追踪；
    Action：处理异步逻辑，完成后提交 Mutation 修改 State；
    Getter：基于 State 派生的缓存计算属性，简化数据处理；
    Module：模块化拆分 Store，支持命名空间，适配大型应用；

1. State：全局状态容器（核心数据源）
功能：存储所有全局共享的状态（类似 Vue 组件的 data），是整个应用的 “单一数据源”；
核心特点：响应式（状态变更会自动触发组件重新渲染）；
// 定义 State
const store = createStore({
  state: () => ({
    count: 0,
    userInfo: null,
    cartList: []
  })
})

// 组件中访问 State（Vue3 组合式 API）
import { useStore } from 'vuex'
const store = useStore()
// 方式1：直接访问
console.log(store.state.count)
// 方式2：通过 computed 保持响应式
const count = computed(() => store.state.count)

2. Mutation：同步修改 State 的唯一入口
功能：唯一允许修改 state 的同步函数，保证状态变更可追踪；
核心规则：必须是同步函数（异步逻辑会导致 DevTools 无法追踪状态变更）；
基础用法：
// 定义 Mutation
const store = createStore({
  mutations: {
    // 接收 state 和 载荷（payload，可选参数）
    INCREMENT(state, step = 1) {
      state.count += step
    },
    SET_USER(state, userInfo) {
      state.userInfo = userInfo
    }
  }
})

// 组件中触发 Mutation
store.commit('INCREMENT', 5) // 触发 + 传递载荷
store.commit({ type: 'SET_USER', userInfo: { name: '张三' } }) // 对象式触发

3. Action：处理异步逻辑 + 提交 Mutation
功能：专门处理异步逻辑（如接口请求、定时器），异步操作完成后通过 commit 提交 mutation 修改 state；
核心特点：支持同步 / 异步（async/await），可调用其他 action、访问 state/getters；

// 定义 Action
const store = createStore({
  actions: {
    // context 包含 commit/dispatch/state/getters 等
    async fetchUser({ commit }, userId) {
      try {
        const res = await fetch(`/api/user/${userId}`)
        const userInfo = await res.json()
        commit('SET_USER', userInfo) // 异步完成后提交 mutation
      } catch (err) {
        console.error('请求失败：', err)
      }
    }
  }
})

// 组件中触发 Action
store.dispatch('fetchUser', 1) // 触发异步 action
await store.dispatch('fetchUser', 1) // 等待异步完成


4. Getter：派生状态（计算属性）
功能：基于 state 或其他 getter 派生的响应式数据（类似 Vue 组件的 computed）；
核心特点：缓存性（依赖的 state 不变时，不会重复计算）；
// 定义 Getter
const store = createStore({
  getters: {
    // 基础用法：接收 state
    doubleCount: (state) => state.count * 2,
    // 访问其他 getter：接收 getters 作为第二个参数
    doubleCountPlusOne: (state, getters) => getters.doubleCount + 1,
    // 带参数的 getter（返回函数）
    findCartItem: (state) => (id) => {
      return state.cartList.find(item => item.id === id)
    }
  }
})

// 组件中访问 Getter
console.log(store.getters.doubleCount) // 0 → 2
console.log(store.getters.findCartItem(1)) // 查找 id=1 的购物车项


5. Module：模块化拆分 Store
功能：将大型应用的 store 拆分为多个模块（Module），每个模块拥有自己的 state/mutation/action/getter，避免单一 store 过于臃肿；
核心特点：支持命名空间（namespaced: true），防止模块间的 mutation/action 名称冲突；

// 定义子模块（user.js）
const userModule = {
  namespaced: true, // 开启命名空间
  state: () => ({ userInfo: null }),
  mutations: { SET_USER(state, data) { state.userInfo = data } },
  actions: { fetchUser({ commit }, id) { /* 异步逻辑 */ } }
}

// 根 store 注册模块
const store = createStore({
  modules: {
    user: userModule, // 注册 user 模块
    cart: cartModule  // 注册 cart 模块
  }
})

// 组件中访问命名空间模块
store.dispatch('user/fetchUser', 1) // 触发 user 模块的 action
store.commit('user/SET_USER', { name: '张三' }) // 提交 user 模块的 mutation
console.log(store.state.user.userInfo) // 访问 user 模块的 state

```



###### 3.对比

| 特性            | Vuex                                          | Pinia                                         |
| --------------- | --------------------------------------------- | --------------------------------------------- |
| 语法            | 选项式 API（state/mutations/actions/getters） | 组合式 API（更贴合 Vue3 setup）               |
| 嵌套模块        | 需手动嵌套 modules，语法繁琐                  | 无模块嵌套，通过多个 store 实现模块化，更简洁 |
| TypeScript 支持 | 需手动加类型注解，体验差                      | 天生支持 TS，类型推导完善                     |
| 代码体积        | 较大                                          | 轻量（约 1KB）                                |
| 调试            | 需单独配置 devtools                           | 内置 devtools 支持，调试更友好                |
| 副作用          | actions 中写异步，mutations 写同步            | 无 mutations，所有逻辑都在 actions 中，更灵活 |



| 特性       | Vuex mutation               | Pinia action                         |
| ---------- | --------------------------- | ------------------------------------ |
| 核心作用   | 同步修改 state              | 同步/异步修改 state（替代 mutation） |
| 异步支持   | 不支持（必须同步）          | 支持（async/await）                  |
| 触发方式   | store.commit('类型', 载荷)  | 直接调用 store 方法                  |
| 调试追踪   | DevTools 记录 mutation 日志 | DevTools 记录 action 日志            |
| 代码冗余度 | 高（需定义 type + handler） | 低（直接写函数）                     |
| TS 支持    | 差（需手动注解）            | 好（天生推导）                       |

```js
Pinia 无 mutations 概念，彻底移除了 Vuex 中 mutation 的冗余设计；
状态修改的三种方式：直接修改 state（简单场景）、$patch 批量修改（多状态）、actions 封装修改（推荐，复杂场景）；

vuex三个核心是：
	state、mutations、actions

pinia三个核心是：
	state、getters、actions
	
	
// vuex	
// src/store/index.js
import { createStore } from 'vuex' // Vuex 4 适配 Vue3；Vuex 3 用 new Vuex.Store()

export default createStore({
  // 全局状态
  state: {
    count: 0,
    user: { name: '张三', age: 20 }
  },
  // 唯一修改 state 的入口：mutations
  mutations: {
    // 1. 基础 mutation：无载荷
    INCREMENT(state) {
      state.count++
    },
    
    // 2. 带载荷（payload）的 mutation：传递单个参数
    INCREMENT_BY_STEP(state, step) {
      state.count += step
    },
    
    // 3. 载荷为对象（传递多个参数）
    UPDATE_USER(state, payload) {
      state.user.name = payload.name
      state.user.age = payload.age
    },
    
    // 4. 批量修改状态
    BATCH_UPDATE(state) {
      state.count = 100
      state.user.age = 30
    }
  },
  // 处理异步逻辑：actions 中提交 mutation
  actions: {
    // 异步 action 示例
    incrementAsync({ commit }, step) {
      setTimeout(() => {
        commit('INCREMENT_BY_STEP', step) // 提交 mutation 修改状态
      }, 1000)
    }
  }
})


//pinia
// src/stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 方式1：选项式 API（类似 Vue2 选项式）
export const useCounterStore = defineStore('counter', {
  // 状态（相当于 Vue 的 data）
  state: () => ({
    count: 0,
    name: 'Pinia'
  }),
  // 计算属性（相当于 Vue 的 computed）
  getters: {
    doubleCount: (state) => state.count * 2,
    // 访问其他 getter 用 this（需指定返回值类型，TS 友好）
    doubleCountPlusOne() {
      return this.doubleCount + 1
    }
  },
  // 方法（同步/异步都可，相当于 Vue 的 methods）
  actions: {
    increment() {
      this.count++
    },
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment()
    }
  }
})
```



### 三、常见试题

#### 3.1 Vue2 和 Vue3 的核心区别有哪些？

| 维度       | Vue2                                                         | Vue3                                                         |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 核心架构   | 选项式 API（Options API），代码分散（data/methods/watch 等） | 组合式 API（Composition API），逻辑聚合，更易复用            |
| 响应式原理 | Object.defineProperty，只能监听属性，无法监听新增/删除属性   | Proxy + Reflect，监听整个对象，支持数组/对象的全部操作       |
| 生命周期   | beforeCreate/created 等                                      | 移除 beforeCreate/created，新增 setup（替代这两个钩子），其余钩子前缀加 `on`（如 onMounted） |
| 体积       | 整体打包，体积较大                                           | 按需引入（Tree-shaking），体积更小                           |
| 类型支持   | 对 TypeScript 支持不友好                                     | 原生支持 TypeScript，类型推断更完善                          |
| 全局 API   | Vue.prototype 扩展，Vue.set/Vue.delete                       | createApp 创建实例，全局 API 移至实例上（如 app.config.globalProperties） |



#### 3.2 为什么 Vue3 改用 Proxy 实现响应式？

```
Object.defineProperty 的缺陷：
    只能监听对象的已有属性，新增 / 删除属性需要手动调用 Vue.set/Vue.delete；
    监听数组时，只能重写 push/pop 等 7 个方法，无法监听数组索引和长度变化；
    需要遍历对象的所有属性，性能较差。
Proxy 的优势：
    监听整个对象，而非单个属性，天然支持新增 / 删除属性；
    支持数组的所有操作（索引、长度、方法）；
    非侵入式，无需修改原对象，只代理对象的访问行为；
    支持更多拦截操作（如 apply、construct 等）。

```

#### 3.3 Composition API 和 Options API 有什么区别？

```
Options API：
    按选项（data、methods、watch、computed）组织代码，适合简单组件；
    缺点：复杂组件中，相关逻辑分散在不同选项中，难以维护；逻辑复用只能通过 mixin（易冲突、来源不清晰）。
Composition API：
    按功能逻辑组织代码，将同一功能的变量、方法、监听聚合在一起；
    优点：逻辑复用更灵活（通过自定义 Hooks），类型支持更好，代码可读性更高。
```

#### 3.4 计算属性（computed）和侦听器（watch/watchEffect）的使用场景？

```
computed：
    适用于依赖其他响应式数据推导新值的场景，有缓存（依赖不变时，多次访问只执行一次）；
    支持只读和可写两种形式：
    
watch：
	适用于监听特定响应式数据变化并执行副作用（如请求接口、修改 DOM），需明确指定监听目标；
	支持监听单个值、多个值，支持立即执行、深度监听： 
	
	
```





````
# Vue3 知识点全面总结
你需要一份涵盖 Vue3 基础与进阶的完整知识点总结，我会按照“基础知识点”和“进阶知识点”两大模块梳理，既保证全面性，又突出核心重点，方便你学习和回顾。

## 一、基础知识点
基础知识点是使用 Vue3 开发的核心必备内容，聚焦“能用”和“会用”的核心能力。

### 1. 环境搭建与项目创建
- **包管理工具**：npm/yarn/pnpm（推荐 pnpm，速度快、磁盘占用少）
- **脚手架**：Vue CLI（传统）、Vite（主流，基于 ESModule，热更新更快）
  ```bash
  # Vite 创建 Vue3 项目
  npm create vite@latest my-vue3-project -- --template vue
  cd my-vue3-project
  npm install
  npm run dev
  ```
- **核心依赖**：vue@3.x（核心库）、@vue/compiler-sfc（单文件组件编译器）

### 2. 模板语法
- **插值语法**：`{{ 变量/表达式 }}`（支持简单运算、三元表达式，不支持流程语句）
- **指令**：
  - 内容渲染：`v-text`（纯文本）、`v-html`（解析 HTML）
  - 条件渲染：`v-if`/`v-else-if`/`v-else`（销毁/重建 DOM）、`v-show`（控制 display，初始渲染成本低）
  - 列表渲染：`v-for="(item, index) in list" :key="item.id"`（key 必须唯一，推荐用唯一标识而非 index）
  - 事件绑定：`v-on:click="handleClick"` 简写 `@click`，支持事件修饰符（`.stop`/`.prevent`/`.once` 等）、按键修饰符（`.enter`/`.esc` 等）
  - 属性绑定：`v-bind:src="imgUrl"` 简写 `:src`，支持对象/数组形式绑定多个属性
  - 双向绑定：`v-model`（适用于表单元素，Vue3 支持自定义组件的 v-model）
    ```vue
    <!-- 基础用法 -->
    <input v-model="username" />
    <!-- 修饰符 -->
    <input v-model.trim="username" /> <!-- 去除首尾空格 -->
    <input v-model.number="age" /> <!-- 转为数字 -->
    ```
  - 其他指令：`v-pre`（跳过编译）、`v-cloak`（解决插值闪烁）、`v-once`（只渲染一次）

### 3. 组合式 API（Vue3 核心）
Vue3 主推组合式 API（Composition API），替代 Vue2 的选项式 API（Options API），更灵活、易复用。
- **setup 函数**：
  - 组件的入口，在 created 之前执行，无 this 指向（this 为 undefined）
  - 接收两个参数：`props`（父传子的属性，只读）、`context`（包含 attrs、emit、slots）
  - 返回值：对象（模板可直接使用）、渲染函数
- **响应式数据**：
  - `ref`：用于基本类型（字符串/数字/布尔），也可用于对象；通过 `.value` 访问/修改值（模板中无需 .value）
    ```vue
    <script setup>
    import { ref } from 'vue'
    const count = ref(0)
    const add = () => { count.value++ } // 必须 .value
    </script>
    <template>
      <button @click="add">{{ count }}</button> <!-- 无需 .value -->
    </template>
    ```
  - `reactive`：用于对象/数组，返回代理对象，无需 .value；不能直接赋值（会丢失响应式），可通过解构或 Object.assign 解决
    ```vue
    <script setup>
    import { reactive } from 'vue'
    const user = reactive({ name: '张三', age: 20 })
    const updateName = () => { user.name = '李四' } // 直接修改
    </script>
    ```
  - `readonly`：创建只读的响应式数据，修改会报警告
  - `computed`：计算属性，支持 getter/setter
    ```vue
    <script setup>
    import { ref, computed } from 'vue'
    const count = ref(0)
    // 只读计算属性
    const doubleCount = computed(() => count.value * 2)
    // 可写计算属性
    const fullName = computed({
      get: () => `${firstName.value} ${lastName.value}`,
      set: (val) => {
        const [first, last] = val.split(' ')
        firstName.value = first
        lastName.value = last
      }
    })
    </script>
    ```
  - `watch`：监听数据变化
    ```vue
    <script setup>
    import { ref, watch } from 'vue'
    const count = ref(0)
    // 监听单个值
    watch(count, (newVal, oldVal) => {
      console.log(`count 从 ${oldVal} 变到 ${newVal}`)
    }, { immediate: true, deep: true }) // immediate：立即执行；deep：深度监听

    // 监听多个值
    watch([count, user], ([newCount, newUser], [oldCount, oldUser]) => {
      // 处理逻辑
    })
    ```
  - `watchEffect`：立即执行的监听，自动收集依赖，无需指定监听目标
    ```vue
    <script setup>
    import { ref, watchEffect } from 'vue'
    const count = ref(0)
    const stop = watchEffect(() => {
      console.log('count 变化了：', count.value)
    })
    // 手动停止监听
    setTimeout(() => stop(), 3000)
    </script>
    ```

### 4. 组件基础
- **组件定义与使用**：
  - 单文件组件（SFC）：`.vue` 文件，包含 `<template>`/`<script>`/`<style>`
  - 全局注册：`app.component('MyComponent', MyComponent)`
  - 局部注册：在 setup 中直接导入即可使用（Vue3 自动注册）
    ```vue
    <script setup>
    import MyButton from './MyButton.vue' // 局部注册
    </script>
    <template>
      <MyButton />
    </template>
    ```
- **组件通信**：
  - 父传子：props（setup 中通过 `defineProps` 定义）
    ```vue
    <!-- 子组件 -->
    <script setup>
    const props = defineProps({
      title: {
        type: String,
        required: true,
        default: '默认标题'
      }
    })
    </script>
    <template>
      <h1>{{ title }}</h1>
    </template>

    <!-- 父组件 -->
    <template>
      <Child :title="parentTitle" />
    </template>
    ```
  - 子传父：emit（setup 中通过 `defineEmits` 定义）
    ```vue
    <!-- 子组件 -->
    <script setup>
    const emit = defineEmits(['change'])
    const handleClick = () => {
      emit('change', '子组件传递的值')
    }
    </script>

    <!-- 父组件 -->
    <template>
      <Child @change="handleChange" />
    </template>
    ```
  - 跨组件通信：provide/inject（祖孙组件通信）
    ```vue
    <!-- 父组件 -->
    <script setup>
    import { provide } from 'vue'
    provide('theme', 'dark') // 提供数据
    </script>

    <!-- 孙组件 -->
    <script setup>
    import { inject } from 'vue'
    const theme = inject('theme', 'light') // 注入数据，第二个参数是默认值
    </script>
    ```

### 5. 生命周期
Vue3 组合式 API 的生命周期钩子以函数形式提供，替代选项式 API 的生命周期选项：
| 选项式 API | 组合式 API（setup 中） | 说明 |
|------------|------------------------|------|
| beforeCreate | 无需（setup 中直接写） | 组件创建前 |
| created | 无需（setup 中直接写） | 组件创建后 |
| beforeMount | onBeforeMount | 挂载前 |
| mounted | onMounted | 挂载后（可操作 DOM） |
| beforeUpdate | onBeforeUpdate | 更新前 |
| updated | onUpdated | 更新后 |
| beforeUnmount | onBeforeUnmount | 卸载前 |
| unmounted | onUnmounted | 卸载后（清理定时器/事件监听） |

示例：
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'
let timer
onMounted(() => {
  timer = setInterval(() => {
    console.log('定时器运行中')
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer) // 卸载时清理定时器
})
</script>
```

### 6. 样式处理
- 作用域样式：`<style scoped>`（样式仅作用于当前组件）
- 深度选择器：`::v-deep`（Vue2）/ `:deep()`（Vue3），穿透 scoped 样式
  ```vue
  <style scoped>
  :deep(.el-button) {
    color: red;
  }
  </style>
  ```
- 全局样式：`<style>`（无 scoped）或 `<style global>`
- CSS 变量：Vue3 支持在样式中使用组件的响应式数据（v-bind 绑定）
  ```vue
  <script setup>
  const color = ref('red')
  </script>
  <style>
  .box {
    color: v-bind(color); // 绑定响应式变量
  }
  </style>
  ```

## 二、进阶知识点
进阶知识点聚焦“用好”和“优化”，提升开发效率和项目性能。

### 1. 响应式原理深入
- **核心原理**：Vue3 基于 ES6 的 `Proxy` 实现响应式（替代 Vue2 的 `Object.defineProperty`），支持：
  - 监听数组的索引、长度变化
  - 监听对象的新增/删除属性
  - 支持 Map、Set 等集合类型
- **响应式数据的本质**：
  - `ref`：底层是 reactive（创建 { value: 原始值 } 的代理对象）
  - `reactive`：返回 Proxy 实例，通过 `Reflect` 操作原始对象，保证不破坏原对象
- **响应式判定**：
  - `isRef`：判断是否为 ref 对象
  - `isReactive`：判断是否为 reactive 创建的响应式对象
  - `isReadonly`：判断是否为只读响应式对象
  - `unref`：如果是 ref 则返回 .value，否则返回自身（`unref(val)` 等价于 `isRef(val) ? val.value : val`）

### 2. 组件进阶
- **异步组件**：用于懒加载组件，优化首屏加载速度
  ```vue
  <script setup>
  import { defineAsyncComponent } from 'vue'
  // 异步加载组件
  const AsyncComponent = defineAsyncComponent(() =>
    import('./AsyncComponent.vue')
  )
  // 带加载状态的异步组件
  const AsyncComponentWithLoading = defineAsyncComponent({
    loader: () => import('./AsyncComponent.vue'),
    loadingComponent: () => import('./Loading.vue'), // 加载中组件
    errorComponent: () => import('./Error.vue'), // 加载失败组件
    delay: 200, // 延迟显示加载组件（毫秒）
    timeout: 3000 // 超时时间（毫秒）
  })
  </script>
  ```
- **Teleport（瞬移）**：将组件的 DOM 结构挂载到指定位置（如 body），解决嵌套组件样式/层级问题（如弹窗、对话框）
  ```vue
  <template>
    <button @click="showModal = true">打开弹窗</button>
    <teleport to="body">
      <div v-if="showModal" class="modal">
        <p>弹窗内容</p>
        <button @click="showModal = false">关闭</button>
      </div>
    </teleport>
  </template>
  ```
- **Suspense**：配合异步组件使用，处理异步加载的加载/错误状态（目前仍为实验性特性，但已广泛使用）
  ```vue
  <template>
    <suspense>
      <template #default>
        <AsyncComponent />
      </template>
      <template #fallback>
        <div>加载中...</div>
      </template>
    </suspense>
  </template>
  ```
- **自定义指令**：
  - 全局指令：`app.directive('focus', { mounted: (el) => el.focus() })`
  - 局部指令：在 setup 中通过 `defineDirective` 定义
    ```vue
    <script setup>
    const vFocus = {
      mounted: (el) => el.focus()
    }
    </script>
    <template>
      <input v-focus />
    </template>
    ```

### 3. 状态管理
- **Pinia（Vue3 官方推荐）**：替代 Vuex，更简洁、支持 TypeScript、无 mutations 概念
  - 安装：`npm install pinia`
  - 创建仓库：
    ```js
    // src/stores/counter.js
    import { defineStore } from 'pinia'
    export const useCounterStore = defineStore('counter', {
      state: () => ({ count: 0 }),
      getters: {
        doubleCount: (state) => state.count * 2
      },
      actions: {
        increment() {
          this.count++
        }
      }
    })
    ```
  - 使用仓库：
    ```vue
    <script setup>
    import { useCounterStore } from '@/stores/counter'
    const counterStore = useCounterStore()
    // 访问状态
    console.log(counterStore.count)
    // 调用 action
    counterStore.increment()
    // 解构状态（保持响应式）
    import { storeToRefs } from 'pinia'
    const { count, doubleCount } = storeToRefs(counterStore)
    </script>
    ```

### 4. 路由（Vue Router 4）
Vue3 配套 Vue Router 4，核心 API 有调整：
- 安装：`npm install vue-router@4`
- 配置路由：
  ```js
  // src/router/index.js
  import { createRouter, createWebHistory } from 'vue-router'
  import Home from '@/views/Home.vue'
  const routes = [
    { path: '/', component: Home },
    { path: '/about', component: () => import('@/views/About.vue') } // 懒加载
  ]
  const router = createRouter({
    history: createWebHistory(), // 替代 Vue2 的 mode: 'history'
    routes
  })
  export default router
  ```
- 在 main.js 注册：
  ```js
  import { createApp } from 'vue'
  import App from './App.vue'
  import router from './router'
  createApp(App).use(router).mount('#app')
  ```
- 核心 API：
  - 模板中：`<router-link to="/">首页</router-link>`、`<router-view />`
  - setup 中：`useRouter()`（路由实例）、`useRoute()`（当前路由信息）
    ```vue
    <script setup>
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()
    // 编程式导航
    const goToAbout = () => {
      router.push('/about')
      // 带参数
      router.push({ path: '/about', query: { id: 1 } })
    }
    // 获取路由参数
    console.log(route.query.id)
    </script>
    ```

### 5. 性能优化
- **v-memo**：缓存模板片段，仅在依赖变化时重新渲染（优化长列表）
  ```vue
  <template>
    <div v-memo="[item.id, item.status]">
      {{ item.name }}
    </div>
  </template>
  ```
- **按需导入**：
  - Vue3 本身支持 Tree Shaking，未使用的 API 不会被打包
  - 第三方库（如 Element Plus）按需导入，减少打包体积
- **虚拟列表**：处理超长列表（如 10 万条数据），只渲染可视区域的 DOM（推荐使用 `vue-virtual-scroller`）
- **组件缓存**：`<KeepAlive>` 缓存组件状态，避免重复渲染
  ```vue
  <template>
    <keep-alive include="Home,About"> <!-- 仅缓存指定组件 -->
      <router-view />
    </keep-alive>
  </template>
  ```
- **减少响应式数据**：非响应式数据无需用 ref/reactive，直接定义即可
- **避免不必要的监听**：watch/watchEffect 及时停止，避免内存泄漏

### 6. TypeScript 集成
Vue3 原生支持 TypeScript，提升代码可维护性：
- setup 中定义 props/emit 类型：
  ```vue
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  // 定义 props 类型
  const props = defineProps<{
    title: string
    count?: number // 可选属性
  }>()
  // 定义 emit 类型
  const emit = defineEmits<{
    (e: 'change', value: string): void
    (e: 'delete', id: number): void
  }>()
  </script>
  ```
- ref/reactive 类型标注：
  ```vue
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  // ref 类型标注
  const count = ref<number>(0)
  // reactive 类型标注
  interface User {
    name: string
    age: number
  }
  const user = reactive<User>({ name: '张三', age: 20 })
  </script>
  ```

### 7. 自定义渲染器（进阶）
Vue3 支持自定义渲染器（Custom Renderer），可将 Vue 组件渲染到非 DOM 环境（如 Canvas、小程序），核心 API：`createRenderer`
```js
import { createRenderer } from 'vue'
const renderer = createRenderer({
  createElement(tag) { /* 创建元素 */ },
  insert(el, parent) { /* 插入元素 */ },
  // 其他渲染方法...
})
// 创建应用
const app = renderer.createApp({
  template: '<div>自定义渲染器</div>'
})
app.mount('#app')
```

## 三、总结
### 基础知识点核心
1. Vue3 主推组合式 API，核心是 `setup` 函数 + `ref`/`reactive` 响应式数据 + `computed`/`watch` 监听；
2. 组件通信的核心方式：props/emit（父子）、provide/inject（祖孙）；
3. 模板语法和生命周期是基础，需熟练掌握指令、钩子函数的使用。

### 进阶知识点核心
1. 响应式原理基于 Proxy，比 Vue2 更强大，需理解 ref/reactive 的底层逻辑；
2. 状态管理用 Pinia 替代 Vuex，路由用 Vue Router 4，是 Vue3 生态的核心；
3. 性能优化的关键：按需导入、组件缓存、虚拟列表、减少不必要的响应式数据；
4. Vue3 原生支持 TypeScript，结合 TS 可提升大型项目的可维护性。
````








## vue3学习

## 1.学习内容

```
1.VCA 组合式api  VOA选项式api


2.跨级通信 provide inject


3.$parent $root


4.动态组件 异步组件 


5.插槽


6.pinia


7.Vite


8.nuxt.js


9.vue3拦截 proxy拦截

vue2中的响应式核心是es5的Object.defineProperty，缺点有：
深度监听需要递归到底，性能层面考虑不太好
无法监听对象新增属性和删除属性，需要vue特殊处理
无法监听原生数组，需要在数组原型上做拦截
所以vue3采用了es6之后的proxy去重构了响应式原理，proxy能够很好的解决Object.defineProperty的缺点。
https://blog.csdn.net/pagnzong/article/details/120389514

10.vue2 vue3对比
https://www.zhihu.com/question/598649399/answer/3045579662
```


## 2.知识点

### 2.1 组合式api  VCA

```
组合式api Vue Composition API (VCA)
选项式api Vue Options API (VOA)










https://juejin.cn/post/7196747356795306044
https://www.jianshu.com/p/51cfb04754f4
https://cloud.tencent.com/developer/article/2333525
http://www.taodudu.cc/news/show-6399478.html?action=onClick
https://blog.csdn.net/MENGCAIXIU520/article/details/131114962
```

```ts
reactive函数：

export default {
    setup(){
        const obj = reactive({
			name:"xxx",
             age:12
    	})
        
        const handleClick = ()=>{
            console.log("click 执行了")
        }
        
        return{
            obj,
            handleClick
        }
	}
}
```

```ts
ref函数：

//模板中不需要name.value
{{name}}

export default {
    setup(){
        const name = ref("xxxx")
        
        //注意修改是name.value 不是name
        const handleClick = ()=>{
            console.log("click 执行了,name:",name)
            name.value = "aaaa"
        }
        return{
            name
        }
	}
}
```

```
在Vue中，computed属性是计算属性，它的值会根据它所依赖的属性动态计算出来，并且计算结果会被缓存起来，只有当依赖的属性发生变化时才会重新计算。因此，computed届性必须是同步的，否则无法保证计算结果的正确性和稳定性。
如果在computed属性中使用异步操作，就会导致计算结果不稳定，而且在异步操作完成前，computed属性无法返回结果，这也违背了omputed属性的设计初表。因此，Vue不支持在computed属性中使用异步操作。
而watch属性是用来监听效据变化的，它可以通过配置回调函效来响应效据变化，并且这个回调函数可以是异步的。Watch属性的作用是在数据发生变化时执行一些操作，它不需要返回值，因此可以使用异步操作。
————————————————
版权声明：本文为CSDN博主「菜的睡不着_」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45773252/article/details/131053392
```

