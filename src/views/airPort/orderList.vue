<template>
    <div class="orderList" style="height: 100%">
        <div class="local_scroll flex" style="flex-direction: column" >
            <div class="orderListTabBg orderListTab" v-if="isOrderListTab">
                <ul>
                    <li class="active"  @click="getLink(webviewUrl+'caruser/airport/orderList?token='+token)"><span>接送</span></li>
                    <li @click="getLink(webviewUrl+'caruser/zuche/orderList?token='+token)" ><span>租车</span></li>
                    <li @click="getLink(webviewUrl+'caruser/express/orderList?token='+token)"><span>直通车</span></li>
                </ul>
            </div>
            <div class="padL1 padR1 padT1" style="display: flex; flex-direction: column;height: 100%;"><!-- style="display: flex; flex-direction: column;height: 100%;"-->
                <div class="orderNav">
                    <ul>
                        <li @click="checkOrderNav(index)"  :class="{active:isOrderIndex == index}" v-for="(item,index) in orderNav" :key="index">{{item}}</li>
                    </ul>
                </div>
                <div class="orderInfoList" style="flex: 1;overflow-y: scroll" id="orderInfoList"><!--style="flex: 1;overflow-y   : scroll"-->
                    <ul>
                        <li v-for="(item,index) in orderData" :key="index"  >
                            <div class="orderInfoContent" @click="noPay(item.orderId,item.orderStatus)" :class="{orderBd1:item.orderStatus == 1,orderBd3:item.checkStatus == 1 && item.orderStatus != 1,orderBd4:item.checkStatus == 2 || item.orderStatus == 5}">
                                <!--未支付-->
                                <div class="orderInfoTitle orderBd2 padT1 padB1"  >
                                    <p class="airplanT1">
                                        <img src="../../assets/images/airPort/icon/airplan_icon.png" v-if="item.orderType == 1 || item.orderType == 2">
                                        <img src="../../assets/images/airPort/icon/btrain_icon.png" v-else>
                                        <span>{{item.orderType == 1?'接机':''}}{{item.orderType == 2?'送机':''}}{{item.orderType == 3?'接站':''}}{{item.orderType == 4?'送站':''}}<i v-if="item.useType==1">(拼车)</i><i v-else>(包车)</i></span>
                                    </p>
                                    <div>
                                        <p class="airplanT2 orderColor1" v-if="item.orderStatus == 1"> {{countDownList[index]}}<span class="orderStatusBg1">待支付</span></p>
                                        <p class="airplanT2 orderColor2 " v-else-if="item.checkStatus == 1 && item.orderStatus == 2"><span class="orderStatusBg2">待核销</span></p>
                                        <p class="airplanT2 orderColor3 " v-else>
                                            <span class="orderStatusBg3" v-if="item.checkStatus == 2 && item.orderStatus == 2">已核销</span>
                                            <span class="orderStatusBg3" v-if="item.orderStatus == 3">已完成</span>
                                            <span class="orderStatusBg3" v-if="item.orderStatus == 4">退款中</span>
                                            <span class="orderStatusBg3"  v-if="item.orderStatus == 5">已取消</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="finish_pic"  v-if="item.checkStatus == 2 && item.orderStatus == 2"><img src="../../assets/images/airPort/finish_pic.png" class="finish"> </div>
                                <div style="position: relative">
                                    <div class="plane_pic" v-if="item.checkStatus != 2"><img src="../../assets/images/airPort/plane_pic.png" > </div>
                                    <div style="z-index: 2;position: relative">
                                        <div class="orderBd2 orderInfoBox">
                                            <p>{{item.startAddress}} - {{item.endAddress}}</p>
                                            <div v-if="item.orderDrivers.length <= 0">
                                                <p>司机：未派车</p>
                                                <p>车辆：<span v-if="item.useType==2">{{item.goodsName}}</span><span v-else>未派车</span></p>
                                            </div>
                                            <div v-else>
                                                <p>司机：{{item.orderDrivers[0].driverName}} {{item.orderDrivers[0].driverNumber}}</p>
                                                <p>车辆：{{item.orderDrivers[0].plateNumber}}<span v-if="item.useType==2">.{{item.goodsName}}</span></p>
                                            </div>
                                        </div>
                                        <div class="ordercontact" :class="{orderBd2: item.checkStatus == 1 && item.orderStatus == 2}">
                                            <div class="ordercontactInfo">
                                                <p>联系人：{{item.contacts}} {{item.contactNumber}}</p>
                                                <p>预计上车时间：{{Number(item.willStartTime) | formatDate}}</p>
                                                <p class="text1">航班号：{{item.shiftNumber}}</p>
                                            </div>
                                            <div class="ordercontactPrice padL1 padR1">
                                                <p v-if="item.useType==1">{{item.passengerNumber}}人</p>
                                                <p>¥{{numDiv(item.totalPrice,100)}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="orderListEwm flex" @click="createQrc(item.qrCode)" v-if="item.checkStatus == 1 && item.orderStatus == 2 && item.qrCode != ''">我的二维码<span class="flexC TextR"><img src="../../assets/images/airPort/erweima_icon.png"> </span></div>
                                <div class="cancelOrder" @click="cancelOrder(item.orderId)" v-if="item.checkStatus == 1 && item.orderStatus == 2">取消订单</div>
                            </div>
                        </li>
                        <div id="loadMore" class="padT1" v-if="loadMore">
                            <infinite-loading   @infinite="onInfinite"  ref="infiniteLoading" >
                                <span slot="no-more">
                                 没有更多数据
                                </span>
                            </infinite-loading>
                        </div>
                        <div class="complaintListNullAir" v-if="noData">
                            <img src="../../assets/images/airPort/dataNull.png" alt="" style="width: 14rem;">
                            <div class="TextC">{{listMsg}}</div>
                        </div>
                    </ul>
                </div>
            </div>
    </div>

        <div class="isCancelOrder" v-if="isCancel">
            <div class="isCancel TextC">{{cancelMsg}}，是否取消当前订单？</div>
            <div class="toCancel cancelYN" @click="toCancel">是</div>
            <div class="noCancel cancelYN " @click="noCancel">否</div>
        </div>
        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
        <!--刷新 S-->
        <div class="refresh" @click="refresh()"><img src="../../assets/images/airPort/icon/refresh_icon.png">刷新</div>
        <!--刷新 E-->
        <!--登录 S-->
        <isLogin :isLogin="isLogin"></isLogin>
        <!--登录 E-->
        <!--查看二维码 S-->
        <div class="dp-mask" @click="dpmask()" :class="{current:isCancel || isTicket}"></div>
        <div class="ticketBox" v-show="isTicket">
            <div class="ticketBg">
                <div class="bgcolorW ticketEwm">
                    <canvas id="qrccode-canvas"></canvas>
                    <p class="orderColor4 FontS14 TextC">{{ticketYpm}}</p>
                </div>
                <div class="ticketBtn" @click="dpmask()">确认</div>
            </div>
        </div>
        <!--查看二维码 E-->
</div>
</template>

<script>
    var QRCode = require('qrcode');
    var canvas = '';
  import {formatDate} from '../../assets/js/date';  //时间过滤器
  import InfiniteLoading from 'vue-infinite-loading';
  import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
  import isLogin from  '@/views/comm/loginGuide.vue';  //登录组件
  import {Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Confirm, Alert, AlertModule} from 'vux'
  export default {
    name: 'orderList',
    components: {
      //上拉刷新下拉加载
      InfiniteLoading,
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      Confirm,
      Alert,
      isLogin,
      ModelPop
    },
    data:function () {
      return {
        isOrderIndex: 0,
        orderNav: ['全部','待付款','已付款'],
        token:'',
        orderData:[],
        willStartTime:[], //预计用车时间
        totalPrice:[],  //总价数组
        countDownList:[],  //倒计时

        canelPopIsSHow: false,
        isShow:false,
        BtnTextMsg:"确定",

        TextMsg:"",
        //与列表订单相关
        num: 10, // 一页显示多少条
        total:"", //总条数,
        page:1,  //默认页码
        list: [],
        infiniteId: +new Date(),
        noData:false,
        isA:false,

        flag:true,
        noPayLink:'javascript:;',
        //login组件
        isLogin:false,
        isCancel:false,
        cancelMsg:'',
          orderId:'',
          isOrderListTab:false,

          ticketYpm:'',
          isTicket:false,

          loadMore:true,
          listMsg:''
      }
    },
    mounted() {
      let _this = this
      _this.countDown(_this.orderData);
      setInterval(function () {
        for(var i=0;i<_this.countDownList.length; i++){
          _this.$set(_this.countDownList,i,_this.countDownList[i]);
        }
      },1000);

        this.$nextTick(function () {
            // DOM操作
            canvas = document.getElementById('qrccode-canvas')
        });
    },
    methods:{
        //子组件向父组件传值
        childByValue: function (childValue) {
            // childValue就是子组件传过来的值
            this.isShow = childValue;
        },
      orderList($state){  //订单列表
          var _this = this;
          this.$vux.loading.show();
          let headersObj = {'content-type': 'application/json','x-access-token':this.token};  //'AF1C337FA23C02808C3F1ECAF16C7BC1'
          let parmasObj = {
            "orderStatus": this.isOrderIndex,
            "pageNumber": this.page,
            "pageSize": this.num
          }
          this.$server.post(this.AirROOT + "app/v1.0/order/list",parmasObj,headersObj).then(res =>{
              _this.$vux.loading.hide();
            if(res.code == 200){
              console.log(res.data.orderList);
              this.isLogin = false;
              setTimeout(() => {
                _this.$vux.loading.hide();
                if(res.data.total == 0){
                  this.noData = true;
                  this.listMsg = '暂无数据';
                }
                if (res.data.orderList.length>0) {
                  _this.noData = false;
                  _this.page += 1;
                  _this.orderData.push(...res.data.orderList);
                  //_this.orderData.splice(res.data.orderList.length/2,res.data.orderList.length);

                  _this.total = res.data.total;

                  $state.loaded();
                  for(let i in res.data.orderList){
                  //  _this.totalPrice.push(_this.numDiv(res.data.orderList[i].totalPrice,100));

                  /*  if(res.data.orderList[i].orderStatus == 1 || res.data.orderList[i].orderStatus == 4 || res.data.orderList[i].orderStatus == 5){
                      //订单状态为1,4,5
                      res.data.orderList[i].orderDrivers.driverName ='未安排';
                      res.data.orderList[i].orderDrivers.plateNumber ='未安排';
                    }else if (res.data.orderList[i].orderStatus ==2 && res.data.orderList[i].orderDrivers.length == 0){
                      //订单状态为2并且orderDrivers.length为0
                      res.data.orderList[i].orderDrivers.driverName ='安排中……';
                      res.data.orderList[i].orderDrivers.plateNumber ='安排中……';
                    }else {
                      //订单状态为2、3，orderDrivers.length不为空时
                      res.data.orderList[i].orderDrivers.driverName =  res.data.orderList[i].orderDrivers[0].driverName;
                      res.data.orderList[i].orderDrivers.plateNumber = res.data.orderList[i].orderDrivers[0].plateNumber;
                    }*/
                  }
                  if (_this.orderData.length === res.data.total) {
                    $state.complete();
                  }
                } else {
                  _this.clearCountDown();  //先清除定时器
                  $state.complete();
                }
              },500)
            }else if(res.code == 10000){  //登录失效
                 _this.loadMore = false;
              _this.$vux.toast.show({ //提示
                text: res.msg,
                type:'text',
                width:'80%',
              })
              setTimeout(function () {
                _this.$vux.toast.hide();
                _this.isLogin = true;
              },2000)
            }else {
                _this.$vux.loading.hide();
                _this.loadMore = false;
                _this.noData = true;
                _this.listMsg = res.msg;
            }

          })
        },
      onInfinite($state){  //判断滚动加载的方法
          //flag表示是否是第一次加载
        if(this.flag){
          //初始化加载
          this.orderList($state);
          this.flag = false;
        }else {
          //滚动加载时，页码this.page都会大于1
          if(this.page>1){
            this.orderList($state);
          }
        }
      },
        //取消订单
        cancelOrder(orderId){
             // console.log(orderId)
            this.orderId = orderId;
            let headersObj = {'content-type': 'application/json','x-access-token':this.token};  //'AF1C337FA23C02808C3F1ECAF16C7BC1'
            let parmasObj = {
                "orderId":orderId
            }
            this.$server.get(this.AirROOT + '/app/v1.0/order/cancel/check',parmasObj,headersObj).then(res => {
                if (res.code == 200) {
                    this.isCancel=true;
                    this.cancelMsg=res.msg
                }
                else {
                    this.isShow = true;
                    this.TextMsg = res.msg;
                }
            })
        },
        //是
        toCancel(){
            let headersObj = {'content-type': 'application/json','x-access-token':this.token};  //'AF1C337FA23C02808C3F1ECAF16C7BC1'
            let parmasObj = {
                "orderId":this.orderId
            }
            this.$server.post(this.AirROOT + 'app/v1.0/order/cancel',parmasObj,headersObj).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.isCancel=false;
                    for(let i in this.orderData){
                        if (this.orderData[i].orderId == this.orderId){
                            console.log(this.orderData[i])
                            this.orderData[i].orderStatus = 4;
                        }
                    }
                }
            })
        },
        noCancel(){
            this.isCancel=false;
        },
      //订单状态切换
      checkOrderNav(index){
        let _this = this;
        _this.flag = true;
        setTimeout(function () {
          _this.isOrderIndex = index;
          _this.orderData = [];
          _this.page = 1;
           _this.clearCountDown();  //先清除定时器
          _this.countDown(_this.orderData);  //再开启定时器
          _this.noData = false;
          _this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        },100)
      },

      //未支付
      noPay(orderId,orderStatus){
        let _this = this;
        let orderid = orderId;
        let headersObj = {'content-type': 'application/x-www-form-urlencoded','x-access-token':this.token};  //'AF1C337FA23C02808C3F1ECAF16C7BC1'
        let parmasObj = {
          "orderId": orderid,
        }
        if(orderStatus == '1'){
          this.$server.get(this.AirROOT + 'app/v1.0/order/pay/check',parmasObj,headersObj).then(res =>{
            if(res.code==200){
              let uri= 'orderId='+orderId+'&token='+this.token;
                if(_this.$local != undefined){
                    if(_this.$local.env =='weixin'){  //判断是否在小程序环境里
                        // javascript
                        wx.miniProgram.navigateTo({url: '/pages/airplan/payOrder/payOrder?'+uri});
                    }else {
                        window.location.href = 'justuser://www.maoniuchuxing.com/web/openUrl?url='+_this.webviewUrl+'caruser/airport/confirmPay?'+encodeURIComponent(uri);
                    }
                }else {
                    window.location.href = 'justuser://www.maoniuchuxing.com/web/openUrl?url='+_this.webviewUrl+'caruser/airport/confirmPay?'+encodeURIComponent(uri);
                }
            }else {
              this.$vux.toast.show({ //提示
                text: res.msg,
                type:'text',
                width:'80%',
              });
              setTimeout(function () {
                _this.$vux.toast.hide();
                location.reload();  //刷新当前页面
              },2000)
            }
          })
        }
      },

      //30分钟倒计时
      countDown:function (orderArry){
        var that = this;
        that.thisItv = setInterval(function () {
          //1800=30*60 当前时间减去系统时间除以1000 就是指用掉的时间是多少秒
          for (let index in orderArry) {
            //如果为待支付订单
            if (orderArry[index].orderStatus == 1) {
              let startTime = Math.floor(1750 - ((new Date().getTime() - orderArry[index].createTime) / 1000));
              //that.countDownList = [];
              if (startTime <= 0) {
                that.countDownList[index] = '';
                that.orderData[index].orderStatus = 5;
                return;
              }
              let mm = Math.floor(startTime / 60);
              let ss = Math.floor(startTime % 60);
              if (mm < 10) {
                mm = '0' + mm;
              }
              if (ss < 10) {
                ss = '0' + ss;
              }
              if (startTime > 0) {

                let countDown = "00:" + mm + ":" + ss;
                that.countDownList[index] = (countDown);
                startTime--;
              }
            }
            //其他类型订单不需要倒计时
            else {
              that.countDownList[index] = '';
            }
          }
        }, 995)
      },
      // 清楚定时器
      clearCountDown:function(){
        // 清理定时器thisIv
        clearInterval(this.thisItv);
      },
        dpmask() {
            this.isTicket = false;
            this.isCancel = false;
        },

        //二维码生成
        createQrc: function (checkNo) {
            this.isTicket = true;
            this.ticketYpm = checkNo;
            QRCode.toCanvas(canvas, checkNo, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('success')
                }
            });

        },
        refresh(){ //刷新
            location.reload();  //刷新当前页面
        },
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    created:function () {
        var _this = this;

        //判断是否在小程序环境里
        if(_this.$local != undefined){
            if(_this.$local.env =='weixin'){  //判断是否在小程序环境里
                // javascript
                _this.isOrderListTab = true;
            }
        }

      //判断是否登录
      var param = this.GetRequest();
      if(param.token){
        this.token  = param.token;
        if(!sessionStorage.getItem("token")) {return}
        if(param.token != sessionStorage.getItem("token")){
          this.token = sessionStorage.getItem("token");
        }
      }
    },
  }
</script>

<style scoped>

    .orderList{padding-bottom: 5rem; }
    .orderNav{background: linear-gradient(to right,#407FFD, #44A0FE);border-radius: 0.5rem;height: 4rem; }
    .orderNav ul{display: flex;  display: -webkit-box;display: -webkit-flex; padding: 0.5rem;}
    .orderNav ul li{-webkit-box-flex: 1;-webkit-flex: 1;flex: 1;font-size: 1.25rem;color: #ffffff;text-align: center;line-height: 3rem;}
    .orderNav ul li.active{background: #ffffff;color: #407FFD;border-radius: 0.5rem;}
    .orderInfoList{padding-bottom: 3rem;}
    .orderInfoList ul { position: relative;background: #ffffff;padding-right: 0.3rem;}
    .orderInfoList ul li{box-shadow: 0 0 15px rgba(64,85,112,.15);border-radius:0.2rem;margin-top:1rem;}
    .orderInfoContent{font-size: 1.2rem; line-height: 2rem; position: relative;}
    .orderBd2{border-bottom: 1px dashed #e6e6e6}
    .orderBd1{border-left: 2px solid #407FFD; border-radius: 0.2rem 0 0 0.2rem;}
    .orderBd3{border-left: 2px solid #FEBE00; border-radius: 0.2rem 0 0 0.2rem;}
    .orderBd4{border-left: 2px solid #E6E6E6; border-radius: 0.2rem 0 0 0.2rem;}

    .orderInfoTitle{display: flex; justify-content: center;align-items: center}
    .orderInfoTitle{padding-left: 1rem;padding-right: 1rem;}
    .airplanT1{flex: 1;font-size: 1.25rem;color: #666666}
    .airplanT1 img{width: 1.6rem;vertical-align: middle;margin-right: 0.1rem; margin-top: -0.2rem;}
    .airplanT2{font-size: 1.2rem;}
    .orderColor1{color: #407FFD;}
    .orderColor2{color: #44A0FE;}
    .orderColor3{color: #AAAAAA;}
    .orderInfoBox{color: #666666;padding: 0.5rem 1rem 0.5rem 1rem;position: relative}

    .ordercontact{display: flex;color: #9B9B9B; justify-content: center;align-items: center;}
    .ordercontactInfo{flex: 1;padding: 0.8rem 1rem 1rem 1rem;background: url("../../assets/images/airPort/ticketLine.png") right no-repeat;background-size: auto 100%;}
    .ordercontactPrice p{text-align: center}
   .text1{font-size: 1rem;}
    .finish_pic{position: absolute;z-index: 0;right: 1rem; bottom:1rem;width: 100%;text-align: right;}
    .finish_pic img{width: 60%;}
    .plane_pic{position: absolute;z-index: 0;right: 0.5rem; bottom:2rem;width: 100%;text-align: right;}
    .plane_pic img{width: 30%;}


    .flexDiv{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .cancelOrder{
        padding-top: 1.5rem;
        padding-bottom: 1rem;
        background-color: #f5f5f5;
        color: #666666;
        text-align: center;
        font-size: 1.3rem;
    }
    .isCancelOrder{
        padding: 1rem 2rem;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 4;
        background-color: #fff;
        /*line-height: 5rem;*/
        box-sizing: border-box;
    }
    .isCancelOrder div{
        margin-bottom: 2rem;
    }
    .cancelYN{
        text-align: center;
        height: 4rem;
        line-height: 4rem;
        border-radius: 2rem;
    }
    .toCancel{
        background: -webkit-linear-gradient(left, #407FFD 30%,#44A0FE 100%);
        color: #fff;
    }
    .noCancel{
        background:#fff;
        box-shadow:0px 1px 18px 1px #dadde2;
    }
    .orderMeng{
        height: 100%;
        background-color: #000;
        opacity: 0.5;
        position: absolute;
        width: 100%;
    }
    /*没有数据*/
    .complaintListNullAir{height: 40rem;display: flex;align-items: center;justify-content: center;flex-direction: column;position: absolute;top: 0;width: 100%;background: #ffffff;}
    .complaintListNullAir img{margin: 1rem;}
    .complaintListNullAir div{color:#828282;font-size: 1.2rem;padding-left: 2rem;}

    .personalFix{ position: fixed;top: 0; width: 90%; z-index: 2;}

    .orderNabBox{position: absolute;top: 0;width: 93%;z-index: 2;background: #ffffff;}

    /*订单tab切换*/
    .orderListTabBg{background:#ffffff url("../../assets/images/comm/orderListTab_banner.png") bottom no-repeat;width: 100%; height:6rem; background-size: 100% 100%; position: relative;}
    .orderListTabBg.fixed{background:#238AFD; height: 3.8rem; }
    .orderListTab ul{display: flex;width: 100%; border-bottom: 1px solid #F5F5F5; height: 4rem; position: absolute;bottom: 0;width: 100% }
    .orderListTab ul li{font-size: 1.3rem;line-height: 2.5rem; flex: 1;text-align: center;color: #A6D7FF;padding-top: 0.5rem;}
    .orderListTab ul li span{ padding-bottom:1rem;display: inline-block}
    .orderListTab ul li span a{color: #A6D7FF;}
    .orderListTab ul li.active span{color: #FFFFFF; background: url("../../assets/images/comm/orderListTab_sj.png") bottom center no-repeat; }

    .orderListEwm{width: 90%; margin-left: 1rem; padding-top: 1.5rem; padding-bottom: 1.5rem; justify-content: center;align-items: center;color: #9B9B9B}
    .orderListEwm img{width: 2.2rem}

    /*查看验票码*/
    .dp-mask{position: fixed;width: 100%;height: 0;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;z-index: 2;}
    .ticketBox{z-index: 3;position: absolute;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center}
    .ticketBg{width: 20rem;}
    .ticketEwm{border-radius: 0.5rem 0.5rem 0 0; padding: 1rem;}
    .ticketBtn{width: 100%; height: 5rem; line-height: 6rem; overflow: hidden; text-align: center;color: #ffffff;font-size: 1.6rem; background: url("../../assets/images/airPort/ticket_bg.png") no-repeat;background-size: 100% 100%;}

    #qrccode-canvas{width: 220px !important; height: 220px !important;}

    .orderStatusBg1{margin-left: 1rem;}
    .orderStatusBg1,.orderStatusBg2,.orderStatusBg3{  background: linear-gradient(90deg,#407FFD, #44A0FE);color: #ffffff; border-radius: 1.5rem; padding: 0rem 1.2rem 0rem 1.2rem; line-height: 2.2rem;  display: inline-block}
    .orderStatusBg2{background: #FEBE00}
    .orderStatusBg3{background: #E6E6E6}

    /*刷新*/
    .refresh{position: fixed; display:flex; justify-content: center;align-items: center; flex-direction: column; right: 1rem;top: 65%;background: #ffffff;box-shadow: 5px 5px 5px rgba(79,79,79,0.15);border-radius: 2.5rem;width: 5rem;height: 5rem;text-align: center;font-size: 1.2rem;color: #666666;z-index: 2;}
    .refresh img{width: 2rem;}
</style>
