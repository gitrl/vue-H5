<template>
    <div id="bookInformation">
        <h2 class="bigTitle padT1 padL2 padB1">支付</h2>
        <div class="orderInfo colorWhite padL2 padR2">
            <div class="TextC padT1 padB1" style="position: relative">
                <span class="FontS15">{{orderData.orderType == 1?'接机':''}}{{orderData.orderType == 2?'送机':''}}{{orderData.orderType == 3?'接站':''}}{{orderData.orderType == 4?'送站':''}}-{{orderData.passengerNumber}}人</span>
                <span style="position: absolute;right: 0;" @click="viewOrder()">查看订单详情></span>
            </div>
            <div class="TextC moneyFont">¥<span>{{totalPrice}}</span></div>
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
            <div class="close_icon"  @click="close_icon()"><img src="../../assets/images/airPort/icon/close_icon.png"></div>
            <div class="orderCsContent">
                <div class="orderCsList">
                    <h3>订单信息</h3>
                    <ul>
                        <li><label>业务类型</label><span>{{orderData.orderType == 1?'接机':''}}{{orderData.orderType == 2?'送机':''}}{{orderData.orderType == 3?'接站':''}}{{orderData.orderType == 4?'送站':''}}</span></li>
                        <li><label>用车方式</label><span v-if="orderData.useType==1">拼车</span><span v-else>包车</span></li>
                        <li v-if="orderData.orderType == 3 || orderData.orderType == 4">
                            <label>车次号</label>
                            <span v-if="orderData.orderType == 3">{{flightNum}} </span>
                            <span v-if="orderData.orderType == 4">{{orderData.shiftNumber}} </span>
                        </li>
                        <li v-else><label>航班号</label><span>{{orderData.shiftNumber}} {{this.format(shiftArrOrStartTime).slice(10,16)}}</span></li>
                        <li><label>接送时间</label><span>{{willStartTime | formatDate }}</span></li>
                        <li><label>接送地点</label><span>{{orderData.startAddress}}</span></li>
                        <li><label>目的地</label><span>{{orderData.endAddress}}</span></li>
                        <li v-if="orderData.useType==2"><label>车辆类型</label><span>{{orderData.goodsName}}</span></li>
                    </ul>
                </div>
                <div class="orderCsList">
                    <h3>价格信息</h3>
                    <ul>
                        <li v-if="orderData.useType==1"><label>单价</label><span>{{unitPrice}}元/人</span></li>
                        <li  v-if="orderData.useType==1"><label>人数</label><span>{{orderData.passengerNumber}}人</span></li>
                        <li><label>总价</label><span>{{totalPrice}}元</span></li>
                    </ul>
                </div>
                <div class="orderCsList">
                    <h3>个人信息</h3>
                    <ul>
                        <li><label>联系人</label><span>{{orderData.contacts}}</span></li>
                        <li><label>联系电话</label><span>{{orderData.contactNumber}}</span></li>
                    </ul>

                </div>
            </div>
        </div>
        <!--订单详情弹框 E-->

        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
        <!--登录 S-->
        <isLogin :isLogin="isLogin"></isLogin>
        <!--登录 E-->
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
    import isLogin from '@/views/comm/loginGuide.vue';  //登录组件
    export default {
        name: 'orderInfo',
        components: {
            airCommonBtn,
            ModelPop,
            isLogin
        },
        data: function () {
            return {
                //组件pop
                isShow: false,
                isSuss: false,
                TextMsg: "",
                BtnTextMsg: "确定",
                //login组件
                isLogin: false,
                //组件按钮
                airCommonBtnText: '确认支付',
                orderId: '',
                token: '',
                countDownTime: '',//倒计时


                isPop: false,
                isPay: false,  //是否继续支付
                orderData: [],  //订单详情
                totalPrice: '',//总价
                unitPrice: '', //单价
                shiftArrOrStartTime: '',//班次到达或出发时间
                confirmList: [
                    {
                        name: '微信支付',
                        payIcon: require('../../assets/images/airPort/icon/wechat_icon.png'),
                        chooseIcon: require('../../assets/images/airPort/icon/paycheck_s.png'),
                    },
                    {
                        name: '支付宝支付',
                        payIcon: require('../../assets/images/airPort/icon/zfbpay_icon.png'),
                        chooseIcon: require('../../assets/images/airPort/icon/paycheck_f.png'),
                    }
                ],
                payId: '',  //支付ID
                payType: 0,  //选择0微信还是1支付宝
                flightNum: '', //接站时传过来的班次
                willStartTime: '',//接送时间
                isFlag:false,  //按钮变灰
                flag:true,  //避免重复提交
            }
        },
        methods: {
            //子组件向父组件传值
            childByValue: function (childValue) {
                // childValue就是子组件传过来的值
                this.isShow = childValue;
            },
            //查看订单详情
            viewOrder() {
                this.isPop = true;
            },
            close_icon() {
                this.isPop = false;
            },
            dpmask() {
                this.isPop = false;
                this.isPay = false;
            },
            //选择那个一种支付方式
            chooseIcon(index) {
                this.payType = index;
                //0表示微信，1表示支付宝
                if (index == 0) {
                    this.confirmList[1].chooseIcon = require('../../assets/images/airPort/icon/paycheck_f.png');
                    this.confirmList[index].chooseIcon = require('../../assets/images/airPort/icon/paycheck_s.png');
                } else if (index == 1) {
                    this.confirmList[index].chooseIcon = require('../../assets/images/airPort/icon/paycheck_s.png');
                    this.confirmList[0].chooseIcon = require('../../assets/images/airPort/icon/paycheck_f.png');
                }
            },
            //订单信息
            orderInfo(orderId) {
                this.$vux.loading.show();
                let _this = this;
                let headersObj = {'content-type': 'application/json', 'x-access-token': this.token};
                this.$server.get(this.AirROOT + 'app/v1.0/order/notPay/' + orderId, null, headersObj).then(res => {
                    this.$vux.loading.hide();
                    if (res.code == 200) {
                        this.orderData = res.data;
                        console.log(this.orderData)
                        this.totalPrice = this.numDiv(res.data.totalPrice, 100);
                        this.unitPrice = this.numDiv(res.data.unitPrice, 100);
                        this.shiftArrOrStartTime = Number(res.data.shiftArrOrStartTime);
                        this.willStartTime = Number(res.data.willStartTime);
                        this.payId = res.data.payId;

                        if (this.orderData.orderType == 3) { //判断是否是接站，如果是接站的话，就读取预定页面带过来的车次号
                            this.flightNum = this.$route.query.flightNum;
                        }

                        //倒计时
                        let startTime = Math.floor(1797 - ((new Date().getTime() - res.data.createTime) / 1000));
                        let thisItv = setInterval(function () {
                            if (startTime <= 0) {
                                clearInterval(thisItv);
                                _this.$vux.toast.show({ //提示
                                    text: '订单已失效，请重新下单',
                                    type: 'text',
                                    width: '60%',
                                });
                                setTimeout(function () {
                                    _this.$vux.toast.hide();
                                    _this.closePage();
                                }, 2000)

                                return;
                            }
                            startTime = startTime - 1;
                            var mm = parseInt(startTime / 60);
                            var ss = parseInt(startTime % 60);
                            if (mm < 10) {
                                mm = '0' + mm;
                            }
                            if (ss < 10) {
                                ss = '0' + ss;
                            }
                            let countDown = "00:" + mm + ":" + ss;
                            _this.countDownTime = countDown
                        }, 1000);
                    } else if (res.code == 10000) {  //登录失效
                        _this.$vux.loading.hide();
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
                        this.isShow = true;
                        this.TextMsg = res.msg;
                    }
                })
            },

            //确认支付
            confirmPay() {  //支付
                this.isPay = false;
                let _this = this;
                let headersObj = {'content-type': 'application/json', 'x-access-token': this.token};
                let parmasObj = {
                    payId: this.payId
                };
                //type = 1是微信支付，type=2是支付宝支付
                if(this.flag){  //避免重复支付
                    this.$vux.loading.show();
                    if (this.payType == 0) {
                        //微信调的接口
                        this.$server.get(this.AirROOT + "app/v1.0/order/pay/wechatapp", parmasObj, headersObj).then(res => {
                            this.$vux.loading.hide();
                            this.flag = false;
                            this.isFlag = true;
                            if (res.code == 200) {
                                let wxKey = res.data.charge.credential.wx.appId;
                                let chargeObj = {
                                    type: 1,
                                    wx_key: wxKey,
                                    payParam: JSON.stringify(res.data.charge)
                                };
                                if (_this.Device.getMobileOperatingSystem() == 'Android') {
                                    window.just_android.performPay(JSON.stringify(chargeObj));
                                }
                                else {
                                    // ios
                                    window.webkit.messageHandlers.performPay.postMessage(JSON.stringify(chargeObj));
                                }
                            } else if (res.code == 10000) {  //登录失效
                                _this.$vux.loading.hide();
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
                                _this.isShow = true;
                                _this.TextMsg = res.msg;
                                _this.isFlag = false;
                                _this.flag = true;
                            }
                        })
                    } else if (this.payType == 1) {
                        //支付宝调的接口
                        this.$server.get(this.AirROOT + "app/v1.0/order/pay/aliapp", parmasObj, headersObj).then(res => {
                            this.$vux.loading.hide();
                            this.flag = false;
                            this.isFlag = true;
                            this.$vux.loading.hide();
                            if (res.code == 200) {
                                let chargeObj = {
                                    type: 2,
                                    payParam: JSON.stringify(res.data.charge),
                                };
                                if (_this.Device.getMobileOperatingSystem() == 'Android') {
                                    window.just_android.performPay(JSON.stringify(chargeObj));
                                }
                                else {
                                    // ios
                                    window.webkit.messageHandlers.performPay.postMessage(JSON.stringify(chargeObj));
                                }
                            } else if (res.code == 10000) {  //登录失效
                                _this.$vux.loading.hide();
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
                                _this.isShow = true;
                                _this.TextMsg = res.msg;
                                _this.isFlag = false;
                                _this.flag = true;
                            }
                        })
                    }
                }else {
                    this.$vux.loading.hide();
                    this.$vux.toast.show({  //提示
                        text: '订单支付中，请不要重复支付',
                        type:'text',
                        width:'80%',
                    })
                }

            },
            //支付状态
            payStatus(type) {
                //type = 0  成功 , type = 1  失败
                if (type == 0) {
                    this.$router.push({path: 'paySuccess', query: {orderId: this.orderId}})
                } else if (type == 1) {
                    this.$router.push({path: 'payFail', query: {orderId: this.orderId}})
                }
            },
            goPay() {
                this.isPay = true;
            },
            goBack() {
                this.isPay = false;
                this.closePage();
            },
        },
        filters: {
            formatDate(time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },

        mounted() {
            //将要给原生调用的方法挂载到 window 上面
            window.payStatus = this.payStatus;
            //监听浏览器返回
            //监听浏览器返回
            this.goHistory(this.goPay);
        },
        destroyed() {
            window.removeEventListener('popstate', this.goPay, false);
        },

        created() {
            //获取上一级带过来的参数
            this.orderId = this.$route.query.orderId;
            this.carUseTime = this.$route.query.carUseTime;

            this.token = localStorage.getItem("token");

            if (this.$route.query.orderId != undefined) {
                this.orderInfo(this.orderId);
            }

        },
    }
</script>

<style scoped>
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

    .orderCsList{padding-left: 2rem;padding-right: 2rem;padding-top:1rem;}
    .orderCsList h3{font-size: 1.3rem; padding-bottom: 0.5rem;}
    .orderCsList ul li{font-size: 1.25rem; line-height:2rem}
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

    .close_icon{position: relative;z-index: 2;text-align: right;padding: 1.5rem;}
    .close_icon img{width: 1.1rem;}

</style>
