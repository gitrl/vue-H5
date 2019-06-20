<template>
    <div id="viewComplaintCs">
        <div class="aboutTitle">投诉处理</div>
        <div class="viewComplaintCsBox">
            <h3 class="FontS13 padL1D5 colorGray padT1 padB1">投诉详情</h3>
            <div class="FontS12 pad1 padL1D5 lineH2D5 colorGray bgcolorW viewComplaintCsContent">{{ContentData}}</div>
            <h3 class="FontS13 padL1D5 colorGray padT1 padB1">受理进度</h3>
            <div class="padL1D5 bgcolorW borderT borderB padT1 padB2" v-if="status=='1'">
                <p class="FontS12 lineH2 colorGray"><span class="grayPoint"></span><i>待处理</i>　{{complaintTime | formatDate}}</p>
            </div>
            <div class="padL1D5 bgcolorW borderT borderB padT1 padB2" v-else-if="status=='2'">
                <p class="FontS12 lineH2 colorGray"><span class="grayPoint"></span><i>待处理</i>　{{complaintTime | formatDate}}</p>
                <p class="verticalLine"></p>
                <p class="FontS12 lineH2 colorGray"><span class="bluePoint"></span><i class="colorBlue">处理中</i>　{{dealTime | formatDate}}</p>
            </div>
            <div class="padL1D5 bgcolorW borderT borderB padT1 padB2" v-else="status=='3'">
                <p class="FontS12 lineH2 colorGray"><span class="grayPoint"></span><i>待处理</i>　{{complaintTime | formatDate}}</p>
                <p class="verticalLine"></p>
                <p class="FontS12 lineH2 colorGray"><span class="grayPoint"></span><i>处理中</i>　{{dealTime | formatDate}}</p>
                <p class="verticalLine"></p>
                <p class="FontS12 lineH2 colorGray"><span class="bluePoint"></span><i class="colorBlue">已处理</i>　{{completeTime | formatDate}}</p>
            </div>
        </div>
        <div class="callIconBox FontS12 ">
            <div class="pad1 TextC">对处理结果还有疑问？请点击<span class="colorBlue" @click="callAndroid(NumIphone)">联系客服</span></div>
        </div>
    </div>
</template>

<script>
  import {formatDate} from '../../../../assets/js/date'

  export default {
    name: 'viewComplaintCs',
    data:function () {
      return {
        //带过来的参数
        ContentData:"",  //投诉内容
        complaintTime:"",  //投诉时间
        dealTime:"",   //处理中时间
        completeTime:"",  //完成处理时间
        status:"",  //状态

        //电话
        NumIphone:"4006562666",
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy年MM月dd日 hh:mm')
      }
    },created:function () {
      this.ContentData = this.$route.query.content;
      this.complaintTime = Number(this.$route.query.complaintTime);
      this.dealTime =  Number(this.$route.query.dealTime);
      this.completeTime =  Number(this.$route.query.completeTime);
      this.status = this.$route.query.status;
     // alert(typeof this.complaintTime)
     // alert(this.timeFormat(this.complaintTime))
    }
  }
</script>

<style scoped>
    #viewComplaintCs{height: 100%;background-color: #fff}
    .aboutTitle{padding:1rem 1.5rem;font-weight: bold;font-size: 1.5rem}
    .viewComplaintCsBox{margin-bottom: 4rem;}
    .grayPoint{width:0.4rem;height:0.4rem;border: 0.2rem solid #E1E1E1;display: inline-block;border-radius: 0.4rem; margin-right: 0.3rem;}
    .bluePoint{width:0.4rem;height:0.4rem;border: 0.2rem solid #5488F2;display: inline-block;border-radius: 0.4rem; margin-right: 0.3rem;}
    .verticalLine{height: 2rem;width: 0.2rem;background: #D9DDE8;margin-left: 0.3rem;}
    .colorBlue{color: #5488F2}
    .callIconBox{position: fixed;bottom: 0;width: 100%;background: #ffffff}
    .viewComplaintCsContent{word-wrap:break-word}
</style>
