<template>
    <div class="complaintListNull" >
        <img src="../../assets/images/airPort/check_s.png" alt="" style="width: 6rem;">
        <div class="TextC">支付成功</div>
        <button class="sureBtn" @click="successBtn">确定</button>
    </div>
</template>

<script>
    export default {
        name: 'paySuccess',
        data:function () {
            return {
                orderId:'',
                token:'',
            }
        },
        methods:{
            successBtn(){
                this.closePage();
            }
        },
        created(){
            //获取上一级带过来的参数
            var param = this.GetRequest();
            this.orderId  = param.orderId;

            //判断是否登录

            this.token = localStorage.getItem("token");

            //百度统计
            let arrStatistics = ['20010', '接送机', '付款成功', '', ''];
            this.baiduS(arrStatistics);
        }
    }
</script>

<style scoped>
    /*暂时信息*/
    .complaintListNull{height: 80%;display: flex;align-items: center;justify-content: center;flex-direction: column;}
    .complaintListNull img{margin: 1rem;}
    .complaintListNull div{color:#44A0FE;font-size: 1.5rem}
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
