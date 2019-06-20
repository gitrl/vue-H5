<template>
    <div id="zucheIndex" class="bgcolorW">
        <div class="indexBanner"><img src="../../assets/images/zuche/indexBanner.png"> </div>
        <!--首页条件选择器 S-->
        <div class="padL1 padR1 zucheBoxIndex" >
            <div class="zucheBox">
                <div class="zucheGroup1" :class="{padT1D5:index==1}" v-for="(item,index) in selectContent" :key="index">
                    <div class="zucheBd1 padR1 marR1">
                        <label>{{item.cityPlaceholder}}</label>
                        <p @click="selectCity(index,0)">{{item.cityName}}</p>
                    </div>
                    <div class="zucheGroupFlex zucheBd1">
                        <label>{{item.AddressPlaceholder}}</label>
                        <p @click="selectCity(index,1)">{{item.Address}}</p>
                    </div>
                </div>
                <div class="zucheGroup1 padT1D5">
                    <div class="zucheGroupDate">
                        <label>取车时间<span class="fr">{{startWeek}}</span></label>
                        <p @click="selectDate(0)" class="FontS12">{{checkDate.checkStartDate.slice(5,10)}}<span class="fr" style="font-size: 1.2rem;font-weight: normal">{{checkDate.checkStartDate.slice(11,16)}}</span></p>
                    </div>
                    <div class="dataDayNum">
                        <p class="dataDayNumBg">{{dayNum}}天</p>
                    </div>
                    <div class="zucheGroupDate">
                        <label>还车时间<span class="fr">{{endWeek}}</span></label>
                        <p @click="selectDate(1)"  class="FontS12">{{checkDate.checkEndDate.slice(5,10)}}<span class="fr" style="font-size: 1.2rem;font-weight: normal">{{checkDate.checkEndDate.slice(11,16)}}</span></p>
                    </div>
                </div>
                <div class="padT1D5" @click="selectCar">
                    <airCommonBtn :airBtnText="airCommonBtnText" class="marB1" ></airCommonBtn>
                </div>
            </div>
        </div>
        <!--首页条件选择器 E-->
        <!--时间选择器 S-->
        <div class="bulletBoxBottom" :class="{current:isCurrent}">
            <div class="pad1D5 FontS13 bulletBoxHeader" style="padding-bottom: 0"><span class="bulletText1" @click="dpMask">取消</span><span class="bulletTitle">选择取/还车时间</span><span @click="dateConfirm"  class="bulletText1">确定</span></div>
            <div class="bulletDateTab pad1">
                <ul>
                    <li :class="{active:isBTab==index}" v-for="(item,index) in bulletDateTab" :key="index" @click="bulletTab(index)">
                        <label>{{item.title}}</label>
                        <p class="TextC">{{item.date}}</p>
                    </li>
                </ul>
                <div class="dayNum"><span>{{checkDayNum}}天</span></div>
            </div>
            <div v-if="isBTab==0">
                <datetime-view v-model="checkStartDate" ref="datetime"  :start-date="startDate" :end-date="endDate" :minute-list="['00', '30']" format="YYYY-MM-DD HH:mm" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></datetime-view>
            </div>
            <div v-else>
                <datetime-view v-model="checkEndDate" ref="datetime"  :start-date="startDate" :end-date="endDate" :minute-list="['00', '30']" format="YYYY-MM-DD HH:mm" :min-hour="minHour" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分"></datetime-view>
            </div>
        </div>
        <div class="dp-mask" @click="dpMask" :class="{current:isMask}"></div>
        <!--时间选择器 E-->

        <!--取还车地点 S-->
        <div class="bulletBoxBottom " style="height: 85%;" :class="{current:cityCurrent}">
            <div  style="display: flex;flex-direction: column;height: 100%">
                <!--头部 S-->
                <div class="pad1D5 FontS13 bulletBoxHeader" style="padding-bottom: 0"><span class="bulletText1" @click="dpMask">取消</span><span class="bulletTitle">{{cityArr[typeInit].title}}</span><span  class="bulletText1">&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                <!--填写的输入框-->
                <div class="addressIndexBox pad1D5">
                    <!--填写的城市输入框-->
                    <div class="addressIndexBd1 addressW" :class="{addressWFlex:isActive==0}" @click="selectA(typeInit,0)">
                        <p class="addressImg"><img src="../../assets/images/zuche/icon/cityName.png"> </p>
                        <p class="addressInput"><input readonly v-model="cityArr[typeInit].cityName" :placeholder=cityArr[typeInit].placeholderCity /></p>
                        <p class="addressImg" v-if="isActive==0" @click="inputCloseIcon(typeInit,0)" style="padding-left: 0;margin-right: 1rem;"><img src="../../assets/images/zuche/icon/inputClear.png"> </p>
                    </div>
                    <!--填写的地址输入框-->
                    <div class="addressIndexBd1 addressW" :class="{addressWFlex:isActive==1}" @click="selectA(typeInit,1)">
                        <p class="addressImg"><img src="../../assets/images/zuche/icon/cityPosition.png" style="width: 0.9rem;"></p>
                        <p class="addressInput"><input v-model="cityArr[typeInit].cityAddress" :placeholder=cityArr[typeInit].placeholderAddress /></p>
                        <p class="addressImg" v-if="isActive==1" style="padding-left: 0;margin-right: 1rem;" @click="inputCloseIcon(typeInit,1)"><img src="../../assets/images/zuche/icon/inputClear.png"> </p>
                    </div>
                </div>
                <!--切换城市与高德地图搜索地址-->
                <div class="cityListBigBox">
                    <!--城市列表-->
                    <cityList v-show="isCityShow" v-on:childCityName="childCityName" :typeInit="typeInit" :cityName="cityArr[typeInit].cityName" ></cityList>
                    <!--搜索地址列表-->
                    <mapAddress v-show="isMapShow" v-on:childMapName="childMapName" :typeInit="typeInit" :cityName="cityArr[typeInit].cityName" :cityAddress="cityArr[typeInit].cityAddress" :cityCode="cityArr[typeInit].cityCode"></mapAddress>

                </div>
            </div>
        </div>
        <!--取还车地点 E-->
        <!--登录 S-->
        <isLogin :isLogin="isLogin"></isLogin>
        <!--登录 E-->
    </div>
</template>

<script>
  import airCommonBtn from '@/components/airCommonBtn';
  import cityList from '@/components/zuche/zucheCityList.vue';  //租车列表
  import mapAddress from '@/components/zuche/zucheAddress.vue';  //高德地图搜索地点
  import isLogin from  '@/views/comm/loginGuide.vue';  //把首页填写的信息写在一个组件里面，方便其它页面调用
  import { DatetimeView,Datetime,DatetimeRange } from 'vux';

  export default {
      name: 'zucheIndex',
      components: {
          airCommonBtn,
          cityList,
          mapAddress,
          isLogin,
          Datetime,
          DatetimeView,
          DatetimeRange
      },
      data: function () {
          return {
              value: ['2017-01-15', '03', '05'],
              //登录组件
              isLogin: false,
              token: '',
              //首页默认值
              selectContent: [  //首页默认取车城市、还车城市
                  {
                      cityPlaceholder: '取车城市',
                      cityName: '拉萨市',
                      AddressPlaceholder: '取车地址',
                      Address: '拉萨火车站',
                      cityCode:''
                  },
                  {
                      cityPlaceholder: '还车城市',
                      cityName: '拉萨市',
                      AddressPlaceholder: '还车地址',
                      Address: '拉萨火车站',
                      cityCode:''
                  }
              ],
              airCommonBtnText: '去选车',
              groupIcon1: require('../../assets/images/zuche/groupIcon2.png'),  //异地还车按钮
              isGroupIcon: true,  //是否是异地还车
              isMask: false,//是否显示遮罩层
              isCurrent: false,  //是否选择日期显示弹框事件
              cityCurrent: false,  //是否显示选择城市和地址的弹框事件
              typeInit: 0,//取还车类型  0是取车，1是还车
              isActive: 0,  //选择城市和地址选中的状态
              cityArr: [ //弹框填写取还地址
                  {
                      title: '取车地点',
                      placeholderCity: '取车城市',
                      placeholderAddress: '取车地点',
                      cityName: '拉萨市',
                      cityAddress: '',
                      cityCode:''
                  },
                  {
                      title: '还车地点',
                      placeholderCity: '还车城市',
                      placeholderAddress: '还车地点',
                      cityName: '拉萨市',
                      cityAddress: '',
                      cityCode:''
                  }
              ],
              bulletDateTab: [  //取车还车时间初始化
                  {
                      title: '取车时间',
                      date: '2019-02-07 13:00'
                  },
                  {
                      title: '还车时间',
                      date: '2019-02-08 13:00'
                  }
              ],
              isBTab: 0,  //取车还车时间tab切换

              selectLink: '',

              //时间控件
              startDate: '',  //取车开始时间
              returnDate: '',  //还车开始时间
              endDate:'',  //最晚订车时间
              checkStartDate: '',  //选中的取车时间
              checkEndDate: '',  //选中的还车时间
              checkStartHour: '',  //起始时间
              checkStartWeek: '',  //选中的取车星期几
              checkEndWeek: '',    //选中的还车星期几
              startWeek: '',  //首页显示取车星期几
              endWeek: '',    //首页显示还车星期几
              checkDayNum: '1',//相隔几天
              dayNum: '2',//相隔几天
              minHour: 0,  //还车时间最小小时
              HH: '10:00',

              checkDate: { //默认值时间
                  checkStartDate: '',
                  checkEndDate: ''
              },


              //地图传值
              isMapShow: false,  //高德地图搜索

              //城市列表传值
              isCityShow: false,  //城市列表
              isCheck:'0',  //

              //选择过后的所以信息传到这个数组
              infoArr: {}

          }
      },
      watch: {
          checkStartDate: function (val) {  //取车时间
              this.bulletDateTab[0].date = val;
              var currenttime = new Date(Date.parse(this.checkStartHour.replace(/-/g, "/"))).getTime();
              var checkDate = new Date(Date.parse(val.replace(/-/g, "/"))).getTime();
              if(currenttime>checkDate){
                  this.$vux.toast.show({ //提示
                      text: '取车时间最早预定时间为当前时间往后推1个小时',
                      type: 'text',
                      width: '95%',
                  });
              }else {
                  if (val.length < 16) {  //初始状态下没有时间
                      this.bulletDateTab[0].date = val + ' ' + this.HH
                  }
                  this.returnDate = val.slice(0, 10);
                  this.checkStartDate = val;
                  this.checkStartWeek = this.getWeek(new Date(val.slice(0,10)));

                  if (this.checkStartDate == this.checkEndDate) {
                      this.minHour = Number(val.slice(11, 13))
                  }
              }
              this.selectDay();  //计算天数
          },
          checkEndDate(val) {  //还车时间
              this.checkEndWeek = this.getWeek(new Date(val.slice(0,10)));
              this.bulletDateTab[1].date = val;
              if (val.length < 16) { //初始状态下没有时间
                  this.bulletDateTab[1].date = val + ' ' + this.HH
              }
              this.checkEndDate = val;
              this.selectDay(); //计算天数
          }
      },
      methods: {
          selectCity(type, num) { //选择城市及地址,type是类型，num是城市名或者地址
              this.cityCurrent = true;
              this.isMask = true;
              this.typeInit = type;
              if (this.typeInit == 0) {
                  this.isActive = num;
              } else {
                  this.isActive = num;
              }
              if (num == 0) {
                  this.isCityShow = true;
                  this.isMapShow = false
              } else {
                  this.isMapShow = true;
                  this.isCityShow = false
              }
          },
          selectA(type, num) {  //type是类型，num是城市名或者地址
              this.typeInit = type;
              if (this.typeInit == 0) {
                  this.isActive = num;
              } else {
                  this.isActive = num;
              }
              if (num == 0) {
                  this.isCityShow = true;
                  this.isMapShow = false
              } else {
                  this.isMapShow = true;
                  this.isCityShow = false
              }
          },
          inputCloseIcon(type, num) {  // 清空输入框 type是类型，num是城市名或者地址
              this.typeInit = type;
              if (num == 0) {
                  this.cityArr[type].cityName = '';
              } else {
                  this.cityArr[type].cityAddress = '';
              }

          },
          childMapName: function (childValue) {  //子组件传过来的地址名称
              this.cityArr[this.typeInit].cityAddress = childValue.name;
              //根据类型存入取还车的相关信息
              if (this.typeInit == 0) {
                  this.selectContent[0].cityName = this.cityArr[0].cityName;
                  this.selectContent[0].Address = this.cityArr[0].cityAddress;

                  localStorage.setItem("pickCity", this.cityArr[0].cityName);
                  localStorage.setItem("pickUpAddress", this.cityArr[0].cityAddress);
                  localStorage.setItem("pickLocation", childValue.location);
                  localStorage.setItem("onCarCityCode", this.selectContent[0].cityCode);
              } else {
                  this.selectContent[1].cityName = this.cityArr[1].cityName;
                  this.selectContent[1].Address = this.cityArr[1].cityAddress;

                  localStorage.setItem("returnCity", this.cityArr[1].cityName);
                  localStorage.setItem("returnAddress", this.cityArr[1].cityAddress);
                  localStorage.setItem("returnLocation", childValue.location);
                  localStorage.setItem("offCarCityCode", this.selectContent[1].cityCode);
              }

              //关闭遮罩
              this.dpMask();
          },
          childCityName: function (childValue) {  //子组件传过来的城市名称
              this.cityArr[this.typeInit].cityName = childValue.name;//点击重新选择城市
              this.cityArr[this.typeInit].cityCode = childValue.code;//点击重新选择城市
              this.cityArr[this.typeInit].cityAddress = '';  //城市换了，就要把地址栏清空

              //初始化定位当前城市
              if (this.cityArr[0].cityName == '' || this.cityArr[1].cityName == '') {
                  this.selectContent[0].cityName = childValue.name;
                  this.cityArr[0].cityName = childValue.name;
                  this.selectContent[1].cityName = childValue.name;
                  this.cityArr[1].cityName = childValue.name;
              }
              if (this.typeInit == 0) {
                  this.selectContent[0].cityCode = childValue.code;
              } else {
                  this.selectContent[1].cityCode = childValue.code;
              }
          },
          selectDate(index) {  //选择日期
              this.isBTab = index;
              this.isCurrent = true;
              this.isMask = true;
          },
          dpMask() {  //关闭遮罩
              this.isMask = false;
              this.cityCurrent = false;
              this.isCurrent = false;

              //没有存城市的时候，在关闭遮罩时，城市搜索显示的和页面一样
              if (this.typeInit == 0) {
                  this.cityArr[0].cityName = this.selectContent[0].cityName;
              } else {
                  this.cityArr[1].cityName = this.selectContent[1].cityName;
              }

          },
          dateConfirm() { //确定取车与还车时间
              let _this = this;
              var currenttime = new Date(Date.parse(this.checkStartHour.replace(/-/g, "/"))).getTime();  //当前时间
              var begintime = new Date(Date.parse(this.checkStartDate.replace(/-/g, "/"))).getTime();  //取车时间
              var endtime = new Date(Date.parse(this.checkEndDate.replace(/-/g, "/"))).getTime();  //还车时间
              var nTime = (endtime - begintime) / 60000;
              if(currenttime>=begintime){
                  this.$vux.toast.show({ //提示
                      text: '取车时间最早预定时间为当前时间往后推1个小时',
                      type: 'text',
                      width: '80%',
                  });
                  return
              } else if (nTime >= 0) {
                  this.isCurrent = false;
                  this.isMask = false;
                  this.dayNum = this.checkDayNum;
                  this.startWeek = this.checkStartWeek;
                  this.endWeek = this.checkEndWeek;
                  this.checkDate.checkStartDate = this.checkStartDate;
                  this.checkDate.checkEndDate = this.checkEndDate;

                  sessionStorage.setItem('checkStartDate',this.checkStartDate);
                  sessionStorage.setItem('checkEndDate',this.checkEndDate);
                  sessionStorage.setItem('dayNum',this.dayNum);

              } else {
                  this.$vux.toast.show({ //提示
                      text: '还车时间不可小于取车时间',
                      type: 'text',
                      width: '80%',
                  })
              }
          },
          bulletTab(index) {
              this.isBTab = index;
          },
          selectDay() { //根据日期计算时间天数
              var begintime = new Date(Date.parse(this.checkStartDate.replace(/-/g, "/"))).getTime();
              var endtime = new Date(Date.parse(this.checkEndDate.replace(/-/g, "/"))).getTime();
              var nTime = endtime - begintime;
              var day = Math.ceil(nTime / 86400000);  //向上取整
              if(endtime==begintime){
                  this.checkDayNum = '1';
                  return
              } else if(endtime<begintime){
                  this.$vux.toast.show({ //提示
                      text: '还车时间不可小于取车时间',
                      type: 'text',
                      width: '80%',
                  });
                  this.checkDayNum = '0';
                  return
              }

              this.checkDayNum = day;
          },
          selectCar() {  //去选车
              this.infoArr.checkStartDate = this.checkDate.checkStartDate;
              this.infoArr.checkEndDate = this.checkDate.checkEndDate;
              this.infoArr.dayNum = this.dayNum;
              this.infoArr.pickUpAddress = this.selectContent[0].Address;
              this.infoArr.returnAddress = this.selectContent[1].Address;
              this.infoArr.checkStartWeek = this.checkStartWeek;
              this.infoArr.checkEndWeek = this.checkEndWeek;
              this.infoArr.pickCity = this.selectContent[0].cityName;
              this.infoArr.returnCity = this.selectContent[1].cityName;

              this.infoArr.onCarCityCode = localStorage.getItem('onCarCityCode');
              this.infoArr.offCarCityCode = localStorage.getItem('offCarCityCode');
              this.infoArr.pickLocation = localStorage.getItem('pickLocation');
              this.infoArr.returnLocation = localStorage.getItem('returnLocation');


              if (this.selectContent[0].Address == '' ) {
                  this.$vux.toast.show({
                      text:'请输入取车地址',
                      type:'text',
                      width:'80%'
                  });
                  return
              }else if(this.selectContent[1].Address == ''){
                  this.$vux.toast.show({
                      text:'请输入还车地址',
                      type:'text',
                      width:'80%'
                  });
                  return
              }else if(this.checkDate.checkStartDate=='' || this.checkDate.checkEndDate == ''){
                  this.$vux.toast.show({
                      text:'请输入取车时间或还车时间',
                      type:'text',
                      width:'80%'
                  });
                  return
              }

              this.checkToken();  //验证token是否失效
          },

          checkToken(){  //判断token是否失效
              this.$server.get(this.webviewUrl+'api/comm/check-token?token='+this.token,null,null,'just').then((res) => {
                  if(res.code == 200){
                      localStorage.setItem("token",this.token);
                      let uri = 'token=' + this.token + '&infoArr=' + JSON.stringify(this.infoArr);
                      this.$router.push({path:'/zuche/selectCar',query:{token:this.token,infoArr:JSON.stringify(this.infoArr)}});
                  }else if(res.code == 10000){
                      this.isLogin = true;
                      this.$vux.toast.show({
                          text:res.msg,
                          type:'text',
                          width:'80%',
                      })
                  }else {
                      this.$vux.toast.show({
                          text:res.msg,
                          type:'text',
                          width:'80%',
                      })
                  }
              });

          }
      },
      mounted() {
          if (!localStorage.getItem("pickCity")) {
              //首次把默认的值存到本地
              localStorage.setItem("pickCity", this.selectContent[0].cityName);
              localStorage.setItem("returnCity", this.selectContent[1].cityName);
              localStorage.setItem("pickUpAddress", this.selectContent[0].Address);
              localStorage.setItem("returnAddress", this.selectContent[1].Address);
              localStorage.setItem("pickLocation", '91.156334,29.661831');
              localStorage.setItem("returnLocation", '91.156334,29.661831');
              localStorage.setItem("onCarCityCode", '540102');
              localStorage.setItem("offCarCityCode", '540102');
          } else {
              if (this.typeInit == 0) {
                  this.cityArr[this.typeInit].cityName = localStorage.getItem("pickCity");
              } else {
                  this.cityArr[this.typeInit].cityName = localStorage.getItem("returnCity");
              }
          }

          //获取本地存的地址
          this.selectContent[0].cityName = localStorage.getItem("pickCity");
          this.selectContent[1].cityName = localStorage.getItem("returnCity");
          this.selectContent[0].Address = localStorage.getItem("pickUpAddress");
          this.selectContent[1].Address = localStorage.getItem("returnAddress");
          this.selectContent[0].Address = localStorage.getItem("pickUpAddress");
          this.selectContent[1].Address = localStorage.getItem("returnAddress");
          this.cityArr[0].cityName = localStorage.getItem("pickCity");
          this.cityArr[1].cityName = localStorage.getItem("returnCity");
          this.cityArr[0].cityCode = localStorage.getItem("onCarCityCode");
          this.cityArr[1].cityCode = localStorage.getItem("offCarCityCode");
          this.selectContent[0].cityCode = localStorage.getItem("onCarCityCode");
          this.selectContent[1].cityCode = localStorage.getItem("offCarCityCode");


          //获取当前的时间点
          let d = new Date();
          let HH = this.num(d.getHours()+1) + ':' + this.num(d.getMinutes());
          this.checkStartHour = this.getAfterDayDate(new Date(), 0) + ' ' + HH;

          //初始化
          this.startDate = this.getAfterDayDate(new Date(), 0);  //取车开始时间
          this.returnDate = this.getAfterDayDate(new Date(), 0);  //还车开始时间
          this.endDate = this.getAfterDayDate(new Date(), 56);  //最晚还车时间

          if(sessionStorage.getItem('checkStartDate')){
              //首页临时存的时间
              let time1 = sessionStorage.getItem('checkStartDate');  //临时存的时间
              let time2 = sessionStorage.getItem('checkEndDate');  //临时存的时间
              let getTime1 =  new Date(Date.parse(time1.replace(/-/g, "/"))).getTime();
              let getTime1_2 =  new Date(Date.parse(this.checkStartHour.replace(/-/g, "/"))).getTime();

              if(getTime1>getTime1_2){  //判断是否是相等
                  this.checkDate.checkStartDate =  time1;
                  this.checkDate.checkEndDate =  time2;
              }else {
                  this.checkDate.checkStartDate =  this.checkStartHour;
                  this.checkDate.checkEndDate = this.checkStartHour;
              }
              this.dayNum = sessionStorage.getItem('dayNum');
              this.startWeek = this.getWeek(new Date(this.checkDate.checkStartDate.slice(0,10)));  //默认开始周几
              this.endWeek = this.getWeek(new Date(this.checkDate.checkEndDate.slice(0,10)));  //默认开始周几

          }else {
              //首页默认取还车时间及周几
              this.checkDate.checkStartDate = this.getAfterDayDate(new Date(), 1) + ' ' + this.HH;
              this.checkDate.checkEndDate = this.getAfterDayDate(new Date(), 3) + ' ' + this.HH;
              this.startWeek = this.getWeek(new Date(this.getAfterDayDate(new Date(), 1)));  //默认开始周几
              this.endWeek = this.getWeek(new Date(this.getAfterDayDate(new Date(), 3)));  //默认开始周几
          }

      },
      created() {
          let _this = this;
          //判断是否登录
          var param = this.GetRequest();

          console.log(param)
          if(param.token){
              this.token  = param.token;
              this.$server.get(this.webviewUrl+'api/comm/check-token?token='+_this.token,null,null,'just').then((res) => {
                  if(res.code == 200){
                      localStorage.setItem("token",_this.token);
                      return
                  }else {
                      this.token  = localStorage.getItem("token");
                  }
              });
          }else {
              this.token  = localStorage.getItem("token");
          }


          //首页默认取还车时间及周几
          this.checkDate.checkStartDate = this.getAfterDayDate(new Date(), 1) + ' ' + this.HH;
          this.checkDate.checkEndDate = this.getAfterDayDate(new Date(), 3) + ' ' + this.HH;

          setTimeout(function () {
              _this.checkStartDate = _this.checkDate.checkStartDate;
              _this.checkEndDate = _this.checkDate.checkEndDate;
              _this.bulletDateTab[0].date = _this.checkDate.checkStartDate;
              _this.bulletDateTab[1].date = _this.checkDate.checkEndDate;

          },500)
      }
  }
</script>

<style scoped>
    .zucheBd1{border-bottom: 1px solid #D8D8D8}
    .indexBanner{z-index: 0;}
    .indexBanner img{width: 100%}
    .zucheBoxIndex{position: relative;z-index: 1;margin-top: -2.5rem;}
    .zucheBox{box-shadow: 0 0 15px rgba(64,85,112,.35);border-radius:1rem;margin: 1rem; padding: 1.5rem; background: #ffffff}
    .zucheGroup1{display: flex; justify-items: center;align-items: center}
    .zucheGroupFlex{flex: 1}
    .zucheGroup1 label{color: #AAAAAA;font-size: 1.1rem;}
    .zucheGroup1 p{color: #666666;font-size: 1.4rem; height: 3.5rem;overflow: hidden; line-height: 3.5rem;font-weight: bold}
    .zucheGroup1 p span{color: #AAAAAA}
    .zucheGroup1 p img{width: 3.5rem; margin-top: 0.5rem;}
    .zucheGroupDate{width: 37.5%;}
    .dataDayNum{width: 25%; align-items: center;justify-items: center}
    .zucheGroup1 p.dataDayNumBg{background: url("../../assets/images/zuche/dataDayNum.png") no-repeat;background-size: 100%;width: 3rem; color: #666666; line-height: 3rem; font-size: 1rem;text-align: center;margin: 0 auto; margin-top: 0.5rem;}

    /*弹框*/
    .bulletBoxBottom{width: 100%; position: fixed;left: 0;bottom: 0;z-index: 3;-webkit-transition: -webkit-transform 0.3s ease;transition: -webkit-transform 0.3s ease;-webkit-transform: translateY(100%);transform: translateY(100%);border-radius: 1rem 1rem 0 0;background: #ffffff;}
    .bulletBoxBottom.current{display: block;transform: translateY(0px);}

    .dp-mask{position: fixed;width: 100%;height: 0;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;}
    .bulletText1{color: #407FFD}
    .bulletBoxHeader{display: flex; }
    .bulletTitle{flex: 1;text-align: center;color: #666666}
    .bulletDateTab{position: relative}
    .bulletDateTab ul{display: flex;width: 100%; }
    .bulletDateTab ul li{background: #D8D8D8;width: 50%;height:4.5rem;text-align: center;color: #ffffff;padding-top: 0.5rem}
    .bulletDateTab ul li label{font-size: 1rem;line-height: 2rem;}
    .bulletDateTab ul li p{font-size: 1.3rem;}
    .bulletDateTab ul li:first-child{border-radius: 0.5rem 0 0 0.5rem}
    .bulletDateTab ul li:last-child{border-radius: 0 0.5rem 0.5rem 0}
    .bulletDateTab ul li.active{background: #407FFD}
    .dayNum{position: absolute;left: 45%;top: 2rem;background: #ffffff;border: 1px solid #407FFD;border-radius: 3rem;height: 3rem;width: 3rem;text-align: center;line-height: 1rem;font-size: 1.2rem;color: #407FFD; display: flex;justify-content: center;align-items: center}

    /*取还车地点*/
    .addressIndexBox{display: flex;align-items: center}
    .addressIndexBoxR{flex: 1;}
    .addressIndexLText{width: 2rem;height: 2rem;border-radius: 2.5rem;border: 1px solid #E6E6E6;text-align: center; font-size: 1.1rem;color: #D8D8D8;line-height: 2rem;}
    .addressIndexLBd{width: 1rem;border-right: 1px dotted #979797;height: 2rem;margin-top: 1px;margin-bottom: 1px;}
    .addressIndexI{display: flex;}


    .addressIndexCityName{background: url("../../assets/images/zuche/icon/cityName.png") 1rem center no-repeat; padding-left: 3rem;  margin-right: 0.5rem;border: 1px solid #EFEFEF;border-radius: 2rem;}
    .addressIndexCityName input,.addressIndexCityPosition input{background: none;line-height: 3rem; width: 6rem;font-size: 1.2rem;outline: none;margin-right: 1rem;}
    .addressIndexCityPosition{background: url("../../assets/images/zuche/icon/cityPosition.png") 1rem center no-repeat; border: 1px solid #EFEFEF;border-radius: 2rem;padding-left: 3rem; flex: 1;overflow-x: hidden;padding-right: 1rem;}
    .addressIndexCityPosition input{width: 100%}
    .addressIndexCityName.active,.addressIndexCityPosition.active{border-color: #407FFD}


    .addressIndexBd1{border: 1px solid #EFEFEF;border-radius: 2rem; display: flex;align-items: center;overflow: hidden}
    .addressW{width: 9rem;}
    .addressWFlex{flex: 1;border-color: #407FFD}
    .addressIndexBd1 p.addressImg{width: 1rem;padding-left: 1rem;margin-right: 0.5rem;}
    .addressIndexBd1 img{width: 1rem; vertical-align: middle;margin-top: -0.3rem;}
    .addressIndexBd1 p.addressInput{ flex: 1;overflow: hidden}
    .addressIndexBd1 input{background: none;line-height:2.8rem; width: 95%; font-size: 1.2rem;outline: none;margin-right: 1rem;}
    .addressIndexBd1:last-child{margin-left: 0.5rem;}



    .cityListBigBox{flex: 1;overflow-y: scroll; -webkit-overflow-scrolling: touch; color: #666666}
</style>
