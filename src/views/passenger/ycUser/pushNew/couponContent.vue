<template>
<div id="pushNewTwo" >
    <div class="pushNewTwoImg"><img src="../../../../assets/images/passenger/pushNew/pushNewTwoImg1.png"> </div>
    <div class="pushNewTwoBg">
        <h3 class="pushNewTwoText1">优惠券已放入账号：{{this.Iphone}}</h3>
        <div class="pushNewTwo_coupon">
            <ul>
                <li>
                    <img src="../../../../assets/images/passenger/pushNew/pushNewTwo_yhq.png">
                    <div class="pushNewTwo_Text">
                        <h3>首单优惠券10元</h3>
                        <p><span></span>最高抵扣10元</p>
                        <p><span></span>有效期：7天内有效</p>
                    </div>
                </li>
                <li>
                    <img src="../../../../assets/images/passenger/pushNew/pushNewTwo_yhq.png">
                    <div class="pushNewTwo_Text">
                        <h3>10元优惠券 x 2张</h3>
                        <p><span></span>满60元可用</p>
                        <p><span></span>有效期：15天内有效</p>
                    </div>
                </li>
                <li>
                    <img src="../../../../assets/images/passenger/pushNew/pushNewTwo_yhq.png">
                    <div class="pushNewTwo_Text">
                        <h3>15元优惠券 x 2张</h3>
                        <p><span></span>满80元可用</p>
                        <p><span></span>有效期：15天内有效</p>
                    </div>
                </li>
            </ul>
            <div class="FontS14 TextC padT1 padB1"><router-link :to="{path:'invitateRule'}" class="colorY" style="text-decoration: underline">邀请好友享受更多超值优惠 ></router-link></div>
            <div class="pushBtn"> <router-link :to="{path:'CouponDownload'}">立即使用牦牛出行</router-link></div>
        </div>
    </div>
</div>
</template>
<script>
  export default {
    name: 'pushNewTwo',
    data:function () {
      return {
        Iphone:"",
      }
    },
    created:function () {
      //取从上一级传过来的电话号码
      this.Iphone = this.$route.query.mobileNumber;

    }
  }
</script>

<style scoped>
    #pushNewTwo{flex: 1;height: 100%;overflow: hidden}
    .pushNewTwoImg img{width: 100%}
    .pushNewTwoBg{background: url("../../../../assets/images/passenger/pushNew/pushNewTwoBg1.png") no-repeat;height: 69.7%;width: 100%;background-size: 100% 100%; margin-top: -1.3%;}
    .pushNewTwo_coupon{width: 85%;margin: 0 auto;padding-top: 0.5rem; }
    .pushNewTwo_coupon img{width: 100%;}
    .pushNewTwo_coupon ul li{position: relative; margin-top: 0.5rem;}
    .pushNewTwo_Text{position: absolute;top: 0;  padding:0.5rem; padding-left: 1.5rem;}
    .pushNewTwo_Text h3{font-size: 1.25rem;color: #333333;padding-bottom: 0.3rem; padding-top: 0.5rem;font-weight: bold}
    .pushNewTwo_Text p{color: #B9B9B9;line-height: 1.6rem;font-size: 1rem;}
    .pushNewTwo_Text p span{background: #B9B9B9;width: 4px;height: 4px;display: inline-block;border-radius:2px; margin-right: 0.5rem; vertical-align: middle;margin-top: -0.2rem;}
    .pushNewTwoText1{text-align: center;color: #ffffff;font-size: 1.2rem; padding-top: 1rem;}

    .pushBtn{width: 100%;background: #FFF339;border-radius: 2rem;height: 4rem;line-height: 4rem;text-align: center;font-size: 1.4rem;color: #E74242;margin-top:0.5rem;}
    .pushBtn a{color: #E74242;}

</style>
