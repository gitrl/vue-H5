<template>
    <div id="reserve">
        <div class="RuleBox">
            <dl :class="{active:carRuleBoxData[0].isShow}" @click="toggle(0)">
                <dd class="toggleTitle"><span><img src="../../../../assets/images/passenger/icon/icontsrq.png"> </span>费用说明</dd>
                <dt>
                    <h3>费用包含</h3>
                    <p class="borderB padB1"> 1.行程中所列景点的全部门票。<br/>
                        2.全程旅游巴士：一人一正座。<br/>
                        3.包车费用：司机服务费、车辆燃油费、高速费、停车费、过路费。<br/>
                        4.司机服务费。</p>
                    <h3 class="padT1">费用不含</h3>
                    <p> 1.全程餐费自理，全程无导游。<br/>
                        2.所有个人消费及费用包含中未提及费用。<br/>
                        3.所有个人消费及费用包含中未提及费用。<br/>
                        4.因交通延阻、罢工、天气、飞机、机器故障、航班取消或更改时间等不可抗力原因所导致的额外费用。</p>

                </dt>
            </dl>
            <dl :class="{active:carRuleBoxData[1].isShow}" @click="toggle(1)">
                <dd class="toggleTitle"><span><img src="../../../../assets/images/passenger/icon/iconwytk.png"> </span>违约条款</dd>
                <dt>
                    <h3>旅行社违约</h3>
                    <p>在规定的时间内违约，除退还全额旅游费用外，另支付违约金比例如下：</p>
                    <div class="ModuleLi" style="padding: 0;">
                        <ul style="padding: 1rem">
                            <li>出行前 <span>违约金(占订单总费用)</span></li>
                            <li>8-15日 <span>10%</span></li>
                            <li>4-7日 <span>20%</span></li>
                            <li>1-3日 <span>40%</span></li>
                            <li>出行当日 <span>70%</span></li>
                        </ul>
                    </div>
                    <h3 class="borderT padT1">旅游者违约</h3>
                    <p>在行程前接触合同的，必要的费用扣除标准为：</p>
                    <div class="ModuleLi" style="padding: 0;">
                        <ul style="padding: 1rem">
                            <li>出行前 <span>违约金(占订单总费用)</span></li>
                            <li>8-15日 <span>20%</span></li>
                            <li>4-7日 <span>40%</span></li>
                            <li>1-3日 <span>70%</span></li>
                            <li>出行当日 <span>100%</span></li>
                        </ul>
                    </div>
                </dt>
            </dl>
            <dl :class="{active:carRuleBoxData[2].isShow}" @click="toggle(2)">
                <dd class="toggleTitle"><span><img src="../../../../assets/images/passenger/icon/iconcxzl.png"> </span>出行须知</dd>
                <dt>
                    <h3>集合</h3>
                    <p class="borderB padB1">请您务必在指定时间到指定接车地点集合，不要迟到。
                        此产品无法退改、无法换乘其他班次或中途参加，若因自身原因导致未能参加本行程，需自行承担相应损失，敬请谅解。</p>
                    <h3 class="padT1">行中须知</h3>
                    <p  class="borderB padB1"> 1.团队行程中，不可以提前离团或中途脱团，如您选择中途离团，未完成部分将被视为您自行放弃，不退任何费用，
                        游客离团或脱团后可能发生的任何意外需自行承担责任，敬请谅解。<br/>
                        2. 在旅游旺季或其他一些特殊情况下，行程的出发时间可能会提前或略微延后（具体出发时间以导游通知为准），届时请提前做好准备。<br/>
                        3.行程中涉及的交通、游览及停留时间以当天实际情况为准。如遇特殊情况（如堵车、天气原因等），
                        在不减少行程中景点的前提下，导游可视实际情况并征得客人同意后，合理调整行程中景点的游玩顺序。</p>
                    <h3 class="padT1">当地习俗/法规</h3>
                    <p  class="borderB padB1">1.行程中会进入寺庙参观，要求客人穿戴整齐。不能穿短裤、短裙、吊带背心等衣物，裤子需过膝盖、衣服不能露肩膀，否则将不被允许进入寺庙。<br/>
                        2.本产品可能会根据天气等因素进行调整，为了您的安全，工作人员有权要求客人中止户外活动，并与您沟通，另行安排，具体以当天实际情况为准。<br/>
                        3.如遇恶劣天气等其它不可抗力因素，园区可能会在没有预先通知的情况下，
                        延迟变更游乐设施的运行时间或节目表演时间，甚至可能取消部分项目运行和表演。因恶劣天气影响设备故障、停机、演出取消退门票费用。</p>
                    <h3 class="padT1">人群说明</h3>
                    <p  class="borderB padB1"> 1.本产品已为特惠，持各类证件的游客将不再享受额外的景区门票优惠政策。<br/>
                        2.65周岁(含)以上老年人需确保身体健康适宜出行，需至少一名成年旅客全程陪同出行。<br/>
                        3.16周岁(含)以下未成年人，需至少一名成年旅客全程陪同出行。<br/>
                        4.老人需要健康证明，查看健康证明，请填写好于出行当日交于导游。<br/>
                        5.孕妇、心脏病、恐高症等特殊人群不宜参加本团，有被拒风险，请您谨慎预订。<br/>
                        6.本产品不接受费中国籍客人预订，敬请谅解。<br/>
                        7.身高以当地景点测量结果为准。</p>
                    <h3 class="padT1">使用方法</h3>
                    <p> 1.预订成功后您会收到确认短信。<br/>
                        2.司机最晚会于出行前1天（21:30前）前以电话或短信形式与您确认工作人员信息和车牌号，若为联系请及时与客服联系。<br/>
                        3.出行当日请凭预留的出行人姓名, 联系手机及有效证件（身份证/港澳通行证/护照等）在约定时间(建议提前10分钟)前往约定地点集合。<br/>
                        4.若出行前无短信、电话或其他方式与您确认出行相关信息，请拨打紧急联系电话或客服热线。</p>
                </dt>
            </dl>
            <dl :class="{active:carRuleBoxData[3].isShow}" @click="toggle(3)">
                <dd class="toggleTitle"><span><img src="../../../../assets/images/passenger/icon/iconzfxx.png"> </span>支付信息</dd>
                <dt>
                    <h3 class="padT1">支付方式及退款方式</h3>
                    <p  class="borderB padB1">1. 平台支持微信支付，支付宝支付两种方式。<br/>
                        2. 用户取消订单后，如有退款的情况，将直接退回支付账户（例如用
                        户用微信支付的订单，则退回微信账户，用支付宝支付的订单，则退
                        回支付宝账户）。</p>
                    <h3 class="padT1">价格说明</h3>
                    <p>1. 由于产品信息实时更新、市场价格波动等可能会与您预订时展示的
                        不一致。<br/>
                        2.具体成交价格根据产品或服务参加活动，或会员使用优惠券等发生
                        变化，最终以订单结算页价格为准。</p>

                </dt>
            </dl>
        </div>
        <div class="lineH2D5 FontS13 pad1">
            <div class="moneyWithDrawal bgcolorW pad1">
                <p>温馨提示</p>
                <p><span>*</span>请旅客于旅游期间内，保持您的手机畅通，以便相关接待人员与您联系。</p>
                <p><span>*</span>如您有晕车或晕船的先例，建议您做好防治晕车或晕船的准备工作，以免影响您的愉决旅途。</p>
                <p><span>*</span>请穿着舒适的衣服、鞋子参与活动，准备好防晒霜、防虫液、防风外套、相机等物品。</p>
                <p><span>*</span>请保管好随身物品，尽量不要携带贵重物品，如在行程中遗失或损坏，需自行承担。</p>
                <p>安全警告</p>
                <p><span>*</span>游泳、漂流、潜水、滑雪、溜冰、戏雪等活动项目，均存在一定风险。参与前请根据自身条件，并充分参考当地相关部门及其它专业机构的相关公告和建议后量力而行。</p>
                <p><span>*</span>因乘坐飞机前后24小时内不适宜潜水，此项目不适合在行程的第一天和最后一天使用，请合理选择出行时间。</p>
                <p>为普及旅游安全知识及旅游文明公约，使您的旅程顺利圆满完成，特制定 <a href="http://mp.weixin.qq.com/mp/homepage?__biz=MzU3ODQ5MzU3NQ==&hid=1&sn=f93ac26437afd7b32a1f48f9933403fa&scene=21#wechat_redirect">《西藏旅游服务旅游告游客注意事顶》</a>，请您认真阅读并切实遵守。</p>
            </div>
        </div>
    </div>
</template>

<script>
  import '../../../../assets/css/Module.css';
  export default {
    name: 'reserve',
    data:function () {
      return {
        carRuleBoxData:[{isShow:false},{isShow:false},{isShow:false},{isShow:false}],
      }
    },methods:{
      toggle(index){
        this.carRuleBoxData[index].isShow =! this.carRuleBoxData[index].isShow;
      }
    }
  }


</script>

<style scoped>

</style>
