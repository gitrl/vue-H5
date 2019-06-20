<template>
    <div id="invitateRule">
        <div class="bigBox">
            <div class="inviteCode">
                <header class="textPic TextC"><img src="../../../assets/images/passenger/invitationCode/txt_pic.png" alt=""></header>
                <section class="outsideBox">
                    <div class="codebigBox">
                        <div class="middleBox marginCenter">
                            <div class="lastBox marginCenter">
                                <div class="lastBoxText">请输入好友邀请码</div>
                                <input type="text" v-model="ivcode">
                                <div class="popover" v-show="isSuss" >绑定成功</div>
                            </div>
                        </div>
                    </div>
                    <div class="bindingBtn" @click="bindCode()"><img src="../../../assets/images/passenger/invitationCode/bindingbtn_icon.png" alt=""></div>
                    <div class="TextC skipBox" @click="closePage()"><span>没有邀请码，立即跳过 ></span></div>
                </section>
                <section class="bindActiviteRule">
                    <div class="bindActRuleCon">
                        <div class="hunguanImg"><img src="../../../assets/images/passenger/invitationCode/txt.png" alt=""></div>
                        <div class="bindActRuleText">
                            <p>1、未使用过牦牛出行的好友，可通过您分享的推荐链接领取牦牛出行优惠券（券有效期为7天）</p>
                            <p>2、您的好友在成功注册成为牦牛出行用户后，您便可以获得5元推荐奖励；
                                您的好友在领取本活动牦牛出行10元优惠券后7天内第一次体验牦牛出行网约车，并成功付款后，您可得到积分奖励。在活动期间，
                                您可获得好友每次打车总金额3%的高额积分奖励，并可将积分兑换成等额优惠券，奖金优渥，等你来拿！
                            </p>
                            <p>3、拥有相同设备（手机），账户，手机号，微信号，支付账号，银行卡号的用户将被视为同一用户（适用于您与您的好友），
                                本活动仅对成功推荐好友完成并支付首次牦牛出行网约车订单的用户发放推荐奖励。
                            </p>
                            <p>4、针对违规推荐奖励的行为，将不予发放推荐奖励，追回相关奖励或封停账号、并依法追究其法律责任。</p>
                            <div class="padB2">活动详情咨询 <span class="colorB">400-656-2666</span></div>
                        </div>
                    </div>
                </section>
                <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
            </div>
        </div>
    </div>
</template>

<script>
  import "@/assets/css/Module.css";
  import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件

  let qs = require('qs');
  export default {
    name: 'invitateRuleDriver',
    data:function () {
      return {
        ivcode:"",
        isShow:false,
        isSuss:false,
        TextMsg:"邀请码不能为空",
        BtnTextMsg:"确定"
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
      //绑定邀请码
      bindCode(){
        var url = this.getUrl(2);
        var param = this.GetRequest();
        var userId = param.userId;
        var _this = this;

        if(this.ivcode == ''){
          this.isShow = true;
        }
        else {
          this.$http.post(url+'updateinviter',
            qs.stringify({
              ivcode:this.ivcode,
              userId:userId
            })
          ).then((res) => {
            console.log(res.data);
            if(res.data.code == 200){
              this.isSuss = true;
              setTimeout(function () {
                _this.isSuss = true;
                _this.closePage();
              },2000)
            }
            else {
              this.isShow = true;
              this.TextMsg = res.data.msg;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }

      }
    }
  }
</script>

<style scoped>
    .inviteCode{background: url("../../../assets/images/passenger/invitationCode/binding_pic.png") no-repeat; background-size: 100% 100%;}
</style>
