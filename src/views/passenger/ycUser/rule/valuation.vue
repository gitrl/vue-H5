<template>
    <div id="valuation">
        <div class="aboutTitle">出租车计价规则</div>
        <div class="pad2 FontS12">
            <div>
                <h3 class="fontW ">收费标准</h3>
                <p class="colorGray lineH2 padTD5">3公里以内起程价为10元，超过3公里后，每公里加收2元（即基本单价2元/公里）</p>
            </div>
            <div class="padT1">
                <h3 class=" fontW">等候费</h3>
                <p class="colorGray lineH2 padTD5">等候6分钟后，每累计4分钟折算1公里基本单价的50%</p>
            </div>
            <div class="padT1">
                <h3 class=" fontW">返空费</h3>
                <p class="colorGray lineH2 padTD5">单次旅程8公里以上每公里加收1公里运价50%</p>
            </div>
            <div class="padT1" >
                <h3 class=" fontW">计费方式</h3>
                <p class="colorGray lineH2 padTD5">超过3公里计价器每0.5公里计费一次1元</p>
            </div>

            <p class="padT2" style="color: #FEBE00">*以上计费标准位数收拾按照四舍五入收取。</p>
        </div>
       <!-- <div class="ModuleLi">
            <ul>
                <li>实时最低消费 <span>{{PricingRuleData.minimum_consumption_amount}}元</span></li>
                <li>里程费<span>{{PricingRuleData.mileage_amount}}元/公里</span></li>
                <li>时长费 <span>{{PricingRuleData.length_time_amount}}元/分钟</span></li>
            </ul>
        </div>-->

    </div>
</template>

<script>
  import "../../../../assets/css/Module.css"
  export default {
    name: 'valuation',
    data:function () {
      return {
        PricingRuleData:[]
      }
    },
    methods:{
      PricingRule(){
        this.$server.post(this.baseURL+'yueche-driver/v2.0/oms-call/get-valuationRule-byType/0',null,null).then(res => {
          this.PricingRuleData = res.data[0];
        })
      }
    },
    created: function () {
     // this.PricingRule()
    },

  }
</script>

<style scoped>
    #valuation{height: 100%;background: #ffffff;}
    .aboutTitle{padding:2rem ;font-weight: bold;font-size: 1.5rem;padding-bottom: 1rem;}
    .padTD5{padding-top: 0.5rem;}
</style>
