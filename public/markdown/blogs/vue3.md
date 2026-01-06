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

![image-20231212145153850](C:\Users\1\AppData\Roaming\Typora\typora-user-images\image-20231212145153850.png)



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

