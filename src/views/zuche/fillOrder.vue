<template>
    <div class="orderDetails">
        <div  v-if="JSON.stringify(goodsInfo) != '{}'&&JSON.stringify(creatOrder) !='{}'">
            <div class="local_scroll">
                <h2 class="bigTitle  padT1D5 padL1D5 bgcolorW">填写订单</h2>
                <!--包车 S-->
                <div >
                    <div class="bgcolorW pad1D5">
                        <div class="padT2 zucheFillOrder">
                            <div class="zuchecarImgBox">
                                <p class="zuchecarImg"><img :src="creatOrder.vehicleTypeImgUrl"> </p>
                                <div class="zuchecarImgTit">
                                    <h3>{{creatOrder.vehicleTypeSimpleName}}</h3>
                                    <p>{{creatOrder.gearBoxStr}} - {{creatOrder.seatNumStr}}座 - {{creatOrder.displacementStr}}</p>
                                    <div class="FontS12 orderColor5 padTD5"><img src="../../assets/images/zuche/icon/zucheShopIcon1.png" style="width: 1.6rem;">{{creatOrder.companyName}}</div>
                                </div>
                            </div>
                            <div class="padT1D5 FontS11 orderColor5 lineH2D5">
                                <div class="flex" style="justify-content: center;align-items: center">
                                    <span class="orderColor3">用车时间：</span>
                                    <div class="flexC FontS12 flex">
                                        <div class="selectCarTopOne">
                                            <label class="TextL">{{infoArr.checkStartDate.slice(5,10).replace(/-/g, "月")}}日</label>
                                            <p>{{infoArr.checkStartWeek}}{{infoArr.checkStartDate.slice(11,16)}}</p>
                                        </div>
                                        <div class="selectCarTopDay">
                                            <label>{{infoArr.dayNum}}天</label>
                                            <p><img src="../../assets/images/zuche/dayNumjt.png"> </p>
                                        </div>
                                        <div class="selectCarTopOne">
                                            <label>{{infoArr.checkEndDate.slice(5,10).replace(/-/g, "月")}}日</label>
                                            <p>{{infoArr.checkEndWeek}}{{infoArr.checkEndDate.slice(11,16)}}</p>
                                        </div>
                                    </div>
                                </div>
                                <!--包车 S-->
                                <div v-if="isSortNum ==1">
                                    <p class="flex"><span class="orderColor3">上车地址：</span><span class="flexC FontS12">{{creatOrder.onCarAddress}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:creatOrder.onCarAddressLongitude+','+creatOrder.onCarAddressLatitude}}" class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
                                    <p class="flex"><span class="orderColor3">下车地址：</span><span class="flexC FontS12">{{creatOrder.offCarAddress}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:creatOrder.offCarAddressLongitude+','+creatOrder.offCarAddressLatitude}}"  class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
                                </div>
                                <!--包车 E-->
                                <!--送车上门 S-->
                                <div v-else-if="isSortNum == 2">
                                    <p class="flex"><span class="orderColor3">送车上门地址：</span><span class="flexC FontS12">{{creatOrder.onCarAddress}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:creatOrder.onCarAddressLongitude+','+creatOrder.onCarAddressLatitude}}" class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
                                    <p class="flex"><span class="orderColor3">上门取车地址：</span><span class="flexC FontS12">{{creatOrder.offCarAddress}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:creatOrder.offCarAddressLongitude+','+creatOrder.offCarAddressLatitude}}"  class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
                                </div>
                                <!--送车上门 E-->
                                <!--门店取车 S-->
                                <div v-else-if="isSortNum==3">
                                    <p class="flex"><span class="orderColor3">取车地址：</span><span class="flexC FontS12">{{creatOrder.onCarShopAddress}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:creatOrder.onCarShopLongitude+','+creatOrder.onCarShopLatitude}}" class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
                                    <p class="flex"><span class="orderColor3">还车地址：</span><span class="flexC FontS12">{{creatOrder.offCarShopAddress}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:creatOrder.offCarShopLongitude+','+creatOrder.offCarShopLatitude}}"  class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
                                </div>
                                <!--门店取车 E-->

                            </div>
                        </div>
                    </div>
                    <!--包车 S-->
                    <div class="bgcolorW"  v-if="isSortNum==1">
                        <h3 class="orderColor4 FontS14 fontW padL2 zcbd1 padB1 padT1">订车人信息</h3>
                        <div class="orderColor5 FontS12 padL2 padR2 lineH2D5 padT1 padB1">
                            <ul class="userInfo">
                                <li><span>姓  名</span> <input type="text" v-model="usecarName" maxlength="20" placeholder="请输入订车人姓名"></li>
                                <li><span>身份证</span> <input type="text" v-model="usecarIdcard" maxlength="18" placeholder="请输入订车人身份证号"></li>
                                <li><span>手机号</span> <input type="text" v-model="usecarPhone" maxlength="11" placeholder="请输入订车人手机号"></li>
                            </ul>
                        </div>
                    </div>
                    <!--包车 E-->

                    <!--其它租车类型 S-->
                    <div class="bgcolorW" v-else>
                        <h3 class="orderColor4 FontS14 fontW padL2 zcbd1 padB1 padT1">驾驶人信息</h3>
                        <div class="orderColor5 FontS12 padL2 padR2 lineH2D5 padT1 padB1">
                            <ul class="userInfo">
                                <li><span>姓  名</span> <input type="text" v-model="usecarName" maxlength="20" placeholder="请输入驾驶人姓名"></li>
                                <li><span>身份证</span> <input type="text" v-model="usecarIdcard" maxlength="18" placeholder="请输入驾驶人身份证号"></li>
                                <li><span>手机号</span> <input type="text" v-model="usecarPhone" maxlength="11" placeholder="请输入驾驶人手机号"></li>
                            </ul>
                        </div>
                    </div>
                    <!--其它租车类型 E-->
                    <div class="padT1">
                        <div class="bgcolorW">
                            <h3 class="orderColor4 FontS14 fontW padL2 padB1 padT1D5">附加保障</h3>
                            <div class="orderColor5 FontS12 padL2 padR2 lineH2D5 padB1">
                                <p class="flex"><span class="padR1 serviceMoney" @click="isPop2()">基本保障服务费<img src="../../assets/images/zuche/icon/detail_icon.png" ></span><span class="flexC">¥{{numDiv(creatOrder.baseInsPrice,100)}}/全程</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="padT1">
                        <div class="bgcolorW">
                            <h3 class="orderColor4 FontS14 fontW padL2 padB1 padT1D5">预定须知</h3>
                            <div class="orderColor6 FontS12 padL2 padR2 lineH2 padB1">
                                <p class="fontW">取车证件：</p>
                                <p>{{creatOrder.useCarRuleDesc}}</p>
                                <p class="fontW padT1">取消规则:</p>
                                <p>{{creatOrder.cancelOrderRuleDesc}}</p>
                                <p class="fontW padT1">押金金额:</p>
                                <p>{{creatOrder.depositRuleDesc}}</p>
                                <p class="fontW padT1">发票:</p>
                                <p>{{creatOrder.invoiceRuleDesc}}</p>
                                <p class="fontW padT1">里程限制:</p>
                                <p>{{creatOrder.driveMileRuleDesc}}</p>
                                <p class="fontW padT1">限制出行区域：</p>
                                <p>{{creatOrder.driveAreaRuleDesc}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--包车 E-->
                <div class="agreement flexDiv padL2 FontS11">
                    <img v-if="showAgreen" @click="isAgreen" src="../../assets/images/zuche/choose_s.png" alt="">
                    <img v-else="showAgreen" @click="isAgreen" src="../../assets/images/zuche/choose_f.png" alt="">
                    <div>我已阅读并同意 <span class="orderColor2" @click="bookNotice">《预定条款》</span></div>
                </div>
            </div>
            <!--固定在底部的按钮 S-->
            <div class="payment">
                <div class="paymentBox flex">
                    <div class="paymentNum orderColor3 padT1 padB1 flex flexC" style="justify-content: center; align-items: center">
                        <div class="flexC">
                            <p class="orderColor5 fontW">订单金额: <span>￥<i>{{numDiv(creatOrder.totalPrice,100)}}</i></span></p>
                            <p v-if="isSortNum ==1">(含车辆使用费、司机服务费)</p>
                            <p v-else>(含基本保障服务费)</p>
                        </div>
                        <p @click="chargeDetails()" :class="{down_icon:isCharge}">明细<img src="../../assets/images/zuche/icon/up_icon.png"> </p>
                    </div>
                    <div class="paymentBtn" :class="{isFlagG:!flag}"  @click="payOrder()">提交订单</div>
                </div>
            </div>
            <!--固定在底部的按钮 E-->

            <!--费用明细 S-->
            <div class="dp-mask" @click="dpmask" :class="{current:isCharge || isCharge2}"></div>
            <div class="bulletBoxBottom" :class="{current1:isCharge}">
                <!--费用明细 S-->
                <div class="pad1D5 FontS12 lineH2D5 orderColor4">
                    <p class="flex"><span>租车费</span><span class="flexC TextR">¥{{numDiv(creatOrder.avgDayPrice,100)}} * {{creatOrder.useCarDayNum}}天</span></p>
                    <p class="flex"><span>基本保障服务费</span><span class="flexC TextR">¥{{numDiv(creatOrder.baseInsPrice,100)}}</span></p>
                </div>
                <!--费用明细 E-->
            </div>
            <div class="bulletBoxBottom" style="z-index: 4" :class="{current:isCharge2}">
                <!--头部 S-->
                <div class="pad1D5 flex FontS13"  style="padding-bottom: 0;" @click="dpmask()"><span class="flexC orderColor4">保障说明</span><span class="close_icon"><img src="../../assets/images/zuche/icon/close_icon.png"></span> </div>
                <!--费用明细 S-->
                <div class="pad1D5 FontS12 lineH2D5 orderColor6 padT1">
                    <p>基本保障服务是指租车公司向您提供的车辆均购买有交强险及商业保险，保障您用车安全的一种服务，按天收费，不同车型不同租车公司服务费可能不同，以租车公司给您签订的线下纸质合同为标准，谢谢。</p>
                </div>
                <!--费用明细 E-->
            </div>
        </div>
        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
        <!--登录 S-->
        <isLogin :isLogin="isLogin"></isLogin>
        <!--登录 E-->
    </div>
</template>

<script>

    import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
    import isLogin from  '@/views/comm/loginGuide.vue';  //登录组件
    export default {
        name: 'orderDetails',
        components:{
            ModelPop,
            isLogin,
        },
        data:function () {
            return {
                //组件pop
                isShow:false,
                isSuss:false,
                TextMsg:"",
                BtnTextMsg:"确定",

                //登录组件
                isLogin:false,

                isCharge:false,  //费用明细
                isCharge2:false,  //附加保障
                isBook:false,  //预定须知
                infoArr:{},  //接收上一级传过来的时间数据
                showAgreen:false,  //用户协议同意否
                isSortNum:'',  //上级传过来的租车类型(1表示包车，2表示送车上门，3表示门店取车)
                creatOrder:{},  //要传创建订单的参数
                goodsInfo:{},  //从上一级传过来的信息
                vehicleTypeId:'',

                isVerify:false,  //验证驾驶人信息或订单人信息是否正确

                usecarIdcard:'',//身份证
                usecarName:'', //用车人信息
                usecarPhone:'', //用车人电话
                flag:true,
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
            isPop2(){
                this.isCharge2 = true;
            },
            isAgreen(){
                this.showAgreen = !this.showAgreen
            },
            bookNotice(){  //预定须知
                //临时存储身份证信息
                sessionStorage.setItem('usecarIdcard',this.usecarIdcard);
                sessionStorage.setItem('usecarName',this.usecarName);
                sessionStorage.setItem('usecarPhone',this.usecarPhone);
                sessionStorage.setItem('showAgreen',this.showAgreen);
                this.$router.push({path:'bookNotice'})
            },
            payOrder(){  //下订单
                let _this = this;

                //一点提交订单，就开始验证填的信息
                this.isVerifyInfo(this.usecarName,this.usecarIdcard,this.usecarPhone,"订车人");
                if(this.isVerify){ //验证填的信息
                    if(this.showAgreen){  //协议是否勾选
                        if(this.flag){  //避免重复提交
                            this.$vux.loading.show();

                            //临时存储身份证信息
                            sessionStorage.setItem('usecarIdcard',_this.usecarIdcard);
                            sessionStorage.setItem('usecarName',_this.usecarName);
                            sessionStorage.setItem('usecarPhone',_this.usecarPhone);
                            sessionStorage.setItem('showAgreen',this.showAgreen);
                            this.flag = false;
                            //把订车人或者驾驶人的信息写到统一的对象里
                            this.creatOrder.usecarIdcard = this.usecarIdcard;
                            this.creatOrder.usecarName = this.usecarName;
                            this.creatOrder.usecarPhone = this.usecarPhone;
                            let parmasObj = {
                                goodsId:this.creatOrder.goodsId,
                                haveDriver:this.creatOrder.haveDriver,
                                haveVisit:this.creatOrder.haveVisit,
                                onCarStoreId:this.creatOrder.onCarShopId,
                                offCarStoreId:this.creatOrder.offCarShopId,
                                vehicleTypeId:this.creatOrder.vehicleTypeId,
                                onCarCitycode:this.infoArr.onCarCityCode,
                                onCarCity:this.infoArr.pickCity,
                                onCarAddr:this.creatOrder.onCarAddress,
                                onCarAddrLnglat:this.creatOrder.onCarAddressLongitude+','+this.creatOrder.onCarAddressLatitude,
                                offCarCitycode:this.infoArr.offCarCityCode,
                                offCarCity:this.infoArr.returnCity,
                                offCarAddr:this.creatOrder.offCarAddress,
                                offCatAddrLnglat:this.creatOrder.offCarAddressLongitude+','+this.creatOrder.offCarAddressLatitude,
                                getCarTime:this.infoArr.checkStartDate,
                                returnCarTime:this.infoArr.checkEndDate,
                                usecarIdcard:this.creatOrder.usecarIdcard,
                                usecarName:this.creatOrder.usecarName,
                                usecarPhone:this.creatOrder.usecarPhone,
                                totalAmount:this.creatOrder.totalPrice,
                                rentCarPeriod:this.infoArr.dayNum,
                            };
                            let headersObj = {'content-type': 'application/json;charset=UTF-8','x-access-token':this.getToken};
                            this.$server.post(this.zucheROOT+'app/v1.0/orderInfo/createOrder',parmasObj,headersObj).then(res =>{
                                this.$vux.loading.hide();
                                if(res.code==200){
                                    //订单提交成功，把临时存的身份证信息删除
                                    sessionStorage.removeItem('usecarIdcard');
                                    sessionStorage.removeItem('usecarName');
                                    sessionStorage.removeItem('usecarPhone');
                                    sessionStorage.removeItem('showAgreen');
                                    this.$router.push({path:'confirmPay',query:{id:res.data.id}});
                                }else if(res.code==10000){
                                    this.$vux.toast.show({  //提示
                                        text: res.msg,
                                        type:'text',
                                        width:'80%',
                                    });
                                    setTimeout(function () {
                                        _this.$vux.toast.hide();
                                        _this.isLogin = true;
                                    },1000)
                                }else if(res.code==2304 || res.code==2306 || res.code==2307){
                                    this.$vux.toast.show({  //提示
                                        text: res.msg,
                                        type:'text',
                                        width:'80%',
                                    });
                                    setTimeout(function () {
                                        _this.$vux.toast.hide();
                                        //订单提交成功，把临时存的身份证信息删除
                                        sessionStorage.removeItem('usecarIdcard');
                                        sessionStorage.removeItem('usecarName');
                                        sessionStorage.removeItem('usecarPhone');
                                        sessionStorage.removeItem('showAgreen');
                                        _this.$router.push({path:'/zuche'})
                                    },2000)
                                }else if(res.code==2305){
                                    this.$vux.toast.show({  //提示
                                        text: '金额发生改变，正在重新刷新页面',
                                        type:'text',
                                        width:'80%',
                                    });
                                    setTimeout(function () {
                                        _this.$vux.toast.hide();
                                        location.reload();  //刷新当前页面
                                    },2000)
                                }else {
                                    this.$vux.toast.show({  //提示
                                        text: res.msg,
                                        type:'text',
                                        width:'80%',
                                    });
                                    this.flag = true;
                                }
                            })
                        }else {
                            this.$vux.toast.show({  //提示
                                text: '订单正在提交，请不要重复提交',
                                type:'text',
                                width:'80%',
                            })
                        }
                    } else {
                        this.$vux.toast.show({  //提示
                            text: '请勾选我已阅读并同意《预定条款》',
                            type:'text',
                            width:'80%',
                        })
                    }
                }else {
                    //验证信息是否通过
                    if(this.isSortNum==1){
                        this.isVerifyInfo(this.usecarName,this.usecarIdcard,this.usecarPhone,"订车人");
                    }else {
                        this.isVerifyInfo(this.usecarName,this.usecarIdcard,this.usecarPhone,"驾驶人");
                    }
                }
            },
            goodInfo(){  //获取商品详情
                let _this = this;
                let onCarlntlat = this.infoArr.pickLocation.split(',');  //取车地址经纬度

                let onOfflntlat = this.infoArr.returnLocation.split(','); //还车地址经纬度

                let headersObj = {'x-access-token':this.getToken};  //'AF1C337FA23C02808C3F1ECAF16C7BC1'
                let parmasObj = {
                        "goodsId":this.goodsInfo.goodsId,
                        "vehicelTypeId": this.vehicleTypeId,
                        "vehicelTypeName": this.goodsInfo.vehicleTypeName,
                        "onCarCityCode": this.infoArr.onCarCityCode,
                        "onCarCityName":  this.infoArr.pickCity,
                        "onCarShopId": this.goodsInfo.onCarShopId,
                        "onCarShopName": this.goodsInfo.onCarShopName,
                        "onCarAddress": this.infoArr.pickUpAddress,
                        "onCarAddressLongitude":onCarlntlat[0],
                        "onCarAddressLatitude": onCarlntlat[1],
                        "offCarCityCode": this.infoArr.offCarCityCode,
                        "offCarCityName":this.infoArr.returnCity,
                        "offCarShopId": this.goodsInfo.offCarShopId,
                        "offCarShopName": this.goodsInfo.offCarShopName,
                        "offCarAddress": this.infoArr.returnAddress,
                        "offCarAddressLongitude": onOfflntlat[0],
                        "offCarAddressLatitude": onOfflntlat[1],
                        "useCarStartTime": this.infoArr.checkStartDate,
                        "useCarEndTime": this.infoArr.checkEndDate,
                        "onOffCarServiceType": Number(this.isSortNum)
                };

                this.$server.post(this.zucheROOT+'app/v1.0/goods/goodsDetail/'+this.goodsInfo.goodsId,parmasObj,headersObj).then(res =>{
                    if(res.code==200){
                        this.creatOrder = res.data;
                        console.log(this.creatOrder )
                    }else if(res.code==10000){
                        this.$vux.toast.show({  //提示
                            text: res.msg,
                            type:'text',
                            width:'80%',
                        });
                        setTimeout(function () {
                            _this.$vux.toast.hide();
                            _this.isLogin = true;
                        },1000)
                    }else {
                        this.$vux.toast.show({  //提示
                            text: res.msg,
                            type:'text',
                            width:'80%',
                        });
                    }
                })
            },

            //验证信息
            isVerifyInfo(value1,value2,value3,text){ //第一个参数为姓名，第二个参数为身份证号码，第三个参数为电话号码，第四个参数表示是租车类型所显示的文字
                let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/; //身份证号码校验
                let nameReg = /^[\u4e00-\u9fa5a-zA-Z]+$/;

                if(value1 == undefined || value1 == ''){
                    this.isShow = true;
                    this.TextMsg = "请输入"+text+"姓名";
                    return  false;
                }else if(value1.length < 2 || !nameReg.test(value1)){
                    this.isShow = true;
                    this.TextMsg = "姓名由2-20个汉字或字母组成";
                    return  false;
                } else if(value2 == undefined || value2 == ''){
                    this.isShow = true;
                    this.TextMsg = "请输入"+text+"身份证号码";
                    return  false;
                }else if(reg.test(value2) === false) {
                    this.isShow = true;
                    this.TextMsg = "身份证输入不合法";
                    return  false;
                }else if(value3 == undefined || value3 == ''){
                    this.isShow = true;
                    this.TextMsg = "请输入"+text+"手机号";
                    return  false;
                }else if (value3 && (!(/^[1][0123456789]\d{9}$/).test(value3) || !(/^[1-9]\d*$/).test(value3) || value3.length !== 11)) {
                    if (value3.indexOf(" ") >= 0) {
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
        },
        mounted(){
            let info = this.$route.query.infoArr;
            this.infoArr = JSON.parse(info);
            let goodsInfo = this.$route.query.goodsInfo;
            this.goodsInfo = JSON.parse(goodsInfo);
            this.vehicleTypeId = this.$route.query.vehicleTypeId;
            this.isSortNum = this.$route.query.isSortNum;
            if(JSON.stringify(this.goodsInfo) != '{}'&&JSON.stringify( this.infoArr) !='{}'){
                this.goodInfo();
            }

            if(sessionStorage.getItem('usecarIdcard')){  //临时存储是否存在身份证信息等
                this.usecarIdcard = sessionStorage.getItem('usecarIdcard');
                this.usecarName = sessionStorage.getItem('usecarName');
                this.usecarPhone = sessionStorage.getItem('usecarPhone');
            }


            if(sessionStorage.getItem('showAgreen')){
                this.showAgreen = sessionStorage.getItem('showAgreen');
            }
        },
        created(){
            //获取本地token
            this.getToken =  localStorage.getItem("token");

        }
    }
</script>

<style scoped>
    .orderDetails{background: #FAFAFA;padding-bottom: 5rem;}
    .zcbd1{border-bottom: 1px solid #F5F5F5}
    .detailTW{width: 5rem;}
    .orderColor1{color: #fe3636;}
    .orderColor2{color: #407ffd;}
    .orderColor3{color: #AAAAAA;}
    .orderColor4{color: #333333;}
    .orderColor5{color: #666666;}
    .orderColor6{color: #9B9B9B;}

    .zucheFillOrder{border-radius: 0.5rem; box-shadow: 0 0 30px rgba(164,164,164,.28); padding: 1.5rem;}
    .zuchecarImgBox{display: flex;border-bottom: 1px solid #EFEFEF;padding-bottom: 1.2rem;align-items: center}
    .zuchecarImg{flex: 0.5;}
    .zuchecarImg img{width: 100%}
    .zuchecarImgTit{flex: 0.5;color: #666666;padding-left: 1rem;}
    .zuchecarImgTit h3{font-size: 1.3rem;font-weight: bold;}
    .zuchecarImgTit p{font-size: 1.1rem; line-height: 2rem;}
    .zuchecarImgTit img{width: 1.6rem;vertical-align: middle;margin-top: -0.3rem;margin-right: 0.3rem;}

    /*用车时间*/
    .selectCarTopOne{ }
    .selectCarTopOne label{font-size: 1.1rem;color: #AAAAAA}
    .selectCarTopOne p{font-size: 1.2rem;color: #666666;margin-top: -1rem;}
    .selectCarTopDay{width: 3rem;text-align: center;font-size: 1.1rem;color: #666666;margin-left: 0.5rem; margin-right: 0.5rem;}
    .selectCarTopDay p{text-align: center;margin-top: -1rem;}
    .selectCarTopDay p img{width:3rem;}
    .map_icon{width: 1.35rem;vertical-align: middle;margin-top: -0.3rem;margin-left: 0.3rem; }

    /*填写用户信息*/
    .userInfo li{height: 4rem;line-height: 4rem;border-bottom: 1px solid #F5F5F5;}
    .userInfo li:last-child{border-bottom: none}
    .userInfo li span{width: 5rem;display: inline-block}
    .userInfo li input{outline: none;height: 2rem;line-height: 2rem;width: 66%;}

    .serviceMoney img{width: 1.3rem;vertical-align: middle;margin-top: -0.2rem;margin-left: 0.5rem;}

    /*固定在底部的样式*/
    .flexDiv{display: flex;align-items: center;justify-content: flex-start;}
    .agreement{height: 5rem;line-height: 5rem;color: #9B9B9B}
    .agreement img{width: 1.5rem;margin-right: 0.5rem;vertical-align: middle;margin-top: -0.3rem;}
    .payment{position: fixed; z-index: 4; bottom: 0;background-color: #fff;width: 100%;padding-left: 2rem;box-sizing: border-box; border-top: 1px solid #f5f5f5}
    .payment .paymentBox{display: flex;justify-content: space-between;}
    .paymentNum span{font-size: 1.2rem;color: #FFAC00}
    .paymentNum span i{font-size: 1.5rem;}
    .paymentNum img{width: 0.8rem; margin-left: 0.2rem;}
    .down_icon img{transform: rotate(180deg)}

    .paymentBtn{ background: linear-gradient(90deg,#407FFD, #44A0FE);color: #fff;text-align: center; margin-left: 1rem; padding-left:1.5rem;padding-right: 1.5rem; font-size: 1.5rem; line-height: 5rem;}
    .paymentBtn.isFlagG{background: #D6D6D6}

    /*弹框*/
    .bulletBoxBottom{width: 100%; position: fixed;left: 0;bottom: 0;z-index: 3;-webkit-transition: -webkit-transform 0.3s ease;transition: -webkit-transform 0.3s ease;-webkit-transform: translateY(100%);transform: translateY(100%);border-radius: 1rem 1rem 0 0;background: #ffffff;}
    .bulletBoxBottom.current1{display: block;transform: translateY(-5rem);}
    .bulletBoxBottom.current{display: block;transform: translateY(0);}
    .dp-mask{position: fixed;width: 100%;height: 0;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;}
    .close_icon img{width: 1.1rem;}


    /*苹果滚动*/
    .local_scroll{bottom: 5rem;height: auto;background: none}
</style>
