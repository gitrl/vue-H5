<template>
    <div class=" FontS11 orderColor5 lineH2D5">
        <div class="flex" style="justify-content: center;align-items: center" >
            <span class="orderColor3">用车时间：</span>
            <div class="flexC FontS12 flex">
                <div class="selectCarTopOne">
                    <label class="TextL">{{orderDetailsData.getCarTime.slice(5,10).replace(/-/g, "月")}}日</label>
                    <p>{{getCarWeekDay}} {{orderDetailsData.getCarTime.slice(11,16)}}</p>
                </div>
                <div class="selectCarTopDay">
                    <label>{{orderDetailsData.rentCarPeriod}}天</label>
                    <p><img src="../../assets/images/zuche/dayNumjt.png"> </p>
                </div>
                <div class="selectCarTopOne">
                    <label>{{orderDetailsData.returnCarTime.slice(5,10).replace(/-/g, "月")}}日</label>
                    <p>{{returnCarWeekDay}} {{orderDetailsData.returnCarTime.slice(11,16)}}</p>
                </div>
            </div>
        </div>
        <!--门店取车 S-->
        <div v-if="orderDetailsData.onOffServiceType==1">
            <p class="flex"><span class="orderColor3">取车地址：</span><span class="flexC FontS12">{{orderDetailsData.onCarStoreAddr}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:orderDetailsData.onCarStoreLnglat}}" class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
            <p class="flex"><span class="orderColor3">还车地址：</span><span class="flexC FontS12">{{orderDetailsData.offCarStoreAddr}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:orderDetailsData.offCarStoreLnglat}}"  class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
        </div>
        <!--门店取车 E-->
        <!--送车上门 S-->
        <div v-else-if="orderDetailsData.onOffServiceType==2">
            <p class="flex"><span class="orderColor3">送车上门地址：</span><span class="flexC FontS12">{{orderDetailsData.onCarAddr}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:orderDetailsData.onCarAddrLnglat}}" class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
            <p class="flex"><span class="orderColor3">上门取车地址：</span><span class="flexC FontS12">{{orderDetailsData.offCarAddr}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:orderDetailsData.offCatAddrLnglat}}"  class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
        </div>
        <!--送车上门 E-->
        <!--包车 S-->
        <div v-else>
            <p class="flex"><span class="orderColor3">上车地址：</span><span class="flexC FontS12">{{orderDetailsData.onCarAddr}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:orderDetailsData.onCarAddrLnglat}}" class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
            <p class="flex"><span class="orderColor3">下车地址：</span><span class="flexC FontS12">{{orderDetailsData.offCarAddr}}</span><router-link :to="{path:'/zuche/addressMap',query:{Location:orderDetailsData.offCatAddrLnglat}}"  class="orderColor2 FontS12">地图<img src="../../assets/images/zuche/icon/map_icon.png" class="map_icon"> </router-link></p>
        </div>
        <!--包车 E-->
        <div v-if="orderDetailsData.orderStatus!=1">
            <p class="flex">
                <span class="orderColor3">联系电话：</span>
                <span class="flexC"><span class=" FontS12 orderColor2" @click="callAndroid(iphoneNum1)">
                    {{orderDetailsData.onCarStorePhone}}
                </span>
                <span v-if="orderDetailsData.onCarStorePhone!=orderDetailsData.offCarStorePhone"  class="FontS12 orderColor2" @click="callAndroid(iphoneNum2)">,{{orderDetailsData.offCarStorePhone}}</span></span></p>
        </div>
    </div>

</template>

<script>
    export default {
        name: "orderDetailTime",
        props:['orderDetailsData'],
        data:function(){
            return {
                getCarWeekDay:'', //取车周几
                returnCarWeekDay:'', //还周几
                iphoneNum1:'',
                iphoneNum2:'',

            }
        },
        methods:{
            getWeek(){
                let getCarWeekDay = this._props.orderDetailsData.getCarWeekDay;
                let returnCarWeekDay = this._props.orderDetailsData.returnCarWeekDay;

                if(getCarWeekDay==7){
                    this.getCarWeekDay = "周日";
                }else if(getCarWeekDay==1){
                    this.getCarWeekDay = "周一";
                }else if(getCarWeekDay==2){
                    this.getCarWeekDay = "周二";
                }else if(getCarWeekDay==3){
                    this.getCarWeekDay = "周三";
                }else if(getCarWeekDay==4){
                    this.getCarWeekDay = "周四";
                }else if(getCarWeekDay==5){
                    this.getCarWeekDay = "周五";
                }else if(getCarWeekDay==6){
                    this.getCarWeekDay = "周六";
                }

                if(returnCarWeekDay==7){
                    this.returnCarWeekDay = "周日";
                }else if(returnCarWeekDay==1){
                    this.returnCarWeekDay = "周一";
                }else if(returnCarWeekDay==2){
                    this.returnCarWeekDay = "周二";
                }else if(returnCarWeekDay==3){
                    this.returnCarWeekDay = "周三";
                }else if(returnCarWeekDay==4){
                    this.returnCarWeekDay = "周四";
                }else if(returnCarWeekDay==5){
                    this.returnCarWeekDay = "周五";
                }else if(returnCarWeekDay==6){
                    this.returnCarWeekDay = "周六";
                }

            }
        },
        created() {
            this.getWeek();
            console.log(this._props.orderDetailsData)
            this.iphoneNum1 = this._props.orderDetailsData.onCarStorePhone;
            this.iphoneNum2 = this._props.orderDetailsData.offCarStorePhone;
        }
    }
</script>

<style scoped>
    /*用车时间*/
    .selectCarTopOne{ }
    .selectCarTopOne label{font-size: 1.1rem;color: #AAAAAA}
    .selectCarTopOne p{font-size: 1.2rem;color: #666666;margin-top: -1rem;}
    .selectCarTopDay{width: 3rem;text-align: center;font-size: 1.1rem;color: #666666;margin-left: 0.5rem; margin-right: 0.5rem;}
    .selectCarTopDay p{text-align: center;margin-top: -1rem;}
    .selectCarTopDay p img{width:3rem;}
    .map_icon{width: 1.35rem;vertical-align: middle;margin-top: -0.3rem;margin-left: 0.3rem; }

    /*字体颜色*/
    .orderColor1{color: #fe3636;}
    .orderColor2{color: #407ffd;}
    .orderColor3{color: #AAAAAA;}
    .orderColor4{color: #333333;}
    .orderColor5{color: #666666;}
    .orderColor6{color: #9B9B9B;}

</style>
