<template>
    <div id="navigationPage" class="animatedRouter">
        <h3 class="pad1 FontS13">导航</h3>
        <ul class="homeList clearfix">
            <li><router-link to="zucheIndex">租车首页</router-link></li>
            <li><router-link to="selectCar">选择车型</router-link></li>
            <li><router-link to="fillOrder">填写订单</router-link></li>
            <li><router-link to="orderList">租车订单列表</router-link></li>
            <li><router-link to="orderDetails">租车订单详情</router-link></li>
            <li><router-link to="confirmPay">租车订单支付</router-link></li>
            <li><router-link to="addressMap">地图</router-link></li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'navigationPage',
    data () {
      return {
      }
    },
    created(){
    }


  }


</script>

<style scoped>
    .index{height: 100%}
    .homeList{padding: 1rem;background: #ffffff}
    .homeList li{float: left; padding-right: 1rem; font-size: 1.2rem; height: 3rem;line-height: 3rem;}
</style>
