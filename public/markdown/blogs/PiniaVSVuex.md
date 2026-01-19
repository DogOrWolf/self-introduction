

## Pinia Vuex知识点与对比总结

### 一、知识点

#### 1.Pinia

```js
	Pinia 是 Vue 官方取代 Vuex 的新一代状态管理库，专为 Vue3 设计（也兼容 Vue2），核心用于管理跨组件 / 跨页面的全局共享状态，解决组件间通信复杂、状态分散的问题。


完整的pinia代码示例：
src/
├── stores/                # Pinia 核心目录（替代Vuex的store）
│   ├── user.js            # 用户Store（模块化，独立文件）
│   ├── cart.js            # 购物车Store（模块化，独立文件）
│   └── app.js             # 全局应用Store
├── App.vue               # 根组件
└── main.js               # 项目入口

user.js
import { defineStore } from "pinia";

// 用户Store（天生带命名空间，无需配置namespaced: true）
export const useUserStore = defineStore("user", {
    state: () => ({
        userId: 1001,
        name: "张三",
        age: 25,
        token: "",
        isLogin: false,
        // 演示：异步加载状态
        loading: false
    }),

    getters: {
        // Getter支持访问其他Getter
        userInfo: (state) => {
            return `姓名：${state.name}，年龄：${state.age}，登录状态：${state.isLogin ? "已登录" : "未登录"}`;
        },

        // Getter支持接收参数（Vuex需通过返回函数实现，Pinia更直观）
        getUserInfoWithPrefix: (state) => {
            return (prefix) => `${prefix}：${state.name}`;
        }
    },

    actions: {
        // 同步修改姓名
        updateName(newName) {
            this.name = newName;
        },

        // 异步登录（直接修改state，无需mutation）
        async login(userData) {
            try {
                this.loading = true;
                // 模拟登录接口请求
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // 直接修改state，无需commit
                this.token = `pinia_token_${Date.now()}`;
                this.isLogin = true;
                this.name = userData.name || this.name;
                this.age = userData.age || this.age;
                return { code: 200, msg: "登录成功" };
            } catch (err) {
                return { code: 500, msg: "登录失败" };
            } finally {
                this.loading = false;
            }
        },

        // 退出登录
        logout() {
            // 批量重置state（Pinia内置方法，无需手动写mutation）
            this.$reset();
        },

        // 演示：Action调用其他Action
        async loginAndUpdateTheme(appStore) {
            const res = await this.login({ name: "李四", age: 30 });
            if (res.code === 200) {
                appStore.toggleTheme(); // 调用其他Store的方法
            }
            return res;
        }
    }
});


拆解介绍：
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

#### 2.Vuex

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
    
    
完整的vuex代码示例:
src/
├── store/                # Vuex 核心目录
│   ├── modules/         # 模块化目录
│   │   ├── user.js       # 用户模块
│   │   └── cart.js       # 购物车模块
│   └── index.js          # Vuex 入口文件
├── App.vue               # 根组件
└── main.js               # 项目入口

user.js
// 用户模块：包含用户信息的状态、计算属性、同步修改、异步操作
export default {
  namespaced: true, // 开启命名空间，避免模块间冲突
  state: () => ({
    // 基础状态
    userId: 1001,
    name: "张三",
    age: 25,
    token: "", // 登录令牌
    isLogin: false // 登录状态
  }),
  getters: {
    // 计算属性：基于state派生新数据（类似Vue的computed）
    userInfo: (state) => {
      return `姓名：${state.name}，年龄：${state.age}，登录状态：${state.isLogin ? "已登录" : "未登录"}`;
    },
    // getters可访问其他getters
    userInfoWithToken: (state, getters) => {
      return `${getters.userInfo}，令牌：${state.token || "无"}`;
    }
  },
  mutations: {
    // 同步修改state的唯一入口（必须同步）
    UPDATE_NAME(state, newName) {
      state.name = newName;
    },
    UPDATE_AGE(state, newAge) {
      state.age = newAge;
    },
    LOGIN(state, token) {
      state.token = token;
      state.isLogin = true;
    },
    LOGOUT(state) {
      state.token = "";
      state.isLogin = false;
    }
  },
  actions: {
    // 异步操作（可调用mutation、其他action，可发请求）
    // 模拟异步登录：调用后端接口后修改状态
    async login({ commit }, userData) {
      try {
        // 模拟接口请求（实际项目替换为真实axios请求）
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // 登录成功，调用mutation修改状态
        commit("LOGIN", `token_${Date.now()}`);
        commit("UPDATE_NAME", userData.name);
        return { code: 200, msg: "登录成功" };
      } catch (err) {
        return { code: 500, msg: "登录失败" };
      }
    },
    // action可调用其他action
    async loginAndUpdateAge({ dispatch, commit }, { name, age }) {
      const res = await dispatch("login", { name });
      if (res.code === 200) {
        commit("UPDATE_AGE", age);
      }
      return res;
    }
  }
};

    
拆解介绍：
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

#### 3.命名空间

```js
Pinia 和 Vuex 中 “命名空间” 和核心区别
一、先理解 “命名空间” 的核心含义
	简单来说，命名空间（Namespace） 就是给状态 / 方法 “加个专属前缀”，目的是避免不同模块的同名状态、方法互相冲突。比如两个模块都有 updateName 方法，没有命名空间的话，调用时就会分不清该执行哪个，命名空间就是给它们分别贴上 “user/updateName”、“admin/updateName” 的标签，确保唯一性。
二、Vuex vs Pinia 命名空间的核心区别
    特性		  Vuex 命名空间							  Pinia 命名空间
    开启方式	手动开启（需给模块配置 namespaced: true）	天生自带（无需手动配置，每个 Store 就是独立命名空间）
    使用方式	调用时需加命名空间前缀（如 commit('user/updateName')）	直接调用 Store 方法（如 userStore.updateName()），无需前缀
    嵌套场景	嵌套模块需层层拼接前缀（如 user/address/update）	无嵌套，多个 Store 平级，天然隔离
    冲突风险	未开启命名空间时，全局污染，极易冲突	             完全无冲突风险，每个 Store 独立
三、具体用法和差异详解
1. Vuex 的命名空间：手动配置，易出错
	Vuex 的模块化是 “嵌套式” 的，默认所有模块的状态 / 方法都会合并到全局，必须手动开启命名空间才能隔离，否则会冲突。
示例 1：未开启命名空间（踩坑场景）
// Vuex Store
const store = createStore({
  modules: {
    user: {
      // 未配置 namespaced: true
      mutations: {
        updateName() { console.log('用户模块的updateName') }
      }
    },
    admin: {
      // 未配置 namespaced: true
      mutations: {
        updateName() { console.log('管理员模块的updateName') }
      }
    }
  }
})

// 调用时冲突：只会执行最后注册的那个 updateName
store.commit('updateName') // 输出 "管理员模块的updateName"

示例 2：开启命名空间（正确用法）
javascript
运行
const store = createStore({
  modules: {
    user: {
      namespaced: true, // 手动开启命名空间
      mutations: {
        updateName() { console.log('用户模块的updateName') }
      }
    },
    admin: {
      namespaced: true, // 手动开启命名空间
      mutations: {
        updateName() { console.log('管理员模块的updateName') }
      }
    }
  }
})

// 调用时必须加前缀，才能精准匹配
store.commit('user/updateName') // 输出 "用户模块的updateName"
store.commit('admin/updateName') // 输出 "管理员模块的updateName"
问题点：
	嵌套模块的命名空间前缀会越来越长（如 user/address/default/update），书写繁琐且易出错；
	忘记加 namespaced: true 是 Vuex 开发中高频踩坑点。
    
2. Pinia 的命名空间：天生隔离，无需配置
	Pinia 没有 “模块嵌套” 的概念，每个 Store 都是通过 defineStore 定义的独立实例，每个 Store 的第一个参数就是唯一的命名空间标识，天然隔离，无需手动配置。
示例：
// stores/user.js
import { defineStore } from 'pinia'
// 第一个参数 "user" 就是该 Store 的命名空间标识
export const useUserStore = defineStore('user', {
  actions: {
    updateName() { console.log('用户模块的updateName') }
  }
})

// stores/admin.js
import { defineStore } from 'pinia'
// 第一个参数 "admin" 是独立的命名空间标识
export const useAdminStore = defineStore('admin', {
  actions: {
    updateName() { console.log('管理员模块的updateName') }
  }
})

// 组件中使用：直接导入，天然隔离，无冲突
import { useUserStore } from '@/stores/user'
import { useAdminStore } from '@/stores/admin'

const userStore = useUserStore()
const adminStore = useAdminStore()

userStore.updateName() // 输出 "用户模块的updateName"
adminStore.updateName() // 输出 "管理员模块的updateName"

优势：
	无需手动配置命名空间，零成本隔离；
	调用时直接通过 Store 实例调用方法，无需记忆前缀，代码更直观；
	即使多个 Store 有同名方法，也完全不会冲突。
总结
	核心差异：Vuex 的命名空间是 “手动开启 + 前缀调用”，Pinia 是 “天生自带 + 实例调用”，后者更简洁、不易出错；
	使用体验：Vuex 嵌套模块的命名空间前缀会越来越长，Pinia 平级 Store 无嵌套，命名空间天然隔离；
	冲突风险：Vuex 忘记开启命名空间会导致全局冲突，Pinia 完全无此风险。
```



### 二、对比

#### 1.Pinia VS Vuex

| 功能特性            | Vuex (主要指 3.x/4.x)                                        | Pinia (Vue3 主流方案)                                        |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **核心架构**        | 基于 `State`、`Getter`、`Mutation`、`Action`、`Module` 分层设计，强制区分同步（Mutation）和异步（Action）操作 | 抛弃 Mutation，仅保留 `State`、`Getter`、`Action`，Action 支持同步/异步；无 Module 概念，通过创建多个 Store 实现模块化，结构更扁平 |
| **TypeScript 支持** | Vuex 4.x 对 TS 支持较弱，需要大量类型声明，使用繁琐          | 天生为 TS 设计，类型推导自动完成，无需额外声明，类型提示友好 |
| **模块化管理**      | 需通过 `modules` 配置嵌套模块，嵌套较深时访问复杂（如 `this.$store.state.moduleA.moduleB.xxx`） | 每个 Store 是独立实例，直接导入使用，无嵌套，模块化更自然（`useUserStore()`、`useCartStore()`） |
| **状态修改**        | 必须通过 Mutation 修改 State（同步），Action 可调用 Mutation 或其他 Action（异步），流程繁琐 | 可直接在 Action 中修改 State（同步/异步均可），也可直接在组件中修改（推荐在 Action 中统一管理），更灵活 |
| **命名空间**        | 模块需手动开启 `namespaced: true` 才能隔离，否则状态/方法会全局污染 | 天然自带命名空间，每个 Store 独立，无需额外配置              |
| **插件系统**        | 有插件系统，但扩展能力有限，需适配模块结构                   | 插件系统更强大，可轻松扩展 Store 功能，支持批量修改状态、添加全局方法等 |
| **DevTools 支持**   | 支持，但对异步操作的追踪不够直观                             | 完全兼容 Vue DevTools，支持时间旅行、状态快照，对 Action 追踪更清晰 |
| **Vue 版本兼容**    | Vuex 3.x 适配 Vue2，Vuex 4.x 适配 Vue3                       | 主要适配 Vue3（也可兼容 Vue2，但需额外配置）                 |
| **代码体积**        | 体积较大，包含较多冗余逻辑                                   | 体积小巧，轻量化设计，打包后体积远小于 Vuex                  |
| **语法简洁度**      | 语法繁琐，如 `commit('mutationName')`、`dispatch('actionName')` | 语法简洁，直接调用 Store 中的方法，如 `userStore.updateName()` |



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

#### 2.状态管理 VS 全局变量

```
一、核心概念
	全局变量：最简单的全局数据存储方式（比如在 Vue 中定义一个 window.globalData 或单独的 global.js 文件），数据可直接读写，无任何约束。
	状态管理（Pinia/Vuex）：Vue 官方设计的规范化、可追踪、可调试的全局数据管理方案，为全局数据增加了一套 “规则和工具”。
	
二、核心区别对比
	见下面列表
```

| 特性             | 全局变量                                                     | 状态管理（Pinia/Vuex）                                       |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **数据约束**     | 无任何约束，可在任意地方直接修改（如 `globalData.count = 10`），修改来源无法追溯 | 有明确的修改规则（Pinia 通过 Action，Vuex 通过 Mutation/Action），强制统一修改入口 |
| **响应式保障**   | 需手动实现响应式（Vue 中需用 `reactive/ref` 包裹），否则修改后视图不更新 | 天生支持响应式，数据变化自动触发视图更新                     |
| **可追踪性**     | 无法追踪数据修改记录，出问题时找不到“谁改了数据、什么时候改的” | 支持 DevTools 调试，可查看数据修改的时间、来源（哪个 Action/Mutation）、修改前后的值，甚至支持“时间旅行”回滚状态 |
| **模块化管理**   | 需手动拆分文件，无内置模块化方案，容易出现命名冲突、数据混乱 | 内置模块化设计（Pinia 多 Store，Vuex Module），数据分类清晰，天然隔离 |
| **异步处理**     | 异步修改数据时，无统一管理，多个地方同时修改易出现竞态问题   | 专门的 Action 处理异步逻辑，可统一管理异步流程（如加载状态、错误处理） |
| **代码可维护性** | 项目变大后，全局变量散落在各处，修改逻辑混乱，难以维护       | 数据和修改逻辑集中管理，代码结构清晰，符合“单一数据源”原则   |
| **调试体验**     | 无法调试，只能通过 `console.log` 定位数据问题                | 完美兼容 Vue DevTools，可实时查看、修改、回溯状态            |
| **副作用控制**   | 数据修改时无法监听，容易出现不可预期的副作用                 | 可通过插件、订阅（subscribe）监听状态变化，统一处理副作用（如持久化、日志） |

### 三、常见问题



#### 





