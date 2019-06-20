export default [
  //公交车业务
  {
    path: '',
    component: resolve => require(['@/views/publiccar/publiccarIndex'], resolve),
    meta: {title: '公交车'}
  },{
    path: 'index',
    name: 'index',
    component: resolve => require(['@/views/publiccar/publiccarIndex'], resolve),
    meta: {title: '公交车'}
  },{
    path: 'nav',
    name: 'nav',
    component: resolve => require(['@/views/publiccar/navigationPage'], resolve),
    meta: {title: '公交车'}
  },{
    path: 'departure',
    name: 'departure',
    component: resolve => require(['@/views/publiccar/departure'], resolve),
    meta: {title: '公交车'}
  },{
    path: 'lineplan',
    name: 'lingPlan',
    component: resolve => require(['@/views/publiccar/lineplan'], resolve),
    meta: {title: '公交车'}
  },{
    path: 'destination',
    name: 'destination',
    component: resolve => require(['@/views/publiccar/destination'], resolve),
    meta: {title: '公交车'}
  },{
    path: 'routerDetail',
    name: 'routerDetail',
    component: resolve => require(['@/views/publiccar/routerDetail'], resolve),
    meta: {title: '公交车'}
  }
]
