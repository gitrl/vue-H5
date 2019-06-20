<template>
    <div id="busIndex">
        <div class="indexBanner"><img src="../../assets/images/busTicket/bannner.png"> </div>
        <div class="busContent padL2 padR2 padT2 padB2" >
            <ul class="selectInput ">
                <li class="busContentTitle" style="border-bottom: none">
                    <div>汽车票</div>
                </li>
                <li style="padding-left: 0;padding-right: 0;">
                    <div class="selectAddressN TextC">
                        <div @click="departure(0)"><input v-model="cityAddress1"  readonly type="text" placeholder="出发地" class="startI"></div>
                        <div ><img src="../../assets/images/busTicket/change.png" alt=""></div>
                        <div @click="departure(1)"> <input v-model="cityAddress2" type="text" placeholder="目的地"  class="startI"></div>
                    </div>
                </li>
                <li style="border-bottom: none">
                    <div class="bus_dateTime"><input type="text" placeholder="选择出发日期" v-model="selectData2"><span>{{weekDay}}</span></div>
                    <div class="calendarBox">
                        <group>
                            <datetime v-model="selectData2" title="设置日期" :start-date="startDate" format="YYYY-MM-DD"></datetime>
                        </group>
                    </div>
                </li>
            </ul>
            <div class="airBtnBox" @click="checkBus">
                <airCommonBtn :airBtnText="airCommonBtnText" class="marB2 boxShadow"></airCommonBtn>
            </div>
        </div>
        <div class="bus_mask" v-if="isShowMask">{{isShowMaskText}}</div>
        <div class="busTicketBottom">
            <div class="bottomLine"></div>
            <div class="linMiddle"><div class="TextC">牦牛出行</div> <div class="TextC">让西藏旅行更美好</div></div>
            <div class="bottomLine"></div>
        </div>

        <div class="busTicketBottom_con" >
            <div><img src="../../assets/images/busTicket/busThree.png" alt=""> <span>接送便捷</span></div>
            <div><img src="../../assets/images/busTicket/busOne.png" alt=""> <span>购票方便</span></div>
            <div><img src="../../assets/images/busTicket/busTwo.png" alt=""> <span>景点直达</span></div>

        </div>
    </div>
</template>

<script>
    import {Group, Calendar,Datetime } from 'vux'
    import airCommonBtn from '@/components/airCommonBtn';
    export default {
        name: "busticketIndex",
        components: {
            airCommonBtn,
            Group,
            Calendar,
            Datetime
        },
        data: function () {
            return {
                airCommonBtnText:'查询',
                cityAddress1:'',
                cityAddress2:'',
                selectData2:'', //预计出发时间
                startDate: '',  //开始时间
                token:'',
                weekDay:'', //星期
                bigTitle:'',//选择城市标题
                isShowMask:false,   //是否弹出提示
                isShowMaskText:''
            }
        },
        watch: {
            selectData2:function (val) {
                this.weekDay = this.getWeek(new Date(val))
            }
        },
        methods: {
            //选择城市
            departure(index){
                this.addIndex = index;
                if(index == '0'){
                   this.bigTitle = "出发地";
                }
                else {
                    this.bigTitle = "目的地"
                }
                this.$router.push({path:'/busTicket/departure',
                    query:{bigTitle:this.bigTitle}
                });
            },
            //点击查询按钮
            checkBus(){
                var that = this;
                console.log(this.cityAddress1)
                if(this.cityAddress1 == '' || this.cityAddress2 == '' || this.selectData2 == ''){
                    this.isShowMask = true;
                    this.isShowMaskText = "请选择出发到达地点 和出发日期";
                    setTimeout(function () {
                        that.isShowMask = false;
                    },2000)
                }
                else {
                    this.isShowMask = ! this.isShowMask;
                    this.isShowMaskText = "抱歉，当前城市暂未开通订票服务";

                    setTimeout(function () {
                        that.isShowMask = false;
                    },2500)
                }

            }
        },
        mounted() {

        },
        created() {
            this.token = this.$route.query.token;
            if(sessionStorage.getItem('cityAddress1') != null || sessionStorage.getItem('cityAddress1') != undefined){
                this.cityAddress1 = sessionStorage.getItem('cityAddress1');
            }
            if(sessionStorage.getItem('cityAddress2') != null || sessionStorage.getItem('cityAddress2') != undefined){
                this.cityAddress2 = sessionStorage.getItem('cityAddress2') ;
            }
        }
    }
</script>

<style scoped>
    #busIndex .indexBanner img{width: 100%;}
    .busContent{
        position: relative;
        top:-2.5rem;
        background: #fff;
        width: 80%;
        margin: 0 auto;
        left: 0;
        right: 0;
        border-radius: 1.5rem;
        background: url("../../assets/images/busTicket/busContentbg.png");
        background-size: 100% 100%;
    }
    .busContentTitle div{
        color: #4398FE;
        font-size: 2rem;
    }
    .boxShadow{
        box-shadow: 1px 5px 10px #C1DEFF;

    }
    .bus_mask{
        padding: 0.6rem;
        background: #333333;
        opacity: 0.5;
        position: absolute;
        box-sizing: border-box;
        color: #fff;
        font-size: 1.2rem;
        border-radius: 5rem;
        top:35rem;
        margin: 0 auto;
        left: 0;
        right: 0;
        width: 65%;
        text-align: center;
        -webkit-animation:bounceIn .5s .1s ease both;
        -moz-animation:bounceIn .5s .1s ease both;
    }


    @-webkit-keyframes bounceIn{
        0%{opacity:0;
            -webkit-transform:scale(.1)}
        100%{opacity:0.5;-webkit-transform:scale(1)}
    }
    .busTicketBottom{
        display: flex;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        justify-content: space-between;
    }
    .bottomLine{
        height: 0;
        width: 25%;
        border: 1px solid #CAD7E9;
    }
    .linMiddle{
        /*margin: 0 1rem;*/
        color: #CAD7E9;
        font-size: 1.3rem;
    }
    .busTicketBottom_con,.busTicketBottom_con div{display: flex}
    .busTicketBottom_con{
        justify-content: space-around;
        margin: 2rem;
    }
    .busTicketBottom_con div{
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .busTicketBottom_con div img{
        width: 2.5rem;
        height: 2.5rem;
    }
    .busTicketBottom_con div span{
        margin-top: 1rem;
        color: #CAD7E9;
        font-size: 1.2rem;
    }
    .marB2{margin-bottom: 2rem;    height:4.3rem !important;        line-height: 4.3rem !important;}
    .selectInput li img{width: 1.5rem;vertical-align: middle;}
    .airFlightNav ul li{float: left;width: 50%;text-align: center;line-height: 4rem;font-size: 1.4rem;color: #ffffff;font-weight: bold;}
    .airFlightNav ul li.active{color: #44A0FE;border-bottom: 4rem solid #fff;border-right: 2rem solid transparent;height: 0;width: 50%;margin-right: -2rem;}
    .airFlightNav ul li:last-child.active{color: #44A0FE;border-bottom: 4rem solid #fff;border-left: 2rem solid transparent; border-right: none; height: 0;width: 50%;border-radius: 0.5rem  0.5rem 0 0;margin-left: -2rem;}

    .selectInput li{border-bottom: 1px solid #F5F5F5;line-height: 4rem;height: 4rem;padding-left: 1rem;padding-right: 1rem; margin-bottom: 1rem;position: relative}
    .selectInput li input{width: 50%;outline: none;font-size: 1.6rem;height: 4rem;line-height: 4rem;padding-left: 0.5rem;}
    .selectInput li input.startI{width: 100%;height: 3rem;line-height: 3rem;text-align: center}
    .calendarBox{opacity: 0;position: absolute;width: 100%;bottom: 0;}
    .bus_dateTime{font-size: 1.6rem;text-align: center;display:flex;justify-content: center;}
    .selectAddressN{display: flex;align-items: center;justify-content: space-between}
    .selectAddressN span{font-size: 1.5rem;color: #CECECE;}
    .selectAddressN span img{margin-left: 1rem; margin-right: 1rem;width: 2.2rem;vertical-align: middle;}
</style>
