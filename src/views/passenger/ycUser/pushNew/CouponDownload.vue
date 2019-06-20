<template>
<div id="pushNewThree" >
    <div class="pushNewDLogo"><img src="../../../../assets/images/passenger/pushNew/pushNewDLogo.png"> </div>
    <div class="pushNewDown">
        <p><a class="pushBtn"  @click="getLink(downUrlAData)"><img src="../../../../assets/images/passenger/pushNew/pushNewAndroid.png">Android下载</a></p>
        <p><a class="pushBtn"  @click="getLink(downUrlIosData)"><img src="../../../../assets/images/passenger/pushNew/pushNewIos.png">iPhone下载</a></p>
    </div>
    <div class="yddownload_pic" v-show="isShow"><img src="../../../../assets/images/passenger/download/yddownload_pic.png" alt=""></div>
</div>
</template>
<script>
  export default {
    name: 'DriverDownload',
    data:function(){
      return {
        isShow:false,
        downUrlAData:"",
        downUrlIosData:"",
      }
    },
    methods:{
      //downUrlA
      //1、1是安卓  2、3是ios
      downUrl(device,projectCode){
        var downloadUrl = this.getUrl("down");
        console.log(downloadUrl);
          let paramsobj = {
              projectCode:projectCode,
              buildCode:0,
              device:device
          };
        this.$server.get(downloadUrl,paramsobj).then((res) => {
          console.log(res);
          if(device===1&&projectCode ===1){
            this.downUrlAData = res.data.downloadUrl;
          }else if(device===2&&projectCode ===2){
            this.downUrlIosData = res.data.downloadUrl;
          }
        })
      },
    },
    created:function () {
      this.downUrl(1,1);
      this.downUrl(2,2);
      this.weChatBrowser(); //判断是否是微信浏览器
    }
  }
</script>

<style scoped>
    #pushNewThree{background: url("../../../../assets/images/passenger/pushNew/pushNewDownBg.png") no-repeat;flex: 1;height: 100%;width: 100%;background-size: 100% 100%;}
    .pushNewDLogo{width:32.7%;margin: 0 auto; padding-top: 13rem;}
    .pushNewDLogo img{width: 100%;}
    .pushNewDown{width: 80%;margin: 0 auto; padding-top: 2rem;}
    .pushBtn{width: 100%;background: #FFF339;border-radius: 2.5rem;height: 4.5rem;line-height: 4.5rem;text-align: center;font-size: 1.5rem;color: #E74242;margin-top: 1.5rem; display: inline-block;}
    .pushBtn img{width: 2.5rem; vertical-align: middle;margin-right: 0.5rem; margin-top: -0.3rem;}
    .yddownload_pic{position: absolute;z-index: 2;top: 0; padding-right: 2rem;}
    .yddownload_pic{background: rgba(0,0,0,0.6);height: 100%;text-align: right;}
    .yddownload_pic img{width:75%;;margin-top: 1rem;}
</style>
