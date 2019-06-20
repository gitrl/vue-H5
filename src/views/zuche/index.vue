<template>
    <div id="zucheIndex">
        <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
</template>

<script>
  export default {
    name: 'airIndex',
    created(){
    }
  }
</script>

<style scoped>
    #zucheIndex{height: 100%;}


</style>
