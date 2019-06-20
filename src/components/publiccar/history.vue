<template>
    <div id="history">
        <li v-for="(item,index) in storageData" @click="storageCheck(item.name)" :key="index" >
            <img src="../../assets/images/publiccar/icon/navigation_icon.png" class="fl">
            <div class="navigation_Text fl">
                <h3>{{item.name}}</h3>
                <p>{{item.address}}</p>
            </div>
        </li>
    </div>
</template>

<script>
    export default {
        name: "history",
        props:["historyData","target"],
        data:function(){
            return {
                storageData:[]
            }
        },
        methods:{
            storageCheck(name){
                if(this._props.target == 'endText'){
                    this._props.historyData.endText= name;
                    //通过query返传级index页面
                    this.$router.push({path: 'lineplan',query:{startText:this._props.historyData.startText,endText:this._props.historyData.endText,openCityName:this._props.historyData.openCityName,userId:this._props.historyData.userId}});
                }
                else if(this._props.target == 'startText'){
                    this._props.historyData.startText = name;
                    this.$router.push({path: 'lineplan',query:{startText:this._props.historyData.startText,endText:this._props.historyData.endText,openCityName:this._props.historyData.openCityName,userId:this._props.historyData.userId}});
                }
            },

        },
        mounted(){
            //获取Cookie
            var _this = this;

            let temp =  JSON.parse(localStorage.getItem('temp'));
            this.storageData = this.uniqObjInArray(temp);
            console.log(this.storageData );
        }
    }
</script>

<style scoped>
    /*历史记录*/
    .addressRecord{ flex: 1; display: flex; height: 100%;overflow-y: auto;}
    .addressRecord ul li{width: 100%;padding-bottom: 1rem;display:flex;flex-flow:row;  justify-content:center;}
    .addressRecord ul li img{height: 1.5rem;padding-top: 0.5rem;}
    .addressRecord ul li .navigation_Text{flex:1;margin-left: 0.5rem; }
    .addressRecord ul li h3{font-size: 1.1rem;color: #666666}
    .addressRecord ul li p{font-size: 1rem;color: #AAAAAA;line-height: 2rem;}
</style>
