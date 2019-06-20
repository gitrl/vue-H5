<template>
    <div class="ModelPopBox" v-show="isShowPop">
        <div class="PopContent">
            <div class="PopContentText">{{Text}}</div>
            <div class="PopBtnBox TextC">
                <span class="PopBtn" @click="modelClose()">{{BtnText}}</span>

            </div>
        </div>
    </div>
</template>

<script>
  import "../assets/css/Module.css"
  export default {
    name: 'modelPop',
    props: {//定义传值的类型
      isShowPop: true,
      Text:"",
      BtnText:"",
      childByValue:""
    },
    data:function(){
      return {
        isShowV:false
      }
    },

    methods:{
      modelClose(){
        // childByValue是在父组件on监听的方法
        // 第二个参数this.childValue是需要传的值
        this.$emit('childByValue', this.isShowV);
      }
    }
  }
</script>

<style scoped>

</style>
