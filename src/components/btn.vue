<template>
    <a class="contactCustomerBtn" :class="{ active: isActive}"  @click="show()">{{message}}</a>
</template>

<script>
  export default {
    name: 'btn',
    props: {//定义传值的类型
      message: String
    },
    data:function(){
      return {
        isActive:false
      }
    },
    methods:{
      show(){
       // this.isActive = true;
      }
    }
  }
</script>

<style scoped>

    .contactCustomerBtn{text-align: center;border-radius: 30px;width: 100%;height: 4rem; display:inline-block;line-height: 4rem;color: #ffffff;border: none;outline: none;  background: -webkit-linear-gradient(left,  #407FFD 50%,#44A0FE 100%);font-size: 1.4rem; cursor: pointer;box-shadow:0 2px 10px -1px #dadde2;}
    .contactCustomerBtn.active{background: rgba(86,118,234,0.5)}
</style>
