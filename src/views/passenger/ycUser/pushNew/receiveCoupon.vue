<template>
<div id="pushNew" ><!--
    <div class="pushNewOne_img"><img src="../../../assets/images/pushNew/pushNewOne_img1.png"> </div>-->
    <div class="pushNewOne">
        <div class="pushIBox"><input class="pushInput" v-model="Iphone" placeholder="请输入手机号码"/><span v-show="show" @click="getCode(Iphone)">{{getCodeText}}</span><span v-show="!show" class="count">已发送({{count}})s</span>
        </div>
        <div class="pushIBox marT1"><input  class="pushInput" v-model="getCodeNum" placeholder="请输入验证码"/></div>
        <div class="pushBtn" :class="{ active: isActive }" @click="getLq()">领取礼包</div>
        <div class="popover" v-show="isSuss" >{{isText}}</div>
    </div>
    <!--子组件-->
    <div class="childBox">
        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
    </div>

</div>
</template>
<script>
  import "../../../../assets/css/Module.css";
  import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
  export default {
    name: 'pushNew',
    components:{
      ModelPop
    },
    data:function () {
      return {
        Iphone:"",
        getCodeText:"获取验证码",
        getCodeNum:"",  //填写的验证
        codeNum:"",  //如果取到的验证码
        show:true,
        count: '',
        timer: null,
        isActive:false,
        //模态框及pop组件
        isShow:false,
        TextMsg:"",
        BtnTextMsg:"确定",

        isSuss:false,
        isText:""

      }
    },
    methods: {
      //子组件向父组件传值
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.isShow = childValue;
      },
      //获取验证码
      getCode(value){
        //验证是否是手机号码
        if(value == ""){
          this.TextMsg = "请输入手机号码";
          this.isShow =! this.isShow;
        }else if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
          this.TextMsg = "手机号码不符合规范";
          this.isShow =! this.isShow;
        } else {
            let paramObj = {
                smsType: "RECMD_VALID",
                mobileNumber:value,
            };
            this.$server.get(this.baseURL+'butterfly-biz/app/v3.0/common/send-sms',paramObj,null).then(res =>{
                this.codeNum = res.data.code;
                //倒计时60s
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            });
        }
      },
      //点击领取优惠券
      getLq(){
        //验证是否是手机号码
        if(this.Iphone == ""){
          this.TextMsg = "请输入手机号码";
          this.isShow =! this.isShow;
        }else if (this.Iphone && (!(/^[1][34578]\d{9}$/).test(this.Iphone) || !(/^[1-9]\d*$/).test(this.Iphone) || this.Iphone.length !== 11)) {
          this.TextMsg = "手机号码不符合规范";
          this.isShow =! this.isShow;
        }else if(this.getCodeNum == ""){
          this.TextMsg = "验证码不能为空";
          this.isShow =! this.isShow;
        }else if(this.getCodeNum == this.codeNum){  //验证正确
          var _this = this;
          // 获取url参数
          var param =  this.GetRequest();
          //邀请码
          var recmdCode = param.inviteCode;
          //userid
          var recmdId = param.id;

            let paramObj = {
                code:this.getCodeNum,
                mobileNumber:this.Iphone,
                recmdCode:recmdCode,
                recmdId:recmdId
            };
            let headersObj = {'content-type': 'application/json'};
            // JSON.stringify(paramObj);
          this.$server.post(this.baseURL+'butterfly-biz/app/v3.0/common/base/recmd-bind',paramObj,headersObj).then((res) => {
              if(res.code == 200){
                  this.$vux.toast.show({  //提示
                      text: res.msg,
                      type:'text',
                      width:'80%'
                  });
                  setTimeout(function () {
                      _this.$vux.toast.hide();
                      _this.$router.push({path: '/passenger/couponContent',query:{mobileNumber:_this.Iphone}});
                  },1000)
              }else if(res.code == 10801){ //已经领取过优惠券
                  this.$vux.toast.show({  //提示
                      text: res.msg,
                      type:'text',
                      width:'80%'
                  });
                  setTimeout(function () {
                      _this.$vux.toast.hide();
                      _this.$router.push({path: '/passenger/couponContent',query:{mobileNumber:_this.Iphone}});
                  },1000)
              }else {
                  this.$vux.toast.show({  //提示
                      text: res.msg,
                      type:'text',
                      width:'80%'
                  });
              }
          })
        }else{ //输入的验证码不正确
          this.TextMsg = "请输入正确验证码";
          this.isShow =! this.isShow;
        }
      }
    },
    watch:{ // 实时检测输入的验证码是否正确,点击领取优惠券
      getCodeNum(){ //实时监听index的变化
        if(this.getCodeNum === this.codeNum){
          this.isActive = true;
        }else {
          this.isActive = false;
        }
      }
    }

  }
</script>

<style scoped>
    #pushNew{flex: 1;height: 100%;background: url("../../../../assets/images/passenger/pushNew/pushNewOneBg1.png") bottom no-repeat;width: 100%;background-size: 100% 100%;}
    .pushNewIput{width: 80%; padding-top:1rem; padding-bottom: 1rem; border: 1px solid #eeeeee;border-radius: 2rem; outline: none;padding-left: 1rem;}
    .pushNewOne{position: absolute;bottom: 4rem; width: 80%;left:10%;}
    .pushNewOne_img img{width: 100%}
    .pushIBox{background: #ffffff;width: 100%;height: 4rem;border-radius: 5px;}
    .pushInput{width: 60%; border-radius: 5px 0 0 5px;height: 4rem;line-height: 4rem;font-size: 1.3rem;outline: none;margin-left: 5%;}
    .pushBtn{width: 100%;background: #BDBDBD;border-radius: 2rem;height: 4rem;line-height: 4rem;text-align: center;font-size: 1.4rem;color: #ffffff;margin-top: 1.5rem;}
    .pushIBox span{color: #486AE7;font-size: 1.3rem;}

    .pushIBox span.count{color: #999999}

    .pushBtn.active{background: #FFF339;color: #E74242;}
</style>
