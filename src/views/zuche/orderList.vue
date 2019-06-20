<template>
    <div id="orderList">
        <div class="local_scroll" style="display: flex;flex-direction: column;">
            <div class="orderListTabBg orderListTab" v-if="isOrderListTab">
                <ul>
                    <li @click="getLink(webviewUrl+'caruser/airport/orderList?token='+token)"><span>接送</span></li>
                    <li class="active" @click="getLink(webviewUrl+'caruser/zuche/orderList?token='+token)" ><span>租车</span></li>
                    <li @click="getLink(webviewUrl+'caruser/express/orderList?token='+token)"><span>直通车</span></li>
                </ul>
            </div>
            <div class="padL1 padR1 padT1D5 flexC" style="overflow: hidden;overflow-y: auto;position: relative;" >
                <div class="orderList ">
                    <div class="orderListOne" v-if="orderData.length>0" v-for="(item,index) in orderData" :key="index"  @click="orderDetails(item.id)">
                        <div class="orderListTitle flex pad1 FontS12">
                            <p class="orderType flexC"><span>{{item.orderType==1?'租车':''}}{{item.orderType==2?'包车':''}}</span></p>
                            <p class="orderStatusBg1" v-if="item.orderStatus==1">待支付</p>
                            <p class="orderStatusBg1" v-else-if="item.orderStatus==2">待确认</p>
                            <p class="orderStatusBg2" v-else-if="item.orderStatus==3 && item.orderType==1">待取车</p>
                            <p class="orderStatusBg2" v-else-if="item.orderStatus==3 && item.orderType==2">待上车</p>
                            <p class="orderStatusBg3" v-else-if="item.orderStatus==4">已完成</p>
                            <p class="orderStatusBg2" v-else-if="item.orderStatus==5">待退款</p>
                            <p class="orderStatusBg3" v-else-if="item.orderStatus==6">已退款</p>
                            <p class="orderStatusBg3 " v-else><span>已取消</span></p>
                        </div>
                        <div class="orderText" v-if="item.orderStatus==4 || item.orderStatus==6 || item.orderStatus==7">
                            <div class="orderContentBox">
                                <p>取车时间：<span class="orderColor3">{{item.getCarTime}}</span></p>
                                <p v-if="item.onCarCity === item.offCarCity">取还地点：<span class="orderColor3">{{item.offCarCity}}</span></p>
                                <p v-else>取还地点：<span class="orderColor3" >{{item.onCarCity}}<img src="../../assets/images/zuche/dayNumjt.png">{{item.onCarCity}}</span></p>
                                <p>订单总价：<span class="orderColor3">¥{{numDiv(Number(item.totalAmount),100)}}</span></p>
                            </div>
                        </div>
                        <div class="orderText" v-else>
                            <div class="orderContentBox">
                                <p>取车时间：<span class="orderColor4">{{item.getCarTime}}</span></p>
                                <p v-if="item.onCarCity === item.offCarCity">取还地点：<span class="orderColor4">{{item.offCarCity}}</span></p>
                                <p v-else>取还地点：<span class="orderColor4" >{{item.onCarCity}}<img src="../../assets/images/zuche/dayNumjt.png">{{item.offCarCity}}</span></p>
                                <p>订单总价：<span class="orderColor4">¥{{numDiv(Number(item.totalAmount),100)}}</span></p>
                            </div>
                        </div>
                    </div>
                    <div id="loadMore" v-if="loadMore">
                        <infinite-loading   @infinite="onInfinite"  ref="infiniteLoading" >
                        <span slot="no-more">
                         没有更多数据
                        </span>
                        </infinite-loading>
                    </div>
                </div>
                <div class="complaintListNull" v-if="noData">
                    <img src="../../assets/images/passenger/dataNull.png" alt="" style="width: 14rem;">
                    <div class="TextC">{{listMsg}}</div>
                </div>
            </div>
        </div>
        <!--刷新 S-->
        <div class="refresh" @click="refresh()"><img src="../../assets/images/zuche/icon/refresh_icon.png">刷新</div>
        <!--刷新 E-->
        <!--登录 S-->
        <isLogin :isLogin="isLogin"></isLogin>
        <!--登录 E-->
    </div>

</template>

<script>
    import isLogin from  '@/views/comm/loginGuide.vue';  //把首页填写的信息写在一个组件里面，方便其它页面调用
    import InfiniteLoading from 'vue-infinite-loading';  //滚动加载
    export default {
        name: 'orderList',
        components: {
          //上拉刷新下拉加载
          InfiniteLoading,
          isLogin
        },
        data:function(){
            return {
                //登录组件
                isLogin:false,
                token:'',

                infoArr:{},  //接收上一级传过来的数据

                flag:true,
                noData:false,
                orderData:[],
                //与列表订单相关
                num: 10, // 一页显示多少条
                total:"", //总条数,
                page:1,  //默认页码
                isOrderListTab:false,

                loadMore:true,
                listMsg:''


            }
        },
        methods:{
            orderList($state){  //订单列表
              var _this = this;
              this.$vux.loading.show();
              let headersObj = {'content-type': 'application/json;charset=UTF-8','x-access-token':this.token};  //'AF1C337FA23C02808C3F1ECAF16C7BC1'
              let parmasObj = {
                  pageNum: this.page,
                  pageSize:this.num
              };
              this.$server.get(this.zucheROOT + "app/v1.0/orderInfo/getUserOrderList",parmasObj,headersObj).then(res =>{
                  if(res.code == 200){
                      this.isLogin = false;
                      setTimeout(() => {
                          _this.$vux.loading.hide();
                          if(res.data.total == 0){
                              this.noData = true;
                              this.listMsg = '暂无数据';
                          }
                          if (res.data.rows.length>0) {
                              _this.noData = false;
                              _this.page += 1;
                              _this.orderData.push(...res.data.rows);
                              console.log(res.data.rows)
                              _this.total = res.data.total;

                              $state.loaded();

                              if (_this.orderData.length === res.data.total) {
                                  $state.complete();
                              }
                          } else {
                              $state.complete();
                          }
                      },500)
                  }else if(res.code == 10000){  //登录失效
                      _this.$vux.loading.hide();
                      _this.loadMore = false;
                      _this.$vux.toast.show({ //提示
                          text: res.msg,
                          type:'text',
                          width:'80%',
                      });
                      setTimeout(function () {
                          _this.$vux.toast.hide();
                          _this.isLogin = true;
                      },2000)
                  }else {
                      _this.$vux.loading.hide();
                      _this.loadMore = false;
                      _this.noData = true;
                      _this.listMsg = res.msg;
                  }

              })
            },
            onInfinite($state) {  //判断滚动加载的方法
              //flag表示是否是第一次加载
              if (this.flag) {
                  //初始化加载
                  this.orderList($state);
                  this.flag = false;
              } else {
                  //滚动加载时，页码this.page都会大于1
                  if (this.page > 1) {
                      this.orderList($state);
                  }
              }
            },
            refresh(){ //刷新 _this.orderData = [];
                location.reload();  //刷新当前页面
            },
            orderDetails(id){
                let uri= 'id='+id+'&token='+this.token;
                //判断是否在小程序环境里
                wx.miniProgram.getEnv(function(res) {
                    if(res.miniprogram){
                        // javascript
                        wx.miniProgram.navigateTo({url: '/pages/rentCar/orderDetails?'+uri});
                    }
                    return
                });
                window.location.href = 'justuser://www.maoniuchuxing.com/web/openUrl?url='+this.webviewUrl+'caruser/zuche/orderDetails?'+encodeURIComponent(uri);
            },

        },
        created(){
            var _this = this;
            //判断是否在小程序环境里
            wx.miniProgram.getEnv(function(res) {
                if(res.miniprogram){
                    _this.isOrderListTab = true;
                }
            });
            //判断是否登录
            var param = this.GetRequest();
            if(param.token){
              this.token  = param.token;
              if(!sessionStorage.getItem("token")) {return}
              if(param.token != sessionStorage.getItem("token")){
                  this.token = sessionStorage.getItem("token");
              }
            }
        }
    }
</script>

<style scoped>
    #orderList{background: #ffffff; height:100%}
    .orderList{background: #ffffff; height:100%}
    .orderListOne{box-shadow: 0 0 5px rgba(0,0,0,.12);border-radius: 0.4rem; margin-bottom: 1.5rem;}
    .orderListTitle{border-bottom: 1px dashed #e6e6e6;color: #AAAAAA}
    .orderType span{border: 1px solid #CECECE; padding-left: 1rem;padding-right: 1rem;line-height: 2rem;border-radius: 3px;display: inline-block}
    .orderListzt{flex: 1;text-align: right;font-weight: bold;line-height: 2rem;}
    .refresh{position: fixed; display:flex; justify-content: center;align-items: center; flex-direction: column; right: 1rem;top: 65%;background: #ffffff;box-shadow: 5px 5px 5px rgba(79,79,79,0.15);border-radius: 2.5rem;width: 5rem;height: 5rem;text-align: center;font-size: 1.2rem;color: #666666;z-index: 2;}
    .refresh img{width: 2rem;}

    .orderText{background: url("../../assets/images/zuche/rent_bg.jpg") right bottom no-repeat;background-size: auto 90%; padding: 1rem;}
    .orderContentBox{background: url("../../assets/images/zuche/icon/orderMore_icon.png") right center no-repeat;}
    .orderText p{font-size: 1.1rem;color: #AAAAAA;line-height:2.5rem;}
    .orderText p span{font-size: 1.3rem;}
    .orderText p img{padding-left: 0.8rem; padding-right: 0.8rem;width: 4rem;}
    .orderColor1{color: #fe3636;}
    .orderColor2{color: #44A0FE;}
    .orderColor3{color: #AAAAAA;}
    .orderColor4{color: #333333;}

    .orderStatusBg1,.orderStatusBg2,.orderStatusBg3{  background: linear-gradient(90deg,#407FFD, #44A0FE);color: #ffffff;padding-left: 1rem;padding-right: 1rem;border-radius: 1rem; line-height: 2.2rem}
    .orderStatusBg2{background: #FEBE00}
    .orderStatusBg3{background: #E6E6E6}

    /*暂无数据*/
    .complaintListNull{text-align: center; background: #ffffff; height: 100%}
    .complaintListNull{display: flex;  align-items: center;justify-content: center;flex-direction: column;position: absolute;top: 0;width: 100%;background: #ffffff;}
    .complaintListNull img{margin: 1rem;}
    .complaintListNull div{color:#828282;font-size: 1.2rem;padding-left: 2rem;}

    /*订单tab切换*/
    .orderListTabBg{background:#ffffff url("../../assets/images/comm/orderListTab_banner.png") bottom no-repeat;width: 100%; height:6rem; background-size: 100% 100%; position: relative;}
    .orderListTabBg.fixed{background:#238AFD; height: 3.8rem; }
    .orderListTab ul{display: flex;width: 100%; border-bottom: 1px solid #F5F5F5; height: 4rem; position: absolute;bottom: 0;width: 100% }
    .orderListTab ul li{font-size: 1.3rem;line-height: 2.5rem; flex: 1;text-align: center;color: #A6D7FF;padding-top: 0.5rem;}
    .orderListTab ul li span{ padding-bottom:1rem;display: inline-block}
    .orderListTab ul li span a{color: #A6D7FF;}
    .orderListTab ul li.active span{color: #FFFFFF; background: url("../../assets/images/comm/orderListTab_sj.png") bottom center no-repeat; }

</style>
