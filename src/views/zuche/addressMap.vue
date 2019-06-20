<template>
    <div id="container"></div>
</template>

<script>
  import AMap from 'AMap';
  export default {
    name: 'addressMap',
    data:function(){
      return {
        infoArr:[],  //接收上一级传过来的数据
      }
    },
    mounted(){
        let info =  this.$route.query.Location;
        this.infoArr = info.split(",");
        this.init(this.infoArr);
    },
    methods:{
      init(lngLat){
        // 创建地图实例
        let _this = this;
        var map = new AMap.Map("container", {
          zoom: 13,
          center: [lngLat[0],lngLat[1]],
          resizeEnable: true,
          mapStyle:'amap://styles/74cdd415a9bcfa5ae2e11eb30b2867ec'
        });

        // 创建一个 Icon
        var startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(25, 35),
          // 图标的取图地址
          image: require('../../assets/images/zuche/icon/dw_icon.png'),
          // 图标所用图片大小
          imageSize: new AMap.Size(25, 35),
          // 图标取图偏移量
          imageOffset: new AMap.Pixel(0, 0)
        });

        // 将 icon 传入 marker
        var startMarker = new AMap.Marker({
          position: new AMap.LngLat(lngLat[0],lngLat[1]),
          icon: startIcon,
          offset: new AMap.Pixel(-13, -30)
        });

        // 将 markers 添加到地图
        map.add([startMarker]);
      }
    },
    created:function () {

    }
  }
</script>

<style scoped>
    #container{height: 100%}
</style>
