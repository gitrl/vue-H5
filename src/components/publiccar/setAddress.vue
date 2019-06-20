<template>
    <div class="setAddress">
        <div class="homeAddress padL2 padR2 FontS11 clearfix">
            <div class="setAddressBox" @click="addressCheck(family)">
                <img src="../../assets/images/publiccar/icon/icon_home_icon.png">
                <span class="FontS12 orderColor5">家</span><span class="orderColor3 padL1">{{family}}</span>
            </div>
            <div class="setAddress"  @click="setAddressC('family')">{{setAddressText1}}</div>
        </div>
        <div class="companyAddress padL2 padR2 FontS11 clearfix padB2">
            <div class="setAddressBox" @click="addressCheck(company)">
                <img src="../../assets/images/publiccar/icon/icon_company_icon.png">
                <span class="FontS12 orderColor5">公司</span><span class="orderColor3 padL1">{{company}}</span>
            </div>
            <div class="setAddress" @click="setAddressC('company')">{{setAddressText2}}</div>
        </div>
        <!--登录 S-->
        <isLogin :isLogin="isLogin" ></isLogin>
        <!--登录 E-->
    </div>
</template>

<script>
    var qs = require('qs');
    import isLogin from  '@/views/comm/loginGuide.vue';  //登录组件
    export default {
        name: "setAddress",
        props:['familyAdd','target'],
        components:{
            isLogin
        },
        data:function () {
            return {
                family:'',
                company:'',
                setAddressText1:'设置地址',
                setAddressText2:'设置地址',
                startText:'',
                endText:'',
                type:'',
                addressType:1,
                userId:'',
                token:'',

                //登录组件
                isLogin:false,
            }
        },

        mounted:function () {

        },
        methods:{
            //点击设置地址或者修改地址触发（调用父组件的方法）
            setAddressC(where) {
                this.$emit('setAddress',where);
                this.type = where;
                if(this.type =='company'){
                    this.company = this._props.familyAdd.name;
                    this.addressType=2;
                }
                else if(this.type =='family') {
                    this.family = this._props.familyAdd.name;
                    this.addressType=1;
                }
                else {
                    this.addressType=3;
                }
            },
            commonAddress(userId){ //获取用户的常用地址
                this.$server.get(this.baseURL+'usercenter-passengers/v1.0/addressinfo/getaddress-bymap',
                    {
                        userid:userId
                    },
                    null
                ).then(res =>{
                    if(res.code == 200){
                        let _this=this;
                        console.log(res);
                        for(let i=0 ;i<res.data.length;i++){
                            if(res.data[i].addressType==1){
                                _this.family = res.data[i].addressName;
                                _this.setAddressText1 = "修改地址";
                            }
                            else {
                                _this.company = res.data[i].addressName;
                                _this.setAddressText2 = "修改地址";
                            }
                        }
                    }else {
                        this.$vux.toast.show({
                            text:res.msg,
                            type:'text',
                            width:'80%'
                        })
                    }

                });
            },

            //点击家或者公司跳转
            addressCheck(index){
                if(index !='设置家地址' && index != '设置公司地址'){
                    if(this._props.target == 'endText'){
                        this.endText = index;
                        console.log(this._props.familyAdd.openCityName);
                        //通过query返传级index页面
                        this.$router.push({path: 'lineplan',query:{startText:this._props.familyAdd.startText,endText:this.endText,openCityName:this._props.familyAdd.openCityName,userId:this.userId}});
                    }
                    else if(this._props.target == 'startText'){
                        this.startText = index;
                        this.$router.push({path: 'lineplan',query:{startText:this.startText,endText:this._props.familyAdd.endText,openCityName:this._props.familyAdd.openCityName,userId:this.userId}});
                    }
                }else {
                   // alert(index)
                }

            },
            //保存设置的地址
            getAddress(val){
                let _this = this;

                let data={
                    addressDetail: val.addressDetail,
                    addressLabel: "",
                    addressName:val.addressName,
                    addressType:val.addressType,
                    latitude: val.latitude,
                    longitude: val.longitude,
                    userId:this.userId,
                };

                let headerobj = {'x-access-token':this.token};

                this.$server.post(this.baseURL+'usercenter-passengers/app/v1.0/addressinfo/update-bymap',data,headerobj).then(res =>{
                  if(res.code == 200){
                      if(this.type =='company'){
                          this.company = this._props.familyAdd.name;
                          this.addressType=2;
                      }
                      else if(this.type =='family') {
                          this.family = this._props.familyAdd.name;
                          this.addressType=1;
                      }
                      else {
                          this.addressType=3;
                      }
                  }else if(res.code==10000){
                      this.$vux.toast.show({  //提示
                          text: res.msg,
                          type:'text',
                          width:'80%',
                      });
                      setTimeout(function () {
                          _this.$vux.toast.hide();
                          _this.isLogin = true;
                      },1000)
                  }else {
                      this.commonAddress(this.userId);  ////获取用户的常用地址
                      this.$vux.toast.show({
                          text:res.msg,
                          type:'text',
                          width:'80%'
                      })
                  }
                })
            },
            //根据token拿userId
            setUserId(token){
                let headerobj = {'x-access-token':token};
                this.$server.get(this.baseURL + 'usercenter-passengers/v1.0/passport/getpassportbytoken?token='+token,null,headerobj).then(res =>{
                    if(res.code == 200){
                        this.userId = res.userId;
                        this.commonAddress(this.userId);  ////获取用户的常用地址
                    }else {
                        this.$vux.toast.show({
                            text:res.msg,
                            type:'text',
                            width:'80%'
                        })
                    }

                })
            }

        },
        watch:{
            //监听设置地址后数据变化
            familyAdd(val){
                let _this = this;

                let data={
                    addressName:val.name,
                    addressId:val.id,
                    userId:this.userId,
                    addressDetail:val.address,
                    latitude:val.location.lat,
                    longitude:val.location.lng,
                    addressType:this.addressType
                };
                this.getAddress(data);
            }
        },
        created:function () {
            this.token = localStorage.getItem("token");
            this.setUserId(this.token);

            if(this.family == ''){
                this.setAddressText1 ='设置地址';
                this.family ='设置家地址'
            }else {
                this.setAddressText1 ='修改地址'
            }
            if(this.company == ''){
                this.setAddressText2 ='设置地址';
                this.company ='设置公司地址'
            }else {
                this.setAddressText2 ='修改地址'
            }
        }
    }
</script>

<style scoped>
    .homeAddress,.companyAddress{display: flex;}
    .setAddressBox{flex: 1;}

    .addressScroll{overflow-y: auto}
    .companyAddress,.homeAddress{padding-top: 1.5rem;}
    .homeAddress img{width: 1.5rem;vertical-align: middle;margin-right: 0.5rem;margin-top: -0.3rem}
    .companyAddress img{width: 1.5rem;vertical-align: middle;margin-right: 0.5rem;margin-top: -0.3rem}
    .setAddress{color: #407FFD}
</style>
