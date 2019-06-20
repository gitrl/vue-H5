<template>
    <div id="contactCustomerS">
        <div class="contactContent ">
            <p class="TextC lineH2D5 FontS14">7*24小时客服电话<br>
            400-656-2666</p>
            <div class="contactCustomer">
                <Btn :message="parentMsg" v-on:click.native="callAndroid(NumIphone)"></Btn>
            </div>
        </div>
    </div>
</template>
    `
<script>
  import Btn from '../../../../components/btn'  //引入Btn组件
  export default {
    name: 'service',
    components: {
      Btn
    },
    data:function(){
      return {
        parentMsg: '联系客服',  //在data中定义需要传入按钮的值,
        NumIphone:"4006562666"
      }
    }
  }
</script>

<style scoped>
    #contactCustomerS{background: #ffffff;}
    .contactContent{padding-top: 5rem; padding-bottom: 5rem;}
    .contactCustomer{padding: 2rem; padding-top: 3rem;}
</style>
