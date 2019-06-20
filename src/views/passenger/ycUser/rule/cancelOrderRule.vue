<template>
<div id="cancelOrderRule">
    <div class="bgcolorW">
        <div class="aboutTitle">取消规则</div>
        <h3 class="pad1 FontS13" style="padding-bottom: 0.5rem; padding-left: 2rem;">您需支付司机补偿费的情况</h3>
        <div class="lineH2D5 FontS12 colorGray padL2 padB1 padR2">
            <p>1.司机正常到达，乘客取消。</p>
            <p>2.司机正常到达，多次无法联系到乘客，任意方取消。</p>
            <p>3.司机正常到达，乘客迟到五分钟，任意方取消。</p>
        </div>
    </div>
    <div class="bgcolorW marT1">
        <h3 class="pad1 FontS13" style="padding-bottom: 0.5rem;padding-left: 2rem; ">您无需支付司机补偿费的情况</h3>
        <div class="lineH2D5 FontS12 colorGray padL2 padB1 padR2">
            <p>1.乘客在3分钟内取消订单。</p>
            <p>2.司机未在规定时间内到达上车点，乘客取消订单。</p>
            <p>3.乘客多次无法联系到司机，乘客取消订单。</p>
        </div>
    </div>
    <div class="bgcolorW marT1">
        <h3 class="pad1 FontS13" style="padding-bottom: 0.5rem;padding-left: 2rem;">司机补偿费的计算方式</h3>
        <div class="lineH2D5 FontS12 colorGray padL2 padB1 padR2">
            <p>1.若司机空驶小于1公里，您需支付3元补偿费。</p>
            <p>2.若司机空驶大于1公里，超过部分每公里支付1元补偿费，总共补偿费不超过5元。</p>
        </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'cancelOrderRule'
  }
</script>

<style scoped>
    .aboutTitle{padding:2rem ;font-weight: bold;font-size: 1.5rem}

</style>
