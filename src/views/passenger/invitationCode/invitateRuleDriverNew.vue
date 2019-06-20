<template>
    <div id="bindActiviteRule">
        <section class="ActiviteRule">
            <h3 class="TextC padT2"><img src="../../../assets/images/passenger/invitationCode/New/rules_title.png"> </h3>
            <div class="ActiviteRuleBox clearfix">
                <p><span>1</span><span>凡在活动期间，成功推荐乘客注册牦牛出行APP的乘客和司机，都有机会获得5元奖金及被推荐用户每次行程单的3%返现奖金，返现奖金活动在正式运营3个月内有效。</span></p>
                <p><span>2</span><span>被推荐的乘客,将获得60元大礼包，其中首单立减10元,有效期为30天。</span></p>
                <p><span>3</span><span>如果推荐人是司机，则5元奖金和被推荐的行程单的3%将收入到司机牦牛车主的APP钱包账户，在被推荐乘客完成首次打车支付后，即可提现该奖金。</span></p>
                <p><span>4</span><span>如果推荐人是乘客，则5元奖金将以打车优惠券的形式发放到乘客在牦牛出行APP的钱包账户上，在被推荐乘客完成首次打车支付后，打车即可使用，有效期为30天。被推荐人行程单的3%被转化为积分，收入到乘客的牦牛出行APP的钱包账户，每元积分为100分，积分可以兑换打车优惠券。</span></p>
                <p><span>5</span><span>被推荐人行程单的3%奖金，由牦牛出行平台支付，不影响被推荐人每次行程的价格。</span></p>
                <p><span>6</span><span>查看个人推荐码，请在牦牛出行/牦牛车主APP-个人中心-邀请好友得优惠。</span></p>
                <p><span>7</span><span>输入推荐码，请在注册7天内，在牦牛出行APP-个人中心-邀请好友得优惠。</span></p>

            </div>
        </section>
    </div>
</template>

<script>
  export default {
    name: 'invitateCodeNew',

  }
</script>

<style scoped>
    .ActiviteRule{margin-top: 0;background: url("../../../assets/images/passenger/invitationCode/New/rulesbg_pic.png") no-repeat; width: 100%;height: 100%;background-size: 100% 100%;}
    .ActiviteRuleBox{background:#ffffff; width:85%;height: 100%;background-size: 100% 100%; margin: 0 auto;border-radius: 5px;font-size: 1.2rem;color: #A69F98;line-height: 2.2rem; padding: 1.5rem; margin-bottom: 3rem; margin-top: 1rem;}
    .ActiviteRule img{width: 60%}
    .ActiviteRuleBox p span:first-child{background: #FC9646;border: 2px solid #FFDF41;display: inline-block;width: 1.5rem;height: 1.5rem;border-radius: 2rem;text-align: center;color: #ffffff;line-height: 1.5rem;font-size: 1rem;margin-right: 0.5rem; float: left;margin-top: 0.4rem;}
    .ActiviteRuleBox p span:last-child{width: 90%;float: left}
    @media screen and (max-width: 330px) {
        .ActiviteRuleBox p span:last-child{width: 20rem;float: left}
    }
</style>
