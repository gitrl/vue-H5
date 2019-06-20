<template>
    <div class="">
        <!--热门城市--->
        <section class="hotBox pad1">
            <h3 class="FontS12 padTD5 padL1">热门城市</h3>
            <ul class="hotList">
                <li @click="hotCheck(item,index,0)" :class="{active:isHot&&isHCheck == index}" v-for="(item,index) in hotList" :key="index"><span>{{item.name}}</span></li>
            </ul>
        </section>
        <!--城市列表-->
        <ul class="cityListBox">
            <li class="cityItem" v-for="(item,index) in typeList" :key="index">
                <h4 class="title" :id="item.pyHead">{{item.pyHead}}</h4>
                <ul class="cityList">
                    <li :class="{current:isCity&&isCityCheck==item[i]}" v-for="(k,i) in item.cityList" @click="hotCheck(k,i,1)" :key="i">{{k.name}}</li>
                </ul>
            </li>
        </ul>
        <!--定位当前城市 S-->
        <!--定位当前城市 E-->
    </div>
</template>

<script>
  export default {
    name: 'cityList',
    props:['typeInit','cityAddress','cityName'],
    data:function () {
      return {
        hotList:['成都','拉萨','重庆','昆明','西宁'],
        cityListData:[],
        typeList:[],
        isHCheck:null,
        isHot:false,
        isCityCheck:0,
        isCity:false
      }
    },
    methods:{
        hotCheck(item,index,num){
            if(num==0){
                this.isHot = true;
               // this.isHCheck = index;
                this.isCity = false;
            }else{
                this.isCity = true;
                this.isCityCheck = index;
                this.isHot = false;

            }
            this.$emit('childCityName', item);
        },
        hotCity(){
            let headersObj = {'x-access-token':''};
            this.$server.get(this.zucheROOT+"app/v1.0/area/queryHotCity",null,headersObj).then(res =>{
              this.hotList=res.data;
            })
        },

        //城市列表
        cityList(){
            //let headersObj = {'content-type': 'application/json'};
            this.$server.get(this.zucheROOT+"app/v1.0/area/queryCity",null,null).then(res =>{
                console.log(res)
                if(res.code == 200){
                   //console.log(res.data);

                    //重组数组
                    var band = res.data;
                    var bfirstletter = 'A';
                    var typeList = [];
                    var typeData = [];
                    var typeItem = {
                        pyHead: '',
                        cityList: []
                    };
                    typeList.push(typeItem);

                    var cBand = band.sort(this.compare('pinyin'));  //根据数据里的某一属性进行排序
                    console.log(cBand)

                    for(var i = 0;i<cBand.length;i++) {
                        cBand[i].pyHead = cBand[i].pinyin.substr(0, 1);
                        var item = cBand[i];
                        if (bfirstletter != item.pyHead) {
                            bfirstletter = item.pyHead;
                            typeItem = {
                                pyHead: item.pyHead,
                                cityList: []
                            };
                            typeList.push(typeItem);
                        }
                        var city = {};
                        city["name"] = item.name;
                        city["areaType"] = item.areaType;
                        city["code"] = item.code;
                        city["createTime"] = item.createTime;
                        city["isSpecial"] = item.isSpecial;
                        city["lat"] = item.lat;
                        city["lng"] = item.lng;
                        city["pinyin"] = item.pinyin;
                        city["realAreaType"] = item.realAreaType;
                        city["sortCode"] = item.sortCode;
                        typeItem.cityList.push(city);
                    }
                    this.typeList = typeList;
                    console.log(typeList);
                }
            });
        },
    },
    created(){
      this.hotCity();
      this.cityList();
    }
  }
</script>

<style scoped>
    /*热门城市*/
    .hotList{display: flex;flex-wrap: wrap;padding-bottom: 1rem;background-color: white;padding-right: 1rem;}
    .hotList li{margin-top: 1rem; margin-left: 0.5rem;margin-right: 0.5rem;display: inline-block;margin-bottom: 0.5rem;}
    .hotList li span{border: 1px solid #EFEFEF;border-radius: 1.5rem;font-size: 1.2rem;width: 83%; padding-top: 0.3rem;padding-bottom: 0.3rem; padding-left: 1.2rem;padding-right: 1.2rem;}
    .hotList li.active span{border: 1px solid #407FFD; color: #407FFD}

    .hotBox{padding-left: 1rem;padding-right: 1rem;}
    .hotBox h3{color: #333333}
    .cityListBox .cityItem .cityList li,.cityList li{height: 4rem;line-height: 4rem;padding: 0 2rem;border-bottom: 1px solid #F3F3F3;font-size: 1.2rem;}
    .cityListBox .cityItem .title{padding: 0.5rem;padding-left: 2rem;font-size:1.3rem;color: #407FFD;background:#FAFAFA;font-weight: normal;}
    .cityList li.current{color:#407FFD }
</style>
