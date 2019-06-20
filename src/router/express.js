export default [
  //租车业务
    {
        path: '',
        component: resolve => require(['@/views/express/expressIndex'], resolve),
        meta: {title: '直通车'}
    },
    {
        path: 'expressDetails',
        component: resolve => require(['@/views/express/expressDetails'], resolve),
        meta: {title: '直通车'}
    },
    {
        path: 'bookNotice',
        component: resolve => require(['@/views/express/bookNotice'], resolve),
        meta: {title: '直通车'}
    },
    {
        path: 'bookInfo',
        component: resolve => require(['@/views/express/bookInfo'], resolve),
        meta: {title: '直通车'}
    },
    {
        path: 'confirmPay',
        component: resolve => require(['@/views/express/confirmPay'], resolve),
        meta: {title: '直通车'}
    },
    {
        path: 'paySuccess',
        component: resolve => require(['@/views/express/paySuccess'], resolve),
        meta: {title: '直通车'}
    },{
        path: 'payFail',
        component: resolve => require(['@/views/express/payFail'], resolve),
        meta: {title: '直通车'}
    },{
        path: 'orderList',
        component: resolve => require(['@/views/express/orderList'], resolve),
        meta: {title: '直通车'}
    },
]
