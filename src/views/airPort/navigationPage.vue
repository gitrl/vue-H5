<template>
    <div id="navigationPage" class="animatedRouter">
        <h3 class="pad1 FontS13">导航</h3>
        <ul class="homeList clearfix">
            <li><router-link :to="{path:'/airIndex',query: {token:token}}">接送首页</router-link></li>
            <li><router-link to="selectFlight">选择航班号</router-link></li>
            <li><router-link to="flightNum">航班号</router-link></li>
            <li><router-link :to="{path:'/departure',query:{token:token}}">出发地</router-link></li>
            <li><router-link to="destination">目的地</router-link></li>
            <li><router-link to="airCheck">首页已填</router-link></li>
            <li><router-link to="orderList">订单列表</router-link></li>
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


  }


</script>

<style scoped>
    .index{height: 100%}
    .homeList{padding: 1rem;background: #ffffff}
    .homeList li{float: left; padding-right: 1rem; font-size: 1.2rem; height: 3rem;line-height: 3rem;}
</style>
