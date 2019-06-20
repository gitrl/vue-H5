<template>
    <div class="complaintListNull" >
        <img src="../../assets/images/airPort/lclose_icon.png" alt="" style="width: 6rem;">
        <div class="TextC">支付失败</div>
        <button class="sureBtn" @click="faileBtn">返回</button>
    </div>
</template>

<script>
  export default {
    name: 'payFail',
    data:function () {
      return {
          id:'',
        token:'',
      }
    },
    methods:{
      faileBtn(){
          if (!navigator.onLine) {  //判断有无网络
              this.$vux.loading.hide();
              this.$vux.toast.show({
                  text: "检查手机网络",
                  type:'text',
                  width:'80%',
              });
              return
          }
        this.$router.push({path:'confirmPay',query:{id:this.id}})
      }
    },
      created(){
          //获取上一级带过来的参数
        var param = this.GetRequest();
        this.id  = param.id;
        this.token  = param.token;

        //判断是否登录
        if(localStorage.getItem("token")){
          this.token = localStorage.getItem("token");
        }else {
          this.token = this.$route.query.token;
        }

      }
  }
</script>

<style scoped>
    /*暂时信息*/
    .complaintListNull{height: 80%;display: flex;align-items: center;justify-content: center;flex-direction: column;}
    .complaintListNull img{margin: 1rem;}
    .complaintListNull div{color:#FEBE00;font-size: 1.5rem;padding-left: 0 !important;}
    .sureBtn{
        width:16rem;
        height: 3.5rem;
        background:linear-gradient(90deg,rgba(64,127,253,1) 0%,rgba(68,160,254,1) 100%);
        box-shadow:0px 2px 4px 0px rgba(102,111,125,0.2);
        border-radius:2rem;
        border: none;
        font-size: 1.5rem;
        margin-top:4rem;
        color: #fff;
    }
</style>
