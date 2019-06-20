export default [
    //公交车业务
    {
        path: '',
        component: resolve => require(['@/views/busTicket/busTicketIndex'], resolve),
        meta: {title: '汽车票'}
    },{
        path: 'index',
        component: resolve => require(['@/views/busTicket/busTicketIndex'], resolve),
        meta: {title: '汽车票'}
    },{
        path: 'departure',
        component: resolve => require(['@/views/busTicket/departure'], resolve),
        meta: {title: '汽车票'}
    }
]
