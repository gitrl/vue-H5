<template>
    <div id="contactService">
        <div class="aboutTitle">客服</div>
        <div class="pad1 bgcolorW">
            <h3 class="FontS12 lineH2D5">您可以在下方留言处，简单描述您所遇到的问题，我们 将安排客服专家为您解答</h3>
            <div class="padT1">
                <p class="TextR">{{remnant}}/255</p>
                <textarea  maxlength= "255" name="" id="" @input="descInput" class="textarea FontS12" cols="30" rows="10" placeholder="请记录你所遇到的问题…" v-model="content"></textarea>
            </div>
        </div>
        <div class="contactCustomer">
            <Btn :message="parentMsg"></Btn>
            <button @click="complaintAdd()" :disabled="isDisable" class="viewComplaintBtn" :class="{disable:isDisable}" ></button>
        </div>
        <div class="contactCustomer" style="margin-top: 2.8rem;">
            <div class="kcall_icon TextC FontS13"  @click="callAndroid(NumIphone)">拨打客服</div>
        </div>

        <!--子组件-->
        <div class="childBox">
            <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
        </div>

    </div>
</template>
<script>

  import "../../../../assets/css/Module.css";
  import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
  import Btn from '@/components/btn.vue'; //引入Btn组件
  let qs = require('qs');
  export default {
    name: 'contactService',
    components: {
      Btn,
      ModelPop
    },
    data:function () {
      return {
        parentMsg:"提交信息",
        NumIphone:"4006562666",
        content:"",  //投诉内容
        isDisable:false,

        //模态框及pop组件
        isShow:false,
        TextMsg:"",
        BtnTextMsg:"确定",

        //输入的字数
        remnant:"0",
      }
    },
    methods:{
        //子组件向父组件传值
        childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.isShow = childValue;
        },
        //新增投诉
        complaintAdd(){
          this.isDisable = true;
          var _this = this;
          if (this.content == '') {
            this.isShow = true;
            this.TextMsg = "投诉内容不能为空";
            this.isDisable = false
          }else {
            var param = this.GetRequest();
            var token = param.token;
            var orderIdN = param.orderId;
            let paramObj = {
                orderId:orderIdN,
                complaintContent:this.content
            };
            let headerObj ={
                'x-access-token':token
            };

            this.$server.post(this.baseURL+'butterfly-biz/app/v1.0/passenger/complaint/add',paramObj,headerObj).then(res =>{
                if(res.code == "200"){
                    this.isDisable = true;
                    setTimeout(function () {
                        _this.$router.push({path: 'submittedSuccessfully'});
                    },1000)
                }else {
                    this.isShow = true;
                    this.TextMsg = res.msg;
                    this.isDisable = false;
                }
            });
          }


        },
      descInput(){
        var txtVal = this.content.length;
        this.remnant = 255 - txtVal;
      }

    }
  }
</script>

<style scoped>
    #contactService{
        height: 100%;
        background-color: #fff;
    }
    .textarea{border: 1px solid #cfcfcf;outline: none}
    .contactCustomer{padding:0 2rem;height: 3rem;margin-top: 5rem;}
    .aboutTitle{padding:1rem ;font-weight: bold;font-size: 1.5rem}
    .kcall_icon{color: #74777E;margin: 0 auto;box-shadow:0 2px 10px -1px #dadde2;border-radius: 2rem; padding-top: 1rem;padding-bottom: 1rem; }
    .kcall_icon span{cursor: pointer;}
    .kcall_icon img{vertical-align: middle;width: 2rem;height: 2rem;margin-right: 0.2rem; margin-top: -0.2rem;}
    .contactCustomer{position: relative;}
    .viewComplaintBtn{position: relative;width: 100%;height:4rem;top: -4rem;background: #ffffff;opacity: 0;}
    .viewComplaintBtn.disable{opacity: 0.5}
</style>
