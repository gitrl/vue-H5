// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import util from './util.js'   //公共方法
Vue.use(util);  //公共方法

//请求别名
import Axios from 'axios';
Vue.prototype.$http = Axios;

//对json数据序列化
var qs = require('qs');
Vue.prototype.qs = qs;


//是否在生产环境把警告打开
Vue.config.productionTip = false;
//自动读取路由里的title
Vue.use(require('vue-wechat-title'));

import VueAwesomeSwiper from 'vue-awesome-swiper'  //swiper图片左右切换
Vue.use(VueAwesomeSwiper);  //swiper图片左右切换

//获取请求头

//vux ui
import {AlertPlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin} from 'vux'
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
/*Vue.use(ConfirmPlugin);*/
Vue.use(LoadingPlugin);

// Vue.config.delimiters = ["<%","%>"];


//axios二次封装
import {server} from './assets/js/axiosFN';
Vue.prototype.$server = server;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

  mounted () {
    // document.dispatchEvent(new Event('render-event'));  /* 这句非常重要，否则预渲染将不会启动 */
    //将要给原生调用的方法挂载到 window 上面
    //把是否登录的方法挂载到全局
    window.setToken = this.setToken;
    Vue.prototype.$local = g_local || {};  // 服务器端传给H5的data
    //window.vue = this
  },

});
