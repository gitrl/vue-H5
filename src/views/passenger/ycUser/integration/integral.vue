<template>
<div id="integral">
    <section>
        <div class="myIntegral">
            <div class="coin_bg"><img src="../../../../assets/images/passenger/integral/coin_bg.png" id="coin_bgImg"> </div>
            <div class="myIntegralInfo">
                <div class="myIntegralInfoPT" >当前积分</div>
                <div class="lineH2D5">{{currentPoints}}</div>
            </div>
        </div>
        <div class="exchangeInfo padT1">
            <div class="exchangeInfoOne" v-for="(item,index) in directredu" :key="index">
                <div class="coupon_bg"><img src="../../../../assets/images/passenger/integral/coupon_bg.png"> </div>
                <div class="exchangeMoney flexBox_IN">
                    <div class='couponvalue TextC'>{{item.duc | amount}}元</div>
                    <div class="validDays">有效期{{item.validDays}}天</div>
                </div>
                <div class="exchangeJifen ">
                    <div class="exchangeJifenOne">积分{{item.point}}</div>
                    <div class="exchangeJifenTwo" @click="exchangEquan(item.couponExchangeId)">兑换 > </div>
                </div>
            </div>
            <!--maskBox是防止点了过后，又继续点-->
            <!--<div v-show="isShow">
                <div class="maskBox"></div>
                <div class="popover">{{texCon}}</div>
            </div>-->

        </div>
    </section>
</div>
</template>

<script>
   let qs = require('qs');
  export default {
    name: 'integral',
    data:function(){
      return {
        currentPoints:"",
        directredu:[],
        isShow:false,
        texCon:""
      }
    },
    methods: {
      //获取当前积分
      integralM () {
        var param = this.GetRequest();
        var token = param.token;
        let headersObj = {'x-access-token': token};
        this.$server.get(this.baseURL+'butterfly-biz/app/v3.0/passenger/point/getUserPoint',null,headersObj).then(res =>{
            if(res.code == 200){
                this.currentPoints = res.data.point;
            }else {
                this.$vux.toast.show({
                    text:res.msg,
                    type: 'text',
                    width: '80%'
                })
            }
        });
      },

      //兑换积分
      exchangEquan (id) {
        var param = this.GetRequest();
        var token = param.token;
        var _this = this;

        var flag = false;

        if (!flag) {
            flag = true;
            let paramsObj = {
                couponExchangeId:id
            };
            let headersObj = {'x-access-token': token};
            this.$server.post(this.baseURL+'butterfly-biz/app/v3.0/passenger/coupon-point/exchange?couponExchangeId='+id,paramsObj,headersObj).then(res =>{
                flag = false;
                if (res.code == 10600) {
                    this.$vux.toast.show({  //提示
                        text: '您当前的积分不足',
                        type:'text',
                        width:'50%',
                    })
                    setTimeout(function () {
                        _this.$vux.toast.hide();
                    },1500)
                } else {
                  this.isShow = true;
                  this.texCon = "您已成功兑换积分";
                  setTimeout(function () {
                    _this.isShow = false;
                    _this.texCon = "";
                  },1500);
                  this.integralM();
                }
            })
        }

      }
    },
    created:function () {
      this.integralM();

      //获取积分列表
      var param = this.GetRequest();
      var token = param.token;
      let headersToken = {'x-access-token':token};
      this.$server.get(this.baseURL+'butterfly-biz/app/v3.0/system/coupon-point/query',null,headersToken).then(res =>{
          this.directredu = res.data['4'];
      })
    },
    filters: {
      amount: function (number) {
        return isNaN(number) ? 0.00 : parseFloat((number/100).toFixed(2));
      }
    }
  }
</script>

<style scoped>

    .myIntegral{position: relative;height: 100%;}
    .coin_bg img{width: 100%;}
    .myIntegralInfo{position: absolute;width: 25%;top: 0;height: 100%; font-size: 1.3rem;color: #ffffff;padding-left: 8%}
    .myIntegralInfoPT{padding-top: 30%}
    .exchangeInfo{width: 90%;margin: 0 auto; position: relative}

    /*积分兑换规则*/
    .exchangeInfoOne{float: left;height: 100%;width: 46%; position: relative;padding-left: 2%;padding-right: 2%;}
    .coupon_bg img{width: 100%;}

    .exchangeMoney{position: absolute; bottom: 50%;right: 20%}
    .flexBox_IN{display: flex; flex-direction: column; justify-content: center; align-items: center;}
    .exchangeInfoOne{/*width: 45%;*/ margin-bottom: 2rem;}
    .exchangeJifen{display: flex; justify-content: center; padding-left: 4%;padding-right: 4%}
    .exchangeJifenOne{width: 10rem; height: 2.5rem; line-height: 2.5rem; text-align: center; border: 1px dashed #74777E;}
    .exchangeJifenTwo{width: 5rem; height: 2.5rem; line-height: 2.5rem; text-align: center; border: 1px solid #74777E; margin-left: 0.5rem;}
    /*积分兑换规则*/
    .continued_bg img{width: 10rem; margin-top: 2rem;}
    .couponvalue{color: #FF8E30; font-size: 1.4rem; font-weight: bold;}
    .validDays{background-color: #F1F1F1; padding: 0.2rem 1rem; border-radius: 1rem;}
    .popover{position: absolute;z-index: 9;top: 1rem !important;background:rgba(0,0,0,0.7);font-size: 1rem;}
    .maskBox{position: fixed;z-index: 8;width: 100%;height: 100%;background: rgba(0,0,0,0); top: 0;left: 0;}
</style>
