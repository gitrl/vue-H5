<template>
  <div id="app">
    <router-view  v-wechat-title='$route.meta.title'></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
      this.baseRoot();  //同一套代码，根据url不同，链接不同的接口
      //从小程序里面传值H5页面
      let link = this.GetRequest();
      if(link.openId){
        localStorage.setItem('openId',link.openId);
      }
  }
}
</script>

<style>
  .weui-toast__content{text-align: center}
  .infinite-loading-container div:first-child{text-align: center}
  .dp-mask{z-index: 2;}

  .infinite-status-prompt{
    color: #666;
    font-size: 14px;
    text-align: center;
    padding: 10px 0;
  }
</style>
