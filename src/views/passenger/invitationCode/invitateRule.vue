<template>
    <div>
        <section class="index">
            <div class="activiteRule">
                <div class="card activiteRuleCon FontS12">
                    <div class="card-header pad1">活动内容</div>
                    <div class="card-body"> <p>活动时间：2018.10.20-2019.1.30</p>
                        活动简介：邀请好友体验快捷键舒适的牦牛出行网约车，好友注册成功后即可获得60元超值礼包,当您的好友完成了第一次快车行程并支付订单，您便获得5元现金券作为推荐奖励和推荐积分奖励。积分可无限累积并兑换优惠券，并可用于支付车费。</div>
                </div>
                <div class="card activiteRuleCon FontS12">
                    <div class="card-header pad1">参与流程</div>
                    <div class="card-body">
                        <div class="flexBox">
                            <div class="">
                                <div class="JoinStep">01</div>
                                <div class="padT1 padB1">
                                    进入牦牛出行“推荐有奖”或
                                    进入好友的“推荐有奖”链接
                                </div>
                            </div>
                            <div><img src="../../../assets/images/passenger/invitationCode/name_pic.png" alt=""></div>
                        </div>
                        <div class="flexBox">
                            <div class="">
                                <p class="JoinStep">02</p>
                                <p class="padT1 padB1">根据页面提示获得您的专属推荐有奖链接</p>
                            </div>
                            <div><img src="../../../assets/images/passenger/invitationCode/invite_pic.png" alt=""></div>
                        </div>
                        <div class="">
                            <p class="JoinStep">03</p>
                            <p class="padT1 padB1">分享给您的好友</p>
                        </div>
                        <div class="invitateRuleBorder marT1">
                            <h3 class="invitateRuleH3"><span>推荐好友成为乘客</span></h3>
                            <p class="padT2">1. 您的好友填写您分享的邀请码，完成注册并领取60元新人礼包</p>
                            <div class="flexBox" style="align-items:flex-start">
                                <div class="padT1">
                                    2. 您的好友完成第一
                                    次快车行程并完成订
                                    单支付
                                </div>
                                <div><img src="../../../assets/images/passenger/invitationCode/pay_pic.png" alt=""></div>
                            </div>
                            <p>3. 您获得5元现金券及积分奖励</p>
                        </div>
                        <div class="invitateRuleBorder marT3">
                            <h3 class="invitateRuleH3"><span>推荐好友成为司机</span></h3>
                            <p class="padT2">1. 您的好友填写您分享的邀请码，完成注册并审核通过</p>
                            <p>2. 您获得5元现金券及积分奖励</p>
                        </div>

                    </div>
                </div>
            </div>
            <div class="lineH2D5 FontS12  bgcolorW">
                <div class="moneyWithDrawal pad2  marT">
                    <h3 class="FontS14 colorblack">活动说明</h3>
                    <p><span>*</span>您可邀请您的好友成为牦牛出行司机，邀请成功后您与您的好友均将获得5元现金奖励。</p>
                    <p><span>*</span>邀请您的好友体验牦牛出行的优质服务。您的好友在成功注册成为牦牛出行用户后，您便可以获得5元推荐奖励；
                        您的好友在领取本活动牦牛出行10元优惠券后7天内第一次体验牦牛出行网约车，并成功付款后，您可得到推荐奖励。
                        在活动期间，您可获得好友每次打车总金额3%的高额推荐奖励，并可将推荐奖励提现。奖金优渥，等你来拿！</p>
                    <p><span>*</span>拥有相同设备（手机）、账户、手机号、微信号、支付账号、银行卡的用户被视为同一用户（适用于您与您的好友），
                        本活动仅对成功推荐好友完成并支付首次牦牛出行网约车订单的用户发放推荐奖励。</p>
                    <p><span>*</span>针对违规推荐奖励的行为，将不予发放推荐奖励、追回相关奖励或封停账号、并依法追究其法律责任。
                    </p>
                    <div>活动详情咨询：400-656-2666</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  import "../../../assets/css/Module.css";
  export default {
    name: 'invitationCodeDriver'
  }
</script>

<style scoped>
    .invitateRuleBorder{border: 5px dashed #5488f2;border-radius: 5px; padding: 1rem; position: relative}
    .invitateRuleH3{position: absolute;top: -1.5rem;width: 100%;text-align: center;font-size: 1.3rem;}
    .invitateRuleH3 span{background: #5488F2;padding-left: 2rem; padding-right: 2rem; line-height: 3rem;color: #ffffff;border-radius: 1.5rem;display: inline-block;}
</style>
