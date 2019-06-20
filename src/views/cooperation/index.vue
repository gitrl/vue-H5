<template>
    <div id="cooperation">
        <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    #cooperation{
        height: 100%;
    }
</style>
