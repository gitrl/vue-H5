<template>
    <div class="openCity padL2 padR2 padT1" v-show="openCityIsShow">
        <h3>开放城市</h3>
        <ul>
            <li :class="{current:isActive == index}" v-for="(item,index) in city" :key="index" @click="checkCity(index,item)">{{item}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "openCity",
        props:{
            openCityIsShow:Boolean
        },
        data:function(){
            return {
                city:['拉萨市','山南市'],
                isActive:0,
                IsShow:true
            }
        },
        methods:{
            checkCity(index,name){
                this.isActive = index;
                // this.IsShow = false;
                // childByCity
                // 第二个参数name是需要传的值
                this.$emit('childByCity', name);
                this.$emit('update:openCityIsShow', false)
            },
            //开放城市
            openCityData(){
                this.$server.get(this.baseURL+'/butterfly-biz/app/v3.0/common/base/base-config',null,null).then(res=>{
                    this.city = res.data.cityName;
                })
            },
        },
        created:function () {
            this.openCityData();
        }
    }
</script>

<style scoped>
    .openCity{position: absolute;width: 100%;background: #ffffff;padding-bottom: 1rem;}
    .openCity h3{font-size: 1.2rem; color: #333333;}
    .openCity ul li{float: left;padding-left: 2rem;padding-right: 2rem;background: #ffffff;box-shadow: 0 0 10px #cccccc;height: 2.5rem;line-height: 2.5rem;border-radius: 1.25rem;font-size: 1.2rem;color: #9B9B9B;margin-right: 1rem;margin-top: 1rem;}
    .openCity ul li.current{background: #407ffd;color: #ffffff;}

</style>
