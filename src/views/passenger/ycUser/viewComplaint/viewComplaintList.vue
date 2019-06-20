<template>
    <div id="complaintList">
        <div class="aboutTitle">投诉处理</div>
        <div class="complaintListBox" v-if="isShow">
            <dl v-for="(item,index) in complaintListData" :key="index">
                <dd>
                    <span v-if="item.bizType == '1'">出租</span>
                    <span v-if="item.bizType == '2'">快车</span> {{item.complaintTime | formatDate}}
                    <span class="fr UnprocessedColor" v-if="item.status=='1'">待处理</span>
                    <span class="fr UnprocessedColor" v-else-if="item.status=='2'">处理中</span>
                    <span class="fr processedColor" v-else="item.status=='3'">已处理</span>
                </dd>
                <dt>
                    <router-link :to="{path:'viewComplaintCs',query:{content:item.complaintContent,complaintTime:item.complaintTime,completeTime:item.completeTime,dealTime:item.dealTime,status:item.status}}">
                        <p><span class="startPoint"></span>{{item.startAddress}}</p>
                        <p><span class="endPoint"></span>{{item.endAddress}}</p>
                        <p>投诉时间：<span>{{item.complaintTime | formatDate}}</span></p>
                        <p class="complaintText">投诉内容：<span>{{item.complaintContent}}</span></p>
                    </router-link>
                </dt>
            </dl>

            <div id="loadMore" >
                <infinite-loading :on-infinite="getComplaintList" ref="infiniteLoading">
                    <span slot="no-more">
                     只有这么多啦！！！
                    </span>
                </infinite-loading>
            </div>
        </div>
        <!--无数据-->
        <div class="complaintListNull" v-if="flag">
            <img src="../../../../assets/images/passenger/dataNull.png" alt="" style="width: 14rem;">
            <div class="TextC">暂无数据</div>
        </div>
        <div class="callIconBox">
            <div class="kcall_icon TextC FontS13 pad1"  @click="callAndroid(NumIphone)"><span>拨打客服电话</span></div>
        </div>
    </div>
</template>

<script>
  //script
  import {formatDate} from '../../../../assets/js/date';  //时间过滤器
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: 'complaintList',
    components: {
      //上拉刷新下拉加载
      InfiniteLoading
    },
    data() {
      return {
        num: 10, // 一页显示多少条
        total:"", //总条数
        NumIphone:"4006562666",
        //投诉列表数据
        complaintListData:[],
        //popover
        isSuss:false,    //提示信息是否显示
        isText:"",
        token:"",
        flag:false,
        isShow:true        //列表是否显示
      }
    },
    methods:{
      //获取投诉列表
      getComplaintList(){
        var _this = this;
        let paramObj = {
            pageIndex:parseInt(this.complaintListData.length/this.num)+1,
            pageSize:this.num
        };
        let headerObj ={
            'x-access-token':this.token
        };

        this.$server.get(this.baseURL+'butterfly-biz/app/v1.0/passenger/complaint/list',paramObj,headerObj).then(res =>{
            if(res.code == "200"){
                setTimeout(() => {
                    if (res.data.complaintList.length) {
                        _this.complaintListData = this.complaintListData.concat(res.data.complaintList);
                        _this.total = res.data.totalRecords;
                        _this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                        if (parseInt(_this.complaintListData.length/_this.num)+1 === res.data.totalPage){
                            _this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                        }
                    } else {
                        _this.isShow=false;
                        _this.flag=true;
                        _this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }
                },500)
            }else {
                _this.isShow=false;
                _this.flag=true;
                this.$vux.toast.show({  //提示
                    text: res.msg,
                    type:'text',
                    width:'80%',
                });
                setTimeout(function () {
                   _this.$vux.toast.hide();
                    _this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                },1000)
            }
        })
      },
    },
        filters: {
          formatDate (time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy年MM月dd日 hh:mm')
          }
    },created:function () {
        //从上个页面带的token值过来
        this.token = this.$route.query.token;
    }
  }
</script>

<style scoped>
    .complaintListNull{
        height: 65%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .complaintListNull img{
        margin: 1rem;
    }
    .complaintListNull div{
        color:#828282;
        font-size: 1.2rem;
        padding-left: 2rem;
    }
    #complaintList{height: 100%;background-color: #fff;}
    .aboutTitle{padding:1rem ;font-weight: bold;font-size: 1.5rem}
    .complaintListBox{margin-bottom: 7rem;}
    .complaintListBox dl{background: #ffffff;border-top: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee; margin-bottom: 1rem;}
    .complaintListBox dd{border-bottom: 1px solid #eeeeee; line-height: 3rem;font-size: 1.2rem;  padding-left:1.5rem; padding-right: 1.5rem; padding-top: 0.5rem; padding-bottom: 0.5rem;color: #222231; }
    .complaintListBox dt{font-size: 1.2rem; background:#ffffff url("../../../../assets/images/passenger/icon/toggleIcon1.jpg") 95% no-repeat;  padding-top: 1rem; padding-bottom: 1rem; line-height: 2.5rem;color: #74777E; padding-left: 1.5rem; padding-right: 1.5rem;}
    .complaintListBox dt a{color: #74777E; -webkit-tap-highlight-color: rgba(255, 255, 255, 0);-webkit-user-select: none;-moz-user-focus: none;-moz-user-select: none;}
    .startPoint{width:0.4rem;height:0.4rem;border: 0.2rem solid #5488F2;display: inline-block;border-radius: 0.4rem; margin-right: 0.3rem;}
    .endPoint{width:0.4rem;height:0.4rem;border: 0.2rem solid #FF5634;display: inline-block;border-radius: 0.4rem; margin-right: 0.3rem;}
    .complaintText{white-space: nowrap;overflow: hidden; text-overflow: ellipsis;}
    .UnprocessedColor{color: #486AE6}
    .processedColor{color: #74777E}
    .callIconBox{position: fixed;bottom: 2rem;left: 0; right: 0;width: 90%;margin: 0 auto;border-radius: 2rem; background: -webkit-linear-gradient(left,  #407FFD 50%,#44A0FE 100%);}

    /*.callIconBox{position: fixed;bottom: 0;width: 100%;background: #ffffff}*/
    .kcall_icon{color: #fff;}
    .kcall_icon span{cursor: pointer;}
    .kcall_icon img{vertical-align: middle;width: 2rem;height: 2rem;margin-right: 0.2rem; margin-top: -0.2rem;}
    .popover{
        width: 80%;
        margin: 0 auto;
        font-size: 1.2rem;
        left:0 !important;
        top: 0 !important;
    }
</style>
