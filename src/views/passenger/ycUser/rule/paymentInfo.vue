<template>
    <div id="Rule" class="local_scroll">
        <div class="RuleBox">
            <dl class="active">
                <div class="aboutTitle">支付说明</div>
                <dt>
                    <div>
                        <div class="rule-content">
                            <p class="fontW borderB padB2">
                                免密支付是牦牛出行与第三方支付渠道共同推出的快捷支付方式，开通后牦牛出行平台-出行用户可享受单笔小于200元（含）的快捷支付体验。
                            </p>
                        </div>
                        <div class="rule-content padT2 padB1">
                            <p class="orderColor6">问.免费支付支持哪些支付方式？</p>
                            <p class="orderColor6">答.牦牛出行平台出行业务目前仅支持支付宝免密支付。</p>
                        </div>
                        <div class="rule-content padT1 padB1">
                            <p class="orderColor6">问.开通免密支付需要哪些条件？</p>
                            <p class="orderColor6">答.支付宝免密支付：支付宝账户已开通实名认证且芝麻信用分高于350分（含）。</p>
                        </div>
                        <div class="rule-content padT1 padB1">
                            <p class="orderColor6">问.免密支付安全吗？ </p>
                            <p class="orderColor6">答.牦牛出行严格按照订单金额进行扣款。 </p>
                        </div>
                        <div class="rule-content padT1 padB1">
                            <p class="orderColor6">问.免密支付可在哪些业务上使用？ </p>
                            <p class="orderColor6">答.目前免密支付仅支持网约车、出租车业务。</p>
                        </div>

                        <div class="rule-content padT1 padB1">
                            <p class="orderColor6">问.扣款存在疑问如何申诉？</p>
                            <p class="orderColor6">答.如果扣款后存在异议，请直接拨打4006562666客服电话进行问题反馈，我们会在第一时间为您处理。</p>
                        </div>
                    </div>

                </dt>
            </dl>
        </div>
    </div>
</template>

<script>
    import '../../../../assets/css/Module.css';
    export default {
        name: "paymentInfo"
    }
</script>

<style scoped>
#Rule{background: #ffffff;}
.local_scroll{height: 100%;background: #ffffff}
.aboutTitle{padding:2rem ;font-weight: bold;font-size: 1.5rem;padding-bottom: 1rem;}
.RuleBox dl dt p.orderColor6{color: #9b9b9b}
</style>