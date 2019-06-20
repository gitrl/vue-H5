<template>
    <div class="express">
        <div class="local_scroll" v-if="JSON.stringify(goodDetailData) != '{}'">
            <div class="beaut_pic"><img :src="goodDetailData.titleImg"> </div>
            <div class="padL1D5 padR1 padB1 bgcolorW">
                <h3 class="FontS14 orderColor4 lineH2D5 padTD5 fontW">{{goodDetailData.title}}</h3>
                <p class="priceColor flex"><span><i>¥</i>{{numDiv(goodDetailData.datePriceList[0].price,100)}} </span><span class="orderColor6 lineH2D5 FontS11 flexC TextR">{{goodDetailData.virtualSaleNum}}人参加过</span></p>
                <div class="expressTt"><span class="expressBd1 orderColor2">急速出票，立即出行</span><span class="expressBd1 orderColor2">自由安排，纯玩无购物</span></div>
            </div>
            <div class="marT1 bgcolorW">
                <div class="tabBox"><span  @click="checkTab(index)" v-for="(item,index) in tabBox" :key="index" :class="{active:isTab==index}"><i>{{item}}</i></span></div>
                <div>
                    <div class="">
                        <div class="bgcolorW">
                            <div v-if="isTab==0" class="orderColor6 FontS12 lineH2 padB1 goodDetailData">
                                <img :src="goodDetailData.detailImg+'?imageView2/q/80'">
                            </div>
                            <div v-if="isTab==1"  class="orderColor6 FontS12 padL1D5 lineH2D5 padB1 goodDetailData padT1" style="padding-right: 1.5rem">
                                <p class="fontW orderColor5">费用说明：</p>
                                <div>
                                    <p class="fontW" style="margin-left: -0.2rem;">【费用包含】</p>
                                    <p>车辆：1人1正座，7－29座正规旅游车</p>
                                    <p class="fontW" style="margin-left: -0.2rem;">【费用不含】</p>
                                    <p>
                                        1. 不含藏獒、牦牛合影费用；<br/>
                                        2. 不含餐费及全程个人消费；<br/>
                                        3. 不含接送，请自行前往指定地点集合；<br/>
                                        4. 不含旅游意外险，如有需要请自行购买;<br/>
                                        5. 一切“费用包含”以外的费用
                                    </p>
                                </div>
                                <p class="fontW orderColor5 padT1" >特殊人群：</p>
                                <div>
                                    <p class="fontW" style="margin-left: -0.2rem;">【港澳同胞及外国游客】</p>
                                    <p>
                                        本产品目前不提供入藏旅游批准函办理服务，因此暂不接受外宾、台湾同胞报名，敬请谅解。
                                    </p>
                                    <p class="fontW" style="margin-left: -0.2rem;">【18岁以下未成年人】</p>
                                    <p>
                                        18岁以下未成年人需要至少一名家长或成年旅客全程陪同。
                                    </p>
                                    <p class="fontW" style="margin-left: -0.2rem;">【65周岁（含）以上老年人】</p>
                                    <p>
                                        65周岁（含）以上老年人预订出行需确保身体健康适宜旅游，并有18周岁以上家属或朋友（因服务能力所限无法接待及限制接待的人除外）全程陪同出行。
                                    </p>
                                </div>

                                <p class="fontW orderColor5 padT1" >使用方法：</p>
                                <div>
                                    <p>
                                        付款成功后将会有专人客服在出行前一天19:00前给您电话确认上车地点和时间，出行当天乘车人凭订单二维码验票上车。
                                    </p>
                                </div>
                                <p class="fontW orderColor5 padT1" >违规条款：</p>
                                <div>
                                    <p class="fontW" style="margin-left: -0.2rem;">【用户取消】</p>
                                    <p>
                                        使用日期当天规定的发车时间前可免责取消，不收取损失费。
                                    </p>
                                    <p class="fontW" style="margin-left: -0.2rem;">【官方取消】</p>
                                    <p>
                                        1. 牦牛出行郑重声明，订单一经确认，必定出行；<br/>
                                        2.如遇不可抗力因素（包括自然灾害、如台风、地震、洪水、冰雹；政府行为，如征收、征用；社会异常事件，如罢工、骚乱三方面）导致无法出行的，平台受法律免责保护，并具有最终解释权。
                                    </p>
                                </div>

                                <p class="fontW orderColor5 padT1" >出行指南：</p>
                                <div>
                                    <p class="fontW"  style="margin-left: -0.2rem;">【出行指南】</p>
                                    <p>
                                        1. 出行期间请随身携带本人的有效身份证原件，未满16周岁者请携带户口本原件；超过16周岁的游客若没有办理身份证，请在户口所在地开出相关身份证明，以免影响登机或酒店入住。出行前请务必检查自己证件的有效期。<br/>
                                        2. 本产品含高原行程，高原地区气候干燥，日照强烈，紫外线强，建议客人带好墨镜、太阳帽、防晒霜、润唇膏等物品；高原地区早晚温差大，请客人准备长袖衣裤及防寒衣物，另外建议携带感冒药、肠胃药、阿斯匹林、安定、头痛粉等药品，以防高原反应引起的身体不适。<br/>
                                        3.禁忌提示：请尊重当地的饮食习惯、习俗禁忌、宗教礼仪等，入乡随俗，融入当地的民风民情，附“西藏民俗禁忌”。<br/>
                                        4.为了您人身、财产的安全，请您避免在公开场合暴露贵重物品及大量现金。上街时需时刻看管好首饰、相机等随身物品。
                                    </p>
                                </div>
                                <p class="fontW orderColor5 padT1" >支付信息：</p>
                                <div>
                                    <p class="fontW"  style="margin-left: -0.2rem;">【支付方式及退款方式】</p>
                                    <p>
                                        1. 平台支持微信支付，支付宝支付两种方式；<br/>
                                        2. 用户取消订单后，如有退款的情况，将直接退回支付账户（例如用户用微信支付的订单，则退回微信账户，用支付宝支付的订单，则退回支付宝账户）。
                                    </p>
                                    <p class="fontW" style="margin-left: -0.2rem;">【价格说明】</p>
                                    <p>
                                        1. 由于产品信息实时更新、市场价格波动等可能会与您预订时展示的不一致。<br/>
                                        2.具体成交价格根据产品或服务参加活动，或会员使用优惠券等发生变化，最终以订单结算页价格为准。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--固定在底部的按钮 S-->
        <div class="payment">
            <div class="paymentBox flex">
                <div class="survice_icon" @click="callAndroid(iphone)"><img src="../../assets/images/express/icon/survice_icon.png"><br/>客服 </div>
                <div class="paymentBtn flexC" @click="bookInfo()">立即预订</div>
            </div>
        </div>
        <!--固定在底部的按钮 E-->
    </div>
</template>

<script>
    export default {
        name: "express",
        data:function () {
            return {
                showAgreen:false,  //用户协议同意否
                goodDetailData:{},
                tabBox:['行程介绍','预定须知'],
                isTab:0,
                iphone:'18189913006',
            }
        },
        methods:{
            isAgreen(){
                this.showAgreen = !this.showAgreen
            },
            bookNotice(){  //预定须知
                this.$router.push({path:'bookNotice'})
            },
            bookInfo(){
                if (!navigator.onLine) {  //判断有无网络
                    this.$vux.loading.hide();
                    this.$vux.toast.show({
                        text: "检查手机网络",
                        type:'text',
                        width:'80%',
                    });
                    return
                }
                this.$router.push({path:'bookInfo',query:{id:this.goodDetailData.id}})
            },
            goodDetail(id){
                this.$vux.loading.show();
                this.$server.get(this.expressROOT+'app/v1.0/goods/detail?id='+id,null,null).then(res =>{
                    this.$vux.loading.hide();
                    if(res.code==200){
                        this.goodDetailData = res.data;
                        console.log(this.goodDetailData)
                    }else {
                        this.$vux.toast.show({
                            text:res.msg,
                            type:'text',
                            width:'80%'
                        });
                    }
                })
            },
            checkTab(num){
                this.isTab = num;
            }
        },
        created(){
            var id = this.$route.query.id;
            this.goodDetail(id);

            if(JSON.stringify(this.goodDetailData) != '{}'){
                //百度统计
                let arrStatistics = ['30201', '商品详情', '展示', id, this.goodDetailData.title];
                this.baiduS(arrStatistics);
            }
        }
    }
</script>

<style scoped>
    .express{background: #FAFAFA}
    .beaut_pic{width: 100%;overflow: hidden;}
    .beaut_pic img{width: 100%;}
    .priceColor{color: #FEBE00;font-size: 2rem; line-height: 3rem;}
    .priceColor i{font-size: 1.5rem;padding-right: 5px;}
    .expressBd1{border: 1px solid #407FFD; font-size: 1.1rem; border-radius: 3px;padding-left: 0.5rem;padding-right: 0.5rem;line-height: 2rem;margin-right: 1rem;padding-top: 0.3rem;padding-bottom: 0.3rem;}

    .tabBox{border-bottom: 1px solid #E6E6E6;height: 4rem; display: flex;justify-content: center;align-items: center}
    .tabBox span{ font-size: 1.3rem; line-height: 4rem;width: 40%;text-align: center;}
    .tabBox span i{height: 4rem; display: inline-block;padding-left: 2rem;padding-right: 2rem;color: #CECECE;}
    .tabBox span.active i{border-bottom: 2px solid #407ffd;color: #407ffd}

    /*固定在底部的样式*/
    .flexDiv{display: flex;align-items: center;justify-content: flex-start;}
    .agreement{height: 5rem;line-height: 5rem;color: #9B9B9B}
    .agreement img{width: 1.5rem;margin-right: 0.5rem;vertical-align: middle;margin-top: -0.3rem;}
    .payment{position: fixed; z-index: 4; bottom: 0;background-color: #fff;width: 100%;padding-left: 1rem;box-sizing: border-box; border-top: 1px solid #f5f5f5}
    .payment .paymentBox{display: flex;justify-content: space-between;}
    .paymentNum span{font-size: 1.2rem;color: #FFAC00}
    .paymentNum span i{font-size: 1.5rem;}
    .paymentNum img{width: 0.8rem; margin-left: 0.2rem;}
    .down_icon img{transform: rotate(180deg)}

    .paymentBtn{ background: linear-gradient(90deg,#407FFD, #44A0FE);color: #fff;text-align: center; margin-left: 1rem; padding-left:1.5rem;padding-right: 1.5rem; font-size: 1.5rem; line-height: 4.7rem;}
    .survice_icon{font-size: 1.1em;color: #666666; padding-left: 2rem;padding-right: 2rem; text-align: center;padding-top: 0.5rem;padding-bottom: 0.5rem;}
    .survice_icon img{width: 2rem;}

    .goodDetailData img{width: 100%}

    /*苹果滚动*/
    .local_scroll{bottom: 5rem;height: auto;}
</style>
