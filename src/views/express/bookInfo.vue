<template>
<div id="bookInfo"  class="flex" style="flex-direction: column;height: 100%;">
    <div class="flexC" id>
        <h2 class="bigTitle padT1D5 padL1D5 padB2 bgcolorW">预定信息</h2>
        <div>
            <h3 class="FontS13 orderColor4 fontW padL1D5 padT1D5 padB1">出发日期</h3>
            <div class="bgcolorW pad1D5 flex">
                <input class="bookInfoInput flexC" readonly v-model="startTime" />
                <div class="TextR bookInfoCheck">
                    <span>重新选择</span>
                    <div class="calendarBox">
                        <datetime v-model="startTime"  :start-date="startDate"  :end-date="endDate"  format="YYYY-MM-DD"></datetime>
                    </div>
                </div>
            </div>
        </div>
        <div class="personalInfo">
            <h3 class="FontS13 orderColor4 fontW padL1D5 padT1D5 padB1">个人信息</h3>
            <ul class="bgcolorW">
                <li>
                    <div class="orderColor5 FontS13">人数</div>
                    <div class="personalR">
                        <div class="changeNum fr">
                            <div class="personNum">
                                <div  class="choosePerson" @click="subPerson">
                                    <img src="../../assets/images/express/icon/minus_icon.png">
                                </div>
                                <div class="personNumShow">{{changValue}}</div>
                                <div class='choosePerson' @click="addPerson" >
                                    <img  src="../../assets/images/express/icon/plus_icon.png">
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="orderColor5 FontS13">联系人</div>
                    <div class="personalR">
                        <input type="text" autofocus  maxlength="20" v-model="contactName" :placeholder="contactNameMsg">
                        <img class="write_icon" src="../../assets/images/airPort/icon/write_icon.png">
                    </div>
                </li>
                <li>
                    <div class="orderColor5 FontS13">联系电话</div>
                    <div class="personalR">
                        <input type="number"  oninput="if( this.value.length > 11 ) this.value = this.value.slice(0,11)" v-model="contactIphone" :placeholder="contactIphoneMsg">
                        <img class="write_icon" src="../../assets/images/airPort/icon/write_icon.png">
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="agreement flexDiv padL2 FontS11">
        <img v-if="showAgreenEx" @click="isAgreen" src="../../assets/images/zuche/choose_s.png" alt="">
        <img v-else="showAgreenEx" @click="isAgreen" src="../../assets/images/zuche/choose_f.png" alt="">
        <div>我已阅读并同意 <span class="orderColor2" @click="bookNotice">《预定条款》</span></div>
    </div>

    <!--固定在底部的按钮 S-->
    <div class="payment">
        <div class="paymentBox flex">
            <div class="paymentNum orderColor3 padT1 padB1 flex flexC" style="justify-content: center; align-items: center">
                <div class="flexC">
                    <p class="orderColor5 fontW">订单金额: <span>￥<i>{{numDiv(allPrices,100)}}</i></span></p>
                </div>
                <p @click="chargeDetails()" :class="{down_icon:isCharge}">明细<img src="../../assets/images/zuche/icon/up_icon.png"> </p>
            </div>
            <div class="paymentBtn" :class="{isFlagG:!flag}" @click="payOrder()">提交订单</div>
        </div>
    </div>
    <!--固定在底部的按钮 E-->
    <!--费用明细 S-->
    <div class="dp-mask" @click="dpmask" :class="{current:isCharge || isCharge2}"></div>
    <div class="bulletBoxBottom" :class="{current1:isCharge}">
        <!--费用明细 S-->
        <div class="pad1D5 FontS12 lineH2D5 orderColor4">
            <p class="flex"><span>车票费</span><span class="flexC TextR">¥{{numDiv(price,100)}} * {{changValue}}人</span></p>
        </div>
        <!--费用明细 E-->
    </div>
    <!--登录 S-->
    <isLogin :isLogin="isLogin"></isLogin>
    <!--登录 E-->
    <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
</div>
</template>

<script>
import {formatDate} from '../../assets/js/date';  //时间过滤器
import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
import isLogin from  '@/views/comm/loginGuide.vue';  //登录引导组件
import {Group, Calendar, InlineXNumber,XNumber,Datetime } from 'vux'
export default {
    name: 'orderInfo',
    components:{
        isLogin,
        ModelPop,
        InlineXNumber,
        Datetime,
        Calendar,
        Group
    },
    data:function () {
        return {
            //组件pop
            isShow:false,
            isSuss:false,
            TextMsg:"",
            BtnTextMsg:"确定",

            goodDetailData:{},  //上一级传过来的商品信息
            isLogin:false,  //登录组件
            startTime:'',
            startDate:'',
            endDate:'',
            // 联系人与联系电话
            contactName:'',
            contactIphone:'',
            changValue:1,
            contactNameMsg:'请输入联系人姓名',
            contactIphoneMsg:'请输入联系人电话',

            showAgreenEx:false,  //用户协议同意否

            isCharge:false,  //费用明细
            isCharge2:false,  //附加保障
            isBook:false,  //预定须知
            totalAmount:'',  //总价

            isVerify:false,  //验证个人信息是否正确
            flag:true,  //避免重复提交
            price:'',  //选择日期时的单价
            id:'',  //从上一级带过来的商品id
            dayNum:0,
            isInput1:true,
            isInput2:false

            //allPrices:0,
        }
    },
    methods:{
        //子组件向父组件传值
        childByValue: function (childValue) {
            // childValue就是子组件传过来的值
            this.isShow = childValue;
        },
        chargeDetails(){
            this.isCharge = !this.isCharge;
        },
        dpmask(){
            this.isCharge = false;
            this.isCharge2 = false;
        },
        isAgreen(){
            this.showAgreenEx = !this.showAgreenEx
        },
        bookNotice(){  //预定须知
            //临时存储身份证信息
            sessionStorage.setItem('contactName',this.contactName);
            sessionStorage.setItem('contactIphone',this.contactIphone);
            sessionStorage.setItem('changValue',this.changValue);
            sessionStorage.setItem('startTime',this.startTime);
            sessionStorage.setItem('showAgreenEx',this.showAgreenEx);
            this.$router.push({path:'bookNotice'})
        },
        payOrder(){  //提交订单
            this.isVerifyInfo(this.contactName,this.contactIphone);
            if(this.isVerify){  //验证填的信息
                if(this.showAgreenEx){  //协议是否勾选
                    if(this.flag){
                        if (!navigator.onLine) {  //判断有无网络
                            this.flag = true;
                            this.$vux.loading.hide();
                            this.$vux.toast.show({
                                text: "检查手机网络",
                                type:'text',
                                width:'80%',
                            });
                            return
                        }

                        this.flag = false;
                        sessionStorage.setItem('contactName',this.contactName);
                        sessionStorage.setItem('contactIphone',this.contactIphone);
                        sessionStorage.setItem('changValue',this.changValue);
                        sessionStorage.setItem('startTime',this.startTime);
                        sessionStorage.setItem('showAgreenEx',this.showAgreenEx);
                        let _this = this;
                        let headerobj = {'x-access-token':this.getToken};
                        let parmsobj = {
                            goodsId:this.goodDetailData.id,
                            goodsTitle:this.goodDetailData.title,
                            goodsNum:this.changValue,
                            startTime:this.startTime,
                            unitAmount:this.price,
                            contactName:this.contactName,
                            contactPhone:this.contactIphone,
                            totalAmount:this.allPrices,
                            payAmount:this.allPrices
                        };

                        this.$server.post(this.expressROOT + 'app/v1.0/orderInfo/createOrder',parmsobj,headerobj).then(res =>{
                            this.$vux.loading.hide();
                            if(res.code == 200){
                                //订单提交成功，把临时存的身份证信息删除
                                sessionStorage.removeItem('contactName');
                                sessionStorage.removeItem('contactIphone');
                                sessionStorage.removeItem('startTime');
                                sessionStorage.removeItem('changValue');
                                sessionStorage.removeItem('showAgreenEx');

                                this.$router.push({path:'confirmPay',query:{id:res.data.id}});
                            }else if(res.code == 10000){
                                this.$vux.toast.show({  //登录过期提示
                                    text: res.msg,
                                    type:'text',
                                    width:'80%',
                                });
                                setTimeout(function () {
                                    _this.$vux.toast.hide();
                                    _this.isLogin = true;
                                },1000)
                            }else if(res.code == 3010){ //金额发生更改
                                this.$vux.toast.show({
                                    text: res.msg,
                                    type:'text',
                                    width:'80%',
                                });
                                setTimeout(function () {
                                    location.reload();  //刷新当前页面
                                },1500)

                            }else {
                                this.flag = true;
                                this.$vux.toast.show({  //其它错误提示
                                    text:res.msg,
                                    type:'text',
                                    width:'80%',
                                });
                            }
                        });
                    }else {
                        this.$vux.toast.show({  //提示
                            text: '订单正在提交，请不要重复提交',
                            type:'text',
                            width:'80%',
                        })
                    }
                }else {
                    this.$vux.toast.show({  //提示
                        text: '请勾选我已阅读并同意《预定条款》',
                        type:'text',
                        width:'80%',
                    })
                }
            }
        },
        goodDetail(id){
            this.$vux.loading.show();
            this.$server.get(this.expressROOT+'app/v1.0/goods/detail?id='+id,null,null).then(res =>{
                this.$vux.loading.hide();
                if(res.code==200){
                    this.goodDetailData = res.data;

                    let startDate = new Date(this.startTime.replace(/-/g, '/')).getTime();
                    for(var i=0;i<this.goodDetailData.datePriceList.length;i++){  //一进入页面时开始读匹配价格

                        if(startDate==Number(this.goodDetailData.datePriceList[i].date)){
                            this.price = this.goodDetailData.datePriceList[i].price;
                        }
                    }

                    this.dayNum = Number(this.goodDetailData.datePriceList.length)-1;
                    this.endDate = this.getAfterDayDate(new Date(),this.dayNum);  //结束时间

                }else {
                    this.$vux.toast.show({
                        text:res.msg,
                        type:'text',
                        width:'80%'
                    });
                }
            })
        },
        //验证信息
        isVerifyInfo(value1,value2){ //第一个参数为姓名，第二个参数为电话号码
            let nameReg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
            if(value1 == undefined || value1 == ''){
                this.isShow = true;
                this.TextMsg = "请输入联系人姓名";
                return  false;
            }else if(value1.length<2 || !nameReg.test(value1)){
                this.isShow = true;
                this.TextMsg = "联系人由2-20个汉字或字母组成";
                return  false;
            }else if(value2 == undefined || value2 == ''){
                this.isShow = true;
                this.TextMsg = "请输入联系人电话";
                return  false;
            }else if (value2 && (!(/^[1][0123456789]\d{9}$/).test(value2) || !(/^[1-9]\d*$/).test(value2) || value2.length !== 11)) {
                if (value2.indexOf(" ") >= 0) {
                    this.isShow = true;
                    this.TextMsg = "联系电话输入有空格!";
                }else{
                    this.isShow = true;
                    this.TextMsg = "手机号码不符合规范";
                }
                return  false;
            }

            return this.isVerify = true
        },

        // 增加人数
        addPerson:function(){
            if (this.changValue >=5){
                return
            }
            this.changValue += 1;
        },
        // 减人数
        subPerson: function () {
            if (this.changValue > 1) {
                this.changValue -= 1;
            }
        },
        goBack(){ //返回时，把临时存的信息删除
            sessionStorage.removeItem('contactName');
            sessionStorage.removeItem('contactIphone');
            sessionStorage.removeItem('startTime');
            sessionStorage.removeItem('changValue');
            sessionStorage.removeItem('showAgreenEx');
            this.$router.go(-1);//返回上一层
        },
    },
    computed:{
        allPrices(val){
            //总价
             return this.numMulti(this.changValue,this.price);
        }
    },
    watch:{
        startTime:function (val) {
            console.log(val);
            let startDate = new Date(val.replace(/-/g, '/')).getTime();
            if(JSON.stringify(this.goodDetailData) != '{}'){
                console.log(this.goodDetailData.detailImg);
                for(var i=0;i<this.goodDetailData.datePriceList.length;i++){
                    if(startDate==Number(this.goodDetailData.datePriceList[i].date)){
                        this.price = this.goodDetailData.datePriceList[i].price;
                    }
                }
            }
        },

    },
    mounted(){
        this.goHistory(this.goBack);
    },
    destroyed(){
        window.removeEventListener('popstate', this.goBack, false);
    },
    created(){
        this.getToken = localStorage.getItem("token");
        this.id = this.$route.query.id;
        this.goodDetail(this.id);

        this.startDate = this.getAfterDayDate(new Date(),0);  //开始时间

        if(sessionStorage.getItem('contactName') ||sessionStorage.getItem('contactIphone')){  //临时存储是否存在身份证信息等
            this.contactName = sessionStorage.getItem('contactName');
            this.contactIphone = sessionStorage.getItem('contactIphone');
        }

        if(sessionStorage.getItem('startTime')){
            this.startTime = sessionStorage.getItem('startTime');
        }else {

            this.startTime =  this.getAfterDayDate(new Date(),0);  //默认当天日期
        }
        if(sessionStorage.getItem('changValue')){
            this.changValue = Number(sessionStorage.getItem('changValue'));
        }
        if(sessionStorage.getItem('showAgreenEx')){
            this.showAgreenEx = sessionStorage.getItem('showAgreenEx');
        }

        //百度统计
        var arrStatistics = ['30301', '支付', '下单', '', ''];
        this.baiduS(arrStatistics);

    },
}
</script>

<style scoped>
    .bookInfoInput{outline: none;font-size: 1.3rem;color: #666666}
    .bookInfoCheck{position: relative}
    .bookInfoCheck span{border: 1px solid #407FFD;color: #407FFD;font-size: 1.25rem; padding: 0.5rem 1rem 0.5rem 1rem;border-radius: 5px;}

    .changeNum{padding-top: 0.5rem;}
    .personalInfo{background: #ffffff;}
    .personalInfo h3{background: #FAFAFA;font-size: 1.3rem;}
    .personalInfo ul li{display: flex; padding-left: 2rem;padding-right: 2rem;border-bottom: 1px solid #F5F5F5; height: 4.5rem;line-height: 4.5rem;font-size: 1.2rem;color: #666666}
    .personalInfo ul li:last-child{border-bottom: none;}
    .personalInfo ul li div.personalR{flex: 1;text-align: right}
    .personalR{position: relative;}
    .write_icon{position: absolute;right: 0;top: 1.4rem;z-index: 1}
    .personalR img{width: 1.6rem;vertical-align: middle}
    .personalR input{width: 70%;outline: none; background: none; text-align: right;font-size: 1.3rem; margin-right: 0.5rem; padding-right: 2rem;position: absolute;z-index: 2;right: 0;}

    .calendarBox{opacity: 0;position: absolute;width: 100%;top: 0; height: 20px;}


    /*固定在底部的样式*/
    .flexDiv{display: flex;align-items: center;justify-content: flex-start;}
    .agreement{height: 5rem;line-height: 5rem;color: #9B9B9B;margin-bottom: 5rem;}
    .agreement img{width: 1.5rem;margin-right: 0.5rem;vertical-align: middle;}
    .payment{position: fixed; z-index: 4; bottom: 0;background-color: #fff; height: 5rem; width: 100%;padding-left: 2rem;box-sizing: border-box; border-top: 1px solid #f5f5f5}
    .payment .paymentBox{display: flex;justify-content: space-between;height: 100%}
    .paymentNum span{font-size: 1.2rem;color: #FFAC00}
    .paymentNum span i{font-size: 1.5rem;}
    .paymentNum img{width: 0.8rem; margin-left: 0.5rem;}
    .down_icon img{transform: rotate(180deg)}

    .paymentBtn{ background: linear-gradient(90deg,#407FFD, #44A0FE);color: #fff;text-align: center; margin-left: 1rem; padding-left:1.5rem;padding-right: 1.5rem; font-size: 1.5rem; line-height: 4.5rem;}
    .paymentBtn.isFlagG{background: #D6D6D6}

    /*弹框*/
    .bulletBoxBottom{width: 100%; position: fixed;left: 0;bottom: 0;z-index: 3;-webkit-transition: -webkit-transform 0.3s ease;transition: -webkit-transform 0.3s ease;-webkit-transform: translateY(100%);transform: translateY(100%);border-radius: 1rem 1rem 0 0;background: #ffffff;}
    .bulletBoxBottom.current1{display: block;transform: translateY(-5rem);}
    .bulletBoxBottom.current{display: block;transform: translateY(0);}
    .dp-mask{position: fixed;width: 100%;height: 0;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;}
    .close_icon img{width: 1.5rem;}

    /*加减*/
    .personNum{display: flex;justify-content: center;align-items: center;height: 3.5rem}
    .choosePerson{display:flex;align-items:center;width: 1.8rem;}
    .personNumShow{display:inline-block;width: 2.5rem;height: 2.5rem;line-height: 2.5rem;font-size: 1.3rem;border:1px solid #D6D6D6;text-align:center;border-radius:0.5rem;margin-right: 1rem;margin-left: 1rem;}



</style>
