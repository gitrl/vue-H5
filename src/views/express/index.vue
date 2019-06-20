<template>
    <div id="expressIndex">
        <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
</template>

<script>
  export default {
    name: 'expressIndex',
    created(){
    }
  }
</script>

<style>
    #expressIndex{height: 100%;}

</style>
