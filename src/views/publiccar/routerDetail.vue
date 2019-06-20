<template>
    <transition enter-active-class='animated fadeInRight'>
        <div id="linePlanCs1">
            <div id="route" :style="{height:routerHeight}"></div>
            <div class="noLineplan" v-show="loading">
                <div class="noLineplanImg TextC FontS13 lineH2D5"><img src="../../assets/images/publiccar/loading.gif" style="width: 5rem;"><br/>正在加载……</div>
            </div>
            <div class="FlexBigBox" @touchstart="mouseTouch()" v-show="routerDetailShow" :class="{positionA:isPosA}">
                <div class="FlexSmall" id="FlexSmall"  :style="{paddingTop:marginTop+'px'}">
                    <div class="FlexSmallBox" id="FlexSmallBox" >
                        <section class="linePlanBox" :class="{active: isActive }" ref="lineplans" id="lineplans">
                            <div class="padL2 padR2 padB1 padT1">
                                <!-- Swiper -->
                                <swiper :options="lineSwiper" ref="mySwiper">
                                    <!-- slides -->
                                    <swiper-slide v-for="(item,index) in planArry" :key="index">
                                        <div class="lineBusIcon">
                                            <span v-for="(k,i) in item.trans" :key="i"><i><img src="../../assets/images/publiccar/icon/busIcon1.png">{{k}}</i><em class="triangle" :class="{none:i==item.trans.length-1}"></em></span>
                                        </div>
                                        <p class="FontS12 lineH2 padTD5">全程{{item.transit}}·步行{{item.walktime}}，共{{item.time}}分钟·{{item.cost}}元</p>
                                    </swiper-slide>
                                    <div class="swiper-pagination" slot="pagination"></div>
                                </swiper>
                            </div>
                        </section>
                        <section class="padL1 padR1 padT2 linePlanLineBox" id="linePlanLineBox" :style="{paddingTop:fixedPaddingT+'px'}">
                            <swiper :options="detailSwiper" ref="detailSwiper">
                                <!-- slides -->
                                <swiper-slide v-for="(item,index) in planArryDetail" :key="index">
                                    <div class="linePlanLine clearfix ">
                                        <div class="linePlanLineL">
                                            <div class="myPosition FontS12 colorThree"><span></span><i>{{startText}}</i></div>
                                            <div class="lineOne" v-for="(k,i) in item.segments" :key="i">
                                                <div class="walkBox">
                                                    <div class="walkBoxBg" v-if="k.transit_mode =='WALK'">
                                                        <div class="walkText FontS11 lineH2">{{k.instruction}}· 约<span v-if="k.time==0">{{k.time+1}}</span><span v-else>{{k.time}}</span>分钟</div>
                                                        <p class="walkIcon" @click="pushNaviWalk(k.transit.origin,k.transit.destination)"><img src="../../assets/images/publiccar/icon/walk.png"></p>
                                                    </div>
                                                </div>
                                                <div class="siteTypes" v-if="k.transit_mode =='BUS' || k.transit_mode =='SUBWAY'">
                                                    <div class="siteTypesImg"><img src="../../assets/images/publiccar/icon/busIcon1.png"> </div>
                                                    <div class="siteNameBox">
                                                        <h3 class="siteNameBig FontS12"><span><i></i></span>{{k.on_station.name}}</h3>
                                                        <div class="trafficLine padT1 padB1">
                                                            <p class="trafficLineRoutes"><span>{{k.routeArray}}</span></p>
                                                            <div class="linePlanList">
                                                                <p class="FontS12 colorThree clearfix" >
                                                                    <span class="fl padT1">{{k.transit.via_num+1}}站·约{{k.time}}分钟</span>
                                                                    <span @click="triangle(index,i)" class="fl triangleCs1">
                                                                        <i class="triangleUp"></i><br/><i class="triangleDown"></i>
                                                                    </span>
                                                                </p>
                                                                <ul v-if="bigNum==index && smallNum == i ?triangleShowT:triangleShow" v-show="isShow">
                                                                    <li v-for="(j,s) in k.via_stops" :key="s"><span><i></i></span>{{j.name}}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <h3 class="siteNameBig FontS12"><span><i></i></span>{{k.off_station.name}}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="endPosition FontS12 colorThree padB2"><span></span><i>{{endText}}</i></div>
                                        </div>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </section>
                    </div>
                </div>
            </div>

            <div class="checkMapApp" v-show="chekMapShow">
                <ul>
                    <div v-show="checkMapAppTit" class="checkMapAppTit">请先下载高德地图和百度地图</div>
                    <li><a @click="checkCancel('高德地图',1)" :href="hreflinkGd">高德地图</a></li>
                    <li><a @click="checkCancel('百度地图',1)" :href="hreflink">百度地图</a></li>
                    <li @click="checkCancel('取消',0)">取消</li>
                </ul>
            </div>

        </div>
    </transition>
</template>

<script>
    import AMap from 'AMap';
    // import AMapUI from 'AMapUI';
    import 'swiper/dist/css/swiper.css'
    import Swiper from '../../assets/js/swiper.min';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    export default {
        name: 'HelloWorld',
        data () {
            var  _this = this;
            return {
                msg: 'hello',
                loading:true,
                routerDetailShow:false,
                count:0,
                isShow:false,
                styleHeight:'',//具体线路动态高度
                routerHeight:'50%',//地图动态高度
                swiperM:'',

                triangleShowT:true, //是否显示详情站点
                triangleShow:false, //详情站点

                planArry:[],    //
                planArryDetail:[],    //

                startText:'',   //路线开始结束位置
                endText:'',

                navigationData:{},
                chekMapShow:false,
                checkMapAppTit:'',
                walkorigin:[], //步行导航起点
                walkdestination:[], //步行导航终点
                startAddress:'起点',//起点地址
                endAddress:'终点',//终点地址
                hreflink:"",
                hreflinkGd:'',

                //ios
                iphoneMapData:{},

                //动态添加样式
                marginTop:'',
                scrollTop:'',
                isActive:false,
                fixedPaddingT:'',
                isPosA:false,

                openCityName:'',
                bigNum:'0',
                smallNum:'0',

                SwiperIndex:'0',  //当前索引值

                lineSwiper: {  //线路
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 5,
                    loop: true,
                    //effect:'coverflow',  //切换效果
                    autoplay: false,  //自动切换
                    clickable :true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    on: {
                        slideChangeTransitionStart: function(){
                            _this.SwiperIndex = this.activeIndex;
                            _this.detailswiper.slideTo(this.activeIndex, 1000, true);
                        },
                    },
                },
                detailSwiper: {  //线路规划
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween:10,
                    loop: true,
                    //effect:'coverflow',  //切换效果
                    autoplay: false,  //自动切换
                    on: {
                        slideChangeTransitionStart: function(){
                            _this.SwiperIndex = this.activeIndex;
                            _this.swiper.slideTo(this.activeIndex, 1000, true);
                        },
                    },
                },
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            detailswiper() {
                return this.$refs.detailSwiper.swiper
            }
        },
        watch:{
            SwiperIndex(val){
                this.line(val);
            }
        },


        methods: {
            //默认地图
            init: function () {
                let _this=this;
                var map = new AMap.Map('route', {
                    // center: [91.171961,29.653482],
                    resizeEnable: true,
                    mapStyle:'amap://styles/74cdd415a9bcfa5ae2e11eb30b2867ec',
                    zoom: 10,
                });
                map.plugin(["AMap.Transfer"], function() {
                    //实例化公交线路查询类
                    var transferOption = {
                        city: _this.openCityName,
                        nightflag: true, // 是否计算夜班车
                        policy: AMap.TransferPolicy.LEAST_TIME, // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
                    };
                    var transfer = new AMap.Transfer(transferOption);
                    //根据起、终点坐标查询公交换乘路线
                    transfer.search([
                        {keyword:_this.startText,city:_this.openCityName},
                        //第一个元素city缺省时取transOptions的city属性
                        {keyword:_this.endText,city:_this.openCityName}
                        //第二个元素city缺省时取transOptions的cityd属性
                    ],function(status, result) {
                        _this.loading = false;


                        // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
                        if (status === 'complete') {
                            _this.routerDetailShow = true;
                            if (result.plans && result.plans.length) {
                                var plans = result.plans;
                                for (var i = 0; i < plans.length; i++) {
                                    var cost = plans[i].cost;
                                    var time = parseInt(plans[i].time / 60);
                                    if(time >= 60){
                                        console.log(time)
                                        time  =parseInt(time/60)+'小时'+ time%60
                                    }
                                    var segments = plans[i].segments;
                                    var walktime = plans[i].walking_distance;
                                    if(walktime < 1000)
                                        walktime =walktime+"米";
                                    else if(walktime > 1000){
                                        walktime =(Math.round(walktime/100)/10).toFixed(1) + "公里";
                                    }

                                    var transit = plans[i].transit_distance;
                                    if(transit < 1000)
                                        transit =transit+"米";
                                    else if(transit > 1000){
                                        transit =(Math.round(transit/100)/10).toFixed(1) + "公里";
                                    }

                                    var trans = []
                                    if (segments !== '' && segments !== undefined) {
                                        for (var j = 0; j < segments.length; j++) {
                                            if (segments[j].transit_mode === 'BUS') {
                                                let linename = segments[j].instruction;
                                                trans.push(linename.substr(2, linename.indexOf('(') - 2))
                                            } else if (segments[j].transit_mode === 'SUBWAY') {
                                                let linename = segments[j].instruction;
                                                trans.push(linename.substr(2, linename.indexOf('线') - 2))
                                            }
                                        }
                                    }
                                    _this.planArry.push({
                                        cost: cost,
                                        time: time,
                                        trans: trans,
                                        walktime:walktime,
                                        transit:transit,
                                    });
                                }
                                _this.planArryDetail = plans;

                                for(var i =0;i< _this.planArryDetail.length; i++){
                                    let a = _this.planArryDetail[i].segments;
                                    for(var k=0;k<a.length;k++){
                                        let routeArray = "";
                                        a[k].time = parseInt(a[k].time / 60);
                                        if(a[k].transit_mode =='BUS' || a[k].transit_mode == 'SUBWAY' ){
                                            var c = a[k].transit.off_station;
                                            var d = a[k].transit.on_station;
                                            var b = a[k].transit.via_stops;
                                            var lines = a[k].transit.lines;
                                            let linename = a[k].instruction;
                                            routeArray = (linename.substr(2, linename.indexOf('(') - 2));
                                            a[k].via_stops=b;
                                            a[k].off_station=c;
                                            a[k].on_station=d;
                                            a[k].lines = lines;
                                            a[k].routeArray = routeArray;
                                        }
                                    }
                                }
                            }

                        } else {
                            // log.error('公交路线数据查询失败' + result)
                        }
                    });
                })
            },
            //切换线路
            line: function (index) { //规划的线路
                let _this=this;
                let map = new AMap.Map('route', {
                    //  center: [91.171961,29.653482],
                    resizeEnable: true,
                    zoom: 18,
                    mapStyle:'amap://styles/74cdd415a9bcfa5ae2e11eb30b2867ec'
                });
                map.plugin(["AMap.Transfer"], function() {
                    //实例化公交线路查询类
                    var transferOption = {
                        city: _this.openCityName,
                        nightflag: true, // 是否计算夜班车
                        policy: AMap.TransferPolicy.LEAST_TIME, // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
                    };

                    var transfer = new AMap.Transfer(transferOption);

                    //根据起、终点坐标查询公交换乘路线
                    transfer.search([
                        {keyword:_this.startText,city:_this.openCityName},
                        //第一个元素city缺省时取transOptions的city属性
                        {keyword:_this.endText,city:_this.openCityName}
                        //第二个元素city缺省时取transOptions的cityd属性
                    ],function(status, result) {
                        console.log(result)

                        // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
                        if (status === 'complete') {

                            if (result.plans && result.plans.length) {

                                //绘制线路
                                var route =  result.plans[index];

                                var startMarker = new AMap.Marker({
                                    position: route.segments[0].transit.origin,
                                    icon: require('../../assets/images/publiccar/icon/origin_icon.png'),
                                    map: map
                                });

                                var endMarker = new AMap.Marker({
                                    position: route.segments[route.segments.length - 1].transit.destination,
                                    icon: require('../../assets/images/publiccar/icon/destination_icon.png'),
                                    map: map
                                });

                                var routeLines = [];
                                for (var i = 0, l = route.segments.length; i < l; i++) {
                                    var segment = route.segments[i];
                                    var line = null;
                                    // 绘制步行路线
                                    if (segment.transit_mode === 'WALK') {
                                        line = new AMap.Polyline({
                                            path: segment.transit.path,
                                            isOutline: true,
                                            outlineColor: '#dddddd',
                                            borderWeight: 3,
                                            strokeWeight:3,
                                            strokeColor: 'grey',
                                            lineJoin: 'round',
                                            strokeStyle: 'dashed'
                                        });


                                        line.setMap(map);
                                        routeLines.push(line)
                                    } else if (segment.transit_mode === 'SUBWAY' || segment.transit_mode === 'BUS') {
                                        line = new AMap.Polyline({
                                            path: segment.transit.path,
                                            isOutline: true,
                                            outlineColor: '#ffeeee',
                                            borderWeight: 2,
                                            strokeWeight: 5,
                                            strokeColor: '#0091ff',
                                            lineJoin: 'round',
                                            showDir:true,
                                            strokeStyle: 'solid'
                                        });

                                        line.setMap(map);
                                        routeLines.push(line);
                                    } else {
                                        // 其它transit_mode的情况如RAILWAY、TAXI等，该示例中不做处理
                                    }
                                }

                                // 调整视野达到最佳显示区域
                                map.setFitView([ startMarker, endMarker ].concat(routeLines))
                            }

                        } else {
                            // log.error('公交路线数据查询失败' + result)
                        }
                    });
                })
            },

            //是否显示详情站点
            triangle(index,i){
                this.bigNum = index;
                this.smallNum = i;
                this.isShow = !this.isShow;
            },
            //调起第三方导航
            pushNaviWalk(startlgn,endlat,startAddress,endAddress){

                this.walkorigin = startlgn;
                this.walkdestination = endlat;

                //组装高德地图数据
                this.iphoneMapData.origin = startlgn;
                this.iphoneMapData.destination = endlat;

                //步行导航调起线路
                let _this=this;
                let map = new AMap.Map('route', {
                    resizeEnable: true,
                    zoom: 13,
                    mapStyle:'amap://styles/74cdd415a9bcfa5ae2e11eb30b2867ec'
                });
                map.plugin(["AMap.Walking","AMap.Geocoder"], function() {

                    var WalkingOptions = {
                        map: map,
                    };
                    var walking = new AMap.Walking(WalkingOptions);
                    var geocoder = new AMap.Geocoder({
                        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                        city: _this.openCityName
                    });


                    geocoder.getAddress([startlgn.lng, startlgn.lat], function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            _this.startAddress = result.regeocode.formattedAddress;
                            _this.iphoneMapData.origin.address = _this.startAddress;
                        }
                    });
                    geocoder.getAddress([endlat.lng, endlat.lat], function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            _this.endAddress = result.regeocode.formattedAddress;
                            _this.iphoneMapData.destination.address = _this.endAddress;
                        }
                    });
                    //坐标转换
                    var pi_value = Math.PI;
                    var X_PI = pi_value * 3000.0 / 180.0;
                    /* var x = star_lon,y = star_lat;
                     var a = end_lon,b = end_lat;*/
                    var z = Math.sqrt(startlgn.lng * startlgn.lng + startlgn.lat *startlgn.lat) + 0.00002 * Math.sin(startlgn.lat * X_PI);
                    var a = Math.sqrt(endlat.lng * endlat.lng + endlat.lat * endlat.lat) + 0.00002 * Math.sin(endlat.lat * X_PI);
                    var theta = Math.atan2(startlgn.lat, startlgn.lng ) + 0.000003 * Math.cos(startlgn.lng * X_PI);
                    var endMapData = Math.atan2(endlat.lat, endlat.lng ) + 0.000003 * Math.cos(endlat.lng * X_PI);

                    //起点转换过的坐标
                    var bd_lon = z * Math.cos(theta) + 0.0065;
                    var bd_lat = z * Math.sin(theta) + 0.006;

                    //终点转换过的坐标
                    var end_lon = a * Math.cos(endMapData) + 0.0065;
                    var end_lat = a * Math.sin(endMapData) + 0.006;

                    _this.iphoneMapData.map = [];
                    _this.iphoneMapData.origin.address = _this.startAddress;
                    _this.iphoneMapData.destination.address = _this.endAddress;
                    var map1 = {
                        key:'iosamap://',
                        title:'高德地图',
                        value:'iosamap://path?sourceApplication=justApplicationNavigation&sid=BGVIS1&slat='+startlgn.lat+'&slon='+startlgn.lng+'&sname=起点&did=BGVIS2&dlat='+endlat.lat+'&dlon='+endlat.lng+'&dname=终点&dev=0&t=2'
                    };
                    var map2 = {
                        key:'baidumap://',
                        title:'百度地图',
                        value:"baidumap://map/direction?region="+_this.openCityName+"&origin=起点|latlng:"+bd_lat+","+bd_lon+"&destination=终点|latlng:"+end_lat+","+end_lon+"&coord_type=bd09ll&mode=walking&sy=3&index=0&target=1&src=justApplicationNavigation"
                    };

                    _this.iphoneMapData.map.push(map1,map2);


                    //区分安卓还是ios系统百度
                    if(_this.Device.getMobileOperatingSystem()=='Android'){
                        _this.chekMapShow = !_this.chekMapShow;
                        _this.checkMapAppTit = true;
                        _this.hreflinkGd = 'amapuri://route/plan/?sourceApplication=justApplicationNavigation&sid=23432&slat='+startlgn.lat+'&slon='+startlgn.lng+'&sname=起点&dlat='+endlat.lat+'&dlon='+endlat.lng+'&dname=终点&dev=0&t=2';
                        _this.hreflink = "bdapp://map/direction?region="+_this.openCityName+"&origin=起点|latlng:"+bd_lat+","+bd_lon+"&destination=终点|latlng:"+end_lat+","+end_lon+"&coord_type=bd09ll&mode=walking&sy=3&index=0&target=1&src=andr.baidu.openAPIdemo";

                    }
                    else{
                        window.webkit.messageHandlers.pushNavi.postMessage( _this.iphoneMapData);
                    }
                });
            },
            //取消
            checkCancel(name,num){
                if(num == '1'){
                    this.chekMapShow = false;
                }else {
                    this.chekMapShow = false;
                }

            },
            //滚动高度
            handleScroll() {
                //获取节点
                var scrollTop = document.getElementById('FlexSmall').scrollTop;

                var FH = document.getElementById('lineplans').offsetHeight;
                var M = document.body.clientHeight;

                if(scrollTop >= parseInt(M/2)){
                    this.marginTop = parseInt(M/2);
                    this.fixedPaddingT = parseInt(FH+20);
                    this.isActive = true;
                }else if(scrollTop == 0){
                    this.isPosA = false;
                    this.marginTop = "0";
                }else {
                    this.isActive = false;
                    this.fixedPaddingT = '20';
                }
            },
            //滑动的时候触发的事件
            mouseTouch(){
                var M = document.body.clientHeight;
                this.isPosA = true;
                this.marginTop = parseInt(M/2);
            },

        },
        created:function () {
            //从上级拿的值
            this.startText = this.$route.query.startText;
            this.endText = this.$route.query.endText;
            this.SwiperIndex = this.$route.query.active;
            this.openCityName = this.$route.query.openCityName;

        },
        mounted() {
            var _this = this;
            var scrollDiv = document.getElementById('FlexSmall');
            //从这个里面拿取地图上的数据
            this.init();
            this.swiper.slideTo(this.SwiperIndex, 1000, true);
            this.detailswiper.slideTo(this.SwiperIndex, 1000, true);
            this.handleScroll();
            //绑定事件
            scrollDiv.addEventListener('scroll', this.handleScroll);
        },
        destroyed () { //离开时移出监听事件
            var scrollDiv = document.getElementById('FlexSmall');
            scrollDiv.removeEventListener('scroll', this.handleScroll);
        },
    }
</script>
<style scoped>
    #linePlanCs1{background: #ffffff; height: 100%; overflow:hidden}
    .indexPage{
        height: 100%;background: #ffffff;
    }
    #route{
        height: 100%;
        position: relative;
        z-index: 1;
    }
    .linePlanSwiper{position: relative;z-index: 2;bottom: 0; padding-bottom: 15px; width: 100%; background: rgba(255,255,255,0.95);}
    /* .linePlanBox{box-shadow:0 0 10px #555555;height: auto;}*/
    .linePlanBox.active{position: fixed;top: 0;width: 100%;z-index: 2}
    .swiper-container{padding-bottom: 15px;}
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{bottom: 0;}

    .noLineplan{height: 50%;position: absolute;bottom: 0;width:100%;z-index: 2;background:#ffffff;}
    .FlexBigBox{ height: 100%;position: relative;bottom: 0;width:100%;z-index: 2; display: flex;overflow-y: auto;}
    .FlexSmall{height: 100%;overflow-y: scroll; position: relative;top: 0;}
    .FlexSmallBox{overflow-y: hidden;background:#ffffff;min-height:150%;}
    .checkMapApp{position: fixed;bottom: 0;width: 100%;background: rgba(0,0,0,0.8);z-index: 4;height: 100%;}
    .checkMapApp ul{position: absolute;bottom: 1rem;width: 100%;background: #ffffff;border-radius: 10px;}
    .checkMapApp ul li{line-height:3rem;color: #333333;font-size: 1.5rem;text-align: center; padding: 1rem;border-bottom: 1px solid #ccc}
    .checkMapApp ul li:last-child{border-bottom: none;}
    .checkMapApp ul li a{color: #333333;font-size: 1.5rem;}
    .checkMapAppTit{font-size: 1.2rem;padding-left: 2rem;color: #ff0000;border-bottom: 1px solid #ccc;line-height: 2rem;padding-top: 1rem;padding-bottom: 1rem;}

    .positionA{position: absolute;}
    .lineBusIcon{font-size: 1.1rem;margin-left: 0.5rem;}
    .lineBusIcon span{margin-left: -0.5rem; margin-bottom: 0.5rem;display: inline-block}
    .lineBusIcon span i{border: 1px solid #dddddd;padding: 0.4rem;display: inline-block;padding-left: 1rem;padding-right: 1rem;border-radius: 0.3rem;color: #333333}
    .lineBusIcon span i img{width: 1.6rem;vertical-align: middle; padding-right: 0.5rem;margin-top: -0.3rem;}
    .lineBusIcon span em.triangle { width:0;height:0;border-width:0.5rem;border-style:solid;display: inline-block;margin-left: 0.6rem;margin-right: 0.2rem;border-color:transparent transparent transparent #333333;}

    /*线路详情*/
    .linePlanBox{ background: #ffffff;box-shadow: 0px 10px 10px #eeeeee;border-radius: 0 0 5px 5px;}


    .linePlanLineBox{ flex: 1; height: 100%;overflow-y: auto;overflow-x: hidden}
    .linePlanLine{border-left: 2px dotted #dddddd;margin-left: 4rem;}
    .linePlanLineL{margin-left: -0.6rem;}
    .myPosition{background: #ffffff}
    .myPosition span{width: 1rem;height: 1rem;background: #44a0fe;display: inline-block;border-radius: 0.5rem; vertical-align: middle;margin-right: 0.5rem;}

    .lineOne{padding-top: 1rem;padding-bottom: 1rem;}

    .walkBox{margin-left: 0.4rem;width: 100%;}
    .walkBoxBg{display: flex;flex-flow: row;background: #f5f5f5;border-radius: 5px;padding-left: 1rem; padding-top: 0.6rem; color: #9B9B9B; padding-right:1rem;margin-left: 1rem;padding-bottom: 0.6rem;}
    .walkIcon{width:1.3rem;margin-left: 1rem;padding-top: 0.4rem;}
    .walkIcon img{width: 100%;vertical-align: middle}
    .walkText{flex: 1;}

    .siteTypes{display: flex;flex-flow: row;margin-left: -3rem;}
    .siteTypesImg{width: 2rem; vertical-align: middle;margin-right: 1.4rem;display: flex;align-items:center;}
    .siteTypesImg img{width: 100%;vertical-align: middle;}
    .siteNameBox{flex: 1;border-left: 2px solid #7ebdff;}

    .siteNameBig{margin-left: -0.55rem;margin-top: -0.5rem;}
    .siteNameBig span{width: 1rem;height: 1rem;display: inline-block;border-radius: 0.6rem;background: #7ebdff;position: relative;margin-right: 0.5rem;}
    .siteNameBig span i{width: 0.5rem;height: 0.5rem;background: #ffffff;display: inline-block;border-radius: 0.25rem;margin-left: 0.25rem;margin-top:0.25rem;position: absolute;}
    .siteNameLine{margin-left: 1rem;}

    .trafficLine{padding-left: 1rem;}

    .trafficLineRoutes span{background: #7ebdff;color: #ffffff; font-size: 1.1rem;padding-left: 1rem;padding-right: 1rem; padding-top: 0.2rem;padding-bottom: 0.2rem; display: inline-block;border-radius: 5px;}

    .linePlanList ul{margin-left: -1.55rem;font-size: 1.1rem;line-height: 2.5rem; }
    .linePlanList ul li span{width: 1rem;height: 1rem;display: inline-block;border-radius: 0.6rem;background: #7ebdff;position: relative;margin-right: 0.8rem;}
    .linePlanList ul li span i{width: 0.5rem;height: 0.5rem;background: #ffffff;display: inline-block;border-radius: 0.25rem;margin-left: 0.25rem;margin-top:0.25rem;position: absolute;}

    .triangleUp,.triangleDown { width:0;height:0;border-width:0.5rem;border-style:solid;display: inline-block;margin-left: 0.6rem;margin-right: 0.2rem;border-color:transparent transparent #98a1a7 transparent;}
    .triangleDown { border-color:#98a1a7 transparent transparent transparent;}
    .triangleCs1{line-height: 1.2rem;padding-top: 0.8rem;}

    .endPosition{background: #ffffff;margin-top: 20px;}
    .endPosition span{width: 1rem;height: 1rem;background: #26ba9e;display: inline-block;border-radius: 0.5rem; vertical-align: middle;margin-right: 0.5rem;}


</style>
