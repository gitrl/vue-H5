<template>
    <div id="invitateCodeNew">
        <div class="invitateCodeNewBox">
            <div class="activityRule TextR padT1"><router-link to="invitateRuleDriverNew"><img src="../../../assets/images/passenger/invitationCode/New/rulesNew_icon.png"></router-link> </div>
            <p class="TextC titleNew_pic1 padT1"><img src="../../../assets/images/passenger/invitationCode/New/titleNew_pic1.png"></p>
            <div class="coinNew_bg">
                <p class="TextC couponNew_part"><img src="../../../assets/images/passenger/invitationCode/New/couponNew_part.png"></p>
                <p class="coinNew_Text"><span></span><i>您的专属邀请码 {{exclusiveCode}}</i><span></span></p>
                <p class="TextC" @click="shareDialog()"><img src="../../../assets/images/passenger/invitationCode/New/inviteNew_btn.png"> </p>
            </div>
            <div class="TextC secondNew_part"><img src="../../../assets/images/passenger/invitationCode/New/secondNew_part.png"></div>
            <div class="invitateCodeNum clearfix" v-show="isIvcode">
                <div class="yqmNew_bg"></div>
                <div class="invitateCodeBG" >
                    <input class="invitateCodeInput fl" v-model="ivcode" placeholder="输入好友邀请码"/>
                    <p class="okbtnNew_icon fl" @click="invitateCodeM()"></p>
                </div>
                <div class="popover" v-show="isSuss">绑定成功</div>
            </div>
        </div>
        <div class="InviteFriends clearfix">
            <h3 class="titleNew_pic"><img src="../../../assets/images/passenger/invitationCode/New/titleNew_pic.png"> </h3>
            <div class="InviteFriendsTit clearfix"><span class="fl firstChild">好友手机号</span><span class="fr lastChild">激活时间</span></div>
            <div class="scroll-wrap">
                <ul class="InviteFriendsList clearfix" id="con1"   ref="con1" :class="{anim:animate==true}">
                    <li v-for="(item,index) in InviteFriendsData" :key="index"><span class="fl">{{item.mobileNumber}}</span><span class="fr">{{item.inviteTime | formatDate}}</span></li>
                </ul>
                <p v-show="noData" class="TextC colorGray FontS12">暂无数据</p>
            </div>

        </div>
        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
    </div>
</template>

<script>

  import {formatDate} from '@/assets/js/date';  //时间过滤器
  import "@/assets/css/Module.css";
  import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
  let qs = require('qs');
  export default {
    name: 'invitateCodeNew',
    data:function () {
      return {
        ivcode:"",  //邀请码
        activeIndex: 0,
        interval:null,
        exclusiveCode:"",
        noData:false,
        shareData:{},
        isIvcode:true,
        InviteFriendsData:[],

        //组件pop
        isShow:false,
        isSuss:false,
        TextMsg:"",
        BtnTextMsg:"确定",
        //滚动动画
        animate:false,

      }
    },
    components:{
      ModelPop
    },
    methods:{
      //子组件向父组件传值
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.isShow = childValue;
      },
      //输入验证码
      invitateCodeM(){
        var param = this.GetRequest();
        var userId = param.userId;
        var _this = this;
        let reg = /^[A-Za-z0-9]+$/;

        if(this.ivcode == ''){
          this.isShow = true;
          this.TextMsg = '邀请码不能为空';
        }else if(!reg.test(this.ivcode)){
            this.isShow = true;
            this.TextMsg = '邀请码不存在或未激活';
        }else {
          let paramObj ={
              ivcode:this.ivcode,
              userId:userId
          };
          this.$server.post(this.baseURL+"usercenter-passengers/v2.0/passport/updateinviter?ivcode="+this.ivcode+'&userId='+userId,paramObj,null).then(res=>{

              if(res.code == 200){
                  this.isSuss = true;
                  setTimeout(function () {
                      _this.isSuss = false;
                      _this.closePage();
                  },2000)
              } else {
                  this.isShow = true;
                  this.TextMsg = res.msg;
              }
          })
        }
      },

      //邀请记录
      InviteFriendsCode(showCode){
        var param = this.GetRequest();
        var token = param.token;
        let paramsObj = {userType:1};
        let headersObj = {'x-access-token': token};

        this.$server.get(this.baseURL+"butterfly-biz/app/v3.0/reward/get-detail",paramsObj,headersObj).then(res =>{
        if( res.data.length > 0 &&  res.data.length != 'undefined'){
              this.InviteFriendsData = res.data;
              showCode( this.InviteFriendsData )

        }else {

              this.noData = true;
          }
        });
      },

      //进入页面判断状态是否显示输入邀请码输入框
      startM(){
        var param = this.GetRequest();
        var userId = param.userId;
        let paramsObj = {
          userId:userId,
        };
        this.$server.get(this.baseURL+"usercenter-passengers/v1.0/passport/check-invite-status",paramsObj,null).then(res =>{
          if(res.data.showInvite=="1"){
              this.isIvcode = true;
          }else {
              this.isIvcode = false;
          }
        });
      },

      //获取专属邀请码
      ExclusiveCode(){
        var param = this.GetRequest();
        //var userType = param.userType;
        var userId = param.userId;
          let paramsObj = {
              userId:userId,
          };
          this.$server.get(this.baseURL+"usercenter-passengers/v1.0/passport/select-byprimarykey",paramsObj,null).then(res =>{

              if(res.code == 200 && res.data != undefined){
                  this.exclusiveCode = res.data.ivcode;
              }else {
                  this.exclusiveCode = "获取失败";
              }
          })
      },
      //分享
      shareD(showShare){
        var param = this.GetRequest();
        var token = param.token;
          let paramsObj = {shareType:"INVITE_PASER"};
          let headersObj = {'x-access-token': token};
          this.$server.get(this.baseURL+"butterfly-biz/app/v3.0/share/share",paramsObj,headersObj).then(res =>{
              this.shareData = res.data;
              showShare(this.shareData);
          })
      },
      //分享
      shareDialog(){
        var _this = this;
        this.shareD(function (data) {
          if(data.dialogTitle){
            //区分系统
             if(_this.Device.getMobileOperatingSystem()=='Android'){
               window.just_android.share(JSON.stringify(data));
             }else {
               // ios
               window.webkit.messageHandlers.share.postMessage(JSON.stringify(data));
             }
          }
        });
      },
      //滚动
      scroll(){
        let con1 = this.$refs.con1;
          if(con1 != undefined){
              con1.style.marginTop='-30px';
              this.animate=!this.animate;
              var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
              setTimeout(function(){
                  that.InviteFriendsData.push(that.InviteFriendsData[0]);
                  that.InviteFriendsData.shift();
                  con1.style.marginTop='0px';
                  that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
              },500)
          }

      }
  },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
      watch:{
          ivcode(val){
              if(val == ''){
                  this.TextMsg = '邀请码不能为空';
              }

          }
      },
    created:function () {
      var _this = this;
      this.InviteFriendsCode(function () {
        setTimeout(function () {
          if(_this.InviteFriendsData.length > 3){
            setInterval(_this.scroll,1000);  //延迟一秒加载
          }
        },100)
      });
      this.ExclusiveCode();
      this.startM();
    }
  }
</script>

<style scoped>
    #invitateCodeNew{overflow-x: hidden;padding-bottom: 3rem;-webkit-overflow-scrolling: touch;}
    .invitateCodeNewBox{background: url("../../../assets/images/passenger/invitationCode/New/bgNew_pic.png") top no-repeat;width: 100%; flex: 1; height: 100%; padding-bottom: 5rem; background-size: 100% 100%; }

    .coinNew_bg{background: url("../../../assets/images/passenger/invitationCode/New/coinNew_bg.png") no-repeat;width: 90%; height: 100%; background-size: 100% 100%; margin: 0 auto; padding: 5%;padding-top: 3rem; padding-bottom: 1rem }
    .titleNew_pic1 img{width: 100%}
    .activityRule img{width: 7rem}
    .titleNew_pic1 img{width: 90%}
    .coinNew_bg img{width: 90%}
    .secondNew_part img{width: 95%}
    .coinNew_Text{text-align: center;color: #B67638;font-size: 1.3rem; line-height: 3rem; padding-top: 1rem;padding-bottom:0.5rem;}
    .coinNew_Text i{padding-left: 0.5rem;padding-right: 0.5rem;}
    .coinNew_Text span{width: 3rem;background: #B67638;height: 1px; display: inline-block;vertical-align: middle}

    .invitateCodeNum{text-align: center;width: 90%;margin: 0 auto; position: relative}
    .yqmNew_bg{width:80%; height:5.4rem; overflow: hidden;  margin-left: -1rem;background: url("../../../assets/images/passenger/invitationCode/New/yqmNew_bg.png") no-repeat;background-size: 100% 100%;}
    .yqmNew_bg img{width: 100%;}
    .okbtnNew_icon{width: 34%;margin-left: -1rem; background: url("../../../assets/images/passenger/invitationCode/New/okbtnNew_icon.png") no-repeat;background-size: 100% 100%; height:5.4rem; margin-top:-0.4rem;}
    .okbtnNew_icon img{width: 100%;margin-top: -3%;}
    .invitateCodeInput{width: 63%;background: #ffffff; height: 3.7rem; padding-left: 20px;outline: none;font-size: 1.3rem}
    .invitateCodeBG{position: absolute;top: 0.4rem; left: 1rem;width: 100%}

    .titleNew_pic{width: 60%;margin: 0 auto;}
    .titleNew_pic img{width: 100%;margin-top: -2rem}
    .InviteFriends{border-radius: 5px;border: 5px solid #ffae2f;width: 90%;margin: 0 auto; padding-bottom: 1rem;margin-top:3rem;}
    .InviteFriendsList{width: 90%;margin: 0 auto;padding-top:0.5rem;}
    .InviteFriendsList li{width: 100%;clear: both;font-size: 1.1rem;color: #A69F98;line-height: 2.5rem}
    .InviteFriendsTit{font-size: 1.2rem;color: #AE6A29;line-height: 3rem;border-bottom: 1px solid #BFBFBF;width: 80%;margin: 0 auto;padding-top: 1rem;padding-bottom: 0.2rem;}
    .InviteFriendsTit span.firstChild{width: 40%;display: inline-block;text-align: center;}
    .InviteFriendsTit span.lastChild{width: 55%;display: inline-block;text-align: center;}
    .InviteFriendsList li span:first-child{width: 35%;display: inline-block;text-align: left; padding-left: 5%;}
    .InviteFriendsList li span:last-child{width: 60%;display: inline-block;text-align: center;}
    /*邀请记录滚动*/
    .scroll-wrap{
        width: 100%;
        height: 10rem;
        overflow: hidden;
        margin-top:1rem;
        line-height: 30px;
        transition: all 0.5s;

    }
    .anim{
        transition: all 0.5s;
    }
</style>
