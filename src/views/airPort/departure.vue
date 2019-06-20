<template>
    <div id="departure" class="animatedRouter">
        <div class="FlexBigBox">
            <h2 class="bigTitle padT1 padL2">{{bigTitle}}</h2>
            <div class="searchBox pad1D5">
                <div class="searchInput">
                    <img class="search_icon" src="../../assets/images/airPort/icon/search_icon.png"/>
                    <input class="searchText" id="field" type="text" v-model="seachCity" placeholder="搜索城市"   v-on:input="emptyInput()"/>
                    <img @click="inputCloseIcon()" class="inputClose_icon" src="../../assets/images/airPort/icon/inputClose_icon.png">
                </div>
            </div>
            <div class="searchCityList" v-show="searchCityList">
                <ul class="cityList">
                    <li v-for="(k,i) in filterCityData" @click="hotCitySelect(k.name,i,k.aitaCode)" :key="i">{{k.name}}</li>
                </ul>
            </div>
            <div class="positionR">
                <div class="cityPositioning  borderB">
                    <div class="cityPositioningName"><img src="../../assets/images/airPort/icon/city_icon.png"><span class="FontS12">{{openCityName}}</span><span v-if="openCityName=='定位中'" class="dotting"></span> </div>
                    <div class="cityPositioningFresh " @click="fresh()">
                        <img src="../../assets/images/airPort/icon/fresh_icon.png" :class="{move1:isMove == true}">
                        <span class="FontS12">{{positionText}}</span></div>
                </div>
            </div>
            <div class="cityListBigBox">
                <!--热门城市--->
                <section class="hotBox pad1">
                    <h3 class="FontS12">{{hotCity}}</h3>
                    <ul class="hotList">
                        <li v-for="(item,index) in hotCityList" :class="{active:isHotCityNum == index}" @click="hotCitySelect(item.name,index,item.aitaCode)" :key="index"><span>{{item.name}}</span></li>
                    </ul>
                </section>
                <!--城市列表-->
                <ul class="cityListBox">
                    <li class="cityItem" v-for="(item,index) in typeList" :key="index">
                        <h4 class="title" :id="item.pyHead">{{item.pyHead}}</h4>
                        <ul class="cityList">
                            <li v-for="(k,i) in item.cityList" @click="hotCitySelect(k.name,i,k.aitaCode)" :key="i">{{k.name}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <!--字母列表-->
        <div class="letter-box">
            <ul class="letter-list">
                <li  v-for="(item,index) in typeList" :key="index" @click="letterS(item.pyHead,index)" :class="{active:letterNum == index}">{{item.pyHead}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
  import AMap from 'AMap'
    export default {
        name: "departure",
        data:function(){
            return {
              bigTitle:"出发地",
              openCityName:'定位中',
              seachCity:'',
              hotCity:'热门城市',
              positionText:'正在定位',

              //组装过后的数据
              typeList:[],
              hotCityList:[],
              isHotCityNum:'',
              letterNum:'',

              //从上一个页面带过来的
              selectNum:'',
              isNavIndex:'',
              backBigTitle:'',
              cityName1:'',
              cityName2:'',
              aitaCode1:'',
              aitaCode2:'',
              msgText:'',
              isActive:'',
              goodsType:'',

              //页面data
              cityData:[],
              //转圈
              isMove:false,
              searchCityList:false,


              books: [
                {name: 'Vue.js', price:50},
                {name: 'Javascript', price:30},
                {name: 'Css', price:40},
                {name: 'Html', price:60}
              ]
            }
        },
        mounted:function(){
          this.init();
        },
        methods: {
          //地图
          init: function () {
            this.isMove = true;
            let _this=this;
            let map = new AMap.Map('container', {
              center: [104.07 ,30.67],//地图中心点
              resizeEnable: true,
              zoom: 13,
              mapStyle:'amap://styles/74cdd415a9bcfa5ae2e11eb30b2867ec'
              // lang: 'ch'  //设置地图语言
            });
            map.plugin(['AMap.Geolocation','AMap.PlaceSearch'], function() {
              var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                //timeout: 10000,
                showMarker:true,
                convert:true,
                showButton: true,        //显示定位按钮，默认：true
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'LB',

                showCircle:false,
                extensions:'all',
                panToLocation:true   //定位成功后，是否把定位得到的坐标设置为地图中心点坐标
              });
              map.addControl(geolocation);
              geolocation.getCurrentPosition();
              AMap.event.addListener(geolocation, 'complete', onComplete);
              AMap.event.addListener(geolocation, 'error', onError);

              //
              function onComplete (data) {
                // data是具体的定位信息
                if(data.status == 1){
                  _this.openCityName = data.addressComponent.city;  //当前城市
                  _this.positionText = '重新定位';
                  _this.isMove = false;
                }
                var str = [];
                str.push('经度：' + data.position.getLng());
                str.push('纬度：' + data.position.getLat());
                str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                console.log(str.join('<br>'));

              }

              //
              function onError (data) {
                // 定位出错
                console.log(data);
              }

            })
          },
          //城市列表
          cityList(){
              let headersObj = {'content-type': 'application/json'};
              this.$server.get(this.AirROOT+"ws/v1.0/flightCity/list",null,headersObj).then(res =>{
                if(res.code == 200){
                  this.cityData = res.data;
                  // console.log(this.cityData )

                  //重组数组
                  var band = this.cityData;
                  var bfirstletter = 'A';
                  var hotType = '2';
                  var hotList = [];
                  var typeList = [];
                  var typeItem = {
                    pyHead: 'A',
                    cityList: []
                  };
                  typeList.push(typeItem);
                  for(var i = 0;i<band.length;i++){
                    var item = band[i];
                    if(bfirstletter != item.pyHead){
                      bfirstletter = item.pyHead;
                      typeItem = {
                        pyHead: item.pyHead,
                        cityList: []
                      };
                      typeList.push(typeItem);

                    }
                    var city = {};
                    city["cityId"] = item.cityId;
                    city["name"] = item.name;
                    city["enName"] = item.enName;
                    city["pyName"] = item.pyName;
                    city["aitaCode"] = item.aitaCode;
                    city["pyHead"] = item.pyHead;
                    city["pySimple"] = item.pySimple;
                    city["cityType"] = item.cityType;
                    city["hotType"] = item.hotType;
                    typeItem.cityList.push(city);

                    //热门城市
                    if(hotType == item.hotType){
                      hotList.push(item);
                    }
                  }
                  this.typeList = typeList;
                  this.hotCityList = hotList;
                }
              });
            },

            //点击清空input的值
            emptyInput(){
                if( this.seachCity.length>0){
                    this.searchCityList = true;
                    //this.init();
                }else {
                    this.searchCityList = false;
                }
            },
            //清空输入框
            inputCloseIcon(){
                this.seachCity = '';

            },

          //点击旁边字母滚动到相应的位置
          letterS(name,index){
            this.letterNum = index;
            document.getElementById(name).scrollIntoView(true);
          },

          //重新定位
          fresh(){
            this.positionText = '正在定位'
            this.init();
          },
          //选择热门城市
          hotCitySelect(name,index,aitaCode){
            this.isHotCityNum = index;

            if(this.bigTitle=='出发地'){
              this.$router.push({path:'selectFlight',query:{cityName1:name,cityName2:this.cityName2,bigTitle:this.backBigTitle,selectNum:this.selectNum,isNavIndex:this.isNavIndex,msgText:this.msgText,aitaCode1:aitaCode,aitaCode2:this.aitaCode2,isActive:this.isActive,goodsType:this.goodsType}})
            }else {
              this.$router.push({path:'selectFlight',query:{cityName2:name,cityName1:this.cityName1,bigTitle:this.backBigTitle,selectNum:this.selectNum,isNavIndex:this.isNavIndex,msgText:this.msgText,aitaCode2:aitaCode,aitaCode1:this.aitaCode1,isActive:this.isActive,goodsType:this.goodsType}})
            }
          },
          //选择城市
          selectCity(){

          }
        },
        //通过计算属性过滤数据
        computed: {
            filterCityData () {
              const {seachCity, cityData} = this
              let filterArr = [];

              // 过滤数组
              filterArr = cityData.filter(item => item.name.indexOf(seachCity) !== -1 || item.pySimple.indexOf(seachCity) !== -1|| item.aitaCode.indexOf(seachCity) !== -1)
              return filterArr;
            }
        },

        created:function () {
          //从上级拿的值
          this.bigTitle = this.$route.query.DTbigText;
          this.selectNum = this.$route.query.selectNum;
          this.isNavIndex = this.$route.query.isNavIndex;
          this.isActive = this.$route.query.isActive;
          this.backBigTitle = this.$route.query.bigTitle;
          this.cityName1 = this.$route.query.cityName1;
          this.cityName2 = this.$route.query.cityName2;
          this.msgText = this.$route.query.msgText;
          this.aitaCode1 = this.$route.query.aitaCode1;
          this.aitaCode2 = this.$route.query.aitaCode2;
          this.goodsType = this.$route.query.goodsType;
          //初始化
          this.cityList();
        }
    }
</script>

<style scoped>
    #departure{height: 100%;background: #ffffff;color: #666666}
    .FlexBigBox{display: flex;height: 100%; flex-direction: column}
    /*搜索样式*/
    .searchInput{background: #ffffff;box-shadow:0 0 30px #ddd;height:3.5rem;border-radius: 1.7rem; padding-left: 1rem; display: flex; }
    .searchInput img.search_icon{width: 1.5rem; height:1.5rem; padding-top: 1rem;}
    .searchText{height: 2.5rem;line-height: 2.5rem;outline: none; margin-left: 10px;width: 20rem;background: #ffffff;margin-top: 0.5rem;font-size: 1.1rem;flex: 1;margin-right: 1rem;color: #555555}
    .searchInput img.inputClose_icon{margin-right: 1rem;width: 1rem;height: 1rem; padding-top: 1.2rem;}

    /*定位*/
    .cityPositioning{margin-left: 2rem; margin-right: 2rem;padding-bottom: 1rem; display: flex;justify-items: center;align-items: center;}
    .cityPositioning img{width: 1.5rem;vertical-align: middle;margin-right: 0.5rem;margin-top: -0.3rem}

    .cityPositioningName{flex: 1;}
    .cityPositioningFresh{background: #ffffff;border: 1px solid #EFEFEF;padding: 0.2rem 1rem 0.2rem 1rem;border-radius: 2rem;}


    .hotList{display: flex;flex-wrap: wrap;padding-bottom: 1rem;background-color: white;padding-right: 1rem;}
    .hotList li{display: flex;flex-direction: column;text-align: center;width: 25%;margin-top: 1rem}
    .hotList li span{border: 1px solid #EFEFEF;border-radius: 1.5rem;font-size: 1.2rem;width: 83%; padding-top: 0.2rem;padding-bottom: 0.2rem;}
    .hotList li.active span{border: 1px solid #407FFD; color: #407FFD}

    .hotBox{padding-left: 2rem;padding-right: 2rem;}
    .cityListBigBox{flex: 1;overflow-y: scroll;}
    .cityListBox .cityItem .cityList li,.cityList li{height: 4rem;line-height: 4rem;padding: 0 2rem;border-bottom: 1px solid #F3F3F3;font-size: 1.2rem;}
    .cityListBox .cityItem .title{padding: 0.5rem;padding-left: 2rem;font-size:1.3rem;color: #407FFD;background:#FAFAFA;font-weight: normal;}
    .searchCityList{position: absolute; top: 9.5rem;background: #ffffff;width: 100%;height: 100%;overflow-y: scroll;z-index: 2}

    .letter-box{position: fixed;right: 1.5rem;width: 0.2rem;height: 100%;z-index: 1; justify-items: center;align-items: center;display: flex;top: 0;font-size: 1.2rem;color: #666666}
    .letter-list{text-align: center}
    .letter-list li.active{color: #407FFD}

    .move1 {
        animation: myMove1 2s linear infinite;
        -webkit-animation: myMove1 2s linear infinite;
    }

    @keyframes myMove1 {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    }

    @-webkit-keyframes myMove1 {
        0% {-webkit-transform: rotate(0deg);}
        100% {-webkit-transform: rotate(360deg);}
    }

    .dotting {
        display: inline-block; width: 10px; min-height: 2px;
        padding-right: 2px;
        border-left: 2px solid currentColor; border-right: 2px solid currentColor;
        background-color: currentColor; background-clip: content-box;
        box-sizing: border-box;
        animation: dot 2s infinite step-start both;
    }
    .dotting:before { content: '...'; } /* IE8 */
    .dotting::before { content: ''; }
    :root .dotting { margin-left: 2px; padding-left: 2px; } /* IE9+ */

    @keyframes dot {
        25% { border-color: transparent; background-color: transparent; }          /* 0个点 */
        50% { border-right-color: transparent; background-color: transparent; }    /* 1个点 */
        75% { border-right-color: transparent; }                                   /* 2个点 */
    }

</style>
