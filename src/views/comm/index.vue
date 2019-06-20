<template>
    <div id="commIndex">
        <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
</template>

<script>
  export default {
    name: 'commIndex',
    created(){
    }
  }
</script>

<style scoped>
    #commIndex{height: 100%;}


</style>
