<template>
    <div class="orderList" style="height: 100%">
        <div class="local_scroll" style="display: flex;flex-direction: column">
            <div class="orderListTabBg orderListTab" v-if="isOrderListTab">
                <ul>
                    <li @click="getLink(webviewUrl+'caruser/airport/orderList?token='+token)"><span>接送</span></li>
                    <li @click="getLink(webviewUrl+'caruser/zuche/orderList?token='+token)" ><span>租车</span></li>
                    <li class="active"  @click="getLink(webviewUrl+'caruser/express/orderList?token='+token)"><span>直通车</span></li>
                </ul>
            </div>
            <div class="padL1 padR1" style="display: flex; flex-direction: column;height: 100%;">
                <div class="orderInfoList" style="flex: 1;overflow-y: scroll" id="orderInfoList">
                    <ul>
                        <li v-for="(item,index) in orderData" :key="index">
                            <div class="orderInfoContent " :class="{orderBd1:item.orderStatus==1,orderBd2:item.orderStatus==2||item.orderStatus==4,orderBd3:item.orderStatus==3||item.orderStatus==5||item.orderStatus==6}">
                                <div class="orderInfoTitle orderBd_B padT1 padB1" style="align-items: center">
                                    <p class="flexC FontS12 orderColor4 fontW">{{item.goodsTitle}}</p>
                                    <div>
                                        <p class="orderStatusBg1" v-if="item.orderStatus==1"><span>未支付</span></p>
                                        <p class="orderStatusBg2" v-if="item.orderStatus==2"><span>待核销</span></p>
                                        <p class="orderStatusBg3" v-if="item.orderStatus==3"><span>已完成</span></p>
                                        <p class="orderStatusBg2" v-if="item.orderStatus==4"><span>待退款</span></p>
                                        <p class="orderStatusBg3" v-if="item.orderStatus==5"><span>已退款</span></p>
                                        <p class="orderStatusBg3" v-if="item.orderStatus==6"><span>已取消</span></p>
                                    </div>
                                </div>
                                <div class="pad1 flex orderBd_B">
                                    <div class="flexC FontS12">
                                        <p class="flex orderColor5">订单编号：<span
                                                class="flexC orderColor6">{{item.id}}</span></p>
                                        <p class="flex orderColor5">出行人数：<span class="flexC orderColor6">{{item.goodsNum}}人</span></p>
                                        <p class="flex orderColor5" >出行时间：<span
                                                class="flexC orderColor6" v-if="item.startTime != undefined">{{item.startTime | formatDate}} {{item.startTimePoint.slice(0,5)}}</span></p>
                                        <p class="flex orderColor5">上车地点：<span class="flexC orderColor6">{{item.stationPlace}}</span>
                                        </p>
                                        <p class="flex orderColor5">联系电话：<span
                                                class="flexC orderColor6">{{item.contactPhone}}</span></p>
                                    </div>
                                    <div class="FontS14 orderColor6">¥{{numDiv(Number(item.totalAmount),100)}}</div>
                                </div>
                                <div class="orderBtnBox TextC">
                                    <span class="orderBtn1" v-if="item.orderStatus==1 || item.orderStatus == 2"  @click="cancelOrder(item.id)">取消订单</span>
                                    <span class="orderBtn1"  @click="callAndroid(iphone)">联系客服</span>
                                    <span class="orderBtn2" v-if="item.orderStatus==1" @click="confirmPay(item.id)">立即支付</span>
                                    <!--<span class="orderBtn2"  @click="createQrc(item.id,item.checkNo)">查看验票码</span>-->
                                    <span class="orderBtn2" v-if="item.orderStatus==2 || item.orderStatus==3 "   @click="createQrc(item.checkNo)">查看验票码</span>
                                </div>
                            </div>
                        </li>

                         <div id="loadMore" class="padT1" v-if="loadMore">
                             <infinite-loading   @infinite="onInfinite"  ref="infiniteLoading"  >
                                 <span slot="no-more">
                                  没有更多数据
                                 </span>
                             </infinite-loading>
                         </div>
                        <div class="complaintListNullAir" v-if="noData">
                            <img src="../../assets/images/passenger/dataNull.png" alt="" style="width: 14rem;">
                            <div class="TextC">{{listMsg}}</div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>

        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
        <!--登录 S-->
        <isLogin :isLogin="isLogin"></isLogin>
        <!--登录 E-->
        <!--刷新 S-->
        <div class="refresh" @click="refresh()"><img src="../../assets/images/zuche/icon/refresh_icon.png">刷新</div>
        <!--刷新 E-->

        <!--取消订单弹框 S-->
        <div class="dp-mask" @click="dpmask()" :class="{current:isCancel || isTicket}"></div>
        <div class="bulletBoxBottom" :class="{current:isCancel}">
            <!--头部 S-->
            <div class="pad1D5 FontS11 bulletBoxHeader TextC orderColor5" style="padding-bottom: 0">确认取消订单？</div>
            <div class="pad1D5 FontS12 lineH2D5 orderColor4">
                <div class="orderDBBtn2" @click="dpmask">点错了</div>
                <div class="orderDBBtn1 marT1" @click="confirmCancel()">取消订单</div>
            </div>
        </div>
        <!--取消订单弹框 S-->
        <!--查看验票码 S-->
        <div class="ticketBox" v-show="isTicket">
            <div class="ticketBg">
                <div class="bgcolorW ticketEwm">
                    <canvas id="qrccode-canvas"></canvas>
                    <p class="orderColor4 FontS14 TextC">验票码：{{bannerUrl}}</p>
                </div>
                <div class="ticketBtn" @click="dpmask()">确认</div>
            </div>
        </div>
        <!--查看验票码 E-->
    </div>
</template>

<script>
    var QRCode = require('qrcode');
    var canvas = '';

    import {formatDate} from '../../assets/js/date';  //时间过滤器
    import InfiniteLoading from 'vue-infinite-loading';
    import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
    import isLogin from '@/views/comm/loginGuide.vue';  //登录组件
    export default {
        name: 'orderList',
        components: {
            //上拉刷新下拉加载
            InfiniteLoading,
            isLogin,
            ModelPop
        },
        data: function () {
            return {
                isOrderIndex: 0,
                orderNav: ['全部', '待付款', '已付款'],
                token: '',
                iphone:'18189913006',
                orderData: [],  //订单列表
                //modelPop组件
                isShow: false,
                BtnTextMsg: "确定",
                TextMsg: "",
                //与列表订单相关
                num: 10, // 一页显示多少条
                total: "", //总条数,
                page: 1,  //默认页码
                list: [],
                noData: false,
                listMsg:'',  //订单页面出错时显示
                isA: false,

                flag: true,
                noPayLink: 'javascript:;',
                //login组件
                isLogin: false,

                //验票码
                ticketYpm:'1144789',
                isTicket:false,
                bannerUrl:'',
                //取消订单
                isCancel: false, //是否取消订单
                cancelMsg: '',
                orderId: '',
                isFixed:false,
                isOrderListTab:false,

                loadMore:true,
                listMsg:''
            }
        },
        mounted () {
            this.$nextTick(function () {
                // DOM操作
                canvas = document.getElementById('qrccode-canvas')
            });

        },
        methods: {
            //子组件向父组件传值
            childByValue: function (childValue) {
                // childValue就是子组件传过来的值
                this.isShow = childValue;
            },
            orderList($state) {  //订单列表
                var _this = this;
                this.$vux.loading.show();
                let headersObj = {'x-access-token': this.token};  //'AF1C337FA23C02808C3F1ECAF16C7BC1'
                let parmasObj = {
                    "orderStatus": this.isOrderIndex,
                    "pageNum": this.page,
                    "pageSize": this.num
                };
                this.$server.get(this.expressROOT + "app/v1.0/orderInfo/appGetOrderList", parmasObj, headersObj).then(res => {
                    _this.$vux.loading.hide();
                    if (res.code == 200) {
                        this.isLogin = false;
                        setTimeout(() => {
                            _this.$vux.loading.hide();
                            if (res.data.total == 0) {
                                this.noData = true;
                                this.listMsg = '暂无数据';
                            }
                            if (res.data.rows.length > 0) {
                                _this.noData = false;
                                _this.page += 1;
                                _this.orderData.push(...res.data.rows);

                                _this.total = res.data.total;

                                $state.loaded();

                                if (_this.orderData.length === res.data.total) {
                                    $state.complete();
                                }
                            } else {
                                $state.complete();
                            }
                        }, 500)
                    } else if (res.code == 10000) {  //登录失效
                        _this.$vux.loading.hide();
                        _this.loadMore = false;
                        _this.$vux.toast.show({ //提示
                            text: res.msg,
                            type: 'text',
                            width: '80%',
                        });
                        setTimeout(function () {
                            _this.$vux.toast.hide();
                            _this.isLogin = true;
                        }, 2000)
                    } else {
                        _this.$vux.loading.hide();
                        _this.loadMore = false;
                        _this.noData = true;
                        _this.listMsg = res.msg;
                    }

                })
            },
            onInfinite($state) {  //判断滚动加载的方法
                //flag表示是否是第一次加载
                if (this.flag) {
                    //初始化加载
                    this.orderList($state);
                    this.flag = false;
                } else {
                    //滚动加载时，页码this.page都会大于1
                    if (this.page > 1) {
                        this.orderList($state);
                    }
                }
            },
            dpmask() {
                this.isCancel = false;
                this.isTicket = false;
            },
            cancelOrder(id) {
                this.orderId = id;
                this.isCancel = true;
            },
            cancelOrderT(id){
                this.isCancel = true;
            },
            confirmCancel() {  //确认取消订单
                let _this = this;
                let headersObj = {'x-access-token':this.token};
                this.$server.get(this.expressROOT+'app/v1.0/orderInfo/appCancelOrder/'+this.orderId,null,headersObj).then(res =>{
                    if(res.code==200){
                        _this.$vux.toast.show({ //提示
                            text: res.msg,
                            type:'text',
                            width:'80%',
                        });
                        setTimeout(function () {
                            location.reload();  //刷新当前页面
                        },2000);
                    }else if(res.code == 2107){
                        _this.$vux.toast.show({ //订单状态发生改变
                            text: res.msg,
                            type:'text',
                            width:'80%',
                        });
                        setTimeout(function () {
                            location.reload();  //刷新当前页面
                        },2000);
                    }else {
                        _this.$vux.toast.show({ //提示
                            text: res.msg,
                            type:'text',
                            width:'80%',
                        });
                    }
                })

            },

            //未支付
            confirmPay(orderId) {

                var _this = this;

                let uri= 'id='+orderId+'&token='+_this.token;
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    //判断是否在小程序环境里
                    wx.miniProgram.getEnv(function(res) {
                        if(res.miniprogram){
                            // javascript
                            wx.miniProgram.navigateTo({url: '/pages/throughCar/confirmPay?'+uri});
                            return
                        }
                    });

                } else {
                    window.location.href = 'justuser://www.maoniuchuxing.com/web/openUrl?url=' + this.webviewUrl + 'caruser/express/confirmPay?' + encodeURIComponent(uri);
                }

            },
            //二维码生成
            createQrc: function (checkNo) {
                let _this =this;
                this.isTicket = true;
                this.bannerUrl = checkNo;
                this.ticketYpm = checkNo;
                if (!this.ticketYpm) {
                    this.$vux.toast.show({
                        text:'链接不能为空',
                        type:'text',
                        width:'80%'
                    });
                    return false
                }
                QRCode.toCanvas(canvas, _this.ticketYpm, (error) => {
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
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日')
            }
        },
        created: function () {
            var _this = this;
            var param = this.GetRequest();
            // 判断宿主环境在那里（app,小程序）
            if(_this.$local != undefined){
                if(_this.$local.env =='weixin'){
                    //把登录信息传给原生app
                    _this.isOrderListTab = true;
                }
            }else{
                //判断是否在小程序环境里
                wx.miniProgram.getEnv(function(res) {
                    if(res.miniprogram){
                        _this.isOrderListTab = true;
                    }
                });
            }

            //判断是否登录
            if (param.token) {
                this.token = param.token;
                if (!sessionStorage.getItem("token")) {
                    return
                }
                if (param.token != sessionStorage.getItem("token")) {
                    this.token = sessionStorage.getItem("token");
                }
            }


        },
    }
</script>

<style scoped>

    .orderList{padding-bottom: 5rem; background: #ffffff;}
    .orderNav{background: linear-gradient(to right,#407FFD, #44A0FE);border-radius: 0.5rem;height: 4rem; }
    .orderNav ul{display: flex;  display: -webkit-box;display: -webkit-flex; padding: 0.5rem;}
    .orderNav ul li{-webkit-box-flex: 1;-webkit-flex: 1;flex: 1;font-size: 1.25rem;color: #ffffff;text-align: center;line-height: 3rem;}
    .orderNav ul li.active{background: #ffffff;color: #407FFD;border-radius: 0.5rem;}
    .orderInfoList{padding-bottom: 3rem;}
    .orderInfoList ul { position: relative;background: #ffffff;padding-right: 0.3rem;}
    .orderInfoList ul li{box-shadow: 0 0 15px rgba(0,0,0,0.12); border-radius: 0.4rem; margin-top: 1.5rem; }
    .orderInfoContent{font-size: 1.2rem; line-height: 2rem; position: relative;}
    .orderBd_B{border-bottom: 1px dashed #e6e6e6}
    .orderBd1{border-left: 2px solid #407FFD; border-radius: 0.2rem 0 0 0.2rem;}
    .orderBd2{border-left: 2px solid #FEBE00; border-radius: 0.2rem 0 0 0.2rem;}
    .orderBd3{border-left: 2px solid #E6E6E6; border-radius: 0.2rem 0 0 0.2rem;}



    .orderStatusBg1,.orderStatusBg2,.orderStatusBg3{  background: linear-gradient(90deg,#407FFD, #44A0FE);color: #ffffff;padding-left: 1rem;padding-right: 1rem;border-radius: 1rem; line-height: 2.2rem}
    .orderStatusBg2{background: #FEBE00}
    .orderStatusBg3{background: #E6E6E6}



    .orderBtnBox{background: #F5F5F5;padding-top: 1.5rem;padding-bottom: 1.5rem;}
    .orderBtnBox span{margin-right: 0.3rem}
    .orderBtn1{border: 1px solid #CECECE; padding: 0.5rem 1rem 0.5rem 1rem;border-radius: 1.5rem;color: #9B9B9B;font-size: 1.2rem;}
    .orderBtn2{border: 1px solid #407FFD; padding: 0.5rem 1rem 0.5rem 1rem;border-radius: 1.5rem;color: #407FFD;font-size: 1.2rem;}

    /*订单tab切换*/
    .orderListTabBg{background:#ffffff url("../../assets/images/comm/orderListTab_banner.png") bottom no-repeat;width: 100%; height:6rem; background-size: 100% 100%; position: relative;}
    .orderListTabBg.fixed{background:#238AFD; height: 3.8rem; }
    .orderListTab ul{display: flex;width: 100%; border-bottom: 1px solid #F5F5F5; height: 4rem; position: absolute;bottom: 0;width: 100% }
    .orderListTab ul li{font-size: 1.3rem;line-height: 2.5rem; flex: 1;text-align: center;color: #A6D7FF;padding-top: 0.5rem;}
    .orderListTab ul li span{ padding-bottom:1rem;display: inline-block}
    .orderListTab ul li span a{color: #A6D7FF;}
    .orderListTab ul li.active span{color: #FFFFFF; background: url("../../assets/images/comm/orderListTab_sj.png") bottom center no-repeat; }

    @media screen and (min-width: 350px) {
       .orderBtn1,.orderBtn2{padding: 0.5rem 1.5rem 0.5rem 1.5rem;}
    }@media screen and (min-width: 385px) {
       .orderBtn1,.orderBtn2{padding: 0.5rem 2rem 0.5rem 2rem;}
    }

    .orderInfoTitle{display: flex;}
    .orderInfoTitle{padding-left: 1rem;padding-right: 1rem;}



    /*没有数据*/
    .complaintListNullAir{height: 40rem;display: flex;align-items: center;justify-content: center;flex-direction: column;position: absolute;top: 0;width: 100%;background: #ffffff;}
    .complaintListNullAir img{margin: 1rem;}
    .complaintListNullAir div{color:#828282;font-size: 1.2rem;padding-left: 2rem;}

    /*弹框*/
    .bulletBoxBottom{width: 100%; position: fixed;left: 0;bottom: 0;z-index: 3;-webkit-transition: -webkit-transform 0.3s ease;transition: -webkit-transform 0.3s ease;-webkit-transform: translateY(100%);transform: translateY(100%);border-radius: 1rem 1rem 0 0;background: #ffffff;}
    .bulletBoxBottom.current{display: block;transform: translateY(0px);}
    .dp-mask{position: fixed;width: 100%;height: 0;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;z-index: 2;}
    .orderDBBtn1,.orderDBBtn2{letter-spacing:2px;height: 4.5rem;border-radius: 3rem;line-height: 4.5rem;font-size: 1.5rem;text-align: center;}
    .orderDBBtn1{background: #ffffff;box-shadow: 0 0 15px rgba(67,73,106,.15);color: #AAAAAA;margin-right:1rem;}
    .orderDBBtn2{background: linear-gradient(90deg,#407FFD, #44A0FE);color: #ffffff;}

    /*查看验票码*/
    .ticketBox{z-index: 3;position: absolute;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center}
    .ticketBg{width: 20rem;}
    .ticketEwm{border-radius: 0.5rem 0.5rem 0 0; padding: 1rem;}
    .ticketBtn{width: 100%; height: 5rem; line-height: 6rem; overflow: hidden; text-align: center;color: #ffffff;font-size: 1.6rem; background: url("../../assets/images/express/ticket_bg.png") no-repeat;background-size: 100% 100%;}

    #qrccode-canvas{width: 220px !important; height: 220px !important;}

    /*刷新*/
    .refresh{position: fixed; display:flex; justify-content: center;align-items: center; flex-direction: column; right: 1rem;top: 65%;background: #ffffff;box-shadow: 5px 5px 5px rgba(79,79,79,0.15);border-radius: 2.5rem;width: 5rem;height: 5rem;text-align: center;font-size: 1.2rem;color: #666666;z-index: 2;}
    .refresh img{width: 2rem;}


</style>
