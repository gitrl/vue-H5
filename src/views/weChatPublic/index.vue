<template>
    <div id="airIndex">
        <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
</template>

<script>
  export default {
    name: 'weChatIndex'
  }
</script>

<style scoped>
    #airIndex{height: 100%;background: #ffffff;}
</style>
