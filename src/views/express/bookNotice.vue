<template>
    <div id="bookNotice" class="animatedRouter  FontS12">
        <div class="local_scroll">
            <h2 class="bigTitle padT2 padL1D5">预定须知</h2>
            <div class="pad1D5" style="padding-top: 1rem;">
                <div  class="orderColor6 FontS12 lineH2D5  goodDetailData " >
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
</template>

<script>
  import airCommonBtn from '@/components/airCommonBtn';
  export default {
    name: 'bookNotice',
    components:{
      airCommonBtn
    },
    data:function(){
      return {
        //组件按钮
        airCommonBtnText:'返回',

      }
    },
    methods:{

    },
    created(){
    }
  }
</script>

<style scoped>
    #bookNotice{height: 100%;background: #ffffff;}
    .rule-header{text-align: left;font-size: 1.25rem}
    .local_scroll{height: 100%;}
</style>
