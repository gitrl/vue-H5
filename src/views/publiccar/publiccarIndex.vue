<template>
    <div class="indexPage">
        <div id="container" tabindex="0"></div>
        <div class="lineAddessP">
            <div class="padL2 padR2 padT1 lineAddressBox">
                <div class=" lineCircle">
                    <p class="lineCircleS"></p>
                    <p class="lineCircleLine"></p>
                    <p class="lineCircleE"></p>
                </div>
                <div class="lineAddress FontS11">
                    <p class="borderB" @click="departure()">{{startText}}</p>
                    <p @click="destination()">{{endText}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import AMap from 'AMap'
  export default {
    name: 'HelloWorld',
    data () {
      let _this = this;
      return {
        msg: 'hello',
        openCityName:'拉萨市',
        startText:'请输入起点',
        endText:'您要去哪儿',
        userId:'',
      }
    },
    mounted () {

      this.init();

      if (this.$route.query.startText) {  //起点 从下一级页面传上来的

        this.startText = this.$route.query.startText;
      }
      if (this.$route.query.endText) {  //终点  从下一级页面传上来的

        this.endText = this.$route.query.endText;
      }
      if(this.$route.query.openCityName){

        this.openCityName = this.$route.query.openCityName;
      }

    },
    methods: {
      //地图
      init: function () {
        let _this=this;
        let map = new AMap.Map('container', {
          center: [104.07 ,30.67],//地图中心点
          resizeEnable: true,
          zoom: 18,
          mapStyle:'amap://styles/74cdd415a9bcfa5ae2e11eb30b2867ec'
          // lang: 'ch'  //设置地图语言
        });
        map.plugin(['AMap.Geolocation'], function() {

          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            showMarker:true,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'LB',

            /*markerOptions:{//自定义定位点样式，同Marker的Options
                'offset': new AMap.Pixel(-18, -36),
                content:'<img src="../../static/mylocation_icon.png" style="width:2rem;"/>'
            },*/
            showCircle:true,
            extensions:'all',
            panToLocation:true   //定位成功后，是否把定位得到的坐标设置为地图中心点坐标
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete);
          AMap.event.addListener(geolocation, 'error', onError);
          //
          function onComplete (data) {
            // data是具体的定位信息
            if(data.status == 1){
              console.log("定位成功");
              _this.center=[data.position.M,data.position.O];
              _this.openCityName = data.addressComponent.city;  //当前城市

              sessionStorage.setItem("dingWei-lng",data.position.getLng());
              sessionStorage.setItem("dingWei-lat",data.position.getLat());
              //posi数组排序
              function compare(property){
                return function(a,b){
                  var value1 = a[property];
                  var value2 = b[property];
                  return value1 - value2;
                }
              }

              var poisArr = {};
              poisArr.posi = data.pois.sort(compare('distance'));
              // _this.startText =poisArr.posi[0].name;  //定位当前地址*/

              if(_this.startText == '请输入起点'){
                _this.startText =poisArr.posi[0].name;  //定位当前地址*/

              }
            }
            var str = [];
            str.push('经度：' + data.position.getLng());
            str.push('纬度：' + data.position.getLat());
            str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
            console.log(str.join('<br>'));

          }

          //
          function onError (data) {
            // 定位出错
            console.log(data);
          }
        })
      },
      //出发地点击
      departure:function(){
        if(this.openCityName != ''){
          this.$router.push({path:'/publiccar/departure',query:{openCityName:this.openCityName,startText:this.startText,endText:this.endText}});
        }else {
          console.log("正在定位中……")
        }

      },
      //终点
      destination(){
        if(this.openCityName != ''){
            this.$router.push({path:'/publiccar/destination',query:{openCityName:this.openCityName,startText:this.startText,endText:this.endText}});
        }else {
          console.log("正在定位中……")
        }
      },

    },

    created:function () {
        //判断是否登录
        var param = this.GetRequest();
        let token  = '';
        if(param.token){
            token  = param.token;
            this.$server.get(this.webviewUrl+'api/comm/check-token?token='+token,null,null,'just').then((res) => {
                if(res.code == 200){
                    localStorage.setItem("token",token);
                    return
                }else {
                    token  = localStorage.getItem("token");
                }
            });
        }else {
            token  = localStorage.getItem("token");
        }
    }
  }
</script>
<style scoped>
    .indexPage{
        height: 100%;
    }
    #container{
        height: 100%;
        position: relative;
        z-index: 2;

    }

    /*隐藏高德logo*/
    #app .amap-copyright, #app .amap-logo{display: none !important}

    /*起点终点*/
    .lineAddressBox{display:flex;flex-flow:row; background: #ffffff;box-shadow: 0px 10px 10px #eeeeee;border-radius: 0 0 5px 5px; }
    .lineCircle{width: 1rem; padding-top: 1.3rem; margin-right: 1rem;}
    .lineCircleS,.lineCircleE{width: 1rem;height: 1rem;background: #44a0fe;display: inline-block;border-radius: 0.5rem;}
    .lineCircleE{background: #26c58d}
    .lineCircleLine{width: 1px;height: 33px;border-left: 1px dotted #dddddd;margin-left: 0.4rem;margin-top: 0.1rem;margin-bottom: 0.2rem;}

    .lineAddessP{position: fixed;bottom: 0;width: 100%; z-index: 3; }
    .lineAddressBox{box-shadow: none;border-radius:10px;background: rgba(255,255,255,0.95);padding-bottom: 1rem;}

    .lineAddress{flex:1;width: 95%;}
    .lineAddress p{height: 4rem;line-height: 4rem;color: #666666;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
    .lineAddress p a{width: 100%;display: inline-block;}
    .lineAddress p input{color: #555555;}


</style>
