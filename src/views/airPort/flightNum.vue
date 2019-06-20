<template>
    <div id="flightNum" class="animatedRouter">
        <div class="flightData" v-if="flightNumData != ''">
            <h2 class="bigTitle padT2 padL2">{{bigTitle}}</h2>
            <div class="pad1 flightNumListBox">
                <div class="flightNotice FontS12 colorGray padL1 padR1 padB1"><img src="../../assets/images/airPort/icon/notice_icon.png"><span>{{noticeInfo}}</span> </div>
                <ul class="flightNumList">
                    <li v-for="(item,index) in flightNumData">
                        <div class="flightNumContent">
                            <div class="flightNumData">
                                <h2>{{item.depTime | formatDate}}</h2>
                                <p><span v-if="item.depCity != '拉萨贡嘎机场'">{{item.depCity}}</span><span v-else>拉萨</span><span v-if="item.depTerminal != '--'">{{item.depTerminal}}</span></p>
                            </div>
                            <span class="TextC"><img src="../../assets/images/airPort/icon/garyarrow_icon.png"> </span>
                            <div class="flightNumData">
                                <h2>{{item.arrTime | formatDate}}</h2>
                                <p>{{item.arrCity}}<span v-if="item.arrTerminal != '--'">{{item.arrTerminal}}</span></p>
                            </div>
                            <div class="selectNumBtn" @click="checkFlight(item.flightNo,item.depTime,item.arrTime)">选择</div>
                        </div>
                        <div class="flightCompany"><!--<img src="../../assets/images/airPort/icon/flightIcon.jpg">-->{{item.airCompany}}{{item.flightNo}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="noData" v-show="noData">
           <NoData :noDataMsg="noDataMsg"></NoData>
        </div>
        <!--登录 S-->
        <isLogin :isLogin="isLogin"></isLogin>
        <!--登录 E-->
    </div>
</template>

<script>
  import {formatDate} from '../../assets/js/date';  //时间过滤器
  import NoData from '@/components/noInformation';
  import isLogin from  '@/views/comm/loginGuide.vue';  //登录组件
  export default {
    name: 'flightNum',
    components:{
      NoData,
      isLogin
    },
    data:function () {
      return {
        token:'',
        bigTitle:'航班号',
        time:'',
        noticeInfo:'具体航班时间以航空公司为准',
        flightNumData:[],  //按航班号查询
        flightListData:[],  //按起降点查询
        noDataMsg:'',
        isNavIndex:'',

        goodsType:'',
        flightNo:'',
        isActive:'',
        noData:false,  //没有信息

        //login组件
        isLogin:false
      }
    },
    methods:{
      //按航班号
      flightNumList(){
        let _this  =this;
        this.$vux.loading.show();
        let paramObj = {
          flightNo:this.flightNo,
          date:this.time,
          goodsType:this.goodsType,
        }
        let headersObj = {'content-type': 'application/json','x-access-token':this.token};
        this.$server.get(this.AirROOT +"app/v1.0/flight/getByFlightNo",paramObj,headersObj).then(res =>{
          if(res.code == 200){
            this.$vux.loading.hide();
            this.flightNumData = res.data;
            this.isLogin = false;
          }else if(res.code == 10000){  //登录失效
            _this.$vux.loading.hide();
            _this.$vux.toast.show({ //提示
              text: res.msg,
              type:'text',
              width:'80%',
            });
            setTimeout(function () {
              _this.$vux.toast.hide();
              _this.isLogin = true;
            },2000)
          }else {
            _this.$vux.loading.hide();
            this.noData = true;
            this.noDataMsg = res.msg;
          }
        });
      },
      //按起降点
      flightListDataM(){
        let _this = this;
        this.$vux.loading.show();
        let paramObj = {
          depCode:this.aitaCode1,
          depCity:this.cityName1,
          arrCode:this.aitaCode2,
          arrCity:this.cityName2,
          date:this.time
        }
        let headersObj = {'content-type': 'application/json','x-access-token':this.token};
        this.$server.get(this.AirROOT +"app/v1.0/flight/getByDepCodeAndArrCode",paramObj,headersObj).then(res =>{
          this.$vux.loading.hide();
          if(res.code == 200){
            console.log(res)
            this.flightNumData = res.data;
            this.isLogin = false;
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
            _this.$vux.toast.hide();
            this.noData = true;
            this.noDataMsg = res.msg;
          }
        });
      },
      //选择航班
      checkFlight(num,depTime,arrTime){
        this.$router.push({path:'checkIndex',query:{flightNum:num,depTime:depTime,arrTime:arrTime,isActive:this.isActive}})
      },
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'hh:mm');
      }
    },
    created(){
      //获取上一级带过来的参数
      this.isNavIndex = this.$route.query.isNavIndex;
      this.isActive = this.$route.query.isActive;
      this.bigTitle = this.$route.query.bigTitle;
      this.time = this.$route.query.time;
      this.goodsType = this.$route.query.goodsType;

      //判断是否登录
        this.token = localStorage.getItem("token");

      //获取列表
      //0表示航班号和车次号，1表示出发地和目的地
      if(this.isNavIndex == '0'){
        this.flightNo = this.$route.query.flightNo;
        this.flightNumList();

      }else if(this.isNavIndex == '1'){
        //按起降点查询
        this.cityName1 = this.$route.query.cityName1;
        this.cityName2 = this.$route.query.cityName2;
        this.aitaCode1 = this.$route.query.aitaCode1;
        this.aitaCode2 = this.$route.query.aitaCode2;
        this.flightListDataM();
      }

      if(this.isActive == '0' || this.isActive == '1'){
        this.noticeInfo = '具体航班时间以航空公司为准'
      }else {
        this.bigTitle = '车次号'
        this.noticeInfo = '具体车次时间以火车时间为准'
      }

        //百度统计
        var arrStatistics = ['20202', '首页', '选择班次', '', ''];
        this.baiduS(arrStatistics);
    }
  }
</script>

<style scoped>
    #flightNum{display: flex; flex-direction: column;height: 100%}
    .flightNotice img{width: 1.6rem;vertical-align: middle;margin-right: 0.5rem;margin-top: -0.1rem;}
    .flightNumList{flex: 1;overflow-y: scroll;-webkit-overflow-scrolling: touch;}
    .flightNumList li div.flightNumContent{padding: 1rem; padding-top: 2rem;  display: flex; justify-items: center; align-items: center; background: url("../../assets/images/airPort/ticket_bg1.png") no-repeat; background-size: 100% 100%;}
    .flightNumContent span img{width: 4rem;}

    .flightNumData{width: 31%;text-align: center;}
    .flightNumData h2,.flightNumData p{text-align: center;color: #666666}
    .flightNumData h2{font-size: 2.2rem;}
    .flightNumData  p{font-size: 1.1rem; line-height: 1.5rem;padding-top: 0.2rem;}
    .selectNumBtn{background: linear-gradient(to right,#407FFD, #44A0FE); flex: 1; margin-right: 1rem; border-radius: 1.5rem;height:3rem; line-height: 3rem;font-size: 1.2rem;color: #ffffff;text-align: center;}

    .flightCompany{ background: url("../../assets/images/airPort/ticket_bg2.png") no-repeat;background-size: 100% 100%;padding-left: 3rem; padding-right: 2rem;padding-top: 0.5rem;padding-bottom: 2rem;color: #9B9B9B;font-size: 1.1rem;}
    .flightCompany img{width: 1.5rem;vertical-align: middle;}

    .flightData{flex: 1;height: 100%;display: flex;flex-direction: column;}
    .flightNumListBox{display: flex;flex-direction: column;flex:1;height: 100%}
    .noData{flex: 1;}




</style>
