<template>
    <div v-show="isLogin" style="z-index: 5;position: relative">
        <!--登录弹框 S-->
        <div class="dp-mask"   :class="{current:isLogin}"></div>
        <div class="bulletBoxBottom" :class="{current:isLogin}">
            <!--头部 S-->
            <div class="pad1D5 FontS11 bulletBoxHeader TextC orderColor5" style="padding-bottom: 0">您还未登录，请登录后查询用车！</div>
            <div class="pad1D5 FontS12 lineH2D5 orderColor4">
                <div class="orderDBBtn2" @click="login()">立即登录</div>
                <div class="orderDBBtn1 marT1" @click="dpmask">取消登录</div>
            </div>
        </div>
        <!--登录弹框 S-->
    </div>
</template>

<script>
    export default {
        name: "login",
        props:['isLogin'],
        data:function(){
            return {
                //isLogin:true
                from:'',
                isOrder:'',
                isTab:'',
            }
        },
        methods:{
            dpmask(){
                location.reload();
            },
            login(){
                this.$router.push({path:'/comm/login',query:{from:this.from,isOrder:this.isOrder,isTab:this.isTab}});
            },
        },
        created(){
            let pathName = location.pathname;
            if(pathName.indexOf("orderList") !=-1){  //判断是不是订单列表过来的登录

                this.isOrder = 'true';
            }else {
                this.isOrder = 'false'
            }

            if(pathName.indexOf("airport") != -1){
                this.from = 'airport';
                this.isTab = '0';
            }else if(pathName.indexOf("zuche") != -1 ){
                this.from = 'zuche';
                this.isTab = '1';
            }else if(pathName.indexOf("express") != -1 ){
                this.from = 'express';
                this.isTab = '2';
            }else if(pathName.indexOf("busticket") != -1 ){
                this.from = 'busticket';
            }else if(pathName.indexOf("publiccar") != -1 ){
                this.from = 'publiccar';
            }
        }
    }
</script>

<style scoped>
    /*弹框*/
    .bulletBoxBottom{width: 100%; position: fixed;left: 0;bottom: 0;z-index: 3;-webkit-transition: -webkit-transform 0.3s ease;transition: -webkit-transform 0.3s ease;-webkit-transform: translateY(100%);transform: translateY(100%);border-radius: 1rem 1rem 0 0;background: #ffffff;}
    .bulletBoxBottom.current{display: block;transform: translateY(0px);}
    .dp-mask{position: fixed;width: 100%;height: 100%;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;z-index: 2;}
    .orderDBBtn1,.orderDBBtn2{letter-spacing:2px;height: 4.5rem;border-radius: 3rem;line-height: 4.5rem;font-size: 1.5rem;text-align: center;}
    .orderDBBtn1{background: #ffffff;box-shadow: 0 0 15px rgba(67,73,106,.15);color: #AAAAAA;margin-right:1rem;}
    .orderDBBtn2{background: linear-gradient(90deg,#407FFD, #44A0FE);color: #ffffff;}

</style>
