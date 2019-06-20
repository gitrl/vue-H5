<template>
<div id="departure" class="animatedRouter">
    <div class="local_scroll">
        <div class="FlexBigBox">
        <h2 class="bigTitle padT1 padL2">{{bigTitle}}</h2>
        <div class="searchBox pad1D5">
            <div class="searchInput">
                <img class="search_icon" src="../../assets/images/airPort/icon/search_icon.png"/>
                <input class="searchText" id="tipInput" type="text" v-model="endText" :placeholder="plaMsg"   v-on:input="emptyInput()"/>
                <img @click="inputCloseIcon()" class="inputClose_icon" src="../../assets/images/airPort/icon/inputClose_icon.png">
            </div>
        </div>
        <div class="positionR">
            <div class="cityPositioning  borderB" ><img src="../../assets/images/airPort/icon/city_icon.png"><span class="FontS12">{{openCityName}}</span> </div>
            <!--开放城市 S-->
            <!--<openCity v-on:childByCity="childByCity" :openCityIsShow.sync="CityIsShow"></openCity>-->
            <!--开放城市 E-->
        </div>
        <!--热门区域 S-->
        <div class="hotArea pad2 padT1">
            <h3 class="FontS12">热门区域</h3>
            <ul>
                <li v-for="(item,index) in hotAddressData" :class="{active:isHot == index}" :key="index" @click="checkHotAddress(index,item)">{{item.title}}</li>
            </ul>
        </div>
        <!--热门区域 E-->
        <div class="addressRecord searchTips padL2 padR2" v-show="isShow2">
            <ul>
                <li v-for="(item,index) in searchData" :key="index" @click="checkAddress(item)">
                    <img src="../../assets/images/airPort/icon/navigation_icon.png" class="fl">
                    <div class="navigation_Text fl">
                        <h3>{{item.name}}</h3>
                        <p>{{item.address}}</p>
                    </div>
                </li>
            </ul>
        </div>

    </div>
    </div>
    <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
</div>
</template>

<script>
    import AMap from 'AMap';

    import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件

    export default {
        name: "destination",
        components:{
          ModelPop,
          History
        },
        mounted:function(){

        },
        data:function(){
            return {
              //组件pop
              isShow:false,
              isSuss:false,
              TextMsg:"",
              BtnTextMsg:"确定",

                bigTitle:'目的地',
                plaMsg:'请输入您的目的地',
                startText:'',
                endText:'',
                searchData:[],
                end:'endText',
                userId:'',
                familyAdd:{},
                openCityName:'拉萨市',
                isShow1:true,
                isShow2:false,
                isShow3:false,
                CityIsShow:false,
                addressRecod:[],
                historyData:[],
                cookieData:[],

              //从上一级带过来的
              isActive:'',
              //上一级页面带过来的
              addressText:'',
              FlightNum:'',
              FlightTime:'',
              FlightIphone:'',
              FlightName:'',
              startTime:'',
              arrTime:'',
              checkImg2:'',
              changValue:'',
              depTime:'',
              token:'',

              //热门地址
              hotAddressData:[],
              isHot:'0',
                isUsersType:0,

            }
        },
        methods: {

          //子组件向父组件传值
          childByValue: function (childValue) {
            // childValue就是子组件传过来的值
            this.isShow = childValue;
          },
          //地图
          init: function () {
            let _this=this;
            var map = new AMap.Map("container", {
              center: [116.397428, 39.90923],
              resizeEnable: true,
              zoom: 16,
            });

            AMap.plugin('AMap.Autocomplete', function(){
              let tipinput = document.getElementById('tipInput');
              // 实例化Autocomplete
              var autoOptions = {
                //city 限定城市，默认全国
                city: '拉萨',
                citylimit: true,
               // input:tipinput
              }
              var autoComplete= new AMap.Autocomplete(autoOptions);
               autoComplete.search(_this.endText, function(status, result) {
                 // 搜索成功时，result即是对应的匹配数据
                 _this.searchData = [];
                 if(result.info == 'OK'){
                   _this.searchData = result.tips;
                   console.log( _this.searchData);
                 }
               })
            })
          },
            //点击清空input的值
            emptyInput(){
                if( this.endText.length>0){
                    this.isShow1 = false;
                    this.isShow2 = true;
                    this.init();
                }else {
                    this.isShow1 = true;
                    this.isShow2 = false;
                }
            },
            //清空输入框
            inputCloseIcon(){
                this.endText = '';
            },

            //openCity
            childByCity: function (childValue) {
                // childValue就是子组件传过来的值
                this.openCityName = childValue
            },
          //热门区域
          hotAddress(){
            let headersObj = {'content-type': 'application/json'};
            this.$server.get(this.AirROOT + 'ws/v1.0/hotplace/list',null,headersObj).then(res =>{
              if(res.code == 200){
                this.hotAddressData = res.data;
              }else {
                this.isShow = true;
                this.TextMsg= res.msg;
              }
            })
          },
          //选择热门地址
          checkHotAddress(index,item){
            let _this =this;
            this.isHot = index;
            return _this.$router.push({path: 'checkIndex',query:{isActive:_this.isActive,FlightTime:_this.FlightTime,addressData:item.title,address:item.address,district:item.district,lat:item.location.lat,lng:item.location.lng,FlightName:_this.FlightName,FlightIphone:_this.FlightIphone,startTime:_this.startTime,arrTime:_this.arrTime,flightNum:_this.FlightNum,depTime:_this.depTime,isUsersType:this.isUsersType}});
          },
          //选择搜索后的地址
          checkAddress(item){
            let _this = this;
            let selectPoi =item;  //获取poi地址
            let addressA = selectPoi.address;
            let district =  selectPoi.district.substring(8); //属于那个区

            if(addressA == '' || addressA.length == 0 || selectPoi.location=='' || addressA == []){
              _this.isShow = true;
              _this.TextMsg = "请输入具体地址";
            }else {
                let headersObj = {"x-access-token": _this.token};
                _this.$server.get(this.AirROOT+'app/v1.0/order/check/point?lat='+selectPoi.location.lat+'&lng='+selectPoi.location.lng,null,headersObj).then(res =>{
                    if(res.code == 200){
                        _this.$router.push({path: 'checkIndex',query:{isActive:_this.isActive,FlightTime:_this.FlightTime,addressData:selectPoi.name,address:selectPoi.address,district:district,lat:selectPoi.location.lat,lng:selectPoi.location.lng,FlightName:_this.FlightName,FlightIphone:_this.FlightIphone,startTime:_this.startTime,arrTime:_this.arrTime,flightNum:_this.FlightNum,depTime:_this.depTime,isUsersType:_this.isUsersType}});
                    }else {
                        _this.isShow = true;
                        _this.TextMsg = res.msg;
                    }
                })

            }
          }

        },
        created:function () {
          this.isActive = this.$route.query.isActive;
          this.placehloder = this.$route.query.placehloder;
          this.isActive = this.$route.query.isActive;
          this.addressText = this.$route.query.addressText;
          this.FlightNum = this.$route.query.flightNum;
          this.FlightTime = this.$route.query.FlightTime;
          this.FlightName = this.$route.query.FlightName;
          this.FlightIphone = this.$route.query.FlightIphone;
          this.startTime = this.$route.query.startTime;
          this.arrTime = this.$route.query.arrTime;
          this.checkImg2 = this.$route.query.checkImg2;
          this.changValue = this.$route.query.changValue;
          this.depTime = this.$route.query.depTime;
          this.isUsersType =  this.$route.query.isUsersType;

         // alert(this.isActive)
         //判断是否登录
          this.token = localStorage.getItem("token");

          if(this.isActive=='0' || this.isActive =='2'){
            this.bigTitle = '目的地';
            this.plaMsg = '请输入您的目的地';
          }else {
            this.bigTitle = '出发地';
            this.plaMsg = '请输入您的出发地';
          }
          //热门区域
          this.hotAddress();
        }
    }
</script>

<style scoped>
    #departure{height: 100%;background: #ffffff}
    .searchTips{position: absolute;top:9.5rem;background: #ffffff;width: 90%;}
    /*搜索样式*/
    .searchInput{background: #ffffff;box-shadow:0 0 30px #ddd;height:3.5rem;border-radius: 1.7rem; padding-left: 1rem; display: flex; }
    .searchInput img.search_icon{width: 1.5rem; height:1.5rem; padding-top: 1rem;}
    .searchText{height: 2.5rem;line-height: 2.5rem;outline: none; margin-left: 10px;width: 20rem;background: #ffffff;margin-top: 0.5rem;font-size: 1.1rem;flex: 1;margin-right: 1rem;color: #555555}
    .searchInput img.inputClose_icon{margin-right: 1rem;width: 1rem;height: 1rem; padding-top: 1.2rem;}

    /*定位*/
    .cityPositioning{margin-left: 2rem; margin-right: 2rem;padding-bottom: 1rem; color: #666666}
    .cityPositioning img{width: 1.5rem;vertical-align: middle;margin-right: 0.5rem;margin-top: -0.3rem}

    /*历史记录*/
    .addressRecord{ overflow-y: auto; height: 35em;}
    .addressRecord ul li{width: 100%;padding-bottom: 1rem;display:flex;flex-flow:row;  justify-content:center;}
    .addressRecord ul li img{height: 1.5rem;padding-top: 0.5rem;}
    .addressRecord ul li .navigation_Text{flex:1;margin-left: 0.5rem; }
    .addressRecord ul li h3{font-size: 1.1rem;color: #666666}
    .addressRecord ul li p{font-size: 1rem;color: #AAAAAA;line-height: 2rem;}

    .hotArea ul li{float: left;font-size: 1.1rem;border: 1px solid #EFEFEF;border-radius: 1.5rem;padding-left: 1.5rem;padding-right: 1.5rem;line-height: 2rem;margin-top: 1rem;margin-right: 1rem;}
    .hotArea ul li.active{border: 1px solid #407FFD; color: #407FFD}

</style>
