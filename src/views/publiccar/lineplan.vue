<template>
    <transition enter-active-class='animated fadeInRight'>
        <div id="linePlan">
            <div class="FlexBigBox">
                <h2 class="bigTitle padT2 padL2">线路方案</h2>
                <div class="padL2 padR2 padT1 lineAddressBox">
                    <div class=" lineCircle">
                        <p class="lineCircleS"></p>
                        <p class="lineCircleLine"></p>
                        <p class="lineCircleE"></p>
                    </div>
                    <div class="lineAddress FontS11">
                        <p class="borderB" @click="start()"> <input v-model="startText" style="width: 90%" placeholder="请输入起点"/></p>
                        <p  @click="end()" ><input v-model="endText" style="width: 90%" placeholder="您要去哪儿"/></p>
                    </div>
                </div>
                <div class="padL2 padR2 lineBus" v-if="plan.length > '0'">
                    <ul class="padT1">
                        <li v-for='(item,index) in plan' :key="index" @click="planArr(index)">
                            <div class="lineBusIcon">
                                <span v-for="(k,i) in item.trans" :key="i"><i><img src="../../assets/images/publiccar/icon/busIcon1.png">{{k}}</i><em class="triangle" :class="{none:i==item.trans.length-1}"></em></span>
                            </div>
                            <p class="FontS11 lineH2">全程{{item.transit}}·步行{{item.walktime}}，共{{item.time}}分钟·{{item.cost}}元</p>
                        </li>
                    </ul>
                </div>
                <div class="noLineplan padL2 padR2" v-else v-show="noShow">
                    <div class="noLineplanImg TextC FontS13 lineH2D5"><img src="../../assets/images/publiccar/icon/noLineplanImg.png"><br/>啊哦，没有合适的换乘方案 </div>
                </div>
                <div class="noLineplan" v-show="loading">
                    <div class="noLineplanImg TextC FontS13 lineH2D5"><img src="../../assets/images/publiccar/loading.gif" style="width: 5rem;"><br/>正在加载……</div>
                </div>
                <div class="noLineplan" v-show="startEnd">
                    <div class="noLineplanImg TextC FontS13 lineH2D5"><img src="../../assets/images/publiccar/icon/noLineplanImg.png"><br/>请输入起点或终点</div>
                </div>
            </div>

        </div>
    </transition>

</template>

<script>
    import AMap from 'AMap'
    export default {
        name: 'HelloWorld',
        data () {
            return {
                plan: [],
                isShow:true,
                noShow:false,
                loading:true,
                openCityName:'',
                startText:'',
                endText:'',
                userId:'',
                startEnd:false,
            }
        },
        mounted () {
            if(this.startText != '请输入起点' && this.startText != ''&& this.startText != undefined && this.endText != '' && this.endText != undefined && this.endText != '您要去哪儿'){
                this.init();
            }else {
                this.startEnd = true;
                this.loading = false;
            }
        },
        methods: {
            init: function () {
                let _this=this;

                let map = new AMap.Map('route', {
                    center: [116.397428, 39.90923],
                    resizeEnable: true,
                    zoom: 16,
                });

                map.plugin(["AMap.Transfer"], function() {

                    //实例化公交线路查询类
                    var transferOption = {
                        city: _this.openCityName,
                        cityd:_this.openCityName,
                        nightflag: true, // 是否计算夜班车
                        policy: AMap.TransferPolicy.LEAST_TIME, // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
                    };
                    var transfer = new AMap.Transfer(transferOption);

                    //根据起、终点坐标查询公交换乘路线
                    transfer.search([
                        {keyword: _this.startText,city:_this.openCityName},
                        //第一个元素city缺省时取transOptions的city属性
                        {keyword: _this.endText,city:_this.openCityName}
                        //第二个元素city缺省时取transOptions的cityd属性
                    ],function(status, result) {

                        // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
                        if (status === 'complete') {
                            _this.loading = false;

                            if(result.info == "NO_DATA"){  //没有数据的时候

                                _this.noShow = true;

                            }else if(result.start.cityname == result.end.cityname){  //判断起点与终点是否在一个城市
                                if (result.plans && result.plans.length) {
                                    var plans = result.plans;
                                    for (var i = 0; i < plans.length; i++) {
                                        var cost = plans[i].cost

                                        var segments = plans[i].segments;

                                        var time = parseInt(plans[i].time / 60);

                                        if(time >= 60){
                                            console.log(time)
                                            time  =parseInt(time/60)+'小时'+ time%60
                                        }

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
                                        var trans = [];
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

                                        //线路列表数据
                                        _this.plan.push({
                                            cost: cost,
                                            time: time,
                                            trans: trans,
                                            walktime:walktime,
                                            transit:transit,
                                        })
                                    }
                                    console.log(_this.plan);
                                }
                            }else {
                                _this.noShow = true;
                            }

                        } else {
                            // log.error('公交路线数据查询失败' + result)
                        }
                    });

                })
            },
            //把所有的线路方案值传到线路规划页面
            planArr(index){
                this.$router.push({path:'/publiccar/routerDetail',query:{active:index,endText:this.endText,startText:this.startText,openCityName:this.openCityName,userId:this.userId}});
            },
            //出发地点击
            start(){
                this.$router.push({path: '/publiccar/departure',query:{startText:this.startText,endText:this.endText,openCityName:this.openCityName,userId:this.userId}});
            },
            //终点
            end(){
                this.$router.push({path: '/publiccar/destination',query:{endText:this.endText,startText:this.startText,openCityName:this.openCityName,userId:this.userId}});
            }
        },
        created:function () {
            //从上级拿的值
            this.startText = this.$route.query.startText;
            this.endText = this.$route.query.endText;
            this.openCityName = this.$route.query.openCityName;
            this.userId = this.$route.query.userId;


            if(this.endText == "您要去哪儿"){
                this.endText = ''
            }
            if(this.startText == "请输入起点"){
                this.startText = ''
            }

        }
    }
</script>

<style scoped>
    #linePlan{height: 100%;background: #ffffff}
    .noLineplan{color: #828282; flex: 1; display: flex; height: 100%;align-items:center; justify-content: center;margin-top: 3rem;}
    .noLineplanImg img{width: 10rem;}

    /*起点终点*/
    .lineAddressBox{display:flex;flex-flow:row; background: #ffffff;box-shadow: 0px 10px 10px #eeeeee;border-radius: 0 0 5px 5px; }
    .lineCircle{width: 1rem; padding-top: 1.3rem; margin-right: 1rem;}
    .lineCircleS,.lineCircleE{width: 1rem;height: 1rem;background: #44a0fe;display: inline-block;border-radius: 0.5rem;}
    .lineCircleE{background: #26c58d}
    .lineCircleLine{width: 1px;height: 33px;border-left: 1px dotted #dddddd;margin-left: 0.4rem;margin-top: 0.1rem;margin-bottom: 0.2rem;}


    .lineAddress{flex:1;width: 95%;}
    .lineAddress p{height: 4rem;line-height: 4rem;color: #666666;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
    .lineAddress p a{width: 100%;display: inline-block;}
    .lineAddress p input{color: #555555;}

    .lineBus{ flex: 1; display: flex; height: 100%;overflow-y: auto;}
    .lineBus ul{width: 100%;}
    .lineBus ul li{border-bottom: 1px solid #dddddd; padding-bottom: 1rem; padding-top: 2em;}
    .lineBus ul li:last-child{border-bottom: none;}
    .lineBus ul li p{padding-top: 0.5rem;}
    .lineBusIcon{font-size: 1.1rem;margin-left: 0.5rem;}
    .lineBusIcon span{margin-left: -0.5rem; margin-bottom: 0.5rem;display: inline-block}
    .lineBusIcon span i{border: 1px solid #dddddd;padding: 0.4rem;display: inline-block;padding-left: 1rem;padding-right: 1rem;border-radius: 0.3rem;color: #333333}
    .lineBusIcon span i img{width: 1.6rem;vertical-align: middle; padding-right: 0.5rem;margin-top: -0.3rem;}
    .lineBusIcon span em.triangle { width:0;height:0;border-width:0.5rem;border-style:solid;display: inline-block;margin-left: 0.6rem;margin-right: 0.2rem;border-color:transparent transparent transparent #333333;}



</style>
