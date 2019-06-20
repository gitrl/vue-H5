<template>
    <div id="passengerCancelR" class="">
        <div>
            <h3 class="pad1 FontS13">无责取消情况</h3>
            <div class="bgcolorW pad1 lineH2D5 colorg FontS12">
                <p>1.司机接单后，实时订单乘客在2分钟内取消，预约订单乘客在预约出发时间45分钟之前取消。</p>
                <p>2.司机未在规定时间内（实时订单从接单开始10分钟，预约订单从乘客预约出发时间开始10分钟）到达上车点，乘客取消</p>
                <p>3.司机未朝上车点行驶，或以其他各种理由不来接，乘客取消</p>
                <p>4.多次无法联系司机，乘客取消</p>
            </div>
        </div>
        <div>
            <h3 class="pad1 FontS13">有责取消</h3>
            <div class="bgcolorW pad1 lineH2D5 colorg FontS12">
                <p>司机到接单超过2分钟取消（如司机要求加价或者现金，不是订单显示车辆或司机，乘客无责）。 </p>
                <p>预约订单乘客在预约出发时间10分钟内取消（若因司机原因造成取消，如迟到、拒载等行为，乘客无责） </p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'passengerCancelR'
  }
</script>

<style scoped>

</style>
