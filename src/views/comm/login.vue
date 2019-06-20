<template>
<div id="login">
    <div class="pad2">
        <h2 class="bigTitle orderColor4">登录</h2>
        <p class="FontS12 lineH2D5 orderColor5">欢迎来到牦牛出行</p>
    </div>
    <div class="pad2">
        <div class="borderB padT2">
            <input type="text"  v-model="Iphone" placeholder="请输入手机号" class="loginInput" maxlength="11"/>
        </div>
        <div class="flex padT1">
            <div class="borderB flexC">
                <input type="text" placeholder="请输入验证码" v-model="getCodeNum" class="loginInput" maxlength="11"/>
            </div>
            <div class="FontS12 padT2 TextR sendCode">
                <span class="orderColor2" v-show="!isCount" @click="sendCode(Iphone)">发送验证码</span>
                <span class="orderColor3" v-show="isCount">{{count}}s后重新获取</span>
            </div>
        </div>
        <div class="loginBtn" :class="{current:isCurrent}" @click="goLogin()">登录</div>
        <p class="FontS11 TextC orderColor3 padT1 lineH2D5">点击登录表示您已阅读并同意<span class="orderColor2" @click="goUserRule()">《牦牛出行用户条款》</span></p>
    </div>
    <div class="dp-mask" @click="dpMask"  :class="{current:isCode}"></div>
    <div class="validateFront" v-show="isCode">
        <div class="validateFrontBox">
            <div class="bgcolorW pad1">
                <div class="flex"><input v-model="validateNum"  class="validateNum" placeholder="请输入验证码"/><span class="FontS13 yzcodeNum" style="letter-spacing: 10px;"><i>{{yzcodeNum}}</i></span></div>
                <div class="sureBtn"  @click="validateFront()">确定</div>
            </div>
        </div>
    </div>
    <div class="Loading" v-if="Loading"><img src="../../assets/images/Loading.gif"> </div>
</div>
</template>

<script>
    export default {
        name: "login",
        data:function () {
            return {
                Iphone:'',  //手机号码
                getCodeNum:"",  //填写的验证
                codeNum:"",  //如果取到的验证码
                count: '',  //倒计时
                isCount:false,  //倒计时是否显示
                timer: null,
                isCurrent:false,
                yzcodeNum:'YHVN',//图形验证码
                validateNum:'',
                isCode:false,
                from:'',
                isOrder:'',
                isTab:'',
                Loading:false,  //加载动画
                start:''
            }
        },
        methods:{
            dpMask(){
                this.isCode = false;
            },
            sendCode(value){  //发送验证码
                if(value == ""){//验证是否是手机号码
                    this.$vux.toast.show({
                        text:'请输入手机号码',
                        type:'text',
                        width:'80%',
                    });
                }else if (value && (!(/^[1][0123456789]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
                    this.$vux.toast.show({
                        text:'手机号码不符合规范',
                        type:'text',
                        width:'80%',
                    });
                } else {
                    let parms = {
                        Iphone:value
                    };
                    this.$server.post(this.webviewUrl+'api/comm/get-code',parms,null,"just").then(res =>{
                        if(res.code == 200){
                            if(res.data.code==''&&res.data.frontValidate==false){
                                this.$vux.toast.show({
                                    text:'验证码已发送',
                                    type:'text',
                                    width:'50%',
                                });
                                this.codeNum = '1234';
                                //倒计时60s
                                const TIME_COUNT = 60;
                                if (!this.timer) {
                                    this.count = TIME_COUNT;
                                    this.isCount =!this.isCount;
                                    this.timer = setInterval(() => {
                                        if (this.count > 0 && this.count <= TIME_COUNT) {
                                            this.count--;
                                        } else {
                                            this.isCount =!this.isCount;
                                            clearInterval(this.timer);
                                            this.timer = null;
                                        }
                                    }, 1000)
                                }
                            }else {
                                this.validateNum = '';
                                this.yzcodeNum =res.data.code;
                                this.isCode= true;
                            }

                        }else {
                            this.$vux.toast.show({
                                text:res.msg,
                                type:'text',
                                width:'80%',
                            });
                        }

                    });
                }
            },
            validateFront(){  //图形验证码
                if(this.validateNum.toUpperCase() == this.yzcodeNum || this.validateNum == this.yzcodeNum){

                    this.$server.get(this.webviewUrl+'api/comm/validate-code?Iphone='+this.Iphone+'&code='+this.yzcodeNum,null,null,"just").then(res =>{
                        if(res.code == 200){
                            this.isCode= false;
                            this.$vux.toast.show({
                                text:'验证码已发送',
                                type:'text',
                                width:'50%',
                            });
                            //倒计时60s
                            const TIME_COUNT = 60;
                            if (!this.timer) {
                                this.count = TIME_COUNT;
                                this.isCount =!this.isCount;
                                this.timer = setInterval(() => {
                                    if (this.count > 0 && this.count <= TIME_COUNT) {
                                        this.count--;
                                    } else {
                                        this.isCount =!this.isCount;
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }
                                }, 1000)
                            }

                            if(res.data.code==''){
                                this.codeNum = '1234';
                                return
                            }
                            this.codeNum = res.data.code;

                        }else {
                            this.$vux.toast.show({
                                text:res.msg,
                                type:'text',
                                width:'50%',
                            });
                        }

                    })
                }else {
                    this.$vux.toast.show({
                        text:'请输入正确的验证码',
                        type:'text',
                        width:'50%',
                    });
                }
            },
            goLogin(){  //去登录
                //验证是否是手机号码
                if(this.Iphone == ""){
                    this.$vux.toast.show({
                        text:'请输入手机号码',
                        type:'text',
                        width:'80%',
                    });
                }else if (this.Iphone && (!(/^[1][0123456789]\d{9}$/).test(this.Iphone) || !(/^[1-9]\d*$/).test(this.Iphone) || this.Iphone.length !== 11)) {
                    this.$vux.toast.show({
                        text:'手机号码不符合规范',
                        type:'text',
                        width:'80%',
                    });
                }else if(this.getCodeNum == ""){
                    this.$vux.toast.show({
                        text:'验证码不能为空',
                        type:'text',
                        width:'80%',
                    });
                }else if(this.getCodeNum.length == '4'){  //验证正确
                    var _this = this;
                    _this.Loading = true;

                    let parms = {
                        Iphone:this.Iphone,
                        code:this.getCodeNum,
                    };
                    this.$server.post(this.webviewUrl+'api/comm/login',parms,null,"just").then((res) => {
                        if(res.code == 200){

                            localStorage.removeItem("token");  //先清除token
                            sessionStorage.removeItem('loginIphone');
                            sessionStorage.removeItem('loginCode');

                            //把登录后的token存到本地
                            localStorage.setItem("token", res.data.token);
                            sessionStorage.setItem("token", res.data.token);

                            setTimeout(function () {
                                _this.Loading = false;
                                _this.$vux.toast.hide();
                                sessionStorage.removeItem('loginIphone');
                                sessionStorage.removeItem('loginCode');
                                _this.$router.go(-1);//返回上一层
                            },2000);


                            // 判断宿主环境在那里（app,小程序）
                            if(_this.$local != undefined){
                                if(_this.$local.env =='app'){
                                    //把登录信息传给原生app
                                    let appLoginInfo = res.data;
                                    appLoginInfo.from = _this.from;
                                    _this.loginToken(appLoginInfo);
                                }
                            }

                            //判断是否在小程序环境里
                            wx.miniProgram.getEnv(function(data) {
                                if(data.miniprogram){
                                    wx.miniProgram.postMessage({ data: {token: res.data.token}});
                                    if(_this.isOrder == 'true'){  //判断是否从订单列表过来
                                        wx.miniProgram.reLaunch({ url: '/pages/orderList/orderList?isTab='+_this.isTab+'&token='+ res.data.token});
                                    }
                                }
                            });


                        }else {
                            this.$vux.toast.show({  //提示
                                text: res.msg,
                                type:'text',
                                width:'80%'
                            });
                            _this.Loading = false;
                        }
                    })
                }else{ //输入的验证码不正确
                    this.TextMsg = "请输入正确验证码";
                    this.isShow =!this.isShow;
                }
            },
            goUserRule(){  //用户协议
                sessionStorage.setItem('loginIphone',this.Iphone);
                sessionStorage.setItem('loginCode',this.getCodeNum);
                this.$router.push({path:'/passenger/userRule',query:{from:this.from}})
            },
        },
        watch:{ // 实时检测输入的验证码是否正确,点击领取优惠券
            getCodeNum(){ //实时监听index的变化
                if(this.getCodeNum.length == '4'){
                    this.isCurrent = true;
                }else {
                    this.isCurrent = false;
                }
            }
        },
        created(){
            this.from = this.$route.query.from;
            this.isOrder = this.$route.query.isOrder;
            this.isTab = this.$route.query.isTab;

            if(sessionStorage.getItem('loginIphone')){
                this.Iphone = sessionStorage.getItem('loginIphone');
                this.getCodeNum = sessionStorage.getItem('loginCode');
            }
        }
    }
</script>

<style scoped>
    #login{height: 100%;background: #ffffff;}
    .loginInput{font-size: 1.3rem; padding-left:0.5rem;padding-top: 1rem;padding-bottom: 1rem;width: 90%;outline: none;color: #333333; }
    .sendCode{width: 9rem;}
    .loginBtn{background:#D6D6D6;margin-top: 4rem;box-shadow:0 0 10px rgba(102,111,125,.2);letter-spacing:2px;height: 4rem;border-radius: 2rem;line-height: 4rem;font-size: 1.5rem;text-align: center;color: #ffffff;}
    .loginBtn.current{background: linear-gradient(90deg,#407FFD, #44A0FE);}
    .dp-mask{position: fixed;width: 100%;height: 0;left: 0;top: 0;opacity: 0;-webkit-transition: opacity 0.2s ease-in;transition: opacity 0.2s ease-in;background-color: #000;z-index: 2;}
    .dp-mask.current{height:100%;display: block; opacity: 0.5;}
    .validateFront{position: absolute; z-index: 3; top: 35%;left: 0; width:100%;height: 10rem; }
    .validateFrontBox{ height: 100%; display: flex;justify-content: center;align-items: center; padding: 1rem;flex-direction: column;}
    .validateFront input{border: 1px solid #D6D6D6;outline: none;padding-left: 1rem;}
    .validateFront span{background: #80828D;color: #ffffff;padding: 1rem;}
    .sureBtn{background: linear-gradient(90deg,#407FFD, #44A0FE);box-shadow:0 0 10px rgba(102,111,125,.2);letter-spacing:2px;height: 3.5rem;border-radius: 2rem;line-height: 3.5rem;font-size: 1.5rem;text-align: center;color: #ffffff; margin-top: 2rem;}

    .validateNum{width: 10rem; font-size: 1.2rem}
    .yzcodeNum i{transform: rotate(-2deg);display: inline-block}
    .Loading{position: absolute;width: 100%;height: 100%;top: 0;left: 0;display: flex;justify-content: center;align-items: center; margin-top: -30%;z-index: 3;}
</style>
