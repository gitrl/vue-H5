export default {
    install(Vue, options) {

        //判断设备ios/Android
        Vue.prototype.Device = {
            getMobileOperatingSystem: function () {
                var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
                    return 'iOS';
                }
                else {
                    return 'Android';
                }
            }
        };

        //H5页面判断是否有网络
        Vue.prototype.onLine = function () {

        };

        //百度统计
        Vue.prototype.baiduS = function(arr){
            let origin = location.origin;
            if(origin == 'https://chuxing.maoniuchuxing.com' ){
                _hmt.push(arr);
            }
        };

        Vue.prototype.baseRoot = function () {   //同一套代码，根据url不同，链接不同的接口
            let that = Vue.prototype;
            let origin = location.origin;
            if (origin == 'http://192.168.1.141:8300') {  //本地

                that.baseURL = "http://192.168.1.237:8899/";  //网约车客户端
                that.commonURL = "http://192.168.1.139:8999/";  //App下载地址
                that.AirROOT = "http://192.168.1.221:21000/";  //机场接送接口地址
                that.zucheROOT = 'http://192.168.1.232:19411/';  //租车接口地址
                that.expressROOT = 'http://192.168.1.242:19811/';  //直通车接口地址
                that.webviewUrl = 'http://192.168.1.141:8300/';   //app跳外链的地址
                // that.webviewUrl = 'http://192.168.1.223:1452/';   //app跳外链的地址

            } else if (origin == 'http://192.168.1.223:1452') {  //测试

                that.baseURL = "http://192.168.1.237:8899/";  //网约车客户端
                that.commonURL = "http://192.168.1.139:8999/";  //App下载地址
                that.AirROOT = "http://192.168.1.221:21000/";  //机场接送接口地址
                that.zucheROOT = 'http://192.168.1.232:19411/';  //租车接口地址
                that.expressROOT = 'http://192.168.1.242:19811/';  //直通车接口地址
                that.webviewUrl = 'http://192.168.1.223:1452/';   //app跳外链的地址

            } else if (origin == 'http://h5.maoniuchuxing.com') {  //预发布

                that.baseURL = "http://111.231.212.28/";  //网约车客户端
                that.commonURL = "http://111.231.211.112:8999/";  //App下载地址
                that.AirROOT = "http://111.231.211.53:21000/";  //机场接送接口地址
                that.zucheROOT = 'http://111.231.212.114/';  //租车接口地址
                that.expressROOT = 'http://111.231.211.224/';  //直通车接口地址
                that.webviewUrl = 'http://h5.maoniuchuxing.com/';   //app跳外链的地址

            } else {  //正式环境

                that.baseURL = "https://butterfly.maoniuchuxing.com/";  //网约车客户端
                that.commonURL = "https://common.maoniuchuxing.com/";  //App下载地址
                that.AirROOT = "https://hades-airport.maoniuchuxing.com/";  //机场接送接口地址
                that.zucheROOT = 'https://zuche-sup-app.maoniuchuxing.com/';  //租车接口地址
                that.expressROOT = 'https://scenicbus-app.maoniuchuxing.com/';  //直通车接口地址
                that.webviewUrl = 'https://chuxing.maoniuchuxing.com/';   //app跳外链的地址

            }

        };

        // //微信初始化
        // Vue.prototype.initWx = function(){
        //     if(typeof Vue.prototype.$local.env != "undefined"){
        //         if(Vue.prototype.$local.env == "weixin"){
        //             //获取openid和相关信息
        //             this.$server.get(this.AirROOT + 'app/v1.0/order/notPay/', null, null).then(res => {
        //                 wx.config({
        //                     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //                     appId: '', // 必填，公众号的唯一标识
        //                     timestamp: , // 必填，生成签名的时间戳
        //                     nonceStr: '', // 必填，生成签名的随机串
        //                     signature: '',// 必填，签名
        //                     jsApiList: [] // 必填，需要使用的JS接口列表
        //                 });
        //             })
        //         }
        //     }
        // }

        //原生登录过后把token传给H5的获取方法
        Vue.prototype.setToken = function (str) {  //str表示后台登录传过来的字符串
            localStorage.removeItem("token");  //先清除token
            setTimeout(function () {
                //写进token
                localStorage.setItem("token", str);
                sessionStorage.setItem("token", str);
                location.reload();  //刷新当前页面
            }, 500)
        };

        //H5登录后传给原生的信息
        Vue.prototype.loginToken = function (obj) {
            if (this.Device.getMobileOperatingSystem() == 'Android') {
                //Android
                window.just_android.appRefreshToken(JSON.stringify(obj));
            }
            else {
                // ios
                window.webkit.messageHandlers.appRefreshToken.postMessage(JSON.stringify(obj));
            }
        };

        //通过数组里的某一项进行排序
        Vue.prototype.compare = function (property) {  
            return function (obj1, obj2) {
                var val1 = obj1[property];
                var val2 = obj2[property];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        };

        //对象数组的去重
        Vue.prototype.uniqObjInArray = function (objarray) {
            let len = objarray.length;
            let tempJson = {};
            let res = [];
            for (let i = 0; i < len; i++) {
                //取出每一个对象
                tempJson[JSON.stringify(objarray[i])] = true;
            }
            console.log("tempJson is ", tempJson);
            let keyItems = Object.keys(tempJson);
            for (let j = 0; j < keyItems.length; j++) {
                res.push(JSON.parse(keyItems[j]));
            }
            return res;
        };

        Vue.prototype.getToken = localStorage.getItem("token");  //租车存在本地的地址

        //监听浏览器返回
        Vue.prototype.goHistory = function (method) {
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', method, false);
            }
        };

        //当前日期加几天/减几天
        Vue.prototype.getAfterDayDate = function (d, n) {
            // let d = new Date();
            // let n = 1;
            var year = d.getFullYear();
            var mon = d.getMonth() + 1;
            var day = d.getDate();

            if (day <= n) {
                if (mon > 1) {
                    mon = mon - 1;
                }
                else {
                    year = year - 1;
                    mon = 12;
                }
            }
            d.setDate(d.getDate() + n);
            year = d.getFullYear();
            mon = d.getMonth() + 1;
            day = d.getDate();

            let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
            return s;
        };

        //日期时间补0
        Vue.prototype.num = function (s) {
            return s < 10 ? '0' + s : s;
        };

        //根据时间判断星期几
        Vue.prototype.getWeek = function (timedat) {  //timedat参数格式：   getWeek（new Date("2017-10-27" )）
            var week;
            if (timedat.getDay() == 0) week = "周日";
            if (timedat.getDay() == 1) week = "周一";

            if (timedat.getDay() == 2) week = "周二";

            if (timedat.getDay() == 3) week = "周三";

            if (timedat.getDay() == 4) week = "周四";

            if (timedat.getDay() == 5) week = "周五";

            if (timedat.getDay() == 6) week = "周六";
            return week;
        };

        //日期格式转化成时间戳
        Vue.prototype.getTimestamp = function (date) {
            new Date(date.replace(/-/g, '/')).getTime();
        };

        //时间戳转化成日期格式
        Vue.prototype.format = function (timeDate) {
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(timeDate);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + '-' + this.num(m) + '-' + this.num(d) + ' ' + this.num(h) + ':' + this.num(mm) + ':' + this.num(s);
        };

        //除法精确运算
        Vue.prototype.numDiv = function (arg1, arg2) {
            var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
            m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
            resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
            return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
        };

        //乘法精确运算
        Vue.prototype.numMulti = function (num1, num2) {
            var baseNum = 0;
            try {
                baseNum += num1.toString().split(".")[1].length;
            } catch (e) {
            }
            try {
                baseNum += num2.toString().split(".")[1].length;
            } catch (e) {
            }
            return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
        };

        //30分钟倒计时
        Vue.prototype.countDown = function (createTime, i) {  //数组定时器
            var that = this;
            //1800=30*60 当前时间减去系统时间除以1000 就是指用掉的时间是多少秒
            let startTime = Math.floor(1800 - ((new Date().getTime() - createTime) / 1000));
            let thisItv = setInterval(function () {
                // console.log(that.data.countDownList)
                if (startTime <= 0) {
                    that.data.countDownList[i] = '';
                    that.data.orderList[i].orderStatus = 5;
                    that.setData({
                        countDownList: that.data.countDownList,
                        orderList: that.data.orderList
                    });
                    // 清理定时器thisIv
                    clearInterval(thisItv);
                    return;
                }
                let mm = Math.floor(startTime / 60);
                let ss = Math.floor(startTime % 60);
                if (mm < 10) {
                    mm = '0' + mm;
                }
                if (ss < 10) {
                    ss = '0' + ss;
                }
                if (startTime > 0) {
                    var countDown = "00:" + mm + ":" + ss
                    that.data.countDownList[i] = countDown;
                    that.setData({
                        countDownList: that.data.countDownList
                    })
                    startTime--;
                }
            }, 995)
        };

        //判断是否为微信浏览器
        Vue.prototype.weChatBrowser = function (showName) {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                //alert(" 是来自微信内置浏览器1");
                this.isShow = true;
                return true;
            } else {
                //alert("不是来自微信内置浏览器2");
                return false;
            }
        };

        //拨打电话
        Vue.prototype.call = function (telephoneNumber) {

            window.location.href = 'tel://' + telephoneNumber
        };

        //拨打电话
        Vue.prototype.callAndroid = function (numIphone) {
            if(this.$local != undefined){
                if(this.$local.env =='weixin'){  //判断是否在小程序环境里
                    // javascript
                   this.call(numIphone);
                }else {
                    if (this.Device.getMobileOperatingSystem() == 'Android') {
                        window.just_android.callTel(numIphone);
                    }
                    else {
                        // ios
                        window.webkit.messageHandlers.dial.postMessage({tel: numIphone});
                    }
                }
            }else {
                if (this.Device.getMobileOperatingSystem() == 'Android') {
                    window.just_android.callTel(numIphone);
                }
                else {
                    // ios
                    window.webkit.messageHandlers.dial.postMessage({tel: numIphone});
                }
            }


        };

        //关闭页面
        Vue.prototype.closePage = function () {
            if (this.Device.getMobileOperatingSystem() == 'Android') {
                window.just_android.closeWeb();
            }
            else {
                // ios
                window.webkit.messageHandlers.closeWeb.postMessage({});
            }
        };

        //点击下载
        Vue.prototype.getLink = function (link) {
            window.location.href = link;
        };

        //页面url
        Vue.prototype.getUrl = function (type) {

            /*邀请码*/
            const urlDriver = this.baseURL + 'usercenter-driver/v1.0/passport/';
            const urlPassenger = this.baseURL + 'usercenter-passengers/v1.0/passport/';

            /*下载*/
            const downloadUrl = this.commonURL + 'app/projects/v1.0/getbymap';


            if (type == 1) {   //司机
                return urlDriver;
            }
            if (type == 2) {
                return urlPassenger;
            }
            if (type == "down") {
                return downloadUrl;
            }
        };


        //截取Url里面的参数
        Vue.prototype.GetRequest = function () {
            var url = location.href; //获取url中"?"符后的字串

            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                //获取左后一个问号后面的参数
                var str = url.split("?")[url.split("?").length - 1];
                //alert(str);
                var strs = str.split("&");
                // alert(strs)
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);//获取中文参数转码<span style="font-family: Arial, Helvetica, sans-serif;">decodeURI</span>，（unescape只针对数字，中文乱码)
                    //alert(theRequest[strs[i].split("=")[0]])
                }
            }
            return theRequest;
        };


        //解决苹果浏览器局部滚动添加样式local_scroll,回调
        Vue.prototype.setScroll = function (isreturn, classname) {
            if (classname == undefined) {
                classname = "local_scroll";
            }
            classname = "." + classname;
            var elm = document.querySelector(classname);
            var isover = true;//用于判断回调是否执行一次
            var overscroll = function (el, isreturn) {
                if (el == null) {
                    return;
                }
                el.addEventListener('touchstart', function () {
                    var top = el.scrollTop, totalScroll = el.scrollHeight, currentScroll = top + el.offsetHeight;
                    if (top === 0) {
                        el.scrollTop = 1;
                    } else if (currentScroll === totalScroll) {
                        el.scrollTop = top - 1;
                    }
                    if (isover && isreturn != null) {
                        isreturn();
                        isover = false;
                    }
                });
                el.addEventListener('touchmove', function (evt) {
                    if (el.offsetHeight < el.scrollHeight) {
                        evt._isScroller = true;
                    }
                });
            }
            if (elm != null) {//取消body的滚动
                document.body.addEventListener('touchmove', this.handler, false);
            }
            overscroll(elm, isreturn);
        };

        //取消默认滚动
        Vue.prototype.handler = function () {
            if (!event._isScroller) {
                event.preventDefault();
            }
        };


    },

}
