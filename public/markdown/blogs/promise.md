- [Promise学习笔记](#promise学习笔记)
  - [1.promise含义](#1promise含义)
  - [2.基本使用](#2基本使用)
  - [3.常用方法API](#3常用方法api)
    - [3.1 构造函数](#31-构造函数)
    - [3.2 then()](#32-then)
    - [3.3 catch()](#33-catch)
    - [3.4 Promise.resolve()](#34-promiseresolve)
    - [3.5 Promise.reject()](#35-promisereject)
    - [3.6 Promise.all()](#36-promiseall)
    - [3.7 Promise.race()](#37-promiserace)
    - [3.8 例子](#38-例子)
  - [4. await 与 async](#4-await-与-async)
    - [4.1 await](#41-await)
    - [4.2  **async** 函数](#42--async-函数)
    - [4.3 例子](#43-例子)
  - [5.关键问题](#5关键问题)
    - [5.1 如何改变 promise 的状态?](#51-如何改变-promise-的状态)
    - [5.2 一个 promise 指定多个成功/失败回调函数, 都会调用吗?](#52-一个-promise-指定多个成功失败回调函数-都会调用吗)
    - [5.3 改变 promise 状态和指定回调函数谁先谁后?](#53-改变-promise-状态和指定回调函数谁先谁后)
    - [5.4 promise.then()返回的新 promise 的结果状态由什么决定?](#54-promisethen返回的新-promise-的结果状态由什么决定)
    - [5.5 promise 如何串连多个操作任务?](#55-promise-如何串连多个操作任务)
    - [5.6  promise 异常传透?](#56--promise-异常传透)
    - [5.7  如何中断 promise 链?](#57--如何中断-promise-链)
    - [5.8 在异步回调中抛错，不会被`catch`到](#58-在异步回调中抛错不会被catch到)
    - [5.9 promise状态变为`resolve`或`reject`，就凝固了，不会再改变](#59-promise状态变为resolve或reject就凝固了不会再改变)
# Promise学习笔记

## 1.promise含义

```typescript
1.什么是promise?
	promise是ECMAscript 6原生提供的一个对象。
	Promise对象代表了未来将要发生的事件，用来传递异步操作的消息。
	Promise对象用于异步操作，它表示一个尚未完成且预计在未来完成的异步操作。
	
	
	Promise 对象有三种状态：
        1)pending: 初始状态，不是成功或失败状态。
        2)fulfilled: 意味着操作成功完成。
        3)rejected: 意味着操作失败
	
2.为什么要使用Promise?
	1.为了避免回调地狱。 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
	2.指定回调函数的方式更加灵活
        1) 旧的: 必须在启动异步任务前指定
        2) promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定/多个) => then方法

	
```

```typescript
/* 例回调地狱  */
    request('test1.html', '', function(data1) {
        console.log('第一次请求成功, 这是返回的数据:', data1);
        request('test2.html', data1, function (data2) {
            console.log('第二次请求成功, 这是返回的数据:', data2);
            request('test3.html', data2, function (data3) {
                console.log('第三次请求成功, 这是返回的数据:', data3);
                //request... 继续请求
            }, function(error3) {
                console.log('第三次请求失败, 这是失败信息:', error3);
            });
        }, function(error2) {
            console.log('第二次请求失败, 这是失败信息:', error2);
        });
    }, function(error1) {
        console.log('第一次请求失败, 这是失败信息:', error1);
    });
    
    /* 例promise写法 */
    sendRequest('test1.html', '').then(function(data1) {
        console.log('第一次请求成功, 这是返回的数据:', data1);
        return sendRequest('test2.html', data1);
    }).then(function(data2) {
        console.log('第二次请求成功, 这是返回的数据:', data2);
        return sendRequest('test3.html', data2);
    }).then(function(data3) {
        console.log('第三次请求成功, 这是返回的数据:', data3);
    }).catch(function(error) {
        //用catch捕捉前面的错误
        console.log('sorry, 请求失败了, 这是失败信息:', error);
    });
```



## 2.基本使用

```typescript
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            const time = Date.now()
            if (time%2===1) {
           		resolve('成功的值 '+ time) 
            } else {
        		reject('失败的值' + time) 
            }
    }, 2000)
    
    p.then(
        value => { 
            console.log('成功的 value: ', value)
        },
        reason => { 
            console.log('失败的 reason: ', reason) 
        })    

        
    // 1) 创建 promise 对象(pending 状态), 指定执行器函数
    // 2) 在执行器函数中启动异步任务
    // 3) 根据结果做不同处理
        // 3.1) 如果成功了, 调用 resolve(), 指定成功的 value, 变为 resolved 状 态   
        // 3.2) 如果失败了, 调用 reject(), 指定失败的 reason, 变为 rejected 状态    
	
        
   // 成功的回调函数 onResolved, 得到成功的 vlaue
   // 失败的回调函数 onRejected, 得到失败的 reason	
```



## 3.常用方法API

### 3.1 构造函数

```typescript
Promise 构造函数: Promise (excutor) {}
    (1) executor 函数: 执行器 (resolve, reject) => {} 
    (2) resolve 函数: 内部定义成功时我们调用的函数 value => {}
    (3) reject 函数: 内部定义失败时我们调用的函数 reason => {}
说明: executor 会在 Promise 内部立即同步调用,异步操作在执行器中执行


var p = new Promise((resolve,reject)=>{
    ... //注意：这里的方法会立即执行
	resolve(1)//主动调用resolve，并传入
   
    //setTimeout(()=>{
    //    resolve(2);
    //},2000)
})

//此时，P的状态是resolved，且值promiseValue是1
//then里的方法只有等到p的状态变为resolved时才会执行，如果上面加了延迟，就会延迟等待状态变化
p.then((res)=>{
    // 因为p的状态是resolved，所以自动执行then的第一个参数，并且把promisevalue传进来。
	console.log("then,ok",res)
})
```



### 3.2 then()

```typescript
obj.then(OnResolved, OnRejected) => {}
	(1) OnResolved函数: 成功的回调函数 (value) => {}
	(2) OnRejected函数: 失败的回调函数 (reason) => {}
说明: 指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调
返回一个新的 promise 对象


入参决定是否返回失败状态：
1.两个入参，resolve成功  reject失败
2.也可以是一个入参，resolve  一个入参时可以不写如：
promise.then(()=>{
	//此时不写返回值，表示返回一个状态为成功的promise，但接收的参数值为undefined
    //如下面res就是undefined
})
正常全写是这个样子：
p.then((res)=>{
    console.info("成功");
    console.log(res);
}, (err)=>{
    console.info("失败");
    console.log(err);
})


返回值决定then方法返回一个什么状态的Promise对象
1.返回一个值,返回的promise为接受状态,返回的值作为接受状态的回调函数的参数值
2.没有返回值,返回的promise为接受状态,返回的值作为接受状态的回调函数的参数值undefined
3.返回接受状态promise,返回的promise为接受状态,将promise接受状态的回调函数参数值作为被返回promise接受状态回调函数参数值
4.返回拒绝状态promise,返回的promise为拒绝状态,将promise拒绝状态的回调函数参数值作为被返回promise拒绝状态回调函数参数值
5.返回未定状态的promise,返回promise为未定状态,两者的终态相同,终态时的回调函数参数相同
6.抛出错误,promise,返回的promise为拒绝状态,返回的值作为拒绝状态的回调函数的参数值

https://blog.csdn.net/IT_qslong/article/details/109254106
```



### 3.3 catch()

```
obj.catch(onRejected) => {}
	(1) onRejected 函数: 失败的回调函数 (reason) => {}
说明: then()的语法糖, 相当于: then(undefined, onRejected)
```



### 3.4 Promise.resolve()

```typescript
Promise.resolve 方法: (value) => {}
	(1) value: 成功的数据或 promise 对象
说明: 返回一个成功/失败的 promise 对象


1.参数是一个Promise实例
	如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
2.不带有任何参数
	Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
3.参数不是具有then方法的对象，或根本就不是对象
	如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为resolved。
4.参数是一个thenable对象
	Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
	
1.参数是一个Promise实例
	
2.不带有任何参数
Promise.resolve().then(() => {
    console.log('xx');
});

3.参数不是具有then方法的对象，或根本就不是对象
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

4.参数是一个thenable对象
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
	
```



### 3.5 Promise.reject()

```
Promise.reject 方法: (reason) => {}
	(1) reason: 失败的原因
说明: 返回一个失败的 promise 对象
```



### 3.6 Promise.all()

```
Promise.all 方法: (promises) => {}
	(1) promises: 包含 n 个 promise 的数组
说明: 返回一个新的 promise, 只有所有的 promise 都成功才成功, 只要有一个失败了就
直接失败
```



### 3.7 Promise.race()

```
Promise.race 方法: (promises) => {}
	(1) promises: 包含 n 个 promise 的数组
说明: 返回一个新的 promise, 第一个完成的 promise 的结果状态就是最终的结果状态
```



### 3.8 例子

```typescript
new Promise((resolve, reject) => {
    if (Date.now()%2===0) {
    	resolve(1)
    } else {
    	reject(2)
    }
}).then(value => {
	console.log('onResolved1()', value)
}).catch(reason => {
	console.log('onRejected1()', reason)
})


const p1 = Promise.resolve(1)
const p2 = Promise.resolve(Promise.resolve(3))
const p3 = Promise.resolve(Promise.reject(5))
const p4 = Promise.reject(7)
const p5 = new Promise((resolve, reject) => {
	setTimeout(() => {
        if (Date.now()%2===0) {
            resolve(1) 
        } 
        else {
            reject(2) 
        }
    }, 100);
})



const pAll = Promise.all([p1, p2, p5])
pAll.then(
    values => {console.log('all 成功了', values)},
    reason => {console.log('all 失败了', reason)}
)

const pRace = Promise.race([p5, p1, p4])
pRace.then(
	value => {console.log('race 成功了', value)},
	reason => {console.log('race 失败了', reason)}
)
```





## 4. await 与 async

### 4.1 await

```
await func(){}.toPromise();  返回promise对象成功的值。
    1. await 右侧的表达式一般为 promise 对象, 但也可以是其它的值
    2. 如果表达式是 promise 对象, await 返回的是 promise 成功的值
    3. 如果表达式是其它值, 直接将此值作为 await 的返回值

注意：
1.await 必须写在 async 函数中, 但 async 函数中可以没有 await
2.如果 await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理
```



### 4.2  **async** 函数

```
表明函数的返回值为promise对象,返回一个promise对象。
promise 对象的结果由 async 函数执行的返回值决定

```



### 4.3 例子

```typescript
const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);


//async 与 await
async function main(){
    try{
        //读取第一个文件的内容
        let data1 = await mineReadFile('./resource/1x.html');
        let data2 = await mineReadFile('./resource/2.html');
        let data3 = await mineReadFile('./resource/3.html');
        console.log(data1 + data2 + data3);
    }catch(e){
        console.log(e.code);
    }
}

main();
```





## 5.关键问题

### 5.1 如何改变 promise 的状态?

```
(1) resolve(value): 如果当前是 pending 就会变为 resolved
(2) reject(reason): 如果当前是 pending 就会变为 rejected
(3) 抛出异常: 如果当前是 pending 就会变为 rejected
```



### 5.2 一个 promise 指定多个成功/失败回调函数, 都会调用吗?

```typescript
当 promise 改变为对应状态时都会调用


let p = new Promise((resolve, reject) => {
    resolve('OK');
});

///指定回调 - 1
p.then(value => {
    console.log(value);
});

//指定回调 - 2
p.then(value => {
    alert(value);
});
```



### 5.3 改变 promise 状态和指定回调函数谁先谁后?

```
(1) 都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调
(2) 如何先改状态再指定回调?
	a. 在执行器中直接调用 resolve()/reject()
	b. 延迟更长时间才调用 then()
(3) 什么时候才能得到数据?
    a. 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
    b. 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据
    
    
简单说：
	promise构造函数里为同步代码时，先改变状态，后指定回调。
	异步代码时，先指定了回调，后等待异步结果后再改变状态。
```



### 5.4 promise.then()返回的新 promise 的结果状态由什么决定?

```
(1) 简单表达: 由 then()指定的回调函数执行的结果决定
(2) 详细表达: 
	a. 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常
	b. 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值
	c. 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果	
```



### 5.5 promise 如何串连多个操作任务?

```typescript
(1) promise 的 then()返回一个新的 promise, 可以开成 then()的链式调用
(2) 通过 then 的链式调用串连多个同步/异步任务

注意：
每次调用then都会返回一个新创建的promise对象，而then内部只是返回的数据。

	   let p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('OK');
            }, 1000);
        });

        p.then(value => {
            return new Promise((resolve, reject) => {
                resolve("success");
            });
        }).then(value => {
            console.log(value);
        }).then(value => {
            console.log(value);
        })


/* 例 */
//方法1：对同一个promise对象同时调用 then 方法
var p1 = new Promise(function (resolve) {
    resolve(100);
});
p1.then(function (value) {
    return value * 2;
});
p1.then(function (value) {
    return value * 2;
});
p1.then(function (value) {
    console.log("finally: " + value);
});
-------output-------
finally: 100

//方法2：对 then 进行 promise chain 方式进行调用
var p2 = new Promise(function (resolve) {
    resolve(100);
});
p2.then(function (value) {
    return value * 2;
}).then(function (value) {
    return value * 2;
}).then(function (value) {
    console.log("finally: " + value);
});
-------output-------
finally: 400


第一种方法中，then的调用几乎是同时开始执行的，且传给每个then的value都是100，这种方法应当避免。方法二才是正确的链式调用。


https://segmentfault.com/a/1190000007032448
```



### 5.6  promise 异常传透?

```typescript
(1) 当使用 promise 的 then 链式调用时, 可以在最后指定失败的回调, 
(2) 前面任何操作出了异常, 都会传到最后失败的回调中处理

   		let p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('OK');
                // reject('Err');
            }, 1000);
        });

        p.then(value => {
            // console.log(111);
            throw '失败啦!';
        }).then(value => {
            console.log(222);
        }).then(value => {
            console.log(333);
        }).catch(reason => {
            console.warn(reason);
        });
```

### 5.7  如何中断 promise 链?

```typescript
当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数
方法：在回调函数中返回一个 pendding 状态的 promise 对象

        let p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('OK');
            }, 1000);
        });

        p.then(value => {
            console.log(111);
            //有且只有一个方式
            return new Promise(() => {});
        }).then(value => {
            console.log(222);
        }).then(value => {
            console.log(333);
        }).catch(reason => {
            console.warn(reason);
        });
```



### 5.8 在异步回调中抛错，不会被`catch`到

```typescript
// Errors thrown inside asynchronous functions will act like uncaught errors
var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    throw 'Uncaught Exception!';
  }, 1000);
});

promise.catch(function(e) {
  console.log(e);       //This is never called
});
```

### 5.9 promise状态变为`resolve`或`reject`，就凝固了，不会再改变

```typescript
console.log(1);
new Promise(function (resolve, reject){
    reject();
    setTimeout(function (){
        resolve();            //not called
    }, 0);
}).then(function(){
    console.log(2);
}, function(){
    console.log(3);
});
console.log(4);

-------output-------
1
4
3
```

### 5.10 promise.all嵌套问题

```typescript
嵌套promise.all时发现，p4 p5 p6并没有按照想象中的等待p1 p2 p3完成后再执行，而是立即执行了。

原因：
	注意Promise对象内部函数的调用时间，是创建promise对象时就会执行，而不是then方法才执行。
    
    
    注意：常用的
    new Promise((resolve, reject)=>{
        fun1();
        resolve();
    }).then(()=>{
        fun2()
    }).then(()=>{
        fun3()
    }).
    
    fun1()会立即执行，当new的Promise里调用了resolve()方法，才会去执行then方法，
    fun2才会执行，then方法返回的是一个新的promise对象，并且调用了resolve，所以才会进入下一个then
    即fun3()才会执行


	所以如下的第一种嵌套方式，p4 p5 p6会立即执行
    想要保证p4 p5 p6在p1 p2 p3后面执行，需要将p4 p5 p6的创建放在Promise.all().then内部创建
    Promise.all([...]).then(()=>{
        //这里创建 p4 p5 p6
        //不能在外部创建
        ...
        
    })

let p1 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        console.log(5)
        resolve(5);
    }, 5000)
})


let p2 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        console.log(3)
        resolve(3);
    }, 3000)
})

let p3 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        console.log(2)
        resolve(2);
    }, 2000)
})
let promiseArr = [p1,p2,p3];



let p4 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        console.log(1)
        resolve(1);
    }, 1000)
})


let p5 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        console.log(2)
        resolve(2);
    }, 2000)
})

let p6 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        console.log(4)
        resolve(4);
    }, 4000)
})
let promiseArr2 = [p4,p5,p6];



Promise.all(promiseArr).then(res=>{
    console.log("promiseArr1")
    console.log(res)

    setTimeout(()=>{
        console.log("第二次")
        Promise.all(promiseArr2).then(res => {
            console.log("promiseArr2")
            console.log(res)
        })
    },1000)

})

执行顺序如下：
1
178 2
178 2
178 3
178 4
178 5
178 promiseArr1
178 (3) [5, 3, 2]
178 第二次
178 promiseArr2
178 (3) [1, 2, 4]


// 输入不仅仅只有Array
function promiseAll(args: any[]) {
    let p = new Promise((resolve, reject) => {
        const promiseResults: any[] = [];
        let iteratorIndex = 0;
        // 已完成的数量，用于最终的返回，不能直接用完成数量作为iteratorIndex
        // 输出顺序和完成顺序是两码事
        let fullCount = 0;
        // 用于迭代iterator数据
        for (const item of args) {
            // for of 遍历顺序，用于返回正确顺序的结果
            // 因iterator用forEach遍历后的key和value一样，所以必须存一份for of的 iteratorIndex
            let resultIndex = iteratorIndex;
            iteratorIndex += 1;
            // 包一层，以兼容非promise的情况
            Promise.resolve(item).then(res => {
                promiseResults[resultIndex] = res;
                fullCount += 1;
                console.log("_________+++" + fullCount)
                // Iterator 接口的数据无法单纯的用length和size判断长度，不能局限于Array和 Map类型中
                if (fullCount === iteratorIndex) {
                    resolve(promiseResults)
                }
            }).catch(err => {
                reject(err)
            })
        }
        // 处理空 iterator 的情况
        if (iteratorIndex === 0) {
            resolve(promiseResults)
        }
    })

    console.log(p)
    console.log(new Date().getUTCSeconds())
    return p;
}


promiseAll(promiseArr).then(res => {
    console.log("promiseArr1")
    console.log(promiseArr)
    console.log(res)


    let p4 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2-1")
            resolve("2-1");
        }, 1000)
    })


    let p5 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2-2")
            resolve("2-2");
        }, 2000)
    })

    let p6 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2-4")
            resolve("2-4");
        }, 4000)
    })

    let promiseArr2 = [p4, p5, p6];
    console.log(promiseArr)
    console.log(promiseArr2)

    console.log("第二次")
    promiseAll(promiseArr2).then(res => {
        console.log("promiseArr2")
        console.log(promiseArr2)
        console.log(res)
        console.log(new Date().getUTCSeconds())
    })

})

执行顺序如下：
Promise {<pending>}
 31
 2
 _________+++1
 3
 _________+++2
 5
 _________+++3
 promiseArr1
 (3) [Promise, Promise, Promise]
 (3) [5, 3, 2]
 (3) [Promise, Promise, Promise]
 (3) [Promise, Promise, Promise]
 第二次
 Promise {<pending>}
 36
 2-1
 _________+++1
 2-2
 _________+++2
 2-4
 _________+++3
 promiseArr2
 (3) [Promise, Promise, Promise]
 (3) ['2-1', '2-2', '2-4']
 40


```

![image-20221122154834849](/markdown/blogs/promise.assets/image-20221122154834849.png)
