export default [
  //前面加业务类型名称
  {
    path: '',
    component: resolve => require(['@/views/airPort/checkIndex'], resolve),
    meta: {title: '接送'}
  },{
      path: 'airIndex',
      component: resolve => require(['@/views/airPort/checkIndex'], resolve),
      meta: {title: '接送'}
  },{
      path: 'nav',
      component: resolve => require(['@/views/airPort/navigationPage'], resolve),
      meta: {title: '接送'}
  },{
    path: 'selectFlight',
    component: resolve => require(['@/views/airPort/selectFlight'], resolve),
    meta: {title: '接送'}
  },{
    path: 'airIndex',
    component: resolve => require(['@/views/airPort/airIndex'], resolve),
    meta: {title: '接送'}
  },{
    path: 'checkIndex',
    component: resolve => require(['@/views/airPort/checkIndex'], resolve),
    meta: {title: '接送'}
  },{
    path: 'airCheck',
    component: resolve => require(['@/views/airPort/checkIndex'], resolve),
    meta: {title: '接送'}
  },{
    path: 'flightNum',
    component: resolve => require(['@/views/airPort/flightNum'], resolve),
    meta: {title: '接送'}
  },{
    path: 'departure',
    component: resolve => require(['@/views/airPort/departure'], resolve),
    meta: {title: '接送'}
  },{
    path: 'destination',
    component: resolve => require(['@/views/airPort/destination'], resolve),
    meta: {title: '接送'}
  },{
    path: 'bookInformation',
    component: resolve => require(['@/views/airPort/bookInformation'], resolve),
    meta: {title: '接送'}
  },{
    path: 'bookNotice',
    component: resolve => require(['@/views/airPort/bookNotice'], resolve),
    meta: {title: '接送'}
  },{
    path: 'confirmPay',
    component: resolve => require(['@/views/airPort/confirmPay'], resolve),
    meta: {title: '接送'}
  },{
    path: 'orderList',
    component: resolve => require(['@/views/airPort/orderList'], resolve),
    meta: {title: '接送'}
  },{
    path: 'paySuccess',
    component: resolve => require(['@/views/airPort/paySuccess'], resolve),
    meta: {title: '接送'}
  },{
    path: 'payFail',
    component: resolve => require(['@/views/airPort/payFail'], resolve),
    meta: {title: '接送'}
  },
  //微信公众号H5 乘车码
  {
    path: 'wechat',
    component: resolve => require(['@/views/weChatPublic/weChatPublicIndex'], resolve),
    meta: {title: '接送'}
  },
  {
    path: 'orderDetail',
    component: resolve => require(['@/views/weChatPublic/orderDetail'], resolve),
    meta: {title: '订单详情'}
  }



]
