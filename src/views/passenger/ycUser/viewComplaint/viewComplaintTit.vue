<template>
    <div id="viewComplaintTit">
        <div class="aboutTitle">客服</div>
        <ul class="viewComplaintT">
            <li><router-link :to="{path:'viewComplaintList',query:{token:token}}">查看投诉处理</router-link></li>
        </ul>
        <p class="pad1 FontS12 colorGray lineH2">如果您对订单有疑问或建议，可在订单管理中找到对应订单留言反馈。</p>
        <div class="callIconBox">
            <div class="kcall_icon TextC FontS13 pad1"  @click="callAndroid(NumIphone)"><span>拨打客服电话</span></div>
        </div>

    </div>
</template>

<script>

  export default {
    name: 'viewComplaintTit',
    data:function () {
      return {
        NumIphone:"4006562666",
        token:""
      }
    },created:function () {
      var param = this.GetRequest();
      this.token = param.token;
    }
  }
</script>

<style scoped>
    #viewComplaintTit{height: 100%;background-color: #fff;}
    .aboutTitle{padding:1rem ;font-weight: bold;font-size: 1.5rem}
    .viewComplaintT li{background:#ffffff url("../../../../assets/images/passenger/icon/toggleIcon1.jpg") 95% no-repeat; padding: 1rem;font-size: 1.3rem;padding-left: 1.5rem; }
    .viewComplaintT li a{cursor: pointer; display: inline-block;width: 100%;}

    .callIconBox{position: absolute;bottom: 2rem;left: 0; right: 0;width: 90%;margin: 0 auto;border-radius: 2rem; background: -webkit-linear-gradient(left,  #407FFD 50%,#44A0FE 100%);}
    .kcall_icon{color: #fff;}
    .kcall_icon span{cursor: pointer;}
    .kcall_icon img{vertical-align: middle;width: 2rem;height: 2rem;margin-right: 0.2rem; margin-top: -0.2rem;}
</style>
