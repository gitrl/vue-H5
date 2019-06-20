<template>
    <div id="weChatPublicOrderDetail">
        <div class="orderDetailBox padT2 padB2" v-if="JSON.stringify(orderDetailData) != '{}'">
            <div  class="orderDetailTit flex">
                <span class="flexC">订单号：{{orderDetailData.orderNumber}}</span>
                <div v-if="orderDetailData.orderStatus ==3  || orderDetailData.orderStatus == 4 || orderDetailData.orderStatus == 5">
                    {{orderDetailData.orderStatus == 3?'已完成':''}}
                    {{orderDetailData.orderStatus == 4?'退款中':''}}
                    {{orderDetailData.orderStatus == 5?'已取消':''}}
                </div>
                <div v-else>
                    {{orderDetailData.dispatchStatus == 1?'未派车':''}}
                    {{orderDetailData.dispatchStatus == 2?'已派车':''}}
                </div>

            </div>
            <div class="orderDetailFrame">
                <div class="pad1D5">
                    <div class="flex orderDetailTit2">
                        <span>{{orderDetailData.orderType == 1?'接机':''}}{{orderDetailData.orderType == 2?'送机':''}}{{orderDetailData.orderType == 3?'接站':''}}{{orderDetailData.orderType == 4?'送站':''}}</span>
                        <p class="flexC">{{orderDetailData.shiftNumber}}
                            <i  v-if="orderDetailData.orderType == '1' || orderDetailData.orderType == '3' ">{{this.format(Number(orderDetailData.shiftArriveTime)).slice(10,16)}} 抵达</i>
                            <i v-else>{{this.format(Number(orderDetailData.shiftStartTime)).slice(10,16)}} 出发</i>
                        </p>
                    </div>
                    <div class="flex">{{orderDetailData.orderType == 1?'接机':''}}{{orderDetailData.orderType == 2?'送机':''}}{{orderDetailData.orderType == 3?'接站':''}}{{orderDetailData.orderType == 4?'送站':''}}<span>时间：</span><p class="flexC">{{Number(orderDetailData.willStartTime) | formatDate}} (预计)</p></div>
                    <div v-if="orderDetailData.orderType == '1' || orderDetailData.orderType == '3'">目的地 : <span>{{orderDetailData.endAddress}}</span></div>
                    <div v-else>出发地 : <span>{{orderDetailData.startAddress}}</span></div>
                    <div class="flex"><span>用车方式：</span><p class="flexC" ><span v-if="orderDetailData.useType==1">拼车</span><span v-else>包车</span></p></div>
                    <div class="flex" v-if="orderDetailData.useType==2"><span>车辆类型：</span><p class="flexC" >{{orderDetailData.goodsName}}</p></div>
                    <div class="flex" v-if="orderDetailData.useType==1"><span>同行人数：</span><p class="flexC">{{orderDetailData.passengerNumber }}人</p></div>
                    <div class="flex"><span>联系人：</span><p class="flexC">{{orderDetailData.contacts}}</p></div>
                    <div class="flex"><span>联系电话：</span><p class="flexC">{{orderDetailData.contactNumber}}</p></div>
                    <div class="borderT marT1 padT1" v-if="orderDetailData.dispatchStatus == 2 && orderDetailData.orderDrivers.length > 0">
                        <div class="flex"><span>司机名称：</span><p class="flexC">{{orderDetailData.orderDrivers[0].driverName}}</p></div>
                        <div class="flex"><span>司机电话：</span><p class="flexC">{{orderDetailData.orderDrivers[0].driverNumber}}</p></div>
                        <div class="flex"><span>车牌号：</span><p class="flexC">{{orderDetailData.orderDrivers[0].plateNumber}}</p></div>
                    </div>
                </div>
            </div>
            <div class="orderDetailFrame" v-if="ticketYpm != undefined && orderDetailData.orderStatus == 3 || this.orderDetailData.orderStatus == 2">
                <div class="pad1D5">
                    <div class="flex borderB padB1">
                        <span>订单状态：</span>
                        <p class="flexC TextR ">
                            <span class="orderColor2" v-if="orderDetailData.checkStatus == 1 && orderDetailData.orderStatus != 3">待核销</span>
                            <span class="orderColor6" v-else-if="orderDetailData.checkStatus == 2 && orderDetailData.orderStatus != 3">已核销</span>
                            <span class="orderColor6" v-else-if="orderDetailData.orderStatus== 3">已完成</span>
                        </p>
                    </div>
                    <div class="TextC">
                        <canvas id="qrccode-canvas"></canvas>
                        <p class="TextC">{{this.ticketYpm}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var QRCode = require('qrcode');
    var canvas = '';
    import {formatDate} from '../../assets/js/date';  //时间过滤器
    export default {
        name: "weChatPublicOrderDetail",
        data:function () {
            return {
                isInquire:false,
                ticketYpm:'',
                orderNum:'',
                iphone:'',
                orderDetailData:{},
            }
        },

        methods:{
            //订单详情
            orderDetail(ordernum,phonenum){
                var _this  =this;
                let params = {
                    ordernum:ordernum,
                    phonenum:phonenum,
                }
                this.$server.get(this.AirROOT+'ws/v1.0/order/get?ordernum='+ordernum+'&phonenum='+phonenum,null,null).then(res =>{
                    if(res.code == 200){
                        this.orderDetailData = res.data;
                        console.log(res.data);
                        this.ticketYpm = this.orderDetailData.qrCode;
                        if(this.orderDetailData.orderStatus == 5 || this.orderDetailData.orderStatus == 4){

                        }else {

                            setTimeout(function () {
                                _this.createQrc();
                            },1000)
                        }


                    }

                })
            },
            //二维码生成
            createQrc: function () {
                canvas = document.getElementById('qrccode-canvas');
                let _this =this;
                if(_this.ticketYpm != undefined){
                    QRCode.toCanvas(canvas, _this.ticketYpm, (error) => {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log('success')
                        }
                    });
                }else {
                    // this.$vux.toast.show({
                    //     text:'此订单暂无二维码',
                    //     type:'text',
                    //     width:'80%'
                    // });
                }
            },
        },
        filters: {
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日 hh:mm')
            },
        },
        created() {
            var _this = this;
            this.orderNum = this.$route.query.orderNum;
            this.iphone = this.$route.query.iphone;
            this.orderDetail(this.orderNum,this.iphone);

        }
    }
</script>

<style scoped>
    #weChatPublicOrderDetail{background: #F5F5F5 url("../../assets/images/weChatPublic/blue_pic.png") no-repeat; height: 100%; width: 100%; background-size: 100% auto;}
    .orderDetailBox{width: 90%;margin: 0 auto;}
    .orderDetailTit{color: #ffffff;font-size: 1.3rem;}
    .orderDetailFrame{background: #ffffff;border-radius: 0.3rem;box-shadow: 0 5px 5px rgba(0,0,0,0.2);margin-top: 1rem; font-size: 1.25rem; color: #333333;line-height: 2.5rem;}
    .orderDetailTit2{font-size: 1.5rem;color: #333333;font-weight: bold;padding-bottom: 1rem;}
    .orderDetailTit2 span{font-size: 1.4rem;color: #407FFD; font-weight: normal; border:1px solid #407FFD;padding-left: 1.2rem; padding-right: 1.2rem;line-height: 2.5rem;border-radius: 0.2rem;margin-right: 1rem;}

    #qrccode-canvas{width: 150px !important; height: 150px !important;}
</style>