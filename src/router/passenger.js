export default [
  //网约车乘客端常用的
  {
    path: '',
    component: resolve => require(['@/views/passenger/navigationPage'], resolve),
    meta: {title: '网约车乘客端导航'}
  },
  {
    path: 'service',
    component: resolve => require(['@/views/passenger/ycUser/service/service'], resolve),
    meta: {title: '客服电话'}
  },
  {
    path: 'passengerAbout',
    component: resolve => require(['@/views/passenger/ycUser/service/passengerAbout'], resolve),
    meta: {title: '关于我们'}
  },
  {
    path: 'passCancelRulu',
    component: resolve => require(['@/views/passenger/ycUser/rule/passengerCancelR'], resolve),
    meta: {title: '乘客取消'}
  },
  {
    path: 'cancelOrderRule',
    component: resolve => require(['@/views/passenger/ycUser/rule/cancelOrderRule'], resolve),
    meta: {title: '订单取消规则'}
  },
  {
    path: 'integralRule',
    component: resolve => require(['@/views/passenger/ycUser/rule/integralRule'], resolve),
    meta: {title: '积分规则'}
  },
  {
    path: 'valuation',
    component: resolve => require(['@/views/passenger/ycUser/rule/valuation'], resolve),
    meta: {title: '出租车计价规则'}
  },
  {
    path: 'fastcarPricingRules',
    component: resolve => require(['@/views/passenger/ycUser/rule/fastcarPricingRules'], resolve),
    meta: {title: '快车计价规则'}
  },
  {
    path: 'reserve',
    component: resolve => require(['@/views/passenger/ycUser/rule/reserve'], resolve),
    meta: {title: '预定须知'}
  },
  {
    path: 'carRule',
    component: resolve => require(['@/views/passenger/ycUser/rule/carRule'], resolve),
    meta: {title: '乘车规则'}
  },
  {
    path: 'userRule',
    component: resolve => require(['@/views/passenger/ycUser/rule/userRule'], resolve),
    meta: {title: '牦牛出行《用户协议》'}
  },
  {
    path: 'newRegster',
    component: resolve => require(['@/views/passenger/ycUser/newRegster'], resolve),
    meta: {title: '新人注册'}
  },
  {
    path: 'integral',
    component: resolve => require(['@/views/passenger/ycUser/integration/integral'], resolve),
    meta: {title: '积分兑换'}
  },
  {
    path: 'integraRule',
    component: resolve => require(['@/views/passenger/ycUser/integration/integraRule'], resolve),
    meta: {title: '积分兑换规则'}
  },
  {
    path: 'download',
    component: resolve => require(['@/views/passenger/ycUser/service/download'], resolve),
    meta: {title: '牦牛出行下载'}
  },
  //公共页面
  {
    path: 'contact',
    component: resolve => require(['@/views/passenger/contact'], resolve),
    meta: {title: '推广合作'}
  },
  //地推拉新
  {
    path: 'receiveCoupon',
    component: resolve => require(['@/views/passenger/ycUser/pushNew/receiveCoupon'], resolve),
    meta: {title: '只为你优惠'}
  },{
    path: 'couponContent',
    component: resolve => require(['@/views/passenger/ycUser/pushNew/couponContent'], resolve),
    meta: {title: '只为你优惠'}
  },{
    path: 'CouponDownload',
    component: resolve => require(['@/views/passenger/ycUser/pushNew/CouponDownload'], resolve),
    meta: {title: '只为你优惠'}
  },{
    path: 'newUserIdentity',
    component: resolve => require(['@/views/passenger/ycUser/pushNew/newUserIdentity'], resolve),
    meta: {title: '选择身份'}
  },
  //投诉
  {
    path: 'contactService',
    component: resolve => require(['@/views/passenger/ycUser/viewComplaint/contactService'], resolve),
    meta: {title: '联系客服'}
  },
  {
    path: 'submittedSuccessfully',
    component: resolve => require(['@/views/passenger/ycUser/viewComplaint/submittedSuccessfully'], resolve),
    meta: {title: '提交成功'}
  },{
    path: 'viewComplaintTit',
    component: resolve => require(['@/views/passenger/ycUser/viewComplaint/viewComplaintTit'], resolve),
    meta: {title: '客服'}
  },{
    path: 'viewComplaintList',
    component: resolve => require(['@/views/passenger/ycUser/viewComplaint/viewComplaintList'], resolve),
    meta: {title: '投诉处理列表'}
  },{
    path: 'viewComplaintCs',
    component: resolve => require(['@/views/passenger/ycUser/viewComplaint/viewComplaintCs'], resolve),
    meta: {title: '投诉处理详情'}
  },
  //邀请码
  {
    path: 'invitationCodeDriver',
    component: resolve => require(['@/views/passenger/invitationCode/invitationCodeDriver'], resolve),
    meta: {title: '绑定邀请码成为司机'}
  },
  {
    path: 'invitateRuletoDriver',
    component: resolve => require(['@/views/passenger/invitationCode/invitateRuleDriver'], resolve),
    meta: {title: '成为司机活动规则'}
  },
  {
    path: 'PassengerToDriver',
    component: resolve => require(['@/views/passenger/invitationCode/PassengerToDriver'], resolve),
    meta: {title: '获取司机邀请码'}
  },{
    path: 'passengertoPass',
    component: resolve => require(['@/views/passenger/invitationCode/passengertoPass'], resolve),
    meta: {title: '获取乘客邀请码'}
  },
  {
    path: 'invitateCode',
    component: resolve => require(['@/views/passenger/invitationCode/invitateCode'], resolve),
    meta: {title: '绑定邀请码成为乘客'}
  },
  {
    path: 'invitateRule',
    component: resolve => require(['@/views/passenger/invitationCode/invitateRule'], resolve),
    meta: {title: '成为乘客活动规则'}
  },

  // invitationCode包含的是邀请码部分
  {
    path: 'invitateCodeNew',
    component: resolve => require(['@/views/passenger/invitationCode/invitateCodeNew'], resolve),
    meta: {title: '邀请码'}
  },{
    path: 'invitateCodeDriverNew',
    component: resolve => require(['@/views/passenger/invitationCode/invitateCodeDriverNew'], resolve),
    meta: {title: '邀请码'}
  },{
    path: 'invitateRuleDriverNew',
    component: resolve => require(['@/views/passenger/invitationCode/invitateRuleDriverNew'], resolve),
    meta: {title: '活动规则'}
  },
  //我的发票
  {
    path: 'invoiceRule',
    component: resolve => require(['@/views/passenger/ycUser/rule/invoiceRule/invoiceRule'], resolve),
    meta: {title: '开票规则'}
  },
  {
    path: 'myInvoice',
    component: resolve => require(['@/views/passenger/ycUser/rule/invoiceRule/myInvoice'], resolve),
    meta: {title: '我的发票'}
  },
  //安全中心-隐私保护
  {
    path: 'privacy',
    component: resolve => require(['@/views/passenger/ycUser/rule/privacy'], resolve),
    meta: {title: '隐私保护'}
  },
  //免密支付-支付说明
  {
    path: 'paymentInfo',
    component: resolve => require(['@/views/passenger/ycUser/rule/paymentInfo'], resolve),
    meta: {title: '支付说明'}
  },
  {
    path: 'rechargeRule',
    component: resolve => require(['@/views/passenger/ycUser/rule/rechargeRule'], resolve),
    meta: {title: '充值协议'}
  },

]
