<template>
    <div id="DriverDownload">
        <div class="driverDownloadBox">
            <div class="downdriver_pic TextC flexC"><img src="../../../../assets/images/passenger/download/down_picLogo.png" alt=""></div>
            <div class="downDriverBtnBox flex">
                <a class="downLoadBtn flexC" @click="getLink(downUrlAData)"><img src="../../../../assets/images/passenger/download/android_icon.png"></a>
                <a class="downLoadBtn flexC"  @click="getLink(downUrlIosData)"><img src="../../../../assets/images/passenger/download/iphone_icon.png"></a>
            </div>
            <div class="yddownload_pic"  v-show="isShow"><img src="../../../../assets/images/passenger/download/yddownload_pic.png" alt=""></div>
        </div>
    </div>
</template>

<script>
  import "../../../../assets/css/Module.css";

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
        let paramsobj = {
            projectCode:projectCode,
            buildCode:0,
            device:device
        };
        this.$server.get(downloadUrl,paramsobj,null).then((res) => {
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
    #DriverDownload{height: 100%;}
</style>
