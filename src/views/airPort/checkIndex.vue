<template>
    <div id="airIndex" class="animatedRouter">
        <p class="banner_pic"><img src="../../assets/images/airPort/banner_pic.png"> </p>
        <div class="airIndexNav padL1 padR1">
            <ul>
                <li v-for="(item,index) in siteData" :key="index" @click="airIndexNav(index)" :class="{active:isActive == index}">{{item.goodsName}}</li>
            </ul>
        </div>
        <div class="airInexBox">
            <div class="pad1 airIndexOne" v-for="(item,index) in siteData" :key="index" :class="{animatedTab:isActive==index}" >
                <ul class="AirIndexInput" :class="{padB1:!isPack}">
                    <li @click="selectFlight(isActive)">
                        <img src="../../assets/images/airPort/icon/ticket_icon.png" alt="">
                        <input   readonly type="text" v-model="flightNum"  :placeholder="msgText">
                        <div v-if="isActive==isInputSHow" style="margin-left: 0">
                            <div v-show="TimeHas" v-if="isActive == '1' || isActive == '3'">{{depTime | formatDate}} 出发</div>
                            <div v-show="TimeHas" v-else>{{arrivalTime | formatDate}} 抵达</div>
                        </div>
                    </li>
                    <li @click="destination(isActive)">
                        <img src="../../assets/images/airPort/icon/dizhi_icon.png" alt="">
                        <input   readonly type="text" v-model="addressData"  :placeholder="addressText">
                    </li>
                    <li>
                        <img src="../../assets/images/airPort/icon/exchange_icon2.png" alt="">
                        <span class="orderColor4" style="padding-left: 0.5rem;font-size: 1.4rem;">{{item.name}}</span>
                        <div v-if="isActive==isInputSHow" style="margin-left: 0">
                            <div v-show="TimeHas">预计用车时间 {{carUseTime | formatDate}}</div>
                        </div>
                    </li>
                    <li>
                        <div class="flex" style="margin-left: 0; align-items: center; padding-top: 2rem;">
                            <img src="../../assets/images/airPort/icon/car_icon.png" alt="" style="width: 1.8rem;height: 1.5rem;margin-top: 0 ">
                            <span class="orderColor4 FontS14" style="padding-left: 0.5rem">用车方式：</span>
                            <dl class="flex flexC carModeList">
                                <dd v-for="(item,index) in carModeList" @click="carMode(index)" :key="index"><img :src="item.chooseIcon"> <span>{{item.name}}</span></dd>
                            </dl>
                        </div>
                        <p class="TextR FontS12 orderColor3" v-if="isPack">
                            <span @click="checkCarMode(index)"  >
                                <i v-if="isActive==isInputSHow" >{{carModeText}}</i>
                                <i v-else >{{carModeText}}</i>
                                <img src="../../assets/images/airPort/icon/right_icon.png" style="width: 1rem; margin-top:-0.2rem;"> </span>
                        </p>
                    </li>
                </ul>
                <div class="airBtnBox padT1 padB1"  @click="reservationCar(isActive)">
                    <airCommonBtn :airBtnText="airCommonBtnText" class="marB1"></airCommonBtn>
                </div>
            </div>
        </div>
        <!--提示弹框 S-->
        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
        <!--提示弹框 E-->

        <!--车型列表 S-->
        <div class="dp-mask"  @click="dpmask" :class="{current:isCarList}"></div>
        <div class="bulletBoxBottom" :class="{current:isCarList}" style="height: 300px;">
            <!--头部 S-->
            <div class="pad1D5 FontS13 bulletBoxHeader"><span class="bulletText1" @click="dpmask">取消</span><span  class="bulletText1 flexC TextR" @click="sureCarMode">确定</span></div>
            <!--头部 E-->
            <picker :data='selectPickList' v-model='carModeTextArr' @on-change='change'></picker>
        </div>
        <!--车型列表 S-->
    </div>
</template>

<script>
  import airCommonBtn from '@/components/airCommonBtn';
  import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
  import {Picker} from 'vux'
  import {formatDate} from '../../assets/js/date';  //时间过滤器

  var years = [];
  export default {
    name: 'airIndex',
    components:{
      airCommonBtn,
      ModelPop,
      Picker,
    },
    data:function () {
      return {
        token:'',
        //组件pop
        isShow:false,
        isSuss:false,
        TextMsg:"",
        BtnTextMsg:"确定",
        bigTitle:'选择航班号',

        //组件按钮
        airCommonBtnText:'预约用车',
       // login:'',

        //
        airIndexNavData:['接机','送机','接站','送站'],
        isActive:0,
        isShow1:false,
        siteData:[],  //初始化数据

        //初始化
        msgText:'请输入航班号',
        addressText:'请输入目的地',
        selectNum:'航班号',
        goodsType:'0',//类型

        //初始化班次和目的地
        FlightNum:'',
        addressData:'',
        address:'',
        lat:'',
        lng:'',
        district:'',


        //抵达时间
        arrivalTime:'',
        depTime:'',
        //预计用车时间
        carUseTime:'',
          willStartTime:'',


        TimeHas:true,
        //包车、拼车
          carModeList: [
              {
                  name: '拼车',
                  chooseIcon: require('../../assets/images/airPort/icon/chooseIndex_s.png'),
                  useType:1
              },
              {
                  name: '包车',
                  chooseIcon: require('../../assets/images/airPort/icon/chooseIndex_f.png'),
                  useType:2
              }
          ],
          isPack:false,  //是否包车
          isCarList:false,
          selectPickList:[years],
          carModeText:'请选择车型',
          carModeTextSel:'',
          carModeTextArr: [''],
          isInputSHow:0,
          isUsersType:1, //1表示拼车，2表示包车
      }
    },
    methods:{
      //子组件向父组件传值
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.isShow = childValue;
      },
      //导航切换
      airIndexNav(index){
        this.isActive = index;
        this.goodsType = index;
        console.log(this.isInputSHow);

       // this.TimeHas = false;
        localStorage.setItem("isActive", index); //把isActive存入本地
          this.selectInfo();


        if(index == 0){
          this.msgText = '请输入航班号';
          this.addressText = '请输入目的地';
          this.bigTitle = '选择航班号';
        }else if(index == 1){
          this.msgText = '请输入航班号';
          this.addressText = '请输入出发地';
          this.bigTitle = '选择航班号';
        }else if(index == 2){
          this.msgText = '请输入车次号';
          this.addressText = '请输入目的地';
          this.bigTitle = '选择车次号';
          this.selectNum = '车次号';
        }else if(index == 3){
          this.msgText = '请输入车次号';
          this.addressText = '请输入出发地';
          this.bigTitle = '选择车次号';
          this.selectNum = '车次号';
        }
      },
      //填写航班、车次
      selectFlight(index){
        this.$router.push({path:'/airport/selectFlight',query:{isActive:this.isActive,msgText:this.msgText,bigTitle:this.bigTitle,selectNum:this.selectNum,goodsType:this.siteData[this.isActive].goodsType}})
      },
      //填写目的地
      destination(index){
        if(index == '0' || index == '2'){
          this.bigTitle = '目的地'
        }else {
          this.bigTitle = '出发地'
        }
        this.$router.push({path:'/airport/destination',query:{isActive:this.isActive,addressText:this.addressText,arrivalTime:this.arrivalTime,flightNum:this.flightNum,arrTime:this.arrivalTime,depTime:this.depTime,bigTitle:this.bigTitle,isUsersType:this.isUsersType}})
      },
      //预约用车
      reservationCar(index){


          if(this.addressData == undefined ||  this.addressData == ''){
              if(index==0 || index == 2){
                  this.isShow = true;
                  this.TextMsg = "目的地不能为空"
              }else if(index == 1 || index == 3){
                  this.isShow = true;
                  this.TextMsg = "出发地不能为空"
              }
          }else if(this.flightNum == '' || this.flightNum == undefined){
              if(index==0 || index == 1){
                  this.isShow = true;
                  this.TextMsg = "航班号不能为空"
              }else if(index == 2 || index == 3){
                  this.isShow = true;
                  this.TextMsg = "车次号不能为空"
              }
          }else if(this.addressData != undefined && this.addressData != '' && this.flightNum != '' && this.flightNum != undefined ){
               let carUseTimeD = new Date(this.carUseTime);
               let carToday = this.getAfterDayDate(new Date(),0);
              let goodsId = '';
              let price;
              if(this.isUsersType == 1){
                  goodsId = this.siteData[this.isActive].id;
                  price = this.siteData[this.isActive].price;

                  if(this.getAfterDayDate(carUseTimeD,0)===carToday){
                      this.isShow = true;
                      this.TextMsg = "暂不支持当日拼车服务";
                      return;
                  }
              }else {
                  for(var i in this.selectPickList[0]){
                      if(this.selectPickList[0][i].name == this.carModeText){
                          goodsId = this.selectPickList[0][i].id;
                          price =  this.selectPickList[0][i].price;
                      }
                  }
              }
              if(goodsId ==''){
                  this.isShow = true;
                  this.TextMsg = "请选择车型";
                  return
              }
              this.$router.push({path:'/airport/bookInformation',query:{isActive:this.isActive,price:price,name:this.siteData[this.isActive].name,id:goodsId,flightNum:this.flightNum,goodsType:this.siteData[this.isActive].goodsType,goodsName:this.siteData[this.isActive].goodsName,address:this.address,district:this.district,lat:this.lat,lng:this.lng,addressData:this.addressData,depTime:this.depTime,carUseTime:this.carUseTime,arrTime:this.arrivalTime,isUsersType:this.isUsersType,carModeText:this.carModeText}})
          }
      },
      //预估时间
      estimatedTime(orderType){
        let paramObj = {
          orderType:orderType,
          shiftStartTime:this.depTime,
          shiftEndTime:this.arrivalTime,
        }
        let headersObj = {'content-type': 'application/json'};
        this.$server.get(this.AirROOT +'ws/v1.0/get-estimate-time',paramObj,headersObj).then(res =>{
            if(res.code == 200){
                this.willStartTime = Number(res.data.willStartTime);
              this.carUseTime = Number(res.data.willStartTime);
            }else {
              this.isShow = true;
              this.TextMsg = res.msg
            }
        })
      },

      //初始化获取站点
      siteName(){
        let _this = this;
        this.$vux.loading.show();
        let paramsObj = {};
        let headersObj = {'content-type': 'application/json'};
        this.$server.get(this.AirROOT+"ws/h5/v1.0/goods/buy",paramsObj,headersObj).then(res => {
          this.$vux.loading.hide();
          if(res.code == 200){
            this.siteData = res.data;
            console.log(res.data);
            if(_this.flightNum == '' || _this.flightNum == undefined){
              _this.TimeHas = false;
            }else {
              _this.estimatedTime(res.data[this.isActive].goodsType);
            }
          }else {
            this.isShow = true;
            this.TextMsg = res.msg;

          }
        })
      },
      //出发地/目的地验证
      addressM(value){
        if(value == "" || value == undefined){
          this.isShow = true;
          if(this.isActive=='0' || this.isActive=='2'  ){
            this.TextMsg = "请输入目的地";
          }else {
            this.TextMsg = "请输入出发地";
          }
        }else if(value != undefined && value != ''){

        }
      },
      //预置信息
      msgInfo(){
        if(this.isActive == 0){
          this.msgText = '请输入航班号';
          this.addressText = '请输入目的地';
          this.bigTitle = '选择航班号';
        }else if(this.isActive  == 1){
          this.msgText = '请输入航班号';
          this.addressText = '请输入出发地';
          this.bigTitle = '选择航班号';
        }else if(this.isActive  == 2){
          this.msgText = '请输入车次号';
          this.addressText = '请输入目的地';
          this.bigTitle = '选择车次号';
          this.selectNum = '车次号';
        }else if(this.isActive  == 3){
          this.msgText = '请输入车次号';
          this.addressText = '请输入出发地';
          this.bigTitle = '选择车次号';
          this.selectNum = '车次号';
        }
      },
        //用车方式
        carMode(index){
          this.isUsersType = this.carModeList[index].useType;
            if (index == 0) {
                this.isPack = false;
                this.carModeList[index].chooseIcon = require('../../assets/images/airPort/icon/chooseIndex_s.png');
                this.carModeList[1].chooseIcon = require('../../assets/images/airPort/icon/chooseIndex_f.png');
            } else if (index == 1) {
                this.isPack = true;
                this.carModeList[index].chooseIcon = require('../../assets/images/airPort/icon/chooseIndex_s.png');
                this.carModeList[0].chooseIcon = require('../../assets/images/airPort/icon/chooseIndex_f.png');
            }
        },

        dpmask() {  //遮罩层
            this.isCarList = false;
        },
        change (value) { //车型变化值
          this.carModeTextSel = value[0];
         // sessionStorage.setItem('carModeTextSel',this.carModeTextSel);
        },
        checkCarMode(index){  //选择车型弹框
          let _this = this;
          if(this.carUseTime != ''){
              this.selectPickList = [];
              years = [];
              let headerObj = {'x-access-token':this.token};
              this.$server.get(this.AirROOT +'app/v1.0/goods/goods-select?goodsType='+this.siteData[this.isActive].goodsType+'&willStartStamp='+this.carUseTime,null,headerObj).then(res =>{
                  if(res.code == 200){
                      this.isCarList = true;
                      console.log(res.data)
                      for(var i in res.data){
                          years.push({
                              name: res.data[i].goodsName,
                              value: res.data[i].goodsName,
                              id: res.data[i].id,
                              price: res.data[i].price,


                          });
                      }
                      this.selectPickList.push(years);
                      console.log(years)
                     // sessionStorage.setItem('selectPickList',JSON.stringify(years));
                  }else {
                      this.isCarList = false;
                      this.isShow = true;
                      this.TextMsg = res.msg;
                      this.carModeTextSel = "请选择车型";
                  }
              })
          }else {
              if(index==0 || index == 1){
                  this.isShow = true;
                  this.TextMsg = "航班号不能为空"
              }else if(index == 2 || index == 3){
                  this.isShow = true;
                  this.TextMsg = "车次号不能为空"
              }
          }

        },
        sureCarMode(){  //确定车型
            this.isCarList = false;
            if(this.carModeTextArr[0] == ''){
                return
            }
            this.carModeText = this.carModeTextArr[0]
        },
        selectInfo(){   //已填信息

            if(this.carModeTextSel == ''){
                this.carModeTextSel= "请选择车型";
            }
            if(this.isActive==this.isInputSHow){
                this.TimeHas = true;
                this.flightNum = this.$route.query.flightNum;
                this.arrivalTime = Number(this.$route.query.arrTime);
                this.addressData = this.$route.query.addressData;
                this.carUseTime = this.willStartTime;

                this.carModeText = this.carModeTextSel;

            }else {
                this.flightNum = "";
                this.arrivalTime = "";
                this.addressData = "";
                this.carModeText = "请选择车型";
                this.carUseTime = '';
            }
        }
    },
      watch:{
          addressData(val){
              if( val != "undefined" && val != ""){
                sessionStorage.setItem('addressData',val);
                val = sessionStorage.getItem('addressData');
                return
              }
          }
      },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日 hh:mm')
      }
    },

    created(){
        let _this = this;
        this.isInputSHow =  this.$route.query.isActive;
        if(this.isInputSHow){
            this.selectInfo();  //已填信息
        }
        this.siteName();  //初始化数据
        //判断是否登录、链接上的token是否有效
        var param = this.GetRequest();
        if(param.token){
            this.$server.get(this.webviewUrl+'api/comm/check-token?token='+param.token,null,null,'just').then((res) => {
                if(res.code == 200){
                    this.token  = param.token;
                    localStorage.setItem("token",this.token);
                    return
                }else {
                    this.token  = localStorage.getItem("token");
                }
            });
        }else {
            this.token  = localStorage.getItem("token");
        }

      //从上下页面带过来的
      //toUpperCase()
      this.flightNum = this.$route.query.flightNum;
      this.depTime = Number(this.$route.query.depTime);
      this.arrivalTime = Number(this.$route.query.arrTime);
      this.lat = this.$route.query.lat;
      this.lng = this.$route.query.lng;
      this.address = this.$route.query.address;
      this.district = this.$route.query.district;
      //this.token = this.$route.query.token;
        if(this.$route.query.addressData){
            this.addressData = this.$route.query.addressData;
        }




      //从下个页面带过来的
      if(this.$route.query.arrTime == undefined){
        this.TimeHas = false;
        this.flightNum = this.$route.query.flightNum;
      }
      if(this.$route.query.isActive == undefined && localStorage.getItem("isActive") == null){
        this.isActive = 0;
        localStorage.setItem("isActive", this.isActive); //把isActive存入本地
      }else {
        if(localStorage.getItem("isActive")){
          this.isActive = localStorage.getItem("isActive");
          this.msgInfo();
          if(localStorage.getItem("isActive") != this.$route.query.isActive){  //存入的isActive与当前的比较
            this.flightNum = "";
            this.arrivalTime = "";
            //this.addressData = "";
            this.carUseTime = '';
            this.TimeHas = false;
          }
        } else {
          this.isActive = this.$route.query.isActive;
          this.msgInfo();
        }
      }



        if(this.$route.query.isUsersType){  //用车方式选中状态
            this.carMode(this.$route.query.isUsersType-1);
        }

        //百度统计
        var arrStatistics = ['20201', '首页', '浏览', '', ''];
        this.baiduS(arrStatistics);

    }
  }
</script>

<style scoped>
    #airIndex{height: 100%;background: #ffffff;}

    .banner_pic img{width: 100%;}
    .airIndexNav ul{background: linear-gradient(to right,#407FFD, #44A0FE);  padding: 0.3rem; height: 3.4rem;border-radius: 0.5rem;}
    .airIndexNav ul li{float: left;width: 25%;color: #ffffff;font-size: 1.4rem;text-align: center;line-height: 3.4rem;border-radius: 0.5rem;}
    .airIndexNav ul li.active{background: #ffffff;color: #333333;}

    .airInexBox{box-shadow: 0 0 15px rgba(64,85,112,.15);border-radius:0.5rem;margin: 1rem;margin-top:0.5rem;}
    .airIndexOne{display: none;}
    .airIndexOne.animatedTab{display: block;}
    .AirIndexInput li{border-bottom: 1px solid #F5F5F5;line-height: 4rem;  padding-left: 1rem;padding-right: 1rem; position: relative;padding-bottom: 0.5rem; padding-top: 0.5rem}
    .AirIndexInput li:last-child{border-bottom: none}
    .AirIndexInput li img{width: 1.6rem;vertical-align: middle;margin-top: -0.5rem;}
    .AirIndexInput li input{width: 80%;outline: none;font-size: 1.5rem;height: 4rem;line-height: 4rem;padding-left: 0.5rem;}
    .AirIndexInput li input.startI{width: 20%;height: 3rem;line-height: 3rem;}
    .AirIndexInput li div{line-height: 2rem;margin-top: -1rem;margin-left: 2.5rem; padding-bottom: 0.2rem; color: #FEBE00;font-size: 1.1rem;}
    .carModeList{font-size: 1.3rem;color: #666666;padding-left: 1rem;}
    .AirIndexInput li .carModeList img{margin-top: 0;}
    .carModeList span{padding-left: 0.2rem;}
    .carModeList dd{ text-align: left;flex: 0.5; }

    /*弹框*/
    .bulletBoxBottom{width: 100%; position: fixed;left: 0;bottom: 0;z-index: 3;-webkit-transition: -webkit-transform 0.3s ease;transition: -webkit-transform 0.3s ease;-webkit-transform: translateY(100%);transform: translateY(100%);border-radius: 1rem 1rem 0 0;background: #ffffff;}
    .bulletBoxBottom.current{display: block;transform: translateY(0px);}
    .dp-mask{position: fixed;width: 100%;height: 0;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;z-index: 2;}
    .bulletText1{color: #407FFD}
    .bulletBoxHeader{display: flex; }
    .bulletTitle{flex: 1;text-align: center;color: #666666}
</style>
