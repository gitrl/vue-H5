<template>
    <div id="weChatPublicIndex">
        <div class="banner_pic"><img src="../../assets/images/weChatPublic/banner_pic.png"> </div>
        <div class="weChatBox">
            <ul>
                <li><label><img src="../../assets/images/weChatPublic/ticket_icon.png"> </label><input type="text" v-model="orderNum" placeholder="请输入订单号"></li>
                <li><label><img src="../../assets/images/weChatPublic/call_icon.png"> </label><input type="number" v-model="iphone" placeholder="请输入联系人电话"></li>
            </ul>
            <div class="padT2">
                <div class="airCommonBtn" :class="{active:isInquire}" @click="searchOrder()">查询</div>
            </div>
        </div>
        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
    </div>
</template>

<script>
    import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
    export default {
        name: "weChatPublicIndex",
        components:{
            ModelPop,
        },
        data:function () {
            return {
                //组件pop
                isShow:false,
                isSuss:false,
                TextMsg:"",
                BtnTextMsg:"确定",

                isInquire:false,
                orderNum:'',
                iphone:''
            }
        },
        methods:{
            //子组件向父组件传值
            childByValue: function (childValue) {
                // childValue就是子组件传过来的值
                this.isShow = childValue;
            },
            //订单详情
            searchOrder(){
                this.$server.get(this.AirROOT+'ws/v1.0/order/get?ordernum='+this.orderNum+'&phonenum='+this.iphone,null,null).then(res =>{
                    console.log(res)
                    if(res.code == 200){
                        this.$router.push({path:'orderDetail',query:{orderNum:this.orderNum,iphone:this.iphone}})
                    }else {
                        this.isShow = true;
                        this.TextMsg = res.msg;
                    }

                })
            },
            search(){
                this.$router.push({path:'orderDetail',query:{orderNum:this.orderNum,iphone:this.iphone}})
            }
        },
        watch:{
            orderNum:function (val) {
                if(val != '' && this.iphone != ''){
                    this.isInquire = true;
                }else {
                    this.isInquire = false;
                }
            },
            iphone:function (val) {
                if(val != '' && this.iphone != ''){
                    this.isInquire = true;
                }else {
                    this.isInquire = false;
                }
            }
        }
    }
</script>

<style scoped>
    .weChatPublicIndex{background: #ffffff;}
    .banner_pic img{width: 100%;}
    .weChatBox{width: 85%;margin: 0 auto; padding-top: 2rem;}
    .weChatBox ul{padding-bottom: 1rem;}
    .weChatBox ul li{display: flex; justify-content: center;align-items: center; border-bottom: 1px solid #F5F5F5;height: 3rem; padding-bottom: 1rem; padding-top: 1.5rem;}
    .weChatBox ul li label{padding-left: 1rem;padding-right: 1rem;}
    .weChatBox ul li label img{width: 1.5rem; vertical-align: middle}
    .weChatBox ul li input{ flex: 1; font-size: 1.4rem; outline: none}
    .weChatBox ul li span{font-size: 1.2rem;color: #407FFD;padding-right: 0.5rem;}
    .airCommonBtn{background: #d6d6d6; box-shadow: 0 0 10px rgba(0,0,0,0.2);
        letter-spacing:2px;height: 4rem;border-radius: 2rem;line-height: 4rem;font-size: 1.5rem;text-align: center;color: #ffffff;}
    .airCommonBtn.active{
        background: -webkit-linear-gradient(90deg,#407FFD, #44A0FE); /* Safari 5.1 to 6.0 */
        background: -o-linear-gradient(90deg,#407FFD, #44A0FE); /* Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(90deg,#407FFD, #44A0FE); /* Firefox 3.6 to 15 */
        background: linear-gradient(90deg,#407FFD, #44A0FE);
       }
</style>