- [Vue学习笔记](#vue学习笔记)
	- [1.基本概览](#1基本概览)
	- [2.基本介绍](#2基本介绍)
		- [2.1 简介](#21-简介)
		- [2.2 特点](#22-特点)
		- [2.3 vue官网tips](#23-vue官网tips)
	- [3.基本使用](#3基本使用)
		- [3.1 简单实例](#31-简单实例)
		- [3.2 模板](#32-模板)
		- [3.3 Vue实例 el与data](#33-vue实例-el与data)
	- [4.核心概念](#4核心概念)
		- [4.1 数据绑定 v-bind  v-model](#41-数据绑定-v-bind--v-model)
		- [4.2 MVVM](#42-mvvm)
		- [4.3计算属性 computed](#43计算属性-computed)
		- [4.4 监视属性 watch](#44-监视属性-watch)
		- [4.5 样式绑定  :class   :style](#45-样式绑定--class---style)
		- [4.6 @表示的含义](#46-表示的含义)
	- [5.vue原理](#5vue原理)
		- [5.1 数据代理 defineProperty **](#51-数据代理-defineproperty-)
			- [5.1.1 Object.defineproperty()](#511-objectdefineproperty)
			- [5.1.2 数据代理](#512-数据代理)
			- [5.1.3 vue中的数据代理](#513-vue中的数据代理)
		- [5.2  数据劫持](#52--数据劫持)
		- [5.3  vue监视数据改变的原理](#53--vue监视数据改变的原理)
	- [6.指令和过滤器](#6指令和过滤器)
		- [6.1 事件](#61-事件)
			- [6.1.1  @click     v-on:click](#611--click-----v-onclick)
			- [6.1.2 @click.stop @click.prevent  事件修饰符](#612-clickstop-clickprevent--事件修饰符)
			- [6.1.3 @keydown 键盘事件](#613-keydown-键盘事件)
		- [6.2 条件渲染](#62-条件渲染)
			- [6.2.1 v-if](#621-v-if)
			- [6.2.2 v-show](#622-v-show)
		- [6.3 列表渲染 v-for](#63-列表渲染-v-for)
			- [6.3.1 v-for指令的用法](#631-v-for指令的用法)
			- [6.3.2 v-for 中的key的作用](#632-v-for-中的key的作用)
		- [6.4  v-text](#64--v-text)
		- [6.5  v-html](#65--v-html)
		- [6.6  v-cloak](#66--v-cloak)
		- [6.7  v-once](#67--v-once)
		- [6.8  v-pre](#68--v-pre)
		- [6.9 过滤器   filter](#69-过滤器---filter)
		- [6.10 自定义指令](#610-自定义指令)
		- [6.11 自定义事件](#611-自定义事件)
	- [7.生命周期](#7生命周期)
	- [8.组件](#8组件)
		- [8.1 组件的基本使用](#81-组件的基本使用)
		- [8.2 组件间通信](#82-组件间通信)
			- [8.2.1父子组件](#821父子组件)
				- [8.2.1.1 props](#8211-props)
				- [8.2.1.1 父组件给子组件传值](#8211-父组件给子组件传值)
				- [8.2.1.2 子组件给父组件传值](#8212-子组件给父组件传值)
			- [8.2.2 爷孙组件](#822-爷孙组件)
			- [8.2.3兄弟组件](#823兄弟组件)
				- [8.2.3.1 事件总线  GlobalEventBus](#8231-事件总线--globaleventbus)
				- [8.2.3.2 消息订阅和发布](#8232-消息订阅和发布)
				- [8.2.3.3 vuex](#8233-vuex)
		- [8.3 组件引用  ref](#83-组件引用--ref)
		- [8.4  vue 插件](#84--vue-插件)
		- [8.5  组件样式](#85--组件样式)
		- [8.6  nextTick](#86--nexttick)
		- [8.7 过渡动画](#87-过渡动画)
	- [9.路由](#9路由)
	- [10 VueX](#10-vuex)
	- [11. 脚手架 vue-cli](#11-脚手架-vue-cli)
	- [12.vue与angular的不同点   vue与angular的功能对比](#12vue与angular的不同点---vue与angular的功能对比)

# Vue学习笔记

## 1.基本概览

```
介绍和使用
核心概念
vue原理
指令和过滤器
生命周期
组件
路由
VueX
脚手架 vue-cli
vue与angular的对比
```



## 2.基本介绍

### 2.1 简介

```
Vue.js是一套用于构建用户界面的渐进式框架。
	构建用户界面：画页面。
	渐进式：简单应用只需引用轻量级的核心库，
		   复杂应用可以引用各种各样的Vue插件。
		   
```

### 2.2 特点

```
Vue的特点：
	1.组件化开发。 提高复用性，更利于维护。
	2.声明式编码，无需直接操作DOM。提高开发效率。
		命令式指每个动作都需要写代码。
		声明式指只需要写固定的，剩余由库完成转化。
	3.使用虚拟DOM，提高加载速度。
	4.遵循MVVM模式，代码简洁。
	
```

### 2.3 vue官网tips

```
1.文档-风格指南 注意看风格指南
2.文档-示例 有很多不错的例子
3.文档-cookbook 有很多不错的技巧
4.vue2官网中有个 资源列表-Awesome vue *****
	https://github.com/vuejs/awesome-vue
	这个中介绍了很多各种各样的第三方插件，比如vue-echarts等
	值得好好看看
5.安装vue开发者工具
	https://devtools.vuejs.org/
	https://github.com/vuejs/vue-devtools
```

![image-20211029102245711](/markdown/blogs/vue2.assets/image-20211029102245711.png)

## 3.基本使用

### 3.1 简单实例

```javascript
1.需要创建一个Vue实例，且传入一个配置对象。
2.Vue实例绑定一个容器，即demo，且一一对应。
	实际开发中一般只有一个Vue实例，且配合组件使用。
3.Vue模板 即容器。符合html规范，混入Vue语法。
4.{{xxx}} xxx中要写js表达式。可读取到data中所有属性。
5.Vue.config 全局配置


js表达式和js代码的区别：
	1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方： 
	  可以用 var con = 表达式 来存取表达式的值。
        (1). a
        (2). a+b
        (3). demo(1)
        (4). x === y ? 'a' : 'b'

	2.js代码(语句)
        (1). if(){}
        (2). for(){}

```

```javascript
		<script type="text/javascript" src="../js/vue.js"></script>

		<div id="demo">
			<h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
		</div>

		<script type="text/javascript" >
			Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

			//创建Vue实例
			new Vue({
				el:'#demo', //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
				data:{ //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
					name:'ggg',
					address:'北京'
				}
			})

		</script>
```

### 3.2 模板

```
Vue模板语法有2大类：
1.插值语法：
    功能：用于解析标签体内容。
    写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。
    
2.指令语法：
    功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
    举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所有属性。
备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子。


```

### 3.3 Vue实例 el与data

```javascript
data与el的2种写法
1.el有2种写法
    (1).new Vue时候配置el属性。
    (2).先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。
    
2.data有2种写法
    (1).对象式
    (2).函数式
如何选择：哪种写法都可以，但组件中data必须使用函数式，否则会报错。

3.一个重要的原则：
由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了。


	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		//el的两种写法
		const v = new Vue({
			//el:'#root', //第一种写法
			data:{
				name:'xxx'
			}
		})
		console.log(v)
		v.$mount('#root') //第二种写法

		//data的两种写法
		new Vue({
			el:'#root',
			//data的第一种写法：对象式
			/* data:{
				name:'xxxx'
			} */

			//data的第二种写法：函数式
			data(){
				console.log('@@@',this) //此处的this是Vue实例对象
				return{
					name:'xxx'
				}
			}
		})
	</script>
```



## 4.核心概念

### 4.1 数据绑定 v-bind  v-model

```vue
Vue中有2种数据绑定的方式：
    1.单向绑定(v-bind)：数据只能从data流向页面。
    2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
    
备注：
    1.双向绑定一般都应用在表单类元素上（如：input、select等）
    2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。
		v-model一般只用于有value值的元素上，这样才能页面发生改变引起数据变化。 所以v-model:value 可以简写为 v-model,因为v-model就是只针对的value属性。
		但v-bind可以针对任意属性，包括自定义属性，如<input type="text" v-bind:x="name"><br/>
    
<!-- 普通写法 -->
<!-- 简写 -->
<!-- 单向数据绑定： -->
	<input type="text" v-bind:value="name"><br/>
	<input type="text" :value="name"><br/>

<!-- 双向数据绑定： -->
	<input type="text" v-model:value="name"><br/>
	<input type="text" v-model="name"><br/>


<!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
<h2 v-model:x="name">你好啊</h2>
```



### 4.2 MVVM

```
MVVM模型
1. M：模型(Model) ：data中的数据
2. V：视图(View) ：模板代码
3. VM：视图模型(ViewModel)：Vue实例


1.data中所有的属性，最后都出现在了vm身上。
2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
```

![image-20211101154839763](/markdown/blogs/vue2.assets/image-20211101154839763.png)

<img src="/markdown/blogs/vue2.assets/image-20211101155553726.png" alt="image-20211101155553726" style="zoom:67%;" />

![image-20211101155032839](/markdown/blogs/vue2.assets/image-20211101155032839.png)



### 4.3计算属性 computed

```
计算属性：
    1.定义：要用的属性不存在，要通过已有属性计算得来。
    2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
    3.get函数什么时候执行？
    (1).初次读取时会执行一次。	
    (2).当依赖的数据发生改变时会被再次调用。
4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
5.备注：
    1.计算属性最终会出现在vm上，直接读取使用即可。
    2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
```



```vue
计算属性与方法的不同：
	计算属性有缓存，所依赖的值不变时，只会初始化时调用一次。
	方法会被调用多次。
	
    <div id="root">
        姓：<input type="text" v-model="firstName"> <br/><br/>
        名：<input type="text" v-model="lastName"> <br/><br/>
        全名：<span>{{fullName}}</span> <br/><br/>
        
        
        全名：<span>{{fullName}}</span> <br/><br/> //计算属性方式只会调用一次，当数据变化时才会再次调用
        全名：<span>{{fullName}}</span> <br/><br/>
        全名：<span>{{fullName}}</span> <br/><br/>
        
        全名：<span>{{fullName()}}</span>  //方法方式会被调用多次
        全名：<span>{{fullName()}}</span>
        全名：<span>{{fullName()}}</span>
    </div>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el:'#root',
			data:{
				firstName:'张',
				lastName:'三'
			},
			methods: {
				fullName(){
					console.log('@---fullName')
					return this.firstName + '-' + this.lastName
				}
			},
			computed:{
				fullName:{
					//get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
					//get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
					get(){
						console.log('get被调用了')
						// console.log(this) //此处的this是vm
						return this.firstName + '-' + this.lastName
					},
					//set什么时候调用? 当fullName被修改时。
					set(value){
						console.log('set',value)
						const arr = value.split('-')
						this.firstName = arr[0]
						this.lastName = arr[1]
					}
				}
			}
		})
	</script>
```

```vue
计算属性的简写方式：
当计算属性只用到getter时候可以简写为一个方法。  setter方法不使用。

<script type="text/javascript">
		const vm = new Vue({
			el:'#root',
			data:{
				firstName:'张',
				lastName:'三',
			},
			computed:{
				//简写
				fullName(){
					console.log('get被调用了')
					return this.firstName + '-' + this.lastName
				}
			}
		})
</script>


```

### 4.4 监视属性 watch

```
监视属性watch：
    1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
    2.监视的属性必须存在，才能进行监视！！
    3.监视的两种写法：
        (1).new Vue时传入watch配置
        (2).通过vm.$watch监视
        
	深度监视 watch中写 
		1) 监视多级结构对象中的某个属性 'numbers.a'
		2）监视多级结构对象中所有属性的变化 deep:true
		
```

```vue
基本使用方式：
	handler(newValue,oldValue){ ... }

<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeWeather">切换天气</button>
</div>


<script type="text/javascript">
		const vm = new Vue({
			el:'#root',
			data:{
				isHot:true,
			},
			computed:{
				info(){
					return this.isHot ? '炎热' : '凉爽'
				}
			},
			methods: {
				changeWeather(){
					this.isHot = !this.isHot
				}
			},
			 watch:{
				isHot:{
					immediate:true, //初始化时让handler调用一下
					//handler什么时候调用？当isHot发生改变时。
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				}
			} 
		})
		
        //vm.$watch写法
		vm.$watch('isHot',{
			immediate:true, //初始化时让handler调用一下
			//handler什么时候调用？当isHot发生改变时。
			handler(newValue,oldValue){
				console.log('isHot被修改了',newValue,oldValue)
			}
		})
	</script>
```

```javascript
简写方式
	const vm = new Vue({
			el:'#root',
			data:{
				isHot:true,
			},
			computed:{
				info(){
					return this.isHot ? '炎热' : '凉爽'
				}
			},
			methods: {
				changeWeather(){
					this.isHot = !this.isHot
				}
			},
			watch:{
				//正常写法
				/* isHot:{
					// immediate:true, //初始化时让handler调用一下
					// deep:true,//深度监视
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				}, */
				//简写
				isHot(newValue,oldValue){
					console.log('isHot被修改了',newValue,oldValue,this)
				}
			}
		})
```

```javascript
深度检测

深度监视：
    (1).Vue中的watch默认不监测对象内部值的改变（一层）。
    (2).配置deep:true可以监测对象内部值改变（多层）。
备注：
    (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
    (2).使用watch时根据数据的具体结构，决定是否采用深度监视。
    
	const vm = new Vue({
			el:'#root',
			data:{
				isHot:true,
				numbers:{
					a:1,
					b:1,
					c:{
						d:{
							e:100
						}
					}
				}
			},
			computed:{
				info(){
					return this.isHot ? '炎热' : '凉爽'
				}
			},
			methods: {
				changeWeather(){
					this.isHot = !this.isHot
				}
			},
			watch:{
				isHot:{
					// immediate:true, //初始化时让handler调用一下
					//handler什么时候调用？当isHot发生改变时。
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				},
				//监视多级结构中某个属性的变化
				/* 'numbers.a':{
					handler(){
						console.log('a被改变了')
					}
				} */
				//监视多级结构中所有属性的变化
				numbers:{
					deep:true,
					handler(){
						console.log('numbers改变了')
					}
				}
			}
		})
    
```



### 4.5 样式绑定  :class   :style

```
1. class样式
    写法:class="xxx" xxx可以是字符串、对象、数组。
        1)字符串写法适用于：类名不确定，要动态获取。
        2)数组写法适用于：要绑定多个样式，个数不确定，名字也不确定。
        3)对象写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
2. style样式
    :style="{fontSize: xxx}"其中xxx是动态值。
    :style="[a,b]"其中a、b是样式对象。
```

```html
		<div id="root">
			<!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
			<div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/><br/>

			<!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
			<div class="basic" :class="classArr">{{name}}</div> <br/><br/>

			<!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
			<div class="basic" :class="classObj">{{name}}</div> <br/><br/>

			<!-- 绑定style样式--对象写法 -->
			<div class="basic" :style="styleObj">{{name}}</div> <br/><br/>
			<!-- 绑定style样式--数组写法 -->
			<div class="basic" :style="styleArr">{{name}}</div>
		</div>
		
	<script type="text/javascript">
		const vm = new Vue({
			el:'#root',
			data:{
				name:'xxx',
				mood:'normal',
				classArr:['xxxx1','xxxx2','xxxx3'],
				classObj:{
					xxxx1:false,
					xxxx2:false,
				},
				styleObj:{
					fontSize: '40px',
					color:'red',
				},
				styleObj2:{
					backgroundColor:'orange'
				},
				styleArr:[
					{
						fontSize: '40px',
						color:'blue',
					},
					{
						backgroundColor:'gray'
					}
				]
			},
			methods: {
				changeMood(){
					const arr = ['happy','sad','normal']
					const index = Math.floor(Math.random()*3)
					this.mood = arr[index]
				}
			},
		})
	</script>


```



### 4.6 @表示的含义 @    @/      ./  ../

```vue
vue中@
@：表示vue语法中v-on的简写;
	<button @click="show">点我</button>
@/：表示 src目录下;
	import http from '@/http'
./：表示当前目录下;
    import http from "./http";
../:表示上一级目录下;
	import http from "../http";

```



## 5.vue原理

### 5.1 数据代理 defineProperty **

#### 5.1.1 Object.defineproperty()

```javascript
Object.defineproperty() 用来定义对象属性。
可以通过此方法实现数据代理，通过getter和setter实现。
	如person中的number属性实际是外层变了number的代理。
	1）person.number可以获取到外侧number的值。
	2）person.number = 20;可以设置外侧number的值。
    	感觉上会有一种，number与person.number绑定的感觉。

let number = 18
let person = {
    name:'张三',
    sex:'男',
}


Object.defineProperty(person,'age',{
    // value:18,
    // enumerable:true, //控制属性是否可以枚举，默认值是false
    // writable:true, //控制属性是否可以被修改，默认值是false
    // configurable:true //控制属性是否可以被删除，默认值是false

    //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
    get(){
        console.log('有人读取age属性了')
        return number
    },

    //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
    set(value){
        console.log('有人修改了age属性，且值是',value)
        number = value
    }

})
```

#### 5.1.2 数据代理

```javascript
数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

let obj = {x:100}
let obj2 = {y:200}

Object.defineProperty(obj2,'x',{
    get(){
        return obj.x
    },
    set(value){
        obj.x = value
    }
})
```

#### 5.1.3 vue中的数据代理

```
new Vue(options) 新建出来的vue实例中的属性就是数据代理。

代理了配置项options中的data对象中的所有属性。

并且vm._data就是配置项中的data，但使用了数据劫持。


```

![image-20211101160730529](/markdown/blogs/vue2.assets/image-20211101160730529.png)



### 5.2  数据劫持



### 5.3  vue监视数据改变的原理

```
Vue监视数据的原理：
        1、vue会监视data中所有层次的数据
        2、如何监测对象中的数据？
          通过数据代理中的setter实现监视，且要在new Vue时就传入要监测的数据
            (1)、对象中后要追加的属性，vue默认不做响应式处理；
            (2)、如果需要给后添加的属性做响应式，请使用如下API：
                vue.set(target, propertyName/index, value) 或
                vm.$set(target, propertyName/index, value)

        3、如何监测数组中的数据？
            通过包裹数组更新元素的方法实现，本质就是做了两件事
              (1)、调用源生对应的方法对数组进行更新(push、pop、shift、unshift、splice、sort、reverse)
              (2)、重新解析模板，进而更新页面

        4、在Vue修改数组中的某个元素一定要用如下方法：
            (1)、使用这些API（push、pop、shift、unshift、splice、sort、reverse）
            (2)、使用vue.set()或者this.$vue()方法


        特别注意：Vue.set()  和  this.$set() 不能给 vm 或 vm的根数据 对象 添加属性！！

```

![image-20211118194845239](/markdown/blogs/vue2.assets/image-20211118194845239.png)

```javascript
let data = {
				name:'xxx',
				address:'北京',
			}

//创建一个监视的实例对象，用于监视data中属性的变化
const obs = new Observer(data)		
console.log(obs)	

//准备一个vm实例对象
let vm = {}
vm._data = data = obs

function Observer(obj){
    //汇总对象中所有的属性形成一个数组
    const keys = Object.keys(obj)
    //遍历
    keys.forEach((k)=>{
        Object.defineProperty(this,k,{
            get(){
                return obj[k]
            },
            set(val){
                console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
                obj[k] = val
            }
        })
    })
}




```

![image-20211118194353758](/markdown/blogs/vue2.assets/image-20211118194353758.png)



```javascript
const vm = new Vue({
			el:'#root',
			data:{
				student:{
					name:'tom',
					age:{
						rAge:40,
						sAge:29,
					},
					friends:[
						{name:'jerry',age:35},
						{name:'tony',age:36}
					]
				}
			},
			methods: {
				addSex(){
					// Vue.set(this.student,'sex','男')
					this.$set(this.student,'sex','男')
				}
			}
		})
```



## 6.指令和过滤器

```
指令：
    v-bind	: 单向绑定解析表达式, 可简写为 :xxx
    v-model	: 双向数据绑定
    v-for  	: 遍历数组/对象/字符串
    v-on   	: 绑定事件监听, 可简写为@
    v-if 	 	: 条件渲染（动态控制节点是否存存在）
    v-else 	: 条件渲染（动态控制节点是否存存在）
    v-show 	: 条件渲染 (动态控制节点是否展示)
    
    v-text : 向其所在的节点中渲染文本内容
    v-html : 向指定节点中渲染包含html结构的内容
    v-cloak : 使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题
    v-once : v-once所在节点在初次动态渲染后，就视为静态内容了
    v-pre : 跳过其所在节点的编译过程
    
事件：
	@click v-on:click
	@click.stop @click.prevent @click.once
	@keydown
	
	
自定义指令

自定义事件
	

```





### 6.1 事件

https://www.jianshu.com/p/c4a87e1b4ef7

#### 6.1.1  @click     v-on:click  

```vue
1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；
2.事件的回调需要配置在methods对象中，最终会在vm上；
3.methods中配置的函数，不要用箭头函数！否则this就不是vm了；
4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；

<button @click="showInfo1">点我提示信息1（不传参）</button>
<button @click="showInfo2($event,66)">点我提示信息2（传参）</button>

<script type="text/javascript">
		const vm = new Vue({
			el:'#root',
			data:{
				name:'xxx',
			},
			methods:{
				showInfo1(event){
					// console.log(event.target.innerText)
					// console.log(this) //此处的this是vm
					alert('你好！')
				},
				showInfo2(event,number){
					console.log(event,number)
					// console.log(event.target.innerText)
					// console.log(this) //此处的this是vm
					alert('你好！！')
				}
			}
		})
	</script>
```

#### 6.1.2 @click.stop @click.prevent  事件修饰符 

```vue
Vue中的事件修饰符：
1.prevent：阻止默认事件（常用）；
2.stop：阻止事件冒泡（常用）；
3.once：事件只触发一次（常用）；
4.capture：使用事件的捕获模式；
5.self：只有event.target是当前操作的元素时才触发事件；
6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

<button @click.stop="showInfo">点我提示信息</button>
<button @click.once="showInfo">点我提示信息</button>

```

<img src="/markdown/blogs/vue2.assets/1174211-20171201225153933-1205737719.png" alt="img" style="zoom: 67%;" />

#### 6.1.3 @keydown 键盘事件

```vue
1.Vue中常用的按键别名：
    回车 => enter
    删除 => delete (捕获“删除”和“退格”键)
    退出 => esc
    空格 => space
    换行 => tab (特殊，必须配合keydown去使用)
    上 => up
    下 => down
    左 => left
    右 => right

2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

3.系统修饰键（用法特殊）：ctrl、alt、shift、meta
    (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
    (2).配合keydown使用：正常触发事件。

4.也可以使用keyCode去指定具体的按键（不推荐）

5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名


<input type="text" placeholder="按下回车提示输入" @keydown.enter="showInfo">
<input type="text" placeholder="按下回车提示输入" @keydown.13="showInfo">

Vue.config.keyCodes.back = 13 //定义了一个别名按键
<input type="text" placeholder="按下回车提示输入" @keydown.back="showInfo">

注意keyup和keydown有区别
```



### 6.2 条件渲染

#### 6.2.1 v-if

```html
1.v-if
写法：
	(1).v-if="表达式" 
	(2).v-else-if="表达式"
	(3).v-else="表达式"
适用于：切换频率较低的场景。
特点：不展示的DOM元素直接被移除。
注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。

<div v-if="n === 1">Angular</div>
<div v-else-if="n === 2">React</div>
<div v-else-if="n === 3">Vue</div>
<div v-else>哈哈</div
    
    
<!-- v-if与template的配合使用 -->
<template v-if="n === 1">
   <h2>你好</h2>
   <h2>北京</h2>
</template>
```

![这里写图片描述](/markdown/blogs/vue2.assets/20180518164337775)

#### 6.2.2 v-show

```html
v-show
写法：v-show="表达式"
适用于：切换频率较高的场景。
特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

<h2 v-show="false">欢迎来到{{name}}</h2>
```



### 6.3 列表渲染 v-for

#### 6.3.1 v-for指令的用法

```html
v-for指令:
1.用于展示列表数据
2.语法：v-for="(item, index) in xxx" :key="yyy"
3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

<!-- 遍历数组 -->
<h2>人员列表（遍历数组）</h2>
<ul>
    <li v-for="(p,index) of persons" :key="index">
    	{{p.name}}-{{p.age}}
    </li>
</ul>

<!-- 遍历对象 -->
<h2>汽车信息（遍历对象）</h2>
<ul>
    <li v-for="(value,k) of car" :key="k">
        {{k}}-{{value}}
    </li>
</ul>

<!-- 遍历字符串 -->
<h2>测试遍历字符串（用得少）</h2>
<ul>
    <li v-for="(char,index) of str" :key="index">
        {{char}}-{{index}}
    </li>
</ul>

<!-- 遍历指定次数 -->
<h2>测试遍历指定次数（用得少）</h2>
<ul>
    <li v-for="(number,index) of 5" :key="index">
        {{index}}-{{number}}
    </li>
</ul>


<script type="text/javascript">
    new Vue({
        el:'#root',
        data:{
            persons:[
                {id:'001',name:'张三',age:18},
                {id:'002',name:'李四',age:19},
                {id:'003',name:'王五',age:20}
            ],
            car:{
                name:'奥迪A8',
                price:'70万',
                color:'黑色'
            },
            str:'hello'
        }
    })
</script>
```



#### 6.3.2 v-for 中的key的作用

```
面试题：react、vue中的key有什么作用？（key的内部原理）

1. 虚拟DOM中key的作用：
key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

2.对比规则：
(1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

(2).旧虚拟DOM中未找到与新虚拟DOM相同的key
创建新的真实DOM，随后渲染到到页面。

3. 用index作为key可能会引发的问题：
    1)若对数据进行：逆序添加、逆序删除等破坏顺序操作:
    会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
    
    2) 如果结构中还包含输入类的DOM：
    会产生错误DOM更新 ==> 界面有问题。

4. 开发中如何选择key?:
1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
使用index作为key是没有问题的。


```

如下图，当使用index作为key时，乱序添加会出现展示错误：

![image-20211118193255461](/markdown/blogs/vue2.assets/image-20211118193255461.png)



### 6.4  v-text

```
v-text指令：
    1.作用：向其所在的节点中渲染文本内容。
    2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。
```



### 6.5  v-html

```
v-html指令：
    1.作用：向指定节点中渲染包含html结构的内容。
    2.与插值语法的区别：
        (1)v-html会替换掉节点中所有的内容，{{xx}}则不会。
        (2)v-html可以识别html结构。
    3.严重注意：v-html有安全性问题！！！！
        (1)在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
        (2)一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
```



### 6.6  v-cloak

```html
v-cloak指令（没有值）：
    1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
    2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

<div id="root">
    <h2 v-cloak>{{name}}</h2>
</div>
```



### 6.7  v-once

```html
v-once指令：
    1.v-once所在节点在初次动态渲染后，就视为静态内容了。
    2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

<div id="root">
    <h2 v-once>初始化的n值是:{{n}}</h2>
    <h2>当前的n值是:{{n}}</h2>
    <button @click="n++">点我n+1</button>
</div>
```



### 6.8  v-pre

```html
v-pre指令：
    1.跳过其所在节点的编译过程。
    2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
    
    <div id="root">
        <h2 v-pre>Vue其实很简单</h2>
        <h2 >当前的n值是:{{n}}</h2>
        <button @click="n++">点我n+1</button>
    </div>
```



### 6.9 过滤器   filter

```javascript
过滤器：
    定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
    语法：
        1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
        2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
    备注：
        1.过滤器也可以接收额外参数、多个过滤器也可以串联
        2.并没有改变原本的数据, 是产生新的对应的数据
        
        
	<h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>

    Vue.filter('mySlice',function(value){
        return value.slice(0,4)
    })

    new Vue({
        el:'#root',
        data:{
            time:1621561377603, //时间戳
        },
        //局部过滤器
        filters:{
            timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
                // console.log('@',value)
                return dayjs(value).format(str)
            }
        }
    })
```



### 6.10 自定义指令

```javascript
需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
    自定义指令总结：
    一、定义语法：
    (1).局部指令：
    new Vue({
        directives:{指令名:配置对象}  或者
        directives{指令名:回调函数}
    }) 	
    (2).全局指令：
    Vue.directive(指令名,配置对象) 或
	Vue.directive(指令名,回调函数)

二、配置对象中常用的3个回调：
(1).bind：指令与元素成功绑定时调用。
(2).inserted：指令所在元素被插入页面时调用。
(3).update：指令所在模板结构被重新解析时调用。

三、备注：
1.指令定义时不加v-，但使用时要加v-；
2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。
```



```javascript
使用：
<span v-big="n"></span>
<input type="text" v-fbind:value="n">

全局指令
Vue.directive('fbind',{
    //指令与元素成功绑定时（一上来）
    bind(element,binding){
        element.value = binding.value
    },
    //指令所在元素被插入页面时
    inserted(element,binding){
        element.focus()
    },
    //指令所在的模板被重新解析时
    update(element,binding){
        element.value = binding.value
    }
})

局部指令
new Vue({
    el:'#root',
    data:{
        name:'xxx',
        n:1
    },
    directives:{
        //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
        /* 'big-number'(element,binding){
                        // console.log('big')
                        element.innerText = binding.value * 10
                    }, */
        big(element,binding){
            console.log('big',this) //注意此处的this是window
            // console.log('big')
            element.innerText = binding.value * 10
        },
        fbind:{
            //指令与元素成功绑定时（一上来）
            bind(element,binding){
                element.value = binding.value
            },
            //指令所在元素被插入页面时
            inserted(element,binding){
                element.focus()
            },
            //指令所在的模板被重新解析时
            update(element,binding){
                element.value = binding.value
            }
        }
    }
})

```



### 6.11 自定义事件

```html
自定义事件本质是由子组件向父组件传递信息

子组件通过$emit(...)触发父组件里自定义的事件myclick
 
1.父组件在使用子组件时，定义了新的事件myclick
父组件自定义事件的方式有两种:
    1）直接在模板里的子组件上使用 @新事件名称
          <Student  @myclick='clickHandle' type="success" title="这是一段成功提示的信息"/>
    2）父组件里获取通过ref子组件实例，然后通过，
         <Student ref="student" @click.native="show"/> 
         mounted() {
			this.$refs.student.$on('myclick',this.clickHandle) //绑定自定义事件
			// this.$refs.student.$once('myclick',this.clickHandle) //绑定自定义事件（一次性）
		}
		注意： @click是默认的绑定事件，在组件上使用时，需加上.native，不然会被当作自定义事件。

2.子组件通过
     this.$emit('myclick',value);     传递数据给父组件。
           
           

父组件：
<template>
  <div id="app">
    <alert type="success" title="这是一段成功提示的信息" @myclick='clickHandle' />
    <alert @defclick="clickHandle" />
  </div>
</template>
<script>
    import alert from '@/components/alert'//引入子组件

    export default {
      name: 'App',
      components: {//注册
        alert
      },
      methods: {
        clickHandle(val) {
          console.log(val) //这里的val是子组件传递过来的数据
        }
      }
    }
</script>          
           
           

子组件：
<template>
    <div role="alert" :class="['el-alert',changeAlert,'is-center','is-light']">
        <i :class="['el-alert__icon',changeIcon]"></i>
        <div class="el-alert__content">
            <slot name="title">
                <span class="el-alert__title">{{title}}</span>
            </slot>
            <i class="el-alert__closebtn el-icon-close" @click="clickHandle"></i>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        clickHandle(){
            this.$emit('myclick',"xxxxxxxxxx信息");
        }
    }
}
</script>
```



## 7.生命周期

![生命周期](/markdown/blogs/vue2.assets/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

```javascript
new Vue({
    el:'#root',
    // template:`
    // 	<div>
    // 		<h2>当前的n值是：{{n}}</h2>
    // 		<button @click="add">点我n+1</button>
    // 	</div>
    // `,
    data:{
        n:1
    },
    methods: {
        add(){
            console.log('add')
            this.n++
        },
        bye(){
            console.log('bye')
            this.$destroy()
        }
    },
    watch:{
        n(){
            console.log('n变了')
        }
    },
    beforeCreate() {
        console.log('beforeCreate')
    },
    created() {
        console.log('created')
    },
    beforeMount() {
        console.log('beforeMount')
    },
    mounted() {
        console.log('mounted')
    },
    beforeUpdate() {
        console.log('beforeUpdate')
    },
    updated() {
        console.log('updated')
    },
    beforeDestroy() {
        console.log('beforeDestroy')
    },
    destroyed() {
        console.log('destroyed')
    },
})
```

```
常用的生命周期钩子：
    1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
    2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

关于销毁Vue实例
    1.销毁后借助Vue开发者工具看不到任何信息。
    2.销毁后自定义事件会失效，但原生DOM事件依然有效。
    3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。
```



## 8.组件

### 8.1 组件的基本使用

```
Vue中使用组件的三大步骤：
    一、定义组件(创建组件)
    二、注册组件
    三、使用组件(写组件标签)

一、如何定义一个组件？
    使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
    区别如下：
        1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
        2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
        备注：使用template可以配置组件结构。

二、如何注册组件？
    1.局部注册：靠new Vue的时候传入components选项
    2.全局注册：靠Vue.component('组件名',组件)

三、编写组件标签：
	<school></school>
	
	
	
几个注意点：
	1.关于组件名:
		一个单词组成：
			第一种写法(首字母小写)：school
			第二种写法(首字母大写)：School
		多个单词组成：
			第一种写法(kebab-case命名)：my-school
			第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)  ***
	备注：
		(1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
		(2).可以使用name配置项指定组件在开发者工具中呈现的名字。

2.关于组件标签:
	第一种写法：<school></school>
	第二种写法：<school/>
	备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

3.一个简写方式：
	const school = Vue.extend(options) 可简写为：const school = options
```

```javascript
//定义student组件
const student = Vue.extend({
    name:'student',
    template:`
        <div>
        <h2>学生姓名：{{name}}</h2>	
        <h2>学生年龄：{{age}}</h2>	
        </div>
    `,
        data(){
            return {
                name:'xxx',
                age:18
            }
        }
})


单文件组件：
<template>
	<div>
		<School></School>
		<Student></Student>
	</div>
</template>

<script>
	//引入组件
	import School from './School.vue'
	import Student from './Student.vue'

	export default {
		name:'App',
		components:{
			School,
			Student
		}
	}
</script>
<style scoped>
    .demo{
		background-color: orange;
	}
</style>



<template>
	<div class="demo">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
		<button @click="showName">点我提示学校名</button>	
	</div>
</template>

<script>
	 export default {
		name:'School',
		data(){
			return {
				name:'尚硅谷',
				address:'北京昌平'
			}
		},
		methods: {
			showName(){
				alert(this.name)
			}
		},
	}
</script>

<style scoped>
	.demo{
		background-color: blue;
	}
</style>


		
```



### 8.2 组件间通信

```
总共7种方式：
    props
    props函数
    自定义事件 $emit
    依赖注入
    全局事件总线
    消息发布与订阅
    vuex

其中
	父-->子
		通过props  在子标签上绑定属性，子组件里通过props接收。
	
    子-->父
    	1.父组件准备一个函数，通过props给子组件传此函数，子组件调用父组件的函数，并通过参数传递数据。
		2.自定义事件，在父组件上给子组件绑定一个自定义事件，事件回调父组件的方法，子组件通过参数传递数据。ref  $emit
		
	爷-->孙子
		依赖注入，provide、inject父组件中通过provide函数返回一个数据对象，就可以在后代组件中使用inject注入provide提供的数据。
	
	兄弟组件间通信
	    1.全局事件总线。 共同的vm
        2.消息发布与订阅。 pub-sub
        3.vuex
		
```



#### 8.2.1父子组件

##### 8.2.1.1 props

```
1. 功能：让组件接收外部传过来的数据
2. 传递数据：<Demo name="xxx"/>
3. 接收数据：
   1. 第一种方式（只接收）：props:['name']
   2. 第二种方式（限制类型）：props:{name:String}
   3. 第三种方式（限制类型、限制必要性、指定默认值）：
   
注意：props除了传递值，还可以传递一个函数,让子组件调用。***
```

```vue
父子组件传参可以有如下方式：
<template>
	<div>
		<h1>{{msg}}</h1>
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<h2>学生年龄：{{myAge+1}}</h2>
		<button @click="updateAge">尝试修改收到的年龄</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			console.log(this)
			return {
				msg:'我是一个尚硅谷的学生',
				myAge:this.age
			}
		},
		methods: {
			updateAge(){
				this.myAge++
			}
		},
		//简单声明接收
		// props:['name','age','sex'] 

		//接收的同时对数据进行类型限制
		/* props:{
			name:String,
			age:Number,
			sex:String
		} */

		//接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
		props:{
			name:{
				type:String, //name的类型是字符串
				required:true, //name是必要的
			},
			age:{
				type:Number,
				default:99 //默认值
			},
			sex:{
				type:String,
				required:true
			}
		}
	}
</script>
```

##### 8.2.1.1 父组件给子组件传值

```
通过props就可以了
父组件里：
	<Son name="xxx"/>
子组件里：
 	props:['name'] 

```

##### 8.2.1.2 子组件给父组件传值

```vue
子传父的方式：
	1.props一个函数
		父组件准备一个函数，然后通过属性的方式传给子组件，子组件通过props接收到这个函数，并调用，通过传参的方式给父组件传递数据。
		父组件：
			<Son :addTodo="addTodo"/>
			methods: {
			   addTodo(todoObj){
				  console.log("父组件接收到了数据：" + todoObj);
				  this.todos.unshift(todoObj);
                }
			}
		子组件：
			props:['addTodo']
			methods: {
				btnClick:(obj){
                    this.addTodo(obj)
                  }
			}
			
			
	2.自定义事件
		请移步 6.11 自定义事件
		
		
```

#### 8.2.2 爷孙组件

```
依赖注入，provide、inject父组件中通过provide函数返回一个数据对象，就可以在后代组件中使用inject注入provide提供的数据。

```



#### 8.2.3兄弟组件

```
	1.事件总线
	2.发布订阅
	3.vuex
```

##### 8.2.3.1 事件总线  GlobalEventBus

```javascript
1.一种组件间通信的方式，适用于任意组件间通信。

2.安装全局事件总线：
    new Vue({
        ......
        beforeCreate() {
            Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
        },
        ......
    }) 

3.使用事件总线：
	3.1 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。
    methods(){
      demo(data){......}
    }
    ......
    mounted() {
      this.$bus.$on('xxxx',this.demo)
    },
    beforeDestroy() {
        this.$bus.$off('hello')
    }
        
   3.2 提供数据：
   B组件：
   this.$bus.$emit('xxxx',数据)
        
   最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。
        

```



##### 8.2.3.2 消息订阅和发布

```javascript
1.一种组件间通信的方式，适用于任意组件间通信。

2.使用步骤：
  	2.1 安装pubsub：npm i pubsub-js
  	2.2 引入: import pubsub from 'pubsub-js'
	2.3 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
    	methods(){
          demo(data){......}
        }
        ......
        mounted() {
          this.pid = pubsub.subscribe('xxx消息名',this.demo) //订阅消息
        },
        beforeDestroy() {
            // this.$bus.$off('hello')
            pubsub.unsubscribe(this.pubId)
        }
        
	2.4 提供数据：
    	pubsub.publish('xxx消息名',数据)
	2.5 最好在beforeDestroy钩子中，用PubSub.unsubscribe(pid)去取消订阅。
            
  
```



##### 8.2.3.3 vuex









### 8.3 组件引用  ref

```
ref可以获取真实DOM
ref也可以获取组件实例 VC ViewComponent
```

```vue
<template>
	<div>
		<h1 v-text="msg" ref="title"></h1>
		<button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
		<School ref="sch"/>
	</div>
</template>

<script>
	//引入School组件
	import School from './components/School'

	export default {
		name:'App',
		components:{School},
		data() {
			return {
				msg:'欢迎学习Vue！'
			}
		},
		methods: {
			showDOM(){
				console.log(this.$refs.title) //真实DOM元素
				console.log(this.$refs.btn) //真实DOM元素
				console.log(this.$refs.sch) //School组件的实例对象（vc）
			}
		},
	}
</script>
```

### 8.4  vue 插件

```javascript
1. 功能：用于增强Vue
2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
3. 定义插件：

obj.install = function (Vue, options) {
    // 1. 添加全局过滤器
    Vue.filter(....)

    // 2. 添加全局指令
    Vue.directive(....)

    // 3. 配置全局混入(合)
    Vue.mixin(....)

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function () {...}
    Vue.prototype.$myProperty = xxxx
}
    
    
plugin.js:
export default {
	install(Vue,x,y,z){
		console.log(x,y,z)
		//全局过滤器
		Vue.filter('mySlice',function(value){
			return value.slice(0,4)
		})

		//定义全局指令
		Vue.directive('fbind',{
			//指令与元素成功绑定时（一上来）
			bind(element,binding){
				element.value = binding.value
			},
			//指令所在元素被插入页面时
			inserted(element,binding){
				element.focus()
			},
			//指令所在的模板被重新解析时
			update(element,binding){
				element.value = binding.value
			}
		})

		//定义混入
		Vue.mixin({
			data() {
				return {
					x:100,
					y:200
				}
			},
		})

		//给Vue原型上添加一个方法（vm和vc就都能用了）
		Vue.prototype.hello = ()=>{alert('你好啊')}
	}
}
    
4.使用插件：Vue.use()
    
import plugins from './plugins'
//应用（使用）插件
Vue.use(plugins,1,2,3)
```



### 8.5  组件样式

```css
1. 作用：让样式在局部生效，防止冲突。
2. 写法：<style scoped>

<style scoped>
	.xxx{
		background-color: skyblue;
	}
</style>
```



### 8.6  nextTick

```javascript
1. 语法：this.$nextTick(回调函数)
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

//编辑
handleEdit(todo){
    ...
    
    this.$nextTick(function(){
        this.$refs.inputTitle.focus()
    })
}



原理：
Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
Vue 在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
具体来说，异步执行的运行机制如下。

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
（4）主线程不断重复上面的第三步。

https://segmentfault.com/a/1190000012861862

```

![clipboard.png](/markdown/blogs/vue2.assets/bVEBug)

### 8.7 过渡动画



### 8.8 slot 插槽

```vue
作用：
	让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。
分类：
	默认插槽、具名插槽、作用域插槽
	
1.默认插槽:
    父组件中：
            <Category>
               <div>html结构1</div>
            </Category>
    子组件中：
            <template>
                <div>
                   <!-- 定义插槽 -->
                   <slot>插槽默认内容...</slot>
                </div>
            </template>


2.具名插槽：
	父组件中：
        <Category>
            <template slot="center">
              <div>html结构1</div>
            </template>

            <template v-slot:footer>
               <div>html结构2</div>
            </template>
        </Category>
	子组件中：
        <template>
            <div>
               <!-- 定义插槽 -->
               <slot name="center">插槽默认内容...</slot>
               <slot name="footer">插槽默认内容...</slot>
            </div>
        </template>


3.作用域插槽：
	数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。
	
	父组件中：
		<Category>
			<template scope="scopeData">
				<!-- 生成的是ul列表 -->
				<ul>
					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
				</ul>
			</template>
		</Category>

		<Category>
			<template slot-scope="scopeData">
				<!-- 生成的是h4标题 -->
				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
			</template>
		</Category>

		<Category>
			<template slot-scope="{games}">
				<!-- 生成的是h4标题 -->
				<h4 v-for="g in games" :key="g">{{g}}</h4>
			</template>
		</Category>

	子组件中：
        <template>
            <div>
                <slot :games="games"></slot>
            </div>
        </template>
		
        <script>
            export default {
                name:'Category',
                props:['title'],
                //数据在子组件自身
                data() {
                    return {
                        games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                    }
                },
            }
        </script>




```



### 8.9  网络请求

#### 8.9.1  vue-reource

```javascript
main.js
//引入插件
import vueResource from 'vue-resource'
//使用插件
Vue.use(vueResource)


this.$http.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
    response => {
        console.log('请求成功了')
        //请求成功后
        xxxxxxxxx
    },
    error => {
        xxxx
    }
)


```



#### 8.9.2 axios

```javascript
import axios from 'axios'

axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
    response => {
        console.log('请求成功了')
        //请求成功后
        xxxxxx
    },
    error => {
        xxxx
    }
)

```



## 9.路由



## 10 VueX



## 11. 脚手架 vue-cli

### 10.1 vue-cli的使用



### 10.2 配置代理 proxy

#### 10.2.1 vue.config.js

```javascript
vue脚手架配置代理
方法一
	在vue.config.js中添加如下配置
	devServer:{
      proxy:"http://localhost:5000"
    }
    
    优点：配置简单，请求资源时直接发给前端（8080）即可。
    缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
    工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）
    
方法二
	vue.config.js配置具体代理规则：
	module.exports = {
	devServer: {
          proxy: {
          '/api1': {// 匹配所有以 '/api1'开头的请求路径
            target: 'http://localhost:5000',// 代理目标的基础路径
            changeOrigin: true,
            pathRewrite: {'^/api1': ''}
          },
          '/api2': {// 匹配所有以 '/api2'开头的请求路径
            target: 'http://localhost:5001',// 代理目标的基础路径
            changeOrigin: true,
            pathRewrite: {'^/api2': ''}
          }
        }
      }
    }
    /*
       changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
       changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
       changeOrigin默认值为true
    */



实际项目配置如下：
module.exports = {
  devServer: {
    hot: true,
    open: true,
    // port: 8654,
    proxy: {
      '/': {
        target: 'http://devops.xxx.cn/',
        // target: '',
        // target: 'http://dev-devops.xxx.cn:8080',
        // target: 'http://dev-devops.xxx.cn:42080/',
        // target: 'http://localhost:8654/',
        ws: false,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
        }
      },
    }
  },
  publicPath: './',
  //=> 打包文件夹名字
  outputDir: 'dist/static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {}
    }
  }
}

```



#### 10.2.2 跨域及其解决方法

```
协议、域名、端口有任何一个不同，都被当作是不同的域。
浏览器有个同源策略原则，当请求的地址跟自己协议\主机名\端口不同时，响应不予通过。
JavaScript出于安全方面的考虑,不允许跨域调用其他页面的对象。跨域请求浏览器会报错。
注意：跨域是前端不允许，浏览器报错，并非后端跨域不能请求。


解决方法：
	1.后端配置允许跨域请求头。
		跨域资源共享（CORS）
		Access-Control-Allow-Origin:*
	2.jsonp
		Web页面上调用js文件时则不受是否跨域的影响
		script标签src属性不受同源策略限制 但需要前后端配合，且只能解决get
    3.代理服务器
    	前端和后端服务器中间有个代理服务器，所有请求由代理服务器转发。 
    	前端与代理服务器同源，代理服务与后端服务器不同源，但后端互相访问不受同源策略影响，没有跨域问题。（前端用的xmlHttpRequest ajax 后端是直接http所以没跨域问题）
    	
    	具体代理方法：
            nginx
            vue-cli脚手架 proxy
            k8s Ingress 配置hosts和path 不同的url对应不同的后端service
 
 
 
 jsonp:
 <script type="text/javascript">
    function dosomething(jsondata){
        //处理获得的json数据
    }
</script>
<script src="http://example.com/data.php?callback=dosomething"></script>
js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。所以jsonp是需要服务器端的页面进行相应的配合的.
    	



```







## 12.vue与angular的不同点   vue与angular的功能对比

```vue
1.vue有事件修饰符和v-model修饰符，angular没有
	事件修饰符
        <button @click.stop="showInfo">点我提示信息</button>
        <button @click.once="showInfo">点我提示信息</button>

	v-model修饰符
        <input v-model.lazy="msg">
        <input v-model.number="msg">
        <input v-model.trim="msg">


2.angular有模块和服务的概念，vue没有。


3.vue有计算属性


4.vue有监测属性
	在vue中经常使用watch来监听组件中属性的变化，特别是在使用elementui中的弹窗组件时。
	在angular中没有watch，但是可以通过使用生命周期函数ngOnChanges来实现属性的监听。

	ngOnChanges(changes: SimpleChanges): void {
       console.log(changes)
     }
	https://blog.csdn.net/weixin_41897680/article/details/117200893


```





```
双向绑定的实现原理有很多，脏检查是angularjs的实现原理。Vue使用的是属性访问器。至于你在success回调的语句是否有错误你需要提供代码。
https://segmentfault.com/q/1010000012048149
```



```
vue和angular的scoped样式如何穿透

vue:
	css:  >>>
    less/sass:  /deep/
    scss:  ::v-deep
    
angular:
	 :host ::ng-deep

```

```
angular如何做SEO vue单页面怎么做SEO
```

```javascript
angular和vue脚手架中的代理怎么配置的，跨域如何实现

vue-cli
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  }
}


devServer: {
    hot: true,
    open: true,
    // port: 8654,
    proxy: {
      '/': {
        target: 'http://devops.mec189.cn/',
        // target: '',
        // target: 'http://dev-devops.mec189.cn:8080',
        // target: 'http://dev-devops.mec189.cn:42080/',
        // target: 'http://localhost:8654/',
        ws: false,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
        }
      },
      
    }
  }


```





```
vue与angular的多环境打包

angular:
Angular6以往版本自定义environment配置在.angular-cli.json文件中，
    1、在.angular-cli.json文件中 “environments中"添加
    例如：
        "environments": {
            "dev": "environments/environment.ts",
            "prod": "environments/environment.prod.ts",
            "zhizhongbao": "environments/environment.zhizhongbao.ts"
        }
    2、编译命令
         ng build --base-href /saturn/ --prod --env= zhizhongbao
         
Angular6.x版本后，.angular-cli.json文件演变成angular.json文件
如果需要加自定义配置文件environment.zhizhongbao.ts
1、在angular.json文件中如下配置：
      "configurations" : {
          "production": {
                "fileReplacements": [
                    {
                        "replace": "src/environments/environment.ts",
                        "with": "src/environments/environment.prod.ts"
                      }
                ],
                "optimization": true,
                "outputHashing": "all",
                "sourceMap": false,
                "extractCss": true,
                "namedChunks": false,
                "aot": true,
                "extractLicenses": true,
                "vendorChunk": false,
                "buildOptimizer": true
                },
        "zhizhongbao": {
            "fileReplacements": [
                 {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.zhizhongbao.ts"
                  }
                ],
                "optimization": true,
                "outputHashing": "all",
                "sourceMap": false,
                "extractCss": true,
                "namedChunks": false,
                "aot": true,
                "extractLicenses": true,
                "vendorChunk": false,
                "buildOptimizer": true
            }
        }
    2、无任何配置，默认编译prod命令
                ng build --base-href /myweb/ --prod  --configuration= production
          如需使用zhizhongbao环境，则执行命令
                ng build --base-href /myweb/ --prod  --configuration= zhizhongbao


https://blog.csdn.net/tech_Wang/article/details/80401357
```





```
插槽
vue slot

angular ng-content

https://blog.csdn.net/ligaoming_123/article/details/81478446
https://www.jianshu.com/p/55a45d148854

ng-content ng-template	ng-container
```

