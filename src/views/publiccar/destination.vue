<template>
    <transition enter-active-class='animated fadeInRight'>
        <div id="departure">
            <div class="FlexBigBox">
                <h2 class="bigTitle padT2 padL2">{{bigTitle}}</h2>
                <div class="searchBox pad1D5">
                    <div class="searchInput">
                        <img class="search_icon" src="../../assets/images/publiccar/icon/search_icon.png"/>
                        <input class="searchText" id="field" type="text" v-model="endText" placeholder="请输入您的目的地"   v-on:input="emptyInput()"/>
                        <img @click="inputCloseIcon()" class="inputClose_icon" src="../../assets/images/publiccar/icon/inputClose_icon.png">
                    </div>
                </div>
                <div class="positionR">
                    <div class="cityPositioning FontS11 borderB" @click="cityCheck()"><img src="../../assets/images/publiccar/icon/city_icon.png"><span>{{openCityName}}</span> </div>
                    <!--开放城市 S-->
                    <openCity v-on:childByCity="childByCity" :openCityIsShow.sync="CityIsShow"></openCity>
                    <!--开放城市 E-->
                </div>
                <!--设置家庭地址及公司地址 S-->
                <SetAdderss v-bind:target="end"  @setAddress="setAddress" v-bind:familyAdd="familyAdd"></SetAdderss>
                <!--设置家庭地址及公司地址 E-->
                <div class="addressRecord padL2 padR2" v-show="isShow1">
                    <ul>
                        <li v-for="(item,index) in addressRecod " @click="addressCheck(item.addressName,item.addressDetail)" :key="index">
                            <img src="../../assets/images/publiccar/icon/navigation_icon.png" class="fl">
                            <div class="navigation_Text fl">
                                <h3>{{item.addressName}}</h3>
                                <p>{{item.addressDetail}}</p>
                            </div>
                        </li>
                        <!--历史记录-->
                        <History :historyData ="historyData" v-bind:target="end"   ref="myHistory"></History>
                    </ul>
                </div>
                <div class="addressRecord searchTips padL2 padR2" v-show="isShow2">
                    <ul>
                        <li v-for="(item,index) in searchData" @click="addressCheck(item.name,item.address)" >
                            <img src="../../assets/images/publiccar/icon/navigation_icon.png" class="fl">
                            <div class="navigation_Text fl">
                                <h3>{{item.name}}</h3>
                                <p>{{item.address}}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="addressRecord searchTips padL2 padR2" v-show="isShow3">
                    <ul>
                        <li v-for="(item,index) in searchData" @click="setaddressCheck(item)" >
                            <img src="../../assets/images/publiccar/icon/navigation_icon.png" class="fl">
                            <div class="navigation_Text fl">
                                <h3>{{item.name}}</h3>
                                <p>{{item.address}}</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    </transition>
</template>

<script>
    import AMap from 'AMap';
    import SetAdderss from '@/components/publiccar/setAddress';
    import openCity from '@/components/publiccar/openCity';
    import History from '@/components/publiccar/history';


    export default {
        name: "destination",
        components:{
            SetAdderss,
            openCity,
            History,
        },
        mounted:function(){

        },
        data:function(){
            return {
                bigTitle:'目的地',
                startText:'',
                endText:'',
                searchData:[],
                end:'endText',
                userId:'',
                familyAdd:{},
                openCityName:'拉萨市',
                isShow1:true,
                isShow2:false,  //设置公司住址
                isShow3:false,  //设置家住址
                CityIsShow:false,
                addressRecod:[],
                historyData:[],
                cookieData:[],



            }
        },
        methods: {
            childByValue: function (childValue) {
                // childValue就是子组件传过来的值
                console.log(childValue);
                this.isLogin = childValue
            },
            //地图
            init: function () {
                let _this=this;
                var map = new AMap.Map("container", {
                    center: [116.397428, 39.90923],
                    resizeEnable: true,
                    zoom: 16,
                });

                AMap.service(["AMap.PlaceSearch"], function() {
                    //构造地点查询类
                    var placeSearch = new AMap.PlaceSearch({
                        pageSize: 50, // 单页显示结果条数
                        pageIndex: 1, // 页码
                        city: _this.openCityName, // 兴趣点城市
                        citylimit: true,  //是否强制限制在设置的城市内搜索
                        //map: map, // 展现结果的地图实例
                        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                    });

                    //关键字查询
                    placeSearch.search(_this.endText, function (status, result) {
                        if(JSON.stringify(result) != "{}"){
                            // 查询成功时，result即对应匹配的POI信息
                            _this.searchData = result.poiList.pois;
                        }
                    })
                });
            },
            addressCheck(name,address){
                this.endText = name;
                var obj = {
                    name:name,
                    address:address
                };
                this.historyData.push(obj);

                if(JSON.parse(localStorage.getItem('temp'))){  //存到本地
                    let arr = JSON.parse(localStorage.getItem('temp'));
                    let temp = this.historyData.concat(arr);
                    if(temp.length>5){  //length大于5，就删除
                        temp.pop();
                    }
                    localStorage.setItem('temp',JSON.stringify(temp));
                }else {
                    localStorage.setItem('temp',JSON.stringify(this.historyData));
                }

                this.$router.push({path: 'lineplan',query:{endText:this.endText,startText:this.startText,openCityName:this.openCityName,userId:this.userId}});
            },

            setaddressCheck(item){
                this.familyAdd = item;
                this.familyAdd.openCityName = this.openCityName;
                this.endText = item.name;
                this.familyAdd.startText = this.startText;
                this.isShow3=false;
                this.isShow2=false;
                this.bigTitle = "目的地";
                this.isShow1 = true;

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

            //点击出现开放城市列表
            cityCheck(){
                this.CityIsShow = !this.CityIsShow;
            },
            //openCity
            childByCity: function (childValue) {
                // childValue就是子组件传过来的值
                this.openCityName = childValue
            },

            setAddress(a) {
                if(a == "family"){
                    this.bigTitle = "设置家地址"
                }else if(a == "company"){
                    this.bigTitle = "设置公司地址"
                }else {
                    this.bigTitle = "目的地"
                }
                this.isShow3=true;
                this.isShow2=false;
            },

        },
        watch:{
            endText:function (val) {

            }
        },
        created:function () {

            //调cookie缓存的数据

            var _this = this;
            //从上级拿的值
            this.startText = this.$route.query.startText;
            this.endText = this.$route.query.endText;
            this.openCityName = this.$route.query.openCityName;
            this.userId = this.$route.query.userId;


            //自定义起点和城市传到组件里面去
            this.familyAdd.openCityName = this.openCityName;
            this.familyAdd.startText = this.startText;
            this.familyAdd.userId = this.userId;


            //传给子组件的历史记录
            this.historyData.openCityName = this.openCityName;
            this.historyData.startText = this.startText;
            this.historyData.endText = this.endText;
            this.historyData.userId = this.userId;

            if(this.endText == '您要去哪儿'){
                this.endText = '';
            }


        }
    }
</script>

<style scoped>
    #departure{height: 100%;background: #ffffff}
    .searchTips{position: absolute;top:10.5rem;background: #ffffff;width: 100%;padding-top: 1rem;}
    .positionR{position: relative;}

    /*搜索样式*/
    .searchInput{background: #ffffff;box-shadow:0 0 30px #ddd;height:3.5rem;border-radius: 1.7rem; padding-left: 1rem; display: flex; }
    .searchInput img.search_icon{width: 1.5rem; height:1.5rem; padding-top: 1rem;}
    .searchText{height: 2.5rem;line-height: 2.5rem;outline: none; margin-left: 10px;width: 20rem;background: #ffffff;margin-top: 0.5rem;font-size: 1.1rem;flex: 1;margin-right: 1rem;color: #555555}
    .searchInput img.inputClose_icon{margin-right: 1rem;width: 1rem;height: 1rem; padding-top: 1.2rem;}

    /*定位*/
    .cityPositioning{margin-left: 2rem; margin-right: 2rem;padding-bottom: 1rem; color: #666666}
    .cityPositioning img{width: 1.5rem;vertical-align: middle;margin-right: 0.5rem;margin-top: -0.3rem}

    .mclose_icon{padding-top: 0.6rem;}
    .mclose_icon img{width: 1.3rem;}



    /*历史记录*/
    .addressRecord{ flex: 1; display: flex; height: 100%;overflow-y: auto;}
    .addressRecord ul li{width: 100%;padding-bottom: 1rem;display:flex;flex-flow:row;  justify-content:center;}
    .addressRecord ul li img{height: 1.5rem;padding-top: 0.5rem;}
    .addressRecord ul li .navigation_Text{flex:1;margin-left: 0.5rem; }
    .addressRecord ul li h3{font-size: 1.1rem;color: #666666}
    .addressRecord ul li p{font-size: 1rem;color: #AAAAAA;line-height: 2rem;}

</style>
