<template>
    <div class="selectCar bgcolorW">
        <div class="selectCarFlex">
            <div class="pad1D5" style="padding-bottom: 0" v-if="JSON.stringify(infoArr) != '{}'">
                <div class="selectCarTopBd1">
                    <div class="selectCarTopOne">
                        <label>{{infoArr.pickUpAddress}}</label>
                        <p>{{infoArr.checkStartDate.slice(5,10).replace(/-/g, "月")}}日{{infoArr.checkStartDate.slice(11,16)}}</p>
                    </div>
                    <div class="selectCarTopDay">
                        <label>{{infoArr.dayNum}}天</label>
                        <p><img src="../../assets/images/zuche/dayNumjt.png"> </p>
                    </div>
                    <div class="selectCarTopOne">
                        <label>{{infoArr.returnAddress}}</label>
                        <p>{{infoArr.checkEndDate.slice(5,10).replace(/-/g, "月")}}日{{infoArr.checkEndDate.slice(11,16)}}</p>
                    </div>
                </div>
                <div class="sortCondition">
                    <span :class="{current:isSortTab==index}" @click="filterTab(index)" v-for="(item,index) in filterOrderTag" :key="index">{{item.name}}</span>
                </div>
            </div>
            <div class="selectCarList" >
                <div class="selectCarListOne" v-for="(item,index) in goodList" :key="index" v-if="goodList.length>0">
                    <div class="zuchecarImgBox">
                        <p class="zuchecarImg"><img :src="item.vehicleTypeImgUrl"></p>
                        <div class="zuchecarImgTit">
                            <h3>{{item.vehicleTypeSimpleName}}</h3>
                            <p>{{item.gearBoxStr}} - {{item.seatNumStr}}座 - {{item.displacementStr}}</p>
                        </div>
                    </div>
                    <ul class="selectCarUl">
                        <li v-for="(k,i) in item.goodsDisplayList" :key="i" @click="goFillOrder(k,k.isSortNum,item.vehicleTypeId)">
                                <div class="selectCarTitle">
                                    <h3 class="fontW selectCarF1 shopName"><img src="../../assets/images/zuche/icon/zucheShopIcon1.png">{{k.companyName}}</h3>
                                    <h3 class="TextR fontW selectPrice"><span>￥</span>{{numDiv(k.avgDayPrice,100)}}<span>/天</span></h3>
                                </div>
                                <div class="selectCarShop">
                                    <p class="FontS12 selectCarF1">{{k.onCarShopName}}</p>
                                    <p class="TextR FontS12">总价：￥{{numDiv(k.totalPrice,100)}}</p>
                                </div>
                                <div class="selectCarText">
                                    <p class="selectCarF1 color1" v-if="k.haveDriver==true">包车带司机</p>
                                    <p class="selectCarF1 color1" v-else-if="k.haveVisit == true">送车上门</p>
                                    <p class="selectCarF1 color1" v-else>距离
                                        <span v-if="k.onCarShopDistance < 1000">{{k.onCarShopDistance}}m</span>
                                        <span v-else>{{(Math.round(k.onCarShopDistance/100)/10).toFixed(1)}}km</span>
                                    </p>
                                    <p class="TextR" v-if="k.haveVisit == true">含车辆使用费、司机服务费</p>
                                    <p class="TextR" v-else>含基本保障服务费</p>
                                </div>
                        </li>
                    </ul>
                </div>
                <div id="loadMore" >
                    <infinite-loading   @infinite="onInfinite"  ref="infiniteLoading" >
                                <span slot="no-more">
                                 没有更多数据
                                </span>
                    </infinite-loading>
                </div>
                <div class="complaintListNull" v-if="noData" style="top:auto !important;">
                    <img src="../../assets/images/passenger/dataNull.png" alt="" style="width: 14rem;">
                    <div class="TextC FontS12 padL2">暂无数据</div>
                </div>
            </div>
        </div>
        <!--登录 S-->
        <isLogin :isLogin="isLogin"></isLogin>
        <!--登录 E-->
        <!--弹框 S-->
        <ModelPop :isShowPop="isShow" :Text="TextMsg" :BtnText="BtnTextMsg" @childByValue="childByValue"></ModelPop>
        <!--弹框 E-->
    </div>
</template>

<script>
    import isLogin from  '@/views/comm/loginGuide.vue';  //把首页填写的信息写在一个组件里面，方便其它页面调用
    import ModelPop from '@/components/modelPop.vue'; //引入modelPop组件
    import InfiniteLoading from 'vue-infinite-loading';  //滚动加载
    export default {
        name: 'selectCar',
        components: {
            //上拉刷新下拉加载
            InfiniteLoading,
            isLogin,
            ModelPop
          },
        data(){
            return {
                //组件pop
                isShow:false,
                isSuss:false,
                TextMsg:"",
                BtnTextMsg:"确定",

                //登录组件
                isLogin:false,
                token:'',
                infoArr:{}, //接收上一级传过来的数据

                //与列表滚动加载有关
                page:1,  //默认页码
                pageSize:20, // 一页显示多少条
                total:"", //总条数,
                goodList:[],
                flag:true,
                noData:false,  //没有数据
                isSortNum:'',

                isSortTab:0,  //过滤类型
                filterOrderTag:[
                    {name:'全部',sortName:'default'},
                    {name:'送车上门',sortName:'visit'},
                    {name:'距离',sortName:'distance'},
                    {name:'包车',sortName:'driver'},
                ],
        }
        },
        methods:{
            //弹框子组件向父组件传值
            childByValue: function (childValue) {
                // childValue就是子组件传过来的值
                this.isShow = childValue;
            },
            filterTab(num){  //切换列表
                let _this = this;
                _this.flag = true;
                setTimeout(function () {
                    _this.isSortTab = num;
                    _this.goodList = [];
                    _this.page = 1;
                    _this.noData = false;
                    _this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                },100)
            },
            selectCar($state){
                var _this = this;
                this.$vux.loading.show();
                let onCarlntlat = this.infoArr.pickLocation.split(',');  //取车地址经纬度
                let onOfflntlat = this.infoArr.returnLocation.split(','); //还车地址经纬度
                let headersObj = {'x-access-token':this.getToken};
                let params = {
                    "onCarCityCode": this.infoArr.onCarCityCode,
                    "onCarCityName": this.infoArr.pickCity,
                    "onCarAddress": this.infoArr.pickUpAddress,
                    "onCarLongitude": onCarlntlat[0],
                    "onCarLatitude": onCarlntlat[1],
                    "offCarCityCode": this.infoArr.offCarCityCode,
                    "offCarCityName": this.infoArr.returnCity,
                    "offCarAddress": this.infoArr.returnAddress,
                    "offCarLongitude": onOfflntlat[0],
                    "offCarLatitude": onOfflntlat[1],
                    "useCarStartTime":this.infoArr.checkStartDate,
                    "useCarEndTime": this.infoArr.checkEndDate,
                    "filterOrderTag": this.filterOrderTag[this.isSortTab].sortName
                };
                this.$server.post(this.zucheROOT+"app/v1.0/goods/searchGoodsList"+'?page='+this.page+'&pageSize='+this.pageSize,params,headersObj).then(res =>{
                    this.$vux.loading.hide();
                    if(res.code==200){
                        //this.goodList = res.data.data;
                        setTimeout(() => {
                            _this.$vux.loading.hide();
                            if(res.data.total == 0){
                                this.noData = true;
                            }
                            if (res.data.data.length>0) {
                                _this.noData = false;
                                _this.page += 1;
                                _this.goodList.push(...res.data.data);

                                _this.total = res.data.total;

                                $state.loaded();

                                for(var i in _this.goodList){  //添加自定义类型属性:0表示包车，1表示送车上门，2表示门店取车
                                    for(var j in _this.goodList[i].goodsDisplayList){
                                        let goodsListData = _this.goodList[i].goodsDisplayList[j];
                                        if( goodsListData.haveDriver){
                                            goodsListData.isSortNum = 1;
                                        }else if(goodsListData.haveVisit){
                                            goodsListData.isSortNum = 2;
                                        }else if(goodsListData.haveVisit==false || goodsListData.haveDriver==false){
                                            goodsListData.isSortNum = 3;
                                        }
                                    }
                                }

                                if (_this.goodList.length === res.data.total) {
                                    $state.complete();
                                }
                            } else {
                                $state.complete();
                            }
                        },500)
                    }else if(res.code==10000){
                        this.$vux.toast.show({  //提示
                            text: res.msg,
                            type:'text',
                            width:'80%',
                        });
                        setTimeout(function () {
                            _this.$vux.toast.hide();
                            _this.isLogin = true;
                        },1000)
                    }else {
                        this.isShow = true;
                        this.TextMsg = res.msg;

                        /*this.$vux.toast.show({  //提示
                            text: res.msg,
                            type:'text',
                            width:'80%',
                        });*/
                    }

                })
            },
            onInfinite($state){  //判断滚动加载的方法
                //flag表示是否是第一次加载
                if(this.flag){
                    //初始化加载
                    this.selectCar($state);
                    this.flag = false;
                }else {
                    //滚动加载时，页码this.page都会大于1
                    if(this.page>1){
                        this.selectCar($state);
                    }
                }
            },
            goFillOrder(item,num,vehicleTypeId){  //去填写订单
                this.$router.push({path:'fillOrder',query:{isSortNum:num,vehicleTypeId:vehicleTypeId,goodsInfo:JSON.stringify(item),infoArr:JSON.stringify(this.infoArr)}})
            }
        },
        mounted(){
            let info = this.$route.query.infoArr;
            this.infoArr = JSON.parse(info);
            console.log(this.infoArr)


            //首页把默认的值存到本地
            localStorage.setItem("checkEndDate", this.infoArr.checkEndDate);
            localStorage.setItem("checkStartDate", this.infoArr.checkStartDate);
            localStorage.setItem("checkStartWeek", this.infoArr.checkStartWeek);
            localStorage.setItem("dayNum", this.infoArr.dayNum);
            localStorage.setItem("pickCity", this.infoArr.pickCity);
            localStorage.setItem("returnCity", this.infoArr.returnCity);
            localStorage.setItem("pickLocation", this.infoArr.pickLocation);
            localStorage.setItem("returnLocation", this.infoArr.returnLocation);
            localStorage.setItem("pickUpAddress", this.infoArr.pickUpAddress);
            localStorage.setItem("returnAddress", this.infoArr.returnAddress);
        },
        created(){
            this.getToken =  localStorage.getItem("token");
            console.log(location)
        }
    }
</script>

<style scoped>
    .selectCar{ height: 100%;}
    .selectCarFlex{display: flex;flex-direction: column;height: 100%;}
    .selectCarTopBd1{border: 1px solid #EFEFEF;background:#FFFFFF;border-radius: 2rem;height: 4rem;display: flex; align-items: center;}
    /*用车时间*/
    .selectCarTopOne{flex: 0.5; text-align: center;overflow: hidden}
    .selectCarTopOne label{font-size: 1.1rem;color: #AAAAAA; text-align: center; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 95%; margin: 0 auto; display: inline-block}
    .selectCarTopOne p{font-size: 1.2rem;color: #333333;text-align: center}
    .selectCarTopDay{width: 3rem;text-align: center;font-size: 1.1rem;color: #666666}
    .selectCarTopDay p{text-align: center;margin-top: -0.5rem;}
    .selectCarTopDay p img{width: 3rem;}

    .sortCondition{padding-left: 1rem; padding-top: 1rem;}
    .sortCondition span{color: #666666;font-size: 1.1rem;background: #EFEFEF;border-radius: 2rem;padding: 0.3rem 1.1rem 0.5rem 1.1rem;display: inline-block;margin-bottom: 0.5rem;margin-right: 0.3rem;}
    .sortCondition span.current{background: #407FFD;color: #ffffff}

    /*车型列表*/
    .selectCarList{flex: 1;overflow-y: auto; -webkit-overflow-scrolling: touch; }
    .selectCarListOne{box-shadow: 0 0 10px rgba(0,0,0,0.2);border-radius:1rem;margin: 1.5rem; padding: 0 1.5rem 0 1.5rem; background: #ffffff}
    .zuchecarImgBox{display: flex;border-bottom: 1px solid #EFEFEF;align-items: center}
    .zuchecarImg{flex: 0.4;}
    .zuchecarImg img{width: 100%}
    .zuchecarImgTit{flex: 0.6;color: #666666;padding-left: 1rem;}
    .zuchecarImgTit h3{font-size: 1.4rem;font-weight: bold;}
    .zuchecarImgTit p{font-size: 1.2rem; line-height: 2.5rem;}
    .selectCarUl li{ padding-top: 1rem;padding-bottom: 1rem;border-bottom: 1px solid #EFEFEF;}
    .selectCarUl li:last-child{border-bottom: none}

    .selectCarUl li div{display: flex}
    .selectCarF1{flex: 1;}
    .color1{color: #44A0FE}
    .selectCarTitle img{width: 1.6rem; vertical-align: middle;margin-top: -0.3rem;margin-right: 0.3rem;}
    .shopName{font-size: 1.2rem;color: #666666}
    .selectPrice{font-size: 1.8rem;color: #407FFD}
    .selectPrice span{font-size: 1.3rem;font-weight: normal}
    .selectCarShop{padding-bottom: 0.2rem;color: #666666}
    .selectCarText{color: #AAAAAA;font-size: 1.1rem;}

    /*暂无数据*/
    .complaintListNull{display: flex;align-items: center;justify-content: center;flex-direction: column;position: absolute;top: 0;width: 100%;background: #ffffff;margin-top: -30px; }
    .complaintListNull img{margin: 1rem;}
    .complaintListNull div{color:#828282;font-size: 1.2rem;padding-left: 2rem;}

</style>
