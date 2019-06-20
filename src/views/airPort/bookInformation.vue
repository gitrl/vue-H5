<template>
<div id="bookInformation" style="height: 100%;background: #FAFAFA">
    <div style="overflow-y: scroll;height: 90%">
        <h2 class="bigTitle padT1 padL2 padB1">预定信息</h2>
        <div>
            <div class="orderInfo colorWhite">
                <div class="orderInfoTop pad2 FontS13">
                    <div>
                        <span class="orderType">{{goodsName}}</span>
                        <span>{{flightNum}}</span>
                        <span  v-if="isActive == '0' || isActive == '2' ">{{this.format(arrTime).slice(10,16)}}抵达</span>
                        <span v-else>{{this.format(arrTime).slice(10,16)}} 出发</span>
                    </div>
                    <div>用车类型 : <span v-if="isUsersType==1">拼车</span><span v-else>包车</span></div>
                    <div>接送时间 : <span>{{carUseTime | formatDate}}</span></div>
                    <div>接送地点 : <span>{{name}}</span></div>
                    <div v-if="isActive == '0' || isActive == '2' ">目的地 : <span>{{addressData}}</span></div>
                    <div v-else>出发地 : <span>{{addressData}}</span></div>
                    <div v-if="isUsersType==1">单价 : <span>{{price}}元/<i>人</i></span></div>
                </div>
            </div>
            <div class="personalInfo">
                <h3 class="padL2 bgColor1">信息填写</h3>
                <ul>
                    <li v-if="isUsersType==1">
                        <div class="orderColor5 FontS13">人数</div>
                        <div class="personalR">
                            <div class="changeNum fr">
                                <inline-x-number style="line-height: 2rem;" v-model="changValue" @on-change="change" width="50px" button-style="round" :min="1" :max="20"></inline-x-number>
                            </div>
                        </div>
                    </li>
                    <li v-if="isUsersType==2">
                        <div class="orderColor5 FontS13">车辆类型</div>
                        <div class="personalR">
                            {{carModeText}}
                        </div>
                    </li>
                    <li>
                        <div class="orderColor5 FontS13">联系人</div>
                        <div class="personalR">
                            <input type="text" maxlength="20" v-model="contactName" :placeholder="contactNameMsg">
                            <img src="../../assets/images/airPort/icon/write_icon.png">
                        </div>
                    </li>
                    <li>
                        <div class="orderColor5 FontS13">联系电话</div>
                        <div class="personalR">
                            <input type="text" maxlength="11" v-model="contactIphone" :placeholder="contactIphoneMsg">
                            <img src="../../assets/images/airPort/icon/write_icon.png">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--用户服务协议-->
        <div class="padL2 padR1" style="margin-top: 1rem;">
            <div class="userAgreement">点击支付表示您已阅读并同意接送服务<span><router-link to="bookNotice">《预定须知》</router-link></span>
            </div>
        </div>
    </div>

    <div class="orderInfoBottom padL2 FontS15 colorWhite">
        <div class="payMoney">总额 : <span><i>￥</i>{{allPrices}}</span></div>
        <div class="payOrder" @click="submitOrders()">
            <span>{{orderStatus}}</span>
        </div>
    </div>

    <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
    <!--登录 S-->
    <isLogin :isLogin="isLogin"></isLogin>
    <!--登录 E-->
</div>
</template>

<script>
  import {formatDate} from '../../assets/js/date';  //时间过滤器
  import {Group, Calendar, InlineXNumber,XNumber,Datetime } from 'vux'
  import isLogin from  '@/views/comm/loginGuide.vue';  //登录组件
  import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
  export default {
    name: 'orderInfo',
    components:{
      InlineXNumber,
      Group,
      Calendar,
      XNumber,
      Datetime,
      ModelPop,
        isLogin
    },
    data:function () {
      return {
        token:'',
        //login组件
        isLogin:false,
        //组件pop
        isShow:false,
        isSuss:false,
        TextMsg:"",
        BtnTextMsg:"确定",

        orderInfo:{},
        willStartDate:'',
        willStartTime:'',
        shiftStartTime:'',
        payId:'',   //支付id
        orderStatus:'提交订单', //订单状态
        isPay:true ,     //判断是否已支付
        openId:'',
        orderId:"",
        flightNumData:[],


        // 联系人与联系电话
        contactName:'',
        contactIphone:'',
        changValue:1,
        contactNameMsg:'请输入联系人',
        contactIphoneMsg:'请输入联系电话',


        //从上个页面带过来的
        depTime:'',
        arrTime:'',
        price:'',
        name:'',
        id:'',
        flightNum:'',
        goodsName:'',
        addressData:'',
        address:'',
        lat:'',
        lng:'',
        district:'',
        goodsType:'',
        carUseTime:'',
        isActive:'',
          isUsersType:1,  //用车方式类型
          carModeText:'',  //车型类型

        //
        orderBool1:false,
        orderBool2:false,

        //倒计时
        countDownList:'',
        noData:false,  //没有信息
      }
    },
    methods:{
      //子组件向父组件传值
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.isShow = childValue;
      },
      //加数
      change (val) {
        this.changValue = val;
      },
      //手机号码验证
      iphone(value){
        if(value == undefined || value == ''){
          this.orderBool2 = false;
          this.isShow = true;
          this.TextMsg = "请输入联系电话";
        }else if (value && (!(/^[1][0123456789]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
          this.orderBool2 = false;
          if (value.indexOf(" ") >= 0) {
            this.isShow = true;
            this.TextMsg = "联系电话输入有空格!";
          }else{
            this.isShow = true;
            this.TextMsg = "手机号码不符合规范";
          }
        }else if(value != undefined && value != ''){
          this.orderBool2 = true;
        }
      },
      //联系人验证
      FlightNameM(value){
          let nameReg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
        if(value == undefined || value == ''){
          this.orderBool1 = false;
          this.isShow = true;
          this.TextMsg = "请输入联系人姓名";
        }else if(value.length<2 || !nameReg.test(value)){
            this.isShow = true;
            this.TextMsg = "联系人姓名由2-20个汉字或字母组成";
        }else if(value != undefined && value != ''){
          value.replace(/\s/g,"");
          this.orderBool1 = true;
        }
      },
      //下单
      orderDM(){
        var _this = this;
        this.$vux.loading.show();
        if(this.isActive == '2'){
          let parmasObj = {
            "address": this.address,
            "contactNumber": this.contactIphone,
            "contacts":  this.contactName,
            "goodsId":  this.id,
            "lat": this.lat,
            "lng":this.lng,
            "name": this.addressData,
            "passengerNumber":  this.changValue,
            "place": this.district,
            "shiftArriveTime":this.arrTime,
            "shiftDate": 0,
            "shiftNumber": this.flightNum,
            "shiftStartTime": this.depTime,
            "sourceType": 2
          }
          let headersObj = {'content-type': 'application/json','x-access-token':this.token};
          this.$server.post(this.AirROOT+"app/v1.0/order/save",parmasObj,headersObj).then(res =>{
            if(res.code == 200){
              setTimeout(function () {
                _this.$vux.loading.hide();
                _this.isLogin = false;
                _this.$router.push({path:'confirmPay',query:{orderId: res.data,flightNum:_this.flightNum,carUseTime:_this.carUseTime}})
              },500)
            }else if(res.code == 10000){  //登录失效
              _this.$vux.loading.hide();
              _this.$vux.toast.show({ //提示
                text: res.msg,
                type:'text',
                width:'80%',
              })
              setTimeout(function () {
                _this.$vux.toast.hide();
                _this.isLogin = true;
              },2000)

            }else {
              _this.$vux.loading.hide();
              _this.isShow = true;
              _this.TextMsg = res.msg
            }
          })
        }else {
            let parmasObj = {
              "address": this.address,
              "contactNumber": this.contactIphone,
              "contacts":  this.contactName,
              "goodsId":  this.id,
              "lat": this.lat,
              "lng":this.lng,
              "name": this.addressData,
              "passengerNumber":  this.changValue,
              "place": this.district,
              "shiftArriveTime":this.arrTime,
              "shiftDate": 0,
              "shiftNumber": this.flightNum,
              "shiftStartTime": this.depTime,
              "sourceType": 2
            }
            let headersObj = {'content-type': 'application/json','x-access-token':this.token,};
            this.$server.post(this.AirROOT+"app/v1.0/order/save",parmasObj,headersObj).then(res =>{
              if(res.code == 200){
                setTimeout(function () {
                  _this.$vux.loading.hide();
                  _this.isLogin = false;
                  _this.$router.push({path:'confirmPay',query:{orderId: res.data,carUseTime:_this.carUseTime}});
                },500)
              }else if(res.code == 10000){  //登录失效
                _this.$vux.loading.hide();
                _this.$vux.toast.show({  //提示
                  text: res.msg,
                  type:'text',
                  width:'80%',
                })
                setTimeout(function () {
                  _this.$vux.toast.hide();
                  _this.isLogin = true;
                },2000)
              }else {
                _this.$vux.loading.hide();
                _this.isShow = true;
                _this.TextMsg = res.msg
              }
            })
        }

      },
      //提交订单
      submitOrders(){
        let flag = true;
        let _this =this;
        this.FlightNameM(this.contactName);
        this.iphone(this.contactIphone);
        if(this.orderBool1 == true && this.orderBool2 == true){
          //登录后下订单
          this.orderDM();
        }
      },


    },
    computed:{
      allPrices(val){
        //总价
        return this.numMulti(this.changValue,this.price);
      }
    },


    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日 hh:mm')
      },
    },
    created(){
        let _this = this;
        //获取上一级带过来的参数
        this.price = this.numDiv(this.$route.query.price,100);
        this.name = this.$route.query.name;
        this.id = this.$route.query.id;
        this.flightNum = this.$route.query.flightNum;
        this.goodsName = this.$route.query.goodsName;
        this.addressData = this.$route.query.addressData;
        this.lat = this.$route.query.lat;
        this.lng = this.$route.query.lng;
        this.address = this.$route.query.address;
        this.district = this.$route.query.district;
        this.goodsType = this.$route.query.goodsType;
        this.depTime = Number(this.$route.query.depTime);
        this.isUsersType = this.$route.query.isUsersType;
        this.carModeText = this.$route.query.carModeText;

        this.carUseTime = Number(this.$route.query.carUseTime);
        this.isActive = this.$route.query.isActive;

        this.arrTime = Number(this.$route.query.arrTime);


        //判断是否登录
        this.token = localStorage.getItem("token");

        //百度统计
        if(this.isActive=='0'){
            let arrStatistics = ['20101', '接机', '下单', '', ''];
            this.baiduS(arrStatistics);
        }else if(this.isActive=='1'){
            let arrStatistics = ['20102', '送机', '下单', '', ''];
            this.baiduS(arrStatistics);
        }else if(this.isActive=='2'){
            let arrStatistics = ['20103', '接站', '下单', '', ''];
            this.baiduS(arrStatistics);
        }else if(this.isActive=='3'){
            let arrStatistics = ['20103', '送站', '下单', '', ''];
            this.baiduS(arrStatistics);
        }
    }
  }
</script>

<style scoped>
    .orderInfoTop{background: linear-gradient(to right,#418CFD, #76C0FF);line-height: 3rem}
    .orderInfoTop span{
        margin-right: 0.5rem;
    }
    .orderType{
        border: 1px solid #fff;
        padding: 0.3rem 1.5rem;
        border-radius: 0.5rem;
    }
    .orderInfoBottom{
        position: absolute;
        bottom: 0rem;
        height: 4.5rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        line-height: 4.5rem;
        border-top:1px solid #F5F5F5;
        background-color: #fff;
    }
    .payOrder{
        background:  linear-gradient(to right,#407FFD 30%, #44A0FE);

    }
    .payOrder span{padding: 0 3rem;}
    .payOrder a{color: #ffffff}
    .payedOrder{
        background:#ccc;
        padding: 0 4rem;
    }
    .payMoney{
        color: #666666;
        font-size: 1.2rem;
    }
    .payMoney span i{font-size: 1.2rem;}
    .payMoney span{
        color: #FFAC00;
        font-weight: bold;
        font-size: 1.8rem;
    }
    .changeNum{padding-top: 0.5rem;}
    .personalInfo{background: #ffffff;}
    .personalInfo h3{background: #FAFAFA;height: 4rem;line-height: 4rem;font-size: 1.3rem;}
    .personalInfo ul li{display: flex; padding-left: 2rem;padding-right: 2rem;border-bottom: 1px solid #F5F5F5; height: 4.5rem;line-height: 4.5rem;font-size: 1.2rem;color: #666666}
    .personalInfo ul li:last-child{border-bottom: none;}
    .personalInfo ul li div.personalR{flex: 1;text-align: right}
    .personalR img{width: 1.6rem;vertical-align: middle}
    .personalR input{width: 50%;outline: none;text-align: right;font-size: 1.3rem; margin-right: 0.5rem;}

    .userAgreement{font-size: 1.2rem; padding-top: 1rem;padding-bottom: 1rem;}
    .userAgreement span a{color: #407FFD}
    .userAgreement img{width: 1.6rem;vertical-align: middle; margin-top: -0.3rem;}
    .vux-number-input{background: #ff0000}
</style>
