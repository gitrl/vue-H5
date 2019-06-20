<template>
    <div id="selectFlight" class="animatedRouter">
        <div class="local_scroll">
            <h2 class="bigTitle padT2 padL2">{{bigTitle}}</h2>
            <div class="airFlightBox">
                <div class="airFlightNav" v-show="isActive == '0' || isActive == '1'">
                    <ul>
                        <li style="position: relative" @click="selectNav(index)" :class="{active:isNavIndex == index}" v-for="(item,index) in airFlightNav" :key="index"><span>{{item}}</span><p class="sanjiao_down" style="position: absolute;bottom: 0;left: 43%;"></p></li>
                    </ul>
                </div>
                <div class="padL1 padR1 padT2 padB2" :class="{animatedTab:isNavIndex=='0'}" v-show="isShow1">
                    <ul class="selectInput padB2">
                        <li>
                            <img :src="airplan_icon" alt="">
                            <input type="text" v-model="flightNumText" :placeholder="msgText">
                        </li>
                        <li v-if="isActive != '2'">
                            <img src="../../assets/images/airPort/icon/dairy_icon.png" alt="">
                            <input type="text" :placeholder="msgDate" v-model="selectData">
                            <div class="calendarBox">
                                <group>
                                    <datetime v-model="selectData" title="设置日期" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD"></datetime>
                                </group>
                            </div>
                        </li>
                        <li v-if="isActive == '2'">
                            <img src="../../assets/images/airPort/icon/dairy_icon.png" alt="">
                            <input readonly type="text" v-model="startTime"  placeholder="请输入出发时间">
                            <div class="calendarBox">
                                <group>
                                    <datetime v-model="startTime" title="设置日期"    :end-date="endDate"  format="YYYY-MM-DD HH:mm"></datetime>
                                </group>
                            </div>
                        </li>
                        <li v-if="isActive == '2'">
                            <img src="../../assets/images/airPort/icon/dairy_icon.png" alt="">
                            <input readonly type="text" v-model="arrTime"   placeholder="请输入到达时间">
                            <div class="calendarBox">
                                <group>
                                    <datetime v-model="arrTime" title="设置日期" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD HH:mm" ></datetime>
                                </group>
                            </div>
                        </li>
                    </ul>
                    <div class="airBtnBox" v-if="isActive == '2'"  @click="flightNum(isActive)">
                        <airCommonBtn :airBtnText="airCommonBtnText" class="marB1"></airCommonBtn>
                    </div>
                    <div class="airBtnBox" v-else  @click="flightNum(isNavIndex)">
                        <airCommonBtn :airBtnText="airCommonBtnText" class="marB1"></airCommonBtn>
                    </div>

                </div>
                <div class="padL1 padR1 padT2 padB2" :class="{animatedTab:isNavIndex=='1'}" v-show="isShow2" >
                    <ul class="selectInput padB2">
                        <li style="padding-left: 0;padding-right: 0;">
                            <div class="selectAddressN TextC">
                                <span @click="departure(0)"><input v-model="cityAddress1"  readonly type="text" :placeholder="placeholderText1" class="startI"></span>
                                <span ><img src="../../assets/images/airPort/icon/exchangebig_icon.png" alt=""></span>
                                <span @click="departure(1)"> <input v-model="cityAddress2" type="text" :placeholder="placeholderText2"  class="startI"></span>
                            </div>
                        </li>
                        <li>
                            <img src="../../assets/images/airPort/icon/dairy_icon.png" alt="">
                            <input type="text"  placeholder="预计出发时间" v-model="selectData2">
                            <div class="calendarBox">
                                <group>
                                    <datetime v-model="selectData2" title="设置日期" :start-date="startDate" format="YYYY-MM-DD"></datetime>
                                </group>
                            </div>
                        </li>
                    </ul>
                    <div class="airBtnBox" v-if="isActive != '2'"  @click="flightNum(isNavIndex)">
                        <airCommonBtn :airBtnText="airCommonBtnText" class="marB1"></airCommonBtn>
                    </div>
                    <!--接站-->
                    <div class="airBtnBox"  v-if="isActive == '2'"  @click="flightNum(isActive)">
                        <airCommonBtn :airBtnText="airCommonBtnText" class="marB1"></airCommonBtn>
                    </div>
                </div>

            </div>
        </div>
        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
    </div>
</template>

<script>
  import {formatDate} from '../../assets/js/date.js';
  import airCommonBtn from '@/components/airCommonBtn';
  import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
  import {Group, Calendar,Datetime } from 'vux'
  export default {
    name: 'selectFlight',
    components:{
      airCommonBtn,
      ModelPop,
      Group,
      Calendar,
      Datetime
    },
    data:function () {
      return {
        token:'',

        bigTitle:'选择航班号',
        airFlightNav:['航班号','出发&目的地'],
        msgText:'',
        msgDate:'请选择起飞时间（当地）',
        isNavIndex:0,
        isActive:'',
        airplan_icon:require('../../assets/images/airPort/icon/airplan_icon.png'),
        garyarrow_icon:require('../../assets/images/airPort/icon/garyarrow_icon.png'),
        flightNumText:'',//航班号
        selectData:'',  //请选择起飞时间（当地）
        selectData2:'', //预计抵达时间
        cityName1:'',
        cityName2:'',
        cityAddress1:'',
        cityAddress2:'',
        aitaCode1:'',
        aitaCode2:'',

        placeholderText1:'出发地',
        placeholderText2:'目的地',

        isShow1:true,  //选择航班号
        isShow2:false, ////选择出发
        goodsType:'',

        //组件pop
        isShow:false,
        isSuss:false,
        TextMsg:"",
        BtnTextMsg:"确定",

        //组件按钮
        airCommonBtnText:'查询',
        startDate: '',  //开始时间
        endDate:'',  //结束时间

        //接站时间
        startTime:'',
        arrTime:'',

      }
    },
    mounted(){
      if (this.$route.query.isNavIndex) {  //起点 从下一级页面传上来的
        this.isNavIndex = this.$route.query.isNavIndex;
      }
    },
    methods:{
      //子组件向父组件传值
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.isShow = childValue;
      },
      //选择
      selectNav(index){
        this.isNavIndex = index;
        if(index == 1){
          this.isShow1 = false;
          this.isShow2 = true;
        }else {
          this.isShow1 = true;
          this.isShow2 = false;
        }
      },
      //航班号
      flightNum(index){
        let _this = this;
        //0/1是航班号/车次号与出发地目的的切换，2/3是业务类型（接站、送站）
        if(index == '0'){
          if(this.flightNumText == '' && this.selectData == ''){
            this.isShow = true;
            if(this.isActive == '3'){
              this.TextMsg = "车次号和出发时间不能为空";
            }else {
              this.TextMsg = "航班号和起飞时间不能为空";
            }
          }else if(this.flightNumText == ''){
            this.isShow = true;
            if(this.isActive == '3'){
              this.TextMsg = "车次号不能为空";
            }else {
              this.TextMsg = "航班号不能为空";
            }
          }else if(this.selectData == ''){
            this.isShow = true;
            if(this.isActive == '3'){
              this.TextMsg = "出发时间不能为空";
            }else {
              this.TextMsg = "起飞时间不能为空";
            }
          }else if(this.selectData != '' && this.flightNumText != ''){
            let timestamp1 = new Date(this.selectData.replace(/-/g, '/')).getTime();
            this.$router.push({path:'flightNum',query:{isNavIndex:this.isNavIndex,bigTitle:this.airFlightNav[0],time:timestamp1,goodsType:this.goodsType,flightNo:this.flightNumText,isActive:this.isActive}});
          }
        }else if(index == '1'){
            if(this.cityName1 == '' && this.cityName2 == '' && this.selectData2 == ''){
              this.isShow = true;
              this.TextMsg = "出发地&目的地&预计出发时间不能为空";
            }else if(this.cityName1 == '' ){
              this.isShow = true;
              this.TextMsg = "出发地不能为空";
            }else if(this.cityName2 == '' ){
              this.isShow = true;
              this.TextMsg = "目的地不能为空";
            }else if(this.selectData2 == '' ){
              this.isShow = true;
              this.TextMsg = "预计出发时间不能为空";
            }else if(this.cityAddress1 == undefined ){
              this.isShow = true;
              this.TextMsg = "出发地不能为空";
            }else if(this.cityAddress2 == undefined ){
              this.isShow = true;
              this.TextMsg = "目的地不能为空";
            }else if(this.selectData2 != '' && this.cityName1 != '' && this.cityName2 != ''){

              let bigTitle = this.cityName1+'-'+this.cityName2;
              //将选择的时间转化为时间戳
              let timestamp2 = new Date(this.selectData2.replace(/-/g, '/')).getTime();
              //let timestamp2 = (new Date(this.selectData2)).valueOf();
              this.$router.push({path:'flightNum',query:{isNavIndex:this.isNavIndex,bigTitle:bigTitle,time:timestamp2,cityName1:this.cityName1,cityName2:this.cityName2,aitaCode1:this.aitaCode1,aitaCode2:this.aitaCode2,isActive:this.isActive}});
            }
        }else if(index == '2'){
          if(this.flightNumText == '' && this.startTime == '' && this.arrTime == ''){
            this.isShow = true;
            this.TextMsg = "车次号、出发时间和到达时间不能为空";
          }else if(this.flightNumText == ''){
            this.isShow = true;
            this.TextMsg = "车次号不能为空"
          }else if(this.startTime == ''){
            this.isShow = true;
            this.TextMsg = "出发时间不能为空"
          }else if(this.arrTime == ''){
            this.isShow = true;
            this.TextMsg = "到达时间不能为空"
          }else if(this.arrTime != '' && this.flightNumText != ''&& this.startTime != ''){
            //将选择的时间转化为时间戳
            let timestamp1 = new Date(this.startTime.replace(/-/g, '/')).getTime();
            let timestamp2 = new Date(this.arrTime.replace(/-/g, '/')).getTime();
            this.$router.push({path:'checkIndex',query:{isNavIndex:this.isNavIndex,depTime:timestamp1,arrTime:timestamp2,isActive:this.isActive,flightNum:this.flightNumText}});
          }
        }
      },
      //目的地与出发地切换
      exchangebig_icon(){
        let name1 = this.cityName1;
        let name2 = this.cityName2;
        this.cityName1 = name2;
        this.cityName2 = name1;
        if(this.placeholderText1 == '出发地'){
          this.placeholderText1 = "目的地";
          this.placeholderText2 = "出发地";
        }else if(this.placeholderText1 == '目的地'){
          this.placeholderText1 = "出发地";
          this.placeholderText2 = "目的地";
        }
      },
      //出发地
      departure(index){
        //this.isActive 判断是接机还是送机，index判断是点击出发地还是目的地
        if(this.isActive == '0'){  //接机
          if(index == '0'){  //根据接机还是送机的状态来切换点击页面切换不同的状态
            this.$router.push({path:'departure',query:{isNavIndex:this.isNavIndex,cityName2:'拉萨',DTbigText:this.placeholderText1,bigTitle:this.bigTitle,selectNum:this.airFlightNav[0],msgText:this.msgText,aitaCode1:this.aitaCode1,aitaCode2:'LXA',isActive:this.isActive,goodsType:this.goodsType}});
          }else {
          }
        }else if(this.isActive == '1'){ //送机
          if(index == '0'){
          }else {
            this.$router.push({path:'departure',query:{isNavIndex:this.isNavIndex,cityName1:'拉萨',DTbigText:this.placeholderText2,bigTitle:this.bigTitle,selectNum:this.airFlightNav[0],msgText:this.msgText,aitaCode1:'LXA',aitaCode2:this.aitaCode2,isActive:this.isActive,goodsType:this.goodsType}});
          }
        }

      },
    },
    created(){
      this.startDate = this.getAfterDayDate(new Date(),0);  //开始时间
      this.endDate = this.getAfterDayDate(new Date(),90);  //结束时间

      this.isActive = this.$route.query.isActive;
      this.isNavIndex = this.$route.query.isNavIndex;
      this.msgText = this.$route.query.msgText;
      this.bigTitle = this.$route.query.bigTitle;
      //this.airFlightNav[0] = this.$route.query.selectNum;
      this.cityName1 = this.$route.query.cityName1;
      this.cityName2 = this.$route.query.cityName2;
      this.aitaCode1 = this.$route.query.aitaCode1;
      this.aitaCode2 = this.$route.query.aitaCode2;
      this.goodsType = this.$route.query.goodsType;

      //判断是否登录
        this.token = localStorage.getItem("token");


      //判断是否有导航值带过来
      if(this.$route.query.isNavIndex == undefined){
        this.isNavIndex = 0;
      }

      if(this.$route.query.isActive == '2' || this.$route.query.isActive == '3' ){
        //this.airFlightNav[0] = '车次号';
       // this.airFlightNav.pop();
        this.airplan_icon= require('../../assets/images/airPort/icon/btrain_icon.png');
        this.msgDate = '请选择出发时间（当地）'
      }else if(this.$route.query.isActive == '0'){
        this.cityAddress1 = this.cityName1;
        this.cityAddress2 = "拉萨贡嘎机场";
      }else if(this.$route.query.isActive == '1'){
        this.cityAddress1 = "拉萨贡嘎机场";
        this.cityAddress2 = this.cityName2;
      }

      if(this.isNavIndex == 1){
        this.isShow1 = false;
        this.isShow2 = true;
      }else {
        this.isShow1 = true;
        this.isShow2 = false;
      }

        //百度统计
        var arrStatistics = ['20202', '首页', '选择班次', '', ''];
        this.baiduS(arrStatistics);

    }

  }
</script>

<style scoped>
    #selectFlight{height: 100%;}
    .airFlightBox{box-shadow: 0 0 15px rgba(64,85,112,.15);border-radius:0.5rem;margin: 1.5rem;margin-top: 2rem; }
    .airFlightNav{ height: 4.5rem;background: linear-gradient(to right,#407FFD, #44A0FE);border-radius:0.5rem 0.5rem 0 0;}
    .airFlightNav ul li{float: left;width: 50%;text-align: center;line-height: 4.5rem;font-size: 1.4rem;color: #BADAFF;font-weight: bold;}
    .airFlightNav ul li.active{color: #ffffff;}
    .airFlightNav ul li.active .sanjiao_down{
        width:0;
        height:0;
        overflow:hidden;
        font-size: 0;     /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
        line-height: 0;  /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
        border-width:10px;
        border-style: dashed dashed solid dashed;/*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
        border-color:transparent transparent #ffffff  transparent;
    }

    .selectInput li{border-bottom: 1px solid #F5F5F5;line-height: 4rem;height: 4rem;padding-left: 1rem;padding-right: 1rem; margin-bottom: 1rem;position: relative}
    .selectInput li img{width: 2rem;vertical-align: middle;margin-top: -0.4rem;}
    .selectInput li input{width: 80%;outline: none;font-size: 1.4rem;height: 4rem;line-height: 4rem;padding-left: 0.3rem;}
    .selectInput li input.startI{width: 37%;height: 3rem;line-height: 3rem;text-align: center}
    .calendarBox{opacity: 0;position: absolute;width: 100%;bottom: 0;}

    .selectAddressN span{font-size: 1.5rem;color: #CECECE;}
    .selectAddressN span img{margin-left: 1rem; margin-right: 1rem;width: 2.2rem;vertical-align: middle;}


</style>
