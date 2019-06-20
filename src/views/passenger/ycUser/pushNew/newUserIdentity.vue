<template>
<div id="pushNewTwo" >
    <div class="pushNewTwoImg"><img src="../../../../assets/images/passenger/pushNew/pushNewTwoImg1.png"> </div>
    <div class="pushNewTwoBg">
        <h3 class="pushNewTwoText1">优惠券已放入账号：{{this.Iphone}}</h3>
        <div class="pushNewTwo_coupon">
            <ul class="pushNewTwo_couponList">
                <li><!--
                    <img src="../../../assets/images/pushNew/pushNewTwo_yhq.png">-->
                    <div class="pushNewTwo_Text">
                        <h3>首单优惠券10元</h3>
                        <p><span></span>最高抵扣10元</p>
                        <p><span></span>有效期：7天内有效</p>
                    </div>
                </li>
                <li>
                    <div class="pushNewTwo_Text">
                        <h3>10元优惠券 x 2张</h3>
                        <p><span></span>满60元可用</p>
                        <p><span></span>有效期：15天内有效</p>
                    </div>
                </li>
                <li>
                    <div class="pushNewTwo_Text">
                        <h3>15元优惠券 x 2张</h3>
                        <p><span></span>满80元可用</p>
                        <p><span></span>有效期：15天内有效</p>
                    </div>
                </li>
            </ul>
            <div class="selectBox clearfix padT1" style="position: relative">
                <h3 class="FontS12 TextC">请选择您的身份</h3>
                <ul class="">
                    <li :class="{active:tabIndex === index}" v-for="(item,index) in selectText" :key="index"  @click="tabIndexM(index)">
                        <label><span></span>{{item.name}}</label>
                    </li>
                </ul>
                <div class="popover" v-show="isSuss">{{isSussMsg}}</div>
            </div>
            <div class="pushBtn" @click="ChooseIdentity()">立即领取优惠券</div>


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
        selectText:[{name:'我是本地人',locals:1},{name:'我是旅行者',locals:0}],
        tabIndex:null,

        isSuss:false,
        isSussMsg:""
      }
    },
    methods: {
      tabIndexM(index){
        this.tabIndex = index;
      },
      //选择身份
      ChooseIdentity(){
            //locals: 1是本地,0是旅行
          var param =  this.GetRequest();
          var userId = param.userId;
          var _this = this;
          if(this.tabIndex == null){
            this.isSuss = true;
            this.isSussMsg = "请选择身份";
            setTimeout(function () {
              _this.isSuss = false;
              _this.isSussMsg = "";
            },1000)
          }else {
              let paramObj = {
                  userId:userId,
                  locals:this.selectText[ this.tabIndex ].locals
              };
              let url='userId='+userId+'&locals='+this.selectText[ this.tabIndex ].locals;
              this.$server.post(this.baseURL+"usercenter-passengers/v1.0/passengerinfo/updatepassenegerinformationForH5?"+url,paramObj,null).then((res) => {
                  if(res.code==200){
                      this.isSuss = true;
                      this.isSussMsg = "领取成功";
                      setTimeout(function () {
                          _this.isSuss = false;
                          _this.closePage();
                      },1000);
                  }else {
                      this.isSuss = true;
                      this.isSussMsg = res.msg;
                  }

              })
          }

      }
    },
    created:function () {
      // 获取url参数
      var param =  this.GetRequest();
      //获取带过来的电话
      this.Iphone = param.mobileNumber
    }
  }
</script>

<style scoped>
    .pushNewTwoImg img{width: 100%}
    .pushNewTwoBg{background: url("../../../../assets/images/passenger/pushNew/pushNewTwoBg1.png") bottom no-repeat; padding-bottom:3rem;  width: 100%; background-size: 100% 100%; margin-top: -1.3%;}
    .pushNewTwo_coupon{width: 85%;margin: 0 auto;padding-top: 0.5rem; }
    .pushNewTwo_coupon img{width: 100%;}
    .pushNewTwo_couponList li{background: url("../../../../assets/images/passenger/pushNew/pushNewTwo_yhq.png") no-repeat; width: 100%;height: 100%; background-size: 100% 100%; padding-top: 0.5rem; padding-bottom: 0.5rem;}
    .pushNewTwo_coupon ul li{position: relative; margin-top: 0.5rem;}
    .pushNewTwo_Text{ padding:0.5rem; padding-left: 1.5rem;}
    .pushNewTwo_Text h3{font-size: 1.2rem;color: #333333;padding-bottom: 0.2rem; padding-top: 0.2rem;font-weight: bold}
    .pushNewTwo_Text p{color: #B9B9B9;line-height: 1.5rem;font-size: 1rem;}
    .pushNewTwo_Text p span{background: #B9B9B9;width: 4px;height: 4px;display: inline-block;border-radius:2px; margin-right: 0.5rem; vertical-align: middle;margin-top: -0.2rem;}
    .pushNewTwoText1{text-align: center;color: #ffffff;font-size: 1.1rem; }

    .pushBtn{width: 100%;background: #FFF339;border-radius: 2rem;height: 4rem;line-height: 4rem;text-align: center;font-size: 1.4rem;color: #E74242;margin-top: 1rem;}
    .selectBox{color: #ffffff}
    .selectBox ul{width: 90%;margin: 0 auto;}
    .selectBox ul li{float: left;font-size: 1.1rem;width: 50%;text-align: center}
    .selectBox ul li.active span{background: url("../../../../assets/images/passenger/pushNew/select.png") no-repeat;width:1.5rem;height:1.5rem; background-size: 100% 100%;display: inline-block;vertical-align: middle;margin-right: 0.5rem;margin-top: -0.2rem;}
    .selectBox ul li span{background: url("../../../../assets/images/passenger/pushNew/unselect.png") no-repeat;width:1.5rem;height:1.5rem; background-size: 100% 100%;display: inline-block;vertical-align: middle;margin-right: 0.5rem;margin-top: -0.2rem;}

    .popover{position: absolute;z-index: 2;top: -2rem !important;font-size: 1.3rem;}
</style>
