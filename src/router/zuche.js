export default [
  //租车业务
  { path: '',
    component: resolve => require(['@/views/zuche/zucheIndex'], resolve),
    meta: {title: '租车'}
  },
  {
    path: 'zucheIndex',
    component: resolve => require(['@/views/zuche/zucheIndex'], resolve),
    meta: {title: '租车'}
  },
  { path: 'nav',
    component: resolve => require(['@/views/zuche/navigationPage'], resolve),
    meta: {title: '租车'}
  },
  {
    path: 'selectCar',
    component: resolve => require(['@/views/zuche/selectCar'], resolve),
    meta: {title: '租车'}
  },
  {
    path: 'fillOrder',
    component: resolve => require(['@/views/zuche/fillOrder'], resolve),
    meta: {title: '租车'}
  },
  {
      path: 'orderList',
      component: resolve => require(['@/views/zuche/orderList'], resolve),
      meta: {title: '租车'}
  },
  {
      path: 'orderDetails',
      component: resolve => require(['@/views/zuche/orderDetails'], resolve),
      meta: {title: '租车'}
  },
  {
      path: 'bookNotice',
      component: resolve => require(['@/views/zuche/bookNotice'], resolve),
      meta: {title: '租车'}
  },
  {
    path: 'confirmPay',
    component: resolve => require(['@/views/zuche/confirmPay'], resolve),
    meta: {title: '租车'}
  },
  {
    path: 'addressMap',
    component: resolve => require(['@/views/zuche/addressMap'], resolve),
    meta: {title: '租车'}
  },
  {
      path: 'paySuccess',
      component: resolve => require(['@/views/zuche/paySuccess'], resolve),
      meta: {title: '租车'}
  },{
      path: 'payFail',
      component: resolve => require(['@/views/zuche/payFail'], resolve),
      meta: {title: '租车'}
  },
]
