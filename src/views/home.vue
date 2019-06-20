<template>
  <div class="index">
    <h3 class="pad1 FontS13">导航</h3>
    <ul class="homeList clearfix">
      <li><router-link to="passenger">网约车</router-link></li>
      <li><router-link to="publiccar">公交车</router-link></li>
      <li><router-link to="airport">机场接送</router-link></li>
      <li><router-link to="zuche">租车</router-link></li>
      <li><router-link to="busticket">汽车票</router-link></li>
      <li><router-link to="express">直通车</router-link></li>
      <li><router-link to="/cooperation/xiechenair">携程机票</router-link></li>
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
  .homeList{padding: 1rem;background: #ffffff}
  .homeList li{float: left; padding-right: 1rem; font-size: 1.2rem; height: 3rem;line-height: 3rem;}
</style>
