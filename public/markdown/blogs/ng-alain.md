开发中中发现 11.x版本变化较大，比如废弃使用sidebar-nav等

所以改为使用10.x版本 实际版本10.1.3



canActivate 和 canActivateChild区别

```typescript
路由守卫
当某个路由未发起请求时，意味着无法在拦截器里面对其进行 Token 有效性的验证，而路由守卫可以解决这一问题，例如在你的根路径里。

[
  {
    path: 'home',
    component: MockComponent,
    canActivate: [JWTGuard],
  },
  {
    path: 'my',
    canActivateChild: [JWTGuard],
    children: [
      { path: 'profile', component: MockComponent }
    ],
  },
  {
    path: 'login',
    component: MockComponent,
  },
]
    
    
canActivate 控制是否允许进入路由。
canActivateChild 针对是所有子路由,控制是否允许进入路由。
   
    canActivate代表当前路由本身 canActivateChild表示子路由都需要判断。比如上面定义的路由中，/my就不需要验证，但/my/profile需要判断。

```

