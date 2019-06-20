<template>
<div id="fastCarPricingRule">
    <div class="aboutTitle">计价规则</div>
    <div class="">
        <ul>
            <li>实时最低消费 <span>{{PricingRuleData.minimumConsumptionAmount}}元</span></li>
            <li>里程费<span>{{PricingRuleData.mileageAmount}}元/公里</span></li>
            <li>时长费 <span>{{PricingRuleData.lengthTimeAmount}}元/分钟</span></li>
        </ul>
    </div>
</div>
</template>

<script>
  // import "../../../assets/css/Module.css"
  export default {
    name: 'fastCarPricingRule',
    data:function () {
      return {
        PricingRuleData:[]
      }
    },
    methods:{
      PricingRule(){
          this.$server.get(this.baseURL+'butterfly-biz/app/v3.0/price/get-price-rule?bizType=1',null,null).then(res => {
              this.PricingRuleData = res.data[0];
          })
      }
    },
    created: function () {
      this.PricingRule()
    },

  }
</script>

<style scoped>
    .aboutTitle{padding:2rem ;font-weight: bold;font-size: 1.5rem;padding-bottom: 1rem;}
    #fastCarPricingRule{height: 100%;background-color: #fff}
    #fastCarPricingRule ul{background: #ffffff;padding: 1rem 2rem 1rem 2rem;}
    #fastCarPricingRule ul li{height: 3.5rem;line-height: 3.5rem;font-size: 1.3rem;color: #757781;}
    #fastCarPricingRule ul li span{float: right}
    #fastCarPricingRule ul li:last-child{border-bottom: none}

</style>
