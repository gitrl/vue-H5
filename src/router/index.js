import Vue from 'vue'
import Router from 'vue-router'
// 乘客端网约车常用模块路由
import passenger from './passenger'
// 公交车模块路由
import publiccar from './publiccar'
// 机场接送模块路由
import airPort from './airPort'
// 租车业务模块路由
import zuche from './zuche'
// 租车业务模块路由
import comm from './comm'
// 直通车业务模块路由
import express from './express'
//汽车票
import busTicket from './busTicket'
//合作
import cooperation from  './cooperation'

//这是挂载的公共部分样式
import '@/assets/css/global.css';

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/caruser',
    routes: [
        {
            path: '/',
            name: 'home',
            component: resolve => require(['@/views/home'], resolve),
            meta: {title: 'Home页面'}
        },
        {
            path: '/comm',
            component: resolve => require(['@/views/comm/index'], resolve),
            children: comm,
            meta: {title: '公共页面'}
        },
        {
            path: '/passenger',
            component: resolve => require(['@/views/passenger/index'], resolve),
            children: passenger,
            meta: {title: '网约车首页'},
        },
        {
            path: '/publiccar',
            component: resolve => require(['@/views/publiccar/index'], resolve),
            children: publiccar,
            meta: {title: '公交车'},
        },
        {
            path: '/airport',
            component: resolve => require(['@/views/airPort/index'], resolve),
            children: airPort,
            meta: {title: '接送'},
        },
        {
            path: '/zuche',
            component: resolve => require(['@/views/zuche/index'], resolve),
            children: zuche,
            meta: {title: '租车'},
        },
        {
            path: '/busticket',
            component: resolve => require(['@/views/busTicket/index'], resolve),
            children: busTicket,
            meta: {title: '汽车票'},
        },
        {
            path: '/express',
            component: resolve => require(['@/views/express/index'], resolve),
            children: express,
            meta: {title: '直通车'},
        },
        {
            path: '/cooperation',
            component: resolve => require(['@/views/cooperation/index'], resolve),
            children: cooperation,
            meta: {title: '合作'},
        },

    ]
})



