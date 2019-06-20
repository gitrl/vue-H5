<template>
  <div class="index">
    <h3 class="pad1 FontS13">乘客端</h3>
    <ul class="homeList clearfix">
      <li><router-link to="passenger/service">客服电话</router-link></li>
      <li><router-link to="passenger/passengerAbout">关于我们</router-link></li>
      <li><router-link to="passenger/passCancelRulu">乘客取消</router-link></li>
      <li><router-link to="passenger/cancelOrderRule">订单取消规则</router-link></li>
      <li><router-link to="passenger/integralRule">积分规则</router-link></li>
      <li><router-link to="passenger/valuation">出租车普通订单计价规则</router-link></li>
      <li><router-link to="passenger/fastcarPricingRules">快车计价规则</router-link></li>
      <li><router-link to="passenger/reserve">预定须知</router-link></li>
      <li><router-link to="passenger/carRule">乘车规则</router-link></li>
      <li><router-link to="passenger/newRegster">新人注册</router-link></li>
      <li><router-link to="passenger/integral">积分兑换</router-link></li>
      <li><router-link to="passenger/integraRule">积分兑换规则</router-link></li>
      <li><router-link to="passenger/userRule">牦牛出行《用户协议》</router-link></li>
      <li><router-link to="passenger/download">牦牛出行下载</router-link></li>
      <li><router-link to="passenger/invoiceRule">开票规则</router-link></li>
      <li><router-link to="passenger/myInvoice">我的发票</router-link></li>
      <li><router-link to="passenger/privacy">隐私保护</router-link></li>
      <li><router-link to="passenger/paymentInfo">支付说明</router-link></li>
      <li><router-link to="passenger/rechargeRule">充值协议</router-link></li>
    </ul>
    <h3 class="pad1 FontS13">公共部分</h3>
    <ul class="homeList clearfix">
      <li><router-link to="passenger/contact">推广合作</router-link></li>
      <li><router-link to="passenger/invitateRuletoDriver">好友邀请码规则(司机)</router-link></li>
      <li><router-link to="passenger/PassengerToDriver">邀请成为司机</router-link></li>
      <li><router-link to="passenger/invitationCodeDriver">绑定邀请成为司机</router-link></li>
      <li><router-link to="passenger/invitateRule">好友邀请码规则(乘客)</router-link></li>
      <li><router-link to="passenger/passengertoPass">邀请成为乘客</router-link></li>
      <li><router-link to="passenger/invitateCode">绑定邀请成为乘客</router-link></li>
      <li><router-link to="passenger/invitateCodeNew">绑定邀请成为乘客-新</router-link></li>
      <li><router-link to="passenger/invitateCodeDriverNew">绑定邀请成为司机-新</router-link></li>
      <li><router-link to="passenger/invitateRuleDriverNew">活动规则</router-link></li>
    </ul>
    <h3 class="pad1 FontS13">地推拉新</h3>
    <ul class="homeList clearfix">
      <li><router-link to="passenger/receiveCoupon">只为你拉新</router-link></li>
      <li><router-link to="passenger/newUserIdentity">选择身份</router-link></li>
    </ul>
    <h3 class="pad1 FontS13">投诉</h3>
    <ul class="homeList clearfix">
      <li><router-link to="passenger/contactService">非个人中心联系客服</router-link></li>
      <li><router-link to="passenger/submittedSuccessfully">非个人中心提交成功</router-link></li>
      <li><router-link to="passenger/viewComplaintTit">客服</router-link></li>
      <li><router-link to="passenger/viewComplaintList">投诉处理列表</router-link></li>
      <li><router-link to="passenger/viewComplaintCs">投诉处理详情</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index{height: 100%}
  .homeList{padding: 1rem;background: #ffffff}
  .homeList li{float: left; padding-right: 1rem; font-size: 1.2rem; height: 3rem;line-height: 3rem;}
</style>
