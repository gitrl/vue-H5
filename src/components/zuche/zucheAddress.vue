<template>
    <!--热门区域 E-->
    <div class="addressRecord searchTips padL2 padR2">
        <ul>
            <li v-for="(item,index) in searchData" :key="index" @click="checkAddress(item)">
                <img src="../../assets/images/airPort/icon/navigation_icon.png" class="fl">
                <div class="navigation_Text fl">
                    <h3>{{item.name}}</h3>
                    <p>{{item.address}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  import AMap from 'AMap';
  export default {
    name: 'zucheAddress',
    props:['typeInit','cityAddress','cityName','cityCode'],
    data:function(){
      return {
        searchData:[],
        isShow2:false,
      }
    },
    mounted(){

    },
    watch:{
        cityAddress:function (val) {
            if(this._props.cityName==''){  //判断初始化的时候，城市名是否为空，如果为空，就先让选择城市
              this.$vux.toast.show({ //提示
                text: "请先选择城市",
                type:'text',
                width:'50%',
              })
            }else {
              this.init();
            }
        }
    },
    methods:{
      //地图
      init: function () {
        let _this=this;
        var map = new AMap.Map("container", {
          center: [116.397428, 39.90923],
          resizeEnable: true,
          zoom: 16,
        });

        AMap.plugin('AMap.Autocomplete', function(){
          // 实例化Autocomplete
          var autoOptions = {
            //city 限定城市，默认全国
            city: _this._props.cityCode,
            citylimit: true,
          };
          var autoComplete= new AMap.Autocomplete(autoOptions);
          autoComplete.search(_this._props.cityAddress, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
            _this.searchData = [];
            if(result.info == 'OK'){
              _this.searchData = result.tips;
              console.log( _this.searchData);
            }
          })
        })
      },
      checkAddress(item){ //选择地址
          let _this = this;
          let selectPoi =item;  //获取poi地址
          let addressA = selectPoi.address;
          if(addressA == '' || addressA.length == 0 || selectPoi.location=='' || addressA == []){
              this.$vux.toast.show({ //提示
                  text: "请输入具体地址",
                  type:'text',
                  width:'50%',
              });
              return
          }
        // childMapName
        // 第二个参数cityName是需要传的值
        this.$emit('childMapName', item)
      }
    },
    created(){
      //console.log(this._props.typeInit)
    }
  }
</script>

<style scoped>
    /*历史记录*/
    .addressRecord{ overflow-y: auto; margin-top: 1rem;}
    .addressRecord ul li{width: 100%;padding-bottom: 1rem;display:flex;flex-flow:row;  justify-content:center;}
    .addressRecord ul li img{height: 1.5rem;padding-top: 0.5rem;}
    .addressRecord ul li .navigation_Text{flex:1;margin-left: 0.5rem; }
    .addressRecord ul li h3{font-size: 1.1rem;color: #666666}
    .addressRecord ul li p{font-size: 1rem;color: #AAAAAA;line-height: 2rem;}

</style>
