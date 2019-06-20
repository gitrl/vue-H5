<template>
    <div class="orderDetails  overFlowTouch">
        <div v-if="JSON.stringify(orderDetailsData) != '{}'"><!--一进来就做判断，orderDetailsData里面是否为空-->
            <div class="local_scroll" style="position: relative" >
                <h2 class="bigTitle padL1D5 bgcolorW padT1D5">订单详情</h2>
                <div class="pad1D5 bgcolorW">
                    <div class="flex  FontS12 lineH2D5">
                        <p class="orderColor5 flexC">订单号：{{orderDetailsData.orderId}}</p>
                        <p class="orderListzt orderColor1 fontW" v-if="orderDetailsData.orderStatus==1">待支付</p>
                        <p class="orderListzt orderColor1 fontW" v-else-if="orderDetailsData.orderStatus==2">待确认</p>
                        <p class="orderListzt orderColor2 fontW" v-else-if="orderDetailsData.orderStatus==3 && orderDetailsData.orderType==1">待取车</p>
                        <p class="orderListzt orderColor2 fontW" v-else-if="orderDetailsData.orderStatus==3 && orderDetailsData.orderType==2">待上车</p>
                        <p class="orderListzt orderColor5 fontW" v-else-if="orderDetailsData.orderStatus==4">已完成</p>
                        <p class="orderListzt orderColor2 fontW" v-else-if="orderDetailsData.orderStatus==5">待退款</p>
                        <p class="orderListzt orderColor5 fontW" v-else-if="orderDetailsData.orderStatus==6">已退款</p>
                        <p class="orderListzt orderColor5 fontW" v-else>已取消</p>
                    </div>
                    <div class="flex lineH2D5">
                        <p class="FontS12 orderColor5 flexC">订单金额：<span>¥{{numDiv(orderDetailsData.totalAmount,100)}}</span></p>
                        <p class="orderColor3" @click="chargeDetails(0)">明细<i class="arrow-down ">></i></p>
                    </div>
                    <div v-if="orderDetailsData.orderStatus==5 || orderDetailsData.orderStatus==6">
                        <div class="flex lineH2D5  ">
                            <p class="FontS12 orderColor5 flexC" v-if="orderDetailsData.orderStatus==5">待退款金额：<span class="orderColor1 fontW">¥{{numDiv(orderDetailsData.refundAmount,100)}}</span></p>
                            <p class="FontS12 orderColor5 flexC" v-if="orderDetailsData.orderStatus==6">已退款金额：<span class="orderColor1 fontW">¥{{numDiv(orderDetailsData.refundAmount,100)}}</span></p>
                        </div>
                        <div class="flex">
                            <p class="FontS12 orderColor3 flexC"><span v-if="orderDetailsData.booBreakrule==true" style="color: #FEBE00">*</span> {{orderDetailsData.cancelReason}}</p>
                        </div>
                    </div>
                    <div class="marT2 zucheOrderDOne">
                        <div class="zuchecarImgBox">
                            <p class="zuchecarImg"><img :src="orderDetailsData.vehicleTypeImg"> </p>
                            <div class="zuchecarImgTit">
                                <h3>{{orderDetailsData.brand}}-{{orderDetailsData.vehicleTypeName}}</h3>
                                <p>{{orderDetailsData.gearStr}} - {{orderDetailsData.seats}}座 - {{orderDetailsData.emissions}}</p>
                                <div class="FontS12 orderColor5 padTD5"><img src="../../assets/images/zuche/icon/zucheShopIcon1.png" style="width: 1.6rem;">{{orderDetailsData.companyName}}</div>
                            </div>
                        </div>
                        <orderDetailTime :orderDetailsData="orderDetailsData"></orderDetailTime>
                    </div>
                </div>
                <div class="bgcolorW" v-if="orderDetailsData.orderType==1">
                    <h3 class="orderColor4 FontS14 fontW padL2 zcbd1 padB1">驾驶人信息</h3>
                    <div class="orderColor5 FontS12 padL2 padR2 lineH2D5 padT1 padB1 padT1">
                        <p class="flex padB1"><span class="detailTW">姓名</span><span class="flexC">{{orderDetailsData.usecarName}}</span></p>
                        <p class="flex padB1"><span class="detailTW">身份证</span><span class="flexC">{{orderDetailsData.usecarIdcard}}</span></p>
                        <p class="flex padB1"><span class="detailTW">手机号</span><span class="flexC">{{orderDetailsData.usecarPhone}}</span></p>
                    </div>
                </div>
                <div class="bgcolorW" v-else>
                    <h3 class="orderColor4 FontS14 fontW padL2 zcbd1 padB1">订单人信息</h3>
                    <div class="orderColor5 FontS12 padL2 padR2 lineH2D5 padT1 padB1 padT1">
                        <p class="flex padB1"><span class="detailTW">姓名</span><span class="flexC">{{orderDetailsData.usecarName}}</span></p>
                        <p class="flex padB1"><span class="detailTW">身份证</span><span class="flexC">{{orderDetailsData.usecarIdcard}}</span></p>
                        <p class="flex padB1"><span class="detailTW">手机号</span><span class="flexC">{{orderDetailsData.usecarPhone}}</span></p>
                    </div>
                </div>
                <div class="padT1">
                    <div class="bgcolorW">
                        <h3 class="orderColor4 FontS14 fontW padL2 padB1 padT1D5">取消规则</h3>
                        <div class="orderColor6 FontS12 padL2 padR2 lineH2 padB1">
                            {{orderDetailsData.breakruleReason}}
                        </div>
                    </div>
                </div>
            </div>
            <!--固定在底部的按钮 S-->
            <div class="orderDB1" v-show="isBottonBtn">
                <div class="TextC FontS13 orderColor2 padB2 padT1" v-show="isCancel" @click="cancelOrder(1)">取消订单</div>
                <div class="orderDB2"  v-show="isPayBtn">
                    <div class="pad1D5">
                        <div class="orderDBBtn2" @click="pay()">立即支付</div>
                    </div>
                </div>
            </div>
            <!--费用明细 S-->
            <div class="dp-mask" @click="dpmask" :class="{current:isCharge==0 || isCharge==1}"></div>
            <div class="bulletBoxBottom" :class="{current:isCharge==0}" > <!--一进来就做判断，orderDetailsData里面是否为空-->
                <!--头部 S-->
                <div class="pad1D5 flex FontS13"  style="padding-bottom: 0;" @click="dpmask()"><span class="flexC orderColor4">明细</span><span class="close_icon"><img src="../../assets/images/zuche/icon/close_icon.png"></span> </div>
                <div class="pad1D5 FontS12 lineH2D5 orderColor6 padT1">
                    <!--<p class="flex"><span>租车费</span><span class="flexC TextR">¥{{numDiv(orderDetailsData.basicCost,100)}} x {{orderDetailsData.rentCarPeriod}}天</span></p>-->
                    <p class="flex"><span>租车费</span><span class="flexC TextR" v-if="orderDetailsData.avgRentAmount">¥{{numDiv(orderDetailsData.avgRentAmount,100)}} * {{orderDetailsData.rentCarPeriod}}天</span></p>
                    <p class="flex"><span>基本保障服务费</span><span class="flexC TextR">¥{{numDiv(orderDetailsData.basicCost,100)}}</span></p>
                </div>
            </div>
            <!--费用明细 S-->
        </div>
        <!--固定在底部的按钮 E-->

        <!--取消订单弹框 S-->
        <div class="bulletBoxBottom" :class="{current:isCharge==1}">
            <!--头部 S-->
            <div class="pad1D5 FontS11 bulletBoxHeader TextC orderColor5" style="padding-bottom: 0">确认取消订单？</div>
            <div class="pad1D5 FontS12 lineH2D5 orderColor4">
                <div class="orderDBBtn2" @click="dpmask">点错了</div>
                <div class="orderDBBtn1 marT1" @click="confirmCancel()">取消订单</div>
            </div>
        </div>
        <!--取消订单弹框 S-->

        <!--登录 S-->
        <isLogin :isLogin="isLogin"></isLogin>
        <!--登录 E-->
    </div>
</template>

<script>
    import isLogin from  '@/views/comm/loginGuide.vue';  //把首页填写的信息写在一个组件里面，方便其它页面调用
    import orderDetailTime from '@/components/zuche/orderDetailTime';  //订单时间与地址组件
  export default {
    name: 'orderDetails',
      components:{
          isLogin,
          orderDetailTime
      },
    data:function () {
      return {
        //登录组件
        isLogin:false,
        token:'',

        isCharge:null,
        infoArr:{},  //接收上一级传过来的数据
        orderStatus: 1,//订单状态

        orderId:'',//租车商品ID
        orderDetailsData:{},

        isCancel:true,  //是否显示取消订单
        isBottonBtn:true,//是否显示支付按钮及取消订单
        isPayBtn:true,//是否显示支付按钮
        getCarWeekDay:'', //取车周几
        returnCarWeekDay:'', //还周几


      }
    },
    methods:{
        chargeDetails(num){
            this.isCharge = num;
        },
        cancelOrder(num){
            this.isCharge = num;
        },
        dpmask(){
            this.isCharge = null;
        },
        pay(){
            this.$router.push({path:'confirmPay',query:{id:this.orderDetailsData.id}});
        },
        orderDeatil(){
            let _this = this;
            let headersObj = {'content-type': 'application/json;charset=UTF-8','x-access-token':this.token};
            this.$server.get(this.zucheROOT+'app/v1.0/orderInfo/getUserOrderDetail/'+this.orderId,null,headersObj).then(res =>{
                if(res.code ==200){
                    this.orderDetailsData = res.data;
                    this.isBottomBtn();
                }else if(res.code==10000){
                    _this.$vux.toast.show({ //提示
                        text: res.msg,
                        type:'text',
                        width:'80%',
                    });
                    setTimeout(function () {
                        _this.$vux.toast.hide();
                        _this.isLogin = true;
                    },1000)
                }
            })
        },
        isBottomBtn(){  //是否显示底部按钮
            if(this.orderDetailsData.orderStatus==1){

            }else if(this.orderDetailsData.orderStatus==2){
                this.isPayBtn = false;
            }else if(this.orderDetailsData.orderStatus==3){
                this.isPayBtn = false;
            }else {
                this.isBottonBtn = false;
            }

        },
        confirmCancel(){  //确认取消订单
            let _this = this;
            let headersObj = {'content-type': 'application/json;charset=UTF-8','x-access-token':this.getToken};
            console.log(this.orderId);
            this.$server.get(this.zucheROOT+'app/v1.0/orderInfo/cancelOrder/'+this.orderId,null,headersObj).then(res =>{
                if(res.code==200){
                    _this.$vux.toast.show({ //提示
                        text: res.msg,
                        type:'text',
                        width:'80%',
                    });
                    location.reload();  //刷新当前页面
                }else {
                    _this.$vux.toast.show({ //提示
                        text: res.msg,
                        type:'text',
                        width:'80%',
                    });
                }
            })

        }

    },
    created(){

        this.orderId = this.$route.query.id;
        this.token = this.$route.query.token;
        localStorage.setItem('token',this.token);
        this.orderDeatil();

    }
  }
</script>

<style scoped>
    .orderDetails{background: #ffffff;padding-bottom: 13rem;}
    .zcbd1{border-bottom: 1px solid #F5F5F5}
    .detailTW{width: 5rem;}
    .orderColor1{color: #fe3636;}
    .orderColor2{color: #407ffd;}
    .orderColor3{color: #AAAAAA;}
    .orderColor4{color: #333333;}
    .orderColor5{color: #666666;}
    .orderColor6{color: #9B9B9B;}

    .zucheOrderDOne{border-radius: 0.5rem;border: 1px solid rgba(164,164,164,.28);padding: 1.5rem;}
    .zuchecarImgBox{display: flex;border-bottom: 1px solid #EFEFEF;padding-bottom: 1.2rem;align-items: center}
    .zuchecarImg{flex: 0.5;}
    .zuchecarImg img{width: 100%}
    .zuchecarImgTit{flex: 0.5;color: #666666;padding-left: 1rem;}
    .zuchecarImgTit h3{font-size: 1.3rem;font-weight: bold;}
    .zuchecarImgTit p{font-size: 1.1rem; line-height: 2rem;}
    .zuchecarImgTit img{width: 1.6rem;vertical-align: middle;margin-top: -0.3rem;margin-right: 0.3rem;}
    .map_icon{width: 1.5rem;vertical-align: middle;margin-top: -0.3rem;margin-left: 0.3rem; }

    /*用车时间*/
    .selectCarTopOne{ }
    .selectCarTopOne label{font-size: 1.1rem;color: #AAAAAA}
    .selectCarTopOne p{font-size: 1.2rem;color: #666666;margin-top: -1rem;}
    .selectCarTopDay{width: 3rem; text-align: center; font-size: 1.1rem;color: #666666;margin-left: 0.5rem; margin-right: 0.5rem;}
    .selectCarTopDay p{text-align: center;margin-top: -1rem;}
    .selectCarTopDay p img{width:3rem;}

    /*固定在底部的样式*/
    .orderDB1{position: fixed; z-index: 1; width: 100%; bottom: 0;left: 0;background: #FAFAFA}
    .orderDB2{ background:#ffffff;bottom: 0;left: 0;border-radius: 1rem 1rem 0 0;box-shadow: 0 0 15px rgba(67,73,106,.15)}
    .orderDB{position: fixed; z-index: 1; width: 100%; background:#ffffff;bottom: 0;left: 0;border-radius: 1rem 1rem 0 0;box-shadow: 0 0 15px rgba(67,73,106,.15)}
    .orderDBBtn1,.orderDBBtn2{letter-spacing:2px;height: 4.5rem;border-radius: 3rem;line-height: 4.5rem;font-size: 1.5rem;text-align: center;}
    .orderDBBtn1{background: #ffffff;box-shadow: 0 0 15px rgba(67,73,106,.15);color: #AAAAAA;margin-right:1rem;}
    .orderDBBtn2{background: linear-gradient(90deg,#407FFD, #44A0FE);color: #ffffff;}

    .arrow-down{display:inline-block; transform: rotate(90deg); color: #CECECE;font-size: 1.1rem;}
    /*弹框*/
    .bulletBoxBottom{width: 100%; position: fixed;left: 0;bottom: 0;z-index: 3;-webkit-transition: -webkit-transform 0.3s ease;transition: -webkit-transform 0.3s ease;-webkit-transform: translateY(100%);transform: translateY(100%);border-radius: 1rem 1rem 0 0;background: #ffffff;}
    .bulletBoxBottom.current{display: block;transform: translateY(0px);}
    .dp-mask{position: fixed;width: 100%;height: 0;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;z-index: 2;}
    .orderDBBtn1,.orderDBBtn2{letter-spacing:2px;height: 4.5rem;border-radius: 3rem;line-height: 4.5rem;font-size: 1.5rem;text-align: center;}
    .orderDBBtn1{background: #ffffff;box-shadow: 0 0 15px rgba(67,73,106,.15);color: #AAAAAA;margin-right:1rem;}
    .orderDBBtn2{background: linear-gradient(90deg,#407FFD, #44A0FE);color: #ffffff;}

    .close_icon img{width: 1.1rem;}
</style>
