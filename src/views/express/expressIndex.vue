<template>
    <div class="expressIndex local_scroll">
        <div class="pad1D5" style="padding-bottom: 1rem; ">
            <ul class="expressList" id="refreshContainer">
                <li @click="expressDetail(item.id)" v-for="(item,index) in expressListData" :key="index">
                    <div class="beaut_pic"><img :src="item.titleImg"> </div>
                    <div class="flex padL1 padR1  lineH3"><span class="FontS13 flexC orderColor5 expressTitle ">{{item.title}}</span><span class="priceColor "><i>¥</i>{{numDiv(item.price,100)}}/人</span></div>
                    <div class="expressType">直达</div>
                </li>
            </ul>
        </div>
        <div id="loadMore">
            <infinite-loading   @infinite="onInfinite"  ref="infiniteLoading" >
                <span slot="no-more">
                    没有更多数据
                </span>
            </infinite-loading>
        </div>
        <div class="complaintListNullAir" v-if="noData" >
            <img src="../../assets/images/passenger/dataNull.png" alt="" style="width: 14rem;">
            <div class="TextC FontS12 padL2">暂无数据</div>
        </div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';  //滚动加载
    export default {
        name: "expressIndex",
        components: {
            //上拉刷新下拉加载
            InfiniteLoading,
        },
        data:function(){
            return {
                token:'',
                //与列表滚动加载有关
                page:1,  //默认页码
                pageSize:10, // 一页显示多少条
                total:"", //总条数,
                expressListData:[],
                flag:true,
                noData:false,  //没有数据
            }
        },
        methods:{
            expressDetail(id){
                if (!navigator.onLine) {  //判断有无网络
                    this.$vux.loading.hide();
                    this.$vux.toast.show({
                        text: "检查手机网络",
                        type:'text',
                        width:'80%',
                    });
                    return
                }
                this.$router.push({path:'/express/expressDetails',query:{id:id}})
            },
            expressList($state){
                var _this = this;
                this.$vux.loading.show();
                this.$server.get(this.expressROOT+'app/v1.0/goods/list?page='+this.page+'&pageSize='+this.pageSize,null,null).then(res=>{
                    this.$vux.loading.hide();
                    if(res.code == 200){
                        setTimeout(() => {
                            _this.$vux.loading.hide();
                            if(res.data.total == 0){
                                this.noData = true;
                            }
                            if (res.data.rows.length>0) {
                                _this.noData = false;
                                _this.page += 1;
                                _this.expressListData.push(...res.data.rows);
                                // _this.total = res.data.total;
                                console.log( _this.expressListData)
                                $state.loaded();

                                if (_this.expressListData.length === res.data.total) {
                                    $state.complete();
                                }
                            }
                        },500)

                    }else {
                        this.$vux.toast.show({
                            text:res.msg,
                            type:'text',
                            width:'80%'
                        })
                    }
                })
            },
            onInfinite($state){  //判断滚动加载的方法
                //flag表示是否是第一次加载
                if(this.flag){
                    //初始化加载
                    this.expressList($state);
                    this.flag = false;
                }else {
                    //滚动加载时，页码this.page都会大于1
                    if(this.page>1){
                        this.expressList($state);
                    }
                }
            },
        },


        created(){

            let _this = this;
            //判断是否登录
            var param = this.GetRequest();
            if(param.token){
                this.token  = param.token;
                this.$server.get(this.webviewUrl+'api/comm/check-token?token='+_this.token,null,null,'just').then((res) => {
                    if(res.code == 200){
                        localStorage.setItem("token",_this.token);
                        return
                    }else {
                        this.token  = localStorage.getItem("token");
                    }
                });
            }else {
                this.token  = localStorage.getItem("token");
            }

            //百度统计
            var arrStatistics = ['30101', '直通车首页', '展示', '', ''];
            this.baiduS(arrStatistics);
        }
    }
</script>

<style scoped>
    .expressIndex{background: #ffffff}
    .beaut_pic{width: 100%;}
    .beaut_pic img{width: 100%}
    .expressList li{position: relative;box-shadow: 0 0 10px rgba(0,0,0,0.2);border-radius: 5px; padding-bottom: 0.5rem; margin-bottom: 1.5rem;}
    .expressTitle{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
    .priceColor{color: #FEBE00;font-size: 1.4rem; padding-left: 1rem;}
    .priceColor i{font-size: 1.1rem;padding-right: 1px;}
    .expressType{position: absolute;top: 0;background: #407FFD; left: 1.5rem; line-height: 2rem; padding-bottom: 0.2rem; padding-left: 1rem;padding-right: 1rem;border-radius: 0 0 5px 5px;color: #ffffff;font-size: 1rem;}
    .local_scroll{height: 100%}

    /*没有数据*/
    .complaintListNullAir{height: 100%;display: flex;align-items: center;justify-content: center;flex-direction: column;position: absolute;top: 0;width: 100%;background: #ffffff;}
    .complaintListNullAir img{margin: 1rem;}
    .complaintListNullAir div{color:#828282;font-size: 1.2rem;padding-left: 2rem;}


    /*上拉刷新*/
    .refreshText {
        position: absolute;
        width: 100%;
        line-height: 50px;
        text-align: center;
        left: 0;
        top: 0;
        transform: translateY(-50px);
    }

</style>
