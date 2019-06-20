<template>
  <div class="index">
    <router-view v-wechat-title='$route.meta.title'></router-view>
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
