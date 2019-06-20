<template>
    <div id="passengertoPass">
        <section class="passengerReg">
            <div class="passengerRegTOP"><router-link to="/invitateRule"><img src="../../../assets/images/passenger/invitationCode/daddd_pic.png" alt=""/></router-link></div>
            <div class="p_InviteCode">
                <div class="p_inviteHeng"></div>
                <div class="p_InviteCodeCon">
                    <div class="p_InviteCodeConTop">
                        <div class="p_InviteHeader">好友邀请码</div>
                        <div class="p_CodeCon">{{codeConData}}</div>
                    </div>
                    <div  class="textAlign downloaderweima">
                        <img class="downloadImg" src="../../../assets/images/passenger/invitationCode/cli_pic.png" alt=""/>
                        <div class="marT1 TextC FontS13">扫码下载牦牛出行</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import "../../../assets/css/Module.css";
    import Axios from 'axios';
    export default {
    name: 'passengertoPass',
    data:function(){
      return {
        codeConData:""
      }
    },
    methods:{
      codeCon(){
        var param = this.GetRequest();  //获取URL的参数
        var userType = param.userType;  //获取分享类型：司机（6）还是乘客（1）
        var urlA= "";
        var urlTo = "";


        //1就乘客，6是司机
        if(userType == 1 ){
          urlA = this.getUrl(2);  //获取请求接口
          urlTo = urlA +'select-byprimarykey?userId='+ param.userId;
        }
        if(userType == 6){
          urlA = this.getUrl(1); //获取请求接口
          urlTo = urlA +'select-byprimarykey?userId='+ param.userId;
        }
        Axios.get(urlTo).then((res) => {
          if(res.data.code == 200 && res.data != undefined){
            this.codeConData = "获取失败"
          }else {
            this.codeConData = res.data.data.ivcode;
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    created:function () {
      this.codeCon();
    }
    }
</script>

<style scoped>
#passengertoPass{display: -webkit-box;background: url("../../../assets/images/passenger/invitationCode/bitmap_pic.png") no-repeat; background-size: 100% 100%;display: flex;
    flex-direction: column;
    height: 100%;}
</style>
