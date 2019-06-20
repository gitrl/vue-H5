<template>
    <div class="cooperationBox">
        <div class="tab">
            <div @click="changTab(1)" :class="{active:currentColor==1}">机票</div>
            <div @click="changTab(2)" :class="{active:currentColor==2}">火车票</div>
        </div>
        <div class="content">
            <div v-show="flag == 1" style="width:100%;height:100%;-webkit-overflow-scrolling:touch;overflow-y:scroll;">
                <iframe width="100%" height="100%" src="http://m.ctrip.com/html5/Flight/?allianceid=974694&sid=1566608&popup=close&autoawaken=close&ouid=app" frameborder="0"></iframe>
            </div>
            <div v-show="flag == 2"  style="width:100%;height:100%;-webkit-overflow-scrolling:touch;overflow-y:scroll;">
                <iframe  width="100%" height="100%" src="http://m.ctrip.com/webapp/train/?allianceid=974694&sid=1566608&sourceid=xx&popup=close&autoawaken=close&hiderecommapp=1&ouid=app" frameborder="0"></iframe>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "xieChenAir",
        data:function () {
            return{
                flag:1,//当前显示的tab
                currentColor:1
            }

        },
        methods:{
            changTab(num){
                if(this.flag != num){
                    this.flag = num;
                    this.currentColor = num
                }
            }
        }
    }
</script>

<style scoped>
    .cooperationBox{
        height: 100%;
        /*display: flex;*/
        /*flex-direction: column;*/
        background-color: #fff;
    }
    .tab{
        width:60%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 0.3rem;
    }
    .tab div{
        text-align: center;
        /*width:10rem;*/
        line-height:3rem;
        /*height: 6rem;*/
        font-size: 1.5rem;

    }
    .content{
        /*flex: 1;*/
        height: 100%;
        overflow: scroll;
    }

    .active{
        color: #407FFD;
        border-bottom: 3px solid #407FFD;
    }
</style>
