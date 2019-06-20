<template>
    <div id="publiccarIndex">
        <router-view v-wechat-title='$route.meta.title'></router-view>
    </div>
</template>

<script>
  export default {
    name: 'publiccarIndex',
    created(){
    }
  }
</script>

<style>
    #publiccarIndex{height: 100%;background: #ffffff;}

    /*首页定位按钮*/
    #container .amap-geolocation-con{right: 0 !important; left: 85% !important; bottom: 12rem !important;}
    #container .amap-marker-label{border: none;background: none;color: #407FFD;font-size: 1.1rem;}

</style>
