<template>
    <div id="navigationPage" class="animatedRouter">
        <h3 class="pad1 FontS13">导航</h3>
        <ul class="homeList clearfix">
            <li><router-link to="index">首页</router-link></li>
            <li><router-link to="departure">出发地</router-link></li>
            <li><router-link to="openCity">开放城市</router-link></li>
            <li><router-link to="linePlan">线路方案</router-link></li>
            <li><router-link to="destination">目的地</router-link></li>
            <li><router-link to="routerDetail">路线规划</router-link></li>
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
