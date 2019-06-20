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
                <ul class="AirIndexInput padB2">
                    <li>
                        <a :href="selectFlight(isActive)">
                            <img src="../../assets/images/airPort/icon/ticket_icon.png" alt="">
                            <input readonly type="text" v-model="FlightNum"  :placeholder="msgText">
                            <div>{{arrivalTime}}</div>
                        </a>
                    </li>
                    <li>
                        <a :href="destination(isActive)">
                            <img src="../../assets/images/airPort/icon/dizhi_icon.png" alt="">
                            <input readonly type="text" v-model="addressData"  :placeholder="addressText">
                        </a>
                    </li>
                    <li>
                        <img src="../../assets/images/airPort/icon/exchangebig_icon.png" alt="">
                        <span class="" style="padding-left: 0.5rem;font-size: 1.25rem;">{{item.name}}</span>
                        <div>{{carTime}}</div>
                    </li>
                </ul>
                <div class="airBtnBox"  @click="reservationCar(isActive)">
                    <airCommonBtn :airBtnText="airCommonBtnText" class="marB1"></airCommonBtn>
                </div>
            </div>
        </div>
        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
    </div>
</template>
<script>
  import airCommonBtn from '@/components/airCommonBtn';
  import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
  export default {
    name: 'airIndex',
    components:{
      airCommonBtn,
      ModelPop,
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

        //抵达时间
        arrivalTime:'',
        //用车时间
        carTime:''
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
        localStorage.setItem("isActive", index); //把isActive存入本地
        this.msgInfo(index);
      },
      //填写航班、车次
      selectFlight(index){
        if(index == '0' || index == '1'){
          this.bigTitle = '选择航班号';
        }else {
          this.bigTitle = '选择车次号';
        }
          let uri= 'token='+this.token+'&isActive='+this.isActive+'&msgText='+this.msgText+'&bigTitle='+this.bigTitle+'&selectNum='+this.selectNum+'&goodsType='+this.siteData[this.isActive].goodsType;
          return 'justuser://www.maoniuchuxing.com/web/openUrl?url='+this.webviewUrl+'caruser/airport/selectFlight?'+encodeURIComponent(uri);

      },
      //填写目的地
      destination(index){
        //alert(this.isActive)
          let uri= 'token='+this.token+'&isActive='+this.isActive+'&addressText='+this.addressText+'&bigTitle='+this.bigTitle;
          //return this.webviewUrl+'destination?'+encodeURI(uri)
          return 'justuser://www.maoniuchuxing.com/web/openUrl?url='+this.webviewUrl+'caruser/airport/destination?'+encodeURIComponent(uri);
      },
      //预约用车
      reservationCar(index){
        if(this.FlightNum == '' && this.addressData == ''){
          if(index==0){
            this.isShow = true;
            this.TextMsg = "航班号和目的地不能为空"
          }else if(index == 1){
            this.isShow = true;
            this.TextMsg = "航班号和出发地不能为空"
          }else if(index == 2){
            this.isShow = true;
            this.TextMsg = "车次号和目的地不能为空"
          }else if(index == 3){
            this.isShow = true;
            this.TextMsg = "车次号和出发地不能为空"
          }
        }
      },
      //初始化获取站点
      siteName(){
        let _this = this;
        this.$vux.loading.show();
        let paramsObj = {};
        let headersObj = {'content-type': 'application/json'};
        this.$server.get(this.AirROOT+"ws/h5/v1.0/goods/buy",paramsObj,headersObj).then(res => {
          _this.$vux.loading.hide();
          if(res.code == 200){
            _this.siteData = res.data;
            if(_this.flightNum == '' || _this.flightNum == undefined){
              _this.TimeHas = false;
            }else {
              _this.estimatedTime(res.data[_this.isActive].goodsType);
            }
          }else {
            this.isShow = true;
            this.TextMsg = res.msg;
          }
        })
      },
      //预置信息
      msgInfo(index){
        if(index == 0){
          this.msgText = '请输入航班号';
          this.addressText = '请输入目的地';
          this.bigTitle = '选择航班号';
        }else if(index  == 1){
          this.msgText = '请输入航班号';
          this.addressText = '请输入出发地';
          this.bigTitle = '选择航班号';
        }else if(index  == 2){
          this.msgText = '请输入车次号';
          this.addressText = '请输入目的地';
          this.bigTitle = '选择车次号';
          this.selectNum = '车次号';
        }else if(index  == 3){
          this.msgText = '请输入车次号';
          this.addressText = '请输入出发地';
          this.bigTitle = '选择车次号';
          this.selectNum = '车次号';
        }
      }
    },
    created(){
      var param = this.GetRequest();
      this.siteName();  //初始化数据


      if(param.token){
        this.token = param.token;
        localStorage.setItem("token", this.token);
      }else {

      }
      //从下个页面带过来的
      if(this.$route.query.isActive == undefined && localStorage.getItem("isActive") == null){
        this.isActive = 0;
        localStorage.setItem("isActive", this.isActive); //把isActive存入本地
      }else {
        if(localStorage.getItem("isActive")){
          this.isActive = localStorage.getItem("isActive");
          this.msgInfo(this.isActive);
        } else {
          this.isActive = this.$route.query.isActive;
        }
        this.token = this.$route.query.token;
      }

    }
  }
</script>

<style scoped>
    #airIndex{height: 100%;background: #ffffff;}

    .banner_pic img{width: 100%;}
    .airIndexNav ul{background: linear-gradient(to right,#407FFD, #44A0FE); padding-left: 1rem;padding-right: 1rem;height: 4rem;border-radius: 0.5rem;}
    .airIndexNav ul li{float: left;width: 25%;color: #ffffff;font-size: 1.3rem;text-align: center;line-height: 3.6rem;margin-top: 0.2rem;margin-bottom: 0.2rem;border-radius: 0.5rem;}
    .airIndexNav ul li.active{background: #ffffff;color: #333333;}

    .airInexBox{box-shadow: 0 0 15px rgba(64,85,112,.15);border-radius:0.5rem;margin: 1rem;margin-top:0.5rem;}
    .airIndexOne{display: none;}
    .airIndexOne.animatedTab{display: block;}
    .AirIndexInput li{border-bottom: 1px solid #F5F5F5;line-height: 4rem;  padding-left: 1rem;padding-right: 1rem; position: relative;padding-bottom: 0.8rem; padding-top: 0.3rem}
    .AirIndexInput li img{width: 1.6rem;vertical-align: middle;margin-top: -0.2rem;}
    .AirIndexInput li input{width: 80%;outline: none;font-size: 1.25rem;height: 4rem;line-height: 4rem;padding-left: 0.5rem;}
    .AirIndexInput li input.startI{width: 20%;height: 3rem;line-height: 3rem;}
    .AirIndexInput li div{line-height: 2rem;margin-top: -1rem;margin-left: 2.5rem; padding-bottom: 0.2rem; color: #FEBE00;font-size: 1.1rem;}
</style>
