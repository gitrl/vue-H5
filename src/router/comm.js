export default [
  //公共页面
    {
        path: 'login',
        component: resolve => require(['@/views/comm/login'], resolve),
        meta: {title: '登录'}
    }
]
