<template>
<div id="confirmPay" class="bgcolorW">  <!--一进来就做判断，orderDetailsData里面是否为空-->
    <h2 class="bigTitle padT1D5 padL2 padB2">支付</h2>
    <div  v-if="JSON.stringify(orderDetailsData) != '{}'">
        <div class="orderInfo colorWhite padL2 padR2">
            <div class="TextC padT1 padB1" style="position: relative">
                <span class="FontS15">{{orderDetailsData.orderType==1?'租车':'包车'}}</span>
                <span style="position: absolute;right: 0;" @click="viewOrder()">查看订单详情></span>
            </div>
            <div class="TextC moneyFont">¥<span>{{numDiv(orderDetailsData.totalAmount,100)}}</span></div>
            <p class="TextC padB1 FontS12">支付剩余时间 <span>{{countDownTime}}</span></p>
        </div>
        <div class="padL2 padR2 padT1">
            <ul class="confirmList">
                <li v-for="(item,index) in confirmList" :key="index">
                    <div class="confirmListText"><img :src="item.payIcon">{{item.name}}</div>
                    <div class="chooseImg" @click="chooseIcon(index)"><img :src="item.chooseIcon"> </div>
                </li>
            </ul>
            <div class="airBtnBox padT2" @click="confirmPay()">
                <airCommonBtn :airBtnText="airCommonBtnText" class="marB1" :class="{isFlagG:!flag}"></airCommonBtn>
            </div>
        </div>
        <!--订单详情弹框 S-->
        <div class="dp-mask" @click="dpmask" :class="{current:isPop}"></div>
        <div class="bulletBoxBottom"  :class="{current:isPop}" style="overflow-y: auto; max-height: 78%">
            <!--头部 S-->
            <div class="close_icon"  @click="close_icon()"><img src="../../assets/images/zuche/icon/close_icon.png"></div>
            <div class="orderCsContent overFlowTouch" style="overflow-y: scroll;">
                <div class="orderCsList">
                    <h3>订单信息</h3>
                    <orderDetailTime :orderDetailsData="orderDetailsData"></orderDetailTime>
                </div>
                <div class="orderCsList">
                    <h3>车辆信息</h3>
                    <p class="FontS12 orderColor3 padTD5 lineH2D5">{{orderDetailsData.companyName}}<span class="padL1 padR1">{{orderDetailsData.vehicleTypeName}}</span> {{orderDetailsData.gearStr}} - {{orderDetailsData.seats}}座 - {{orderDetailsData.emissions}}</p>
                </div>
                <div class="orderCsList">
                    <h3>价格信息</h3>
                    <div class="FontS12 orderColor3 padTD5 lineH2D5">
                        <p class="flex"><span>租车费</span><span class="flexC TextR orderColor5">¥{{numDiv(orderDetailsData.avgRentAmount,100)}} * {{orderDetailsData.rentCarPeriod}}天</span></p>
                        <p class="flex"><span>基本保障服务费</span><span class="flexC TextR orderColor5">¥{{numDiv(orderDetailsData.basicCost,100)}}</span></p>
                        <p class="flex"><span>总价</span><span class="flexC TextR orderColor5">¥{{numDiv(orderDetailsData.totalAmount,100)}}</span></p>
                    </div>
                </div>
                <div class="orderCsList">
                    <h3>个人信息</h3>
                    <div class="FontS12 orderColor3 padTD5 lineH2D5">
                        <p class="flex"><span>姓名</span><span class="flexC TextR orderColor5">{{orderDetailsData.usecarName}}</span></p>
                        <p class="flex"><span>身份证</span><span class="flexC TextR orderColor5">{{orderDetailsData.usecarIdcard}}</span></p>
                        <p class="flex"><span>手机号</span><span class="flexC TextR orderColor5">{{orderDetailsData.usecarPhone}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <!--订单详情弹框 E-->
    </div>
    <!--登录 S-->
    <isLogin :isLogin="isLogin"></isLogin>
    <!--登录 E-->
    <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
    <!--订单时间与地址组件 S-->
    <div v-show="isPay" >
        <!--支付弹框 S-->
        <div class="dp-mask"  @click="dpmask" :class="{current:isPay}"></div>
        <div class="bulletBoxBottom" :class="{current:isPay}">
            <!--头部 S-->
            <div class="pad1D5 FontS11 bulletBoxHeader TextC orderColor5" style="padding-bottom: 0">你的支付尚未完成，是否取消支付？</div>
            <div class="pad1D5 FontS12 lineH2D5 orderColor4">
                <div class="orderDBBtn2" @click="confirmPay()">继续支付</div>
                <div class="orderDBBtn1 marT1" @click="goBack()">取消支付</div>
            </div>
        </div>
        <!--支付弹框 S-->
    </div>
    <!--订单时间与地址组件 E-->
</div>
</template>

<script>
import {formatDate} from '../../assets/js/date';  //时间过滤器
import airCommonBtn from '@/components/airCommonBtn';
import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
import isLogin from  '@/views/comm/loginGuide.vue';  //登录引导组件
import orderDetailTime from '@/components/zuche/orderDetailTime';  //订单时间与地址组件
export default {
    name: 'orderInfo',
    components:{
        airCommonBtn,
        isLogin,
        ModelPop,
        orderDetailTime
    },
    data:function () {
        return {
            //组件pop
            isShow:false,
            isSuss:false,
            TextMsg:"",
            BtnTextMsg:"确定",

            //登录组件
            isLogin:false,
            isPay:false,
            // token:'BB61CC23E49847212BC5B3B5228A9898',

            airCommonBtnText:'立即支付',
            isFlag:false,  //按钮变灰
            flag:true,  //避免重复提交
            id:'',  //接收上一级传过来的数据
            orderDetailsData:{},  //订单信息

            countDownTime:'',//倒计时
            isPop:false,  //查看订单详情

            confirmList:[
            {
                name:'微信支付',
                payIcon:require('../../assets/images/airPort/icon/wechat_icon.png'),
                chooseIcon:require('../../assets/images/airPort/icon/paycheck_s.png'),
            },
            {
                name:'支付宝支付',
                payIcon:require('../../assets/images/airPort/icon/zfbpay_icon.png'),
                chooseIcon:require('../../assets/images/airPort/icon/paycheck_f.png'),
            }
            ],
            payId:'',  //支付ID
            payType:0,  //选择0微信还是1支付宝
        }
    },
    methods:{
        //子组件向父组件传值
        childByValue: function (childValue) {
            // childValue就是子组件传过来的值
            this.isShow = childValue;
        },
        //查看订单详情
        viewOrder(){
            this.isPop = true;
        },
        close_icon(){
            this.isPop = false;
        },
        dpmask(){
            this.isPop = false;
            this.isPay = false;
        },
        //选择那个一种支付方式
        chooseIcon(index){
            this.payType = index;
            //0表示微信，1表示支付宝
            if(index == 0){
              this.confirmList[1].chooseIcon = require('../../assets/images/airPort/icon/paycheck_f.png');
              this.confirmList[index].chooseIcon = require('../../assets/images/airPort/icon/paycheck_s.png');
            }else if(index == 1){
              this.confirmList[index].chooseIcon = require('../../assets/images/airPort/icon/paycheck_s.png');
              this.confirmList[0].chooseIcon = require('../../assets/images/airPort/icon/paycheck_f.png');
            }
        },
        //订单信息
        orderInfo(id){
            //this.$vux.loading.show();
            let _this = this;
            let headersObj = {'content-type': 'application/json;charset=UTF-8','x-access-token':this.getToken};
            this.$server.get(this.zucheROOT+'app/v1.0/orderInfo/getUserOrderDetail/'+id, null,headersObj).then(res =>{
              this.$vux.loading.hide();
              if(res.code == 200){

                this.orderDetailsData = res.data;
                console.log(res.data);

                //下单时间
                let createTime = new Date(res.data.createTime.replace(/-/g, '/')).getTime();
                //倒计时
                let startTime = Math.floor(1800- (res.data.systemTime-createTime)/ 1000);
                let thisItv = setInterval(function(){
                  if (startTime <= 0) {
                    clearInterval(thisItv);
                      _this.countDownTime = "00:00:00";
                    _this.$vux.toast.show({ //提示
                      text: '订单已失效，请重新下单',
                      type:'text',
                      width:'60%',
                    });
                    setTimeout(function () {
                      _this.$vux.toast.hide();
                      _this.$router.push({path:'/zuche'});
                    },2000);

                    return;
                  }
                  startTime=startTime-1;
                  var mm=parseInt(startTime/60);
                  var ss=parseInt(startTime%60);
                  if (mm < 10) {
                    mm = '0' + mm;
                  }
                  if (ss < 10) {
                    ss = '0' + ss;
                  }
                  let countDown = "00:" + mm + ":" + ss;
                  _this.countDownTime = countDown

                },1000);
              }else if(res.code == 10000){  //登录失效
                _this.$vux.loading.hide();
                _this.$vux.toast.show({ //提示
                  text: res.msg,
                  type:'text',
                  width:'80%',
                });
                  _this.isLogin = true;
                setTimeout(function () {
                  _this.$vux.toast.hide();
                  _this.isLogin = true;
                },2000)
              }else {
                this.isShow = true;
                this.TextMsg = res.msg;
              }
            })
        },
        //支付请求
        confirmData(chargeType){
            let _this = this;
            let headersObj = {'content-type': 'application/json;charset=UTF-8','x-access-token':this.getToken};
            let parmasObj = {
                id:this.id,
                orderId:this.orderDetailsData.orderId,
                chargeChannel:chargeType,
                userchargeAmount:this.orderDetailsData.totalAmount,
                goodsId:this.orderDetailsData.goodsId,
                userCarTime:this.orderDetailsData.getCarTime,
                returnCarTime:this.orderDetailsData.returnCarTime
            };
            //支付宝和微信调用不同的接口
            let payOrderL = ['app/v1.0/orderInfo/payOrderByWx','app/v1.0/orderInfo/PayOrderByAliPay'];
            if(this.flag){  //避免重复支付
                this.$vux.loading.show();
                this.$server.post(this.zucheROOT + payOrderL[this.payType],parmasObj,headersObj).then(res =>{
                    this.flag = false;
                    this.isFlag = true;
                    this.$vux.loading.hide();
                    if(res.code == 200){
                        var charge = res.data.charge;
                        if(this.payType==0){
                            let wxKey = res.data.charge.credential.wx.appId;
                            console.log(wxKey);
                            let chargeObj ={
                                type:1,
                                wx_key:wxKey,  //网约车的key
                                //wx_key:'wx4373ef54c842eca6',  //网约车的key
                                payParam:JSON.stringify(charge)
                            };
                            if(_this.Device.getMobileOperatingSystem()=='Android'){
                                //Android
                                window.just_android.performPay(JSON.stringify(chargeObj));
                            }
                            else{
                                // ios
                                window.webkit.messageHandlers.performPay.postMessage(JSON.stringify(chargeObj));
                            }
                        }else if(this.payType == 1){
                            let chargeObj ={
                                type:2,
                                payParam:JSON.stringify(charge),
                            };
                            if(_this.Device.getMobileOperatingSystem()=='Android'){
                                //Android
                                window.just_android.performPay(JSON.stringify(chargeObj));
                            }
                            else{
                                // ios
                                window.webkit.messageHandlers.performPay.postMessage(JSON.stringify(chargeObj));
                            }
                        }
                    }else if(res.code == 10000){  //登录失效
                        _this.$vux.loading.hide();
                        _this.$vux.toast.show({ //提示
                            text: res.msg,
                            type:'text',
                            width:'80%',
                        });
                        setTimeout(function () {
                            _this.$vux.toast.hide();
                            _this.isLogin = true;
                        },2000)
                    }else {
                        _this.isFlag = false;
                        _this.flag = true;
                        _this.isShow = true;
                        _this.TextMsg = res.msg;
                    }
                })
            }else {
                this.$vux.loading.hide();
                this.$vux.toast.show({  //提示
                    text: '订单支付中，请不要重复支付',
                    type:'text',
                    width:'80%',
                })
            }
        },
        //确认支付
        confirmPay(){  //支付
            this.isPay = false;
           // this.$vux.loading.show();
            //wx是微信支付，alipay是支付宝支付
            if(this.payType == 0){
                //微信调的方法
                this.confirmData('wx');
            }else if(this.payType == 1){
                //支付宝调的方法
                this.confirmData('alipay');
            }
        },

        goPay(){
            this.isPay = true;
        },
        goBack(){
            var _this = this;
            this.isPay = false;
            //判断是否在小程序环境里
            wx.miniProgram.getEnv(function(res) {
                if(res.miniprogram){
                    // javascript
                    wx.miniProgram.reLaunch({url: '/pages/orderList/orderList?token='+_this.getToken+'&isTab=1'});
                }
                return
            });
            this.closePage();
            //this.$router.go(-1);//返回上一层
            // this.$router.replace({path: '/'});
            //replace替换原路由，作用是避免回退死循环
        },
        //支付状态
        payStatus(type){
            //type = 0  成功 , type = 1  失败
            if(type == 0){
                this.$router.push({path:'paySuccess',query:{id:this.id}});
            }else if(type == 1){
                // let uri= 'id='+this.id;
                this.$router.push({path:'payFail',query:{id:this.id}})
                 // window.location.href = this.webviewUrl+'caruser/zuche/payFail?'+encodeURIComponent(uri);
            }
        }
    },
    filters: {
        formatDate (time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
    mounted() {
        //将要给原生调用的方法挂载到 window 上面
        window.payStatus = this.payStatus;
        //监听浏览器返回
        this.goHistory(this.goPay);
    },
    destroyed(){
        window.removeEventListener('popstate', this.goPay, false);
    },
    created(){
        //获取本地token
        this.getToken =  localStorage.getItem("token");
        //获取上一级带过来的参数
        this.id = this.$route.query.id;
        this.orderInfo(this.id);

        //判断是否在小程序环境里
        wx.miniProgram.getEnv(function(res) {
            if(res.miniprogram){
                // javascript
                _this.confirmList.pop();
                _this.isEnv = false;
            }
        });
    },
}
</script>

<style scoped>
    #confirmPay{height: 100%}
    .orderInfo{background: linear-gradient(to right,#418CFD, #76C0FF);line-height: 3rem;text-align: center}
    .confirmList li{display: flex;height: 5rem;line-height: 5rem;}
    .confirmListText{flex: 1;font-size: 1.3rem;}
    .confirmListText img{width: 1.6rem;vertical-align: middle;margin-right: 0.5rem;margin-top: -0.2rem;}
    .chooseImg img{width: 1.8rem;vertical-align: middle}
    .moneyFont{font-size: 1.3rem;}
    .moneyFont span{font-size: 2.5rem;padding-left: 0.5rem;}

    .orderCsContent{border-radius: 1rem;padding-bottom: 2rem; margin-top: -3rem;}
    .close_icon{position: relative;z-index: 2;text-align: right;padding: 1.5rem;}
    .close_icon img{width: 1.1rem;}

    .orderCsList{padding-left: 1.5rem;padding-right: 1.5rem; padding-bottom: 1rem;}
    .orderCsList h3{font-size: 1.2rem; padding-bottom: 0.5rem;color: #666666}
    .orderCsList ul li{font-size: 1.2rem; line-height:2rem}
    .orderCsList ul li label{color: #AAAAAA;width: 6rem;display: inline-block;}
    .orderCsList ul li span{color: #666666}

    .airBtnBox .isFlagG{background: #D6D6D6}

    /*弹框*/
    .bulletBoxBottom{width: 100%; position: fixed;left: 0;bottom: 0;z-index: 3;-webkit-transition: -webkit-transform 0.3s ease;transition: -webkit-transform 0.3s ease;-webkit-transform: translateY(100%);transform: translateY(100%);border-radius: 1rem 1rem 0 0;background: #ffffff;}
    .bulletBoxBottom.current{display: block;transform: translateY(0px);}
    .dp-mask{position: fixed;width: 100%;height: 0;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;z-index: 2;}
    .orderDBBtn1,.orderDBBtn2{letter-spacing:2px;height: 4.5rem;border-radius: 3rem;line-height: 4.5rem;font-size: 1.5rem;text-align: center;}
    .orderDBBtn1{background: #ffffff;box-shadow: 0 0 15px rgba(67,73,106,.15);color: #AAAAAA;margin-right:1rem;}
    .orderDBBtn2{background: linear-gradient(90deg,#407FFD, #44A0FE);color: #ffffff;}




</style>
