'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"https://butterfly.maoniuchuxing.com/"',  //网约车接口地址
  //API_ROOT: '"http://192.168.1.237:8899/"',  //网约车接口地址
  API_ROOT: '"http://192.168.1.237:8899/"',  //网约车接口地址
  common_ROOT: '"http://192.168.1.139:8999/"',  //牦牛出行下载地址

  Air_ROOT:'"http://192.168.1.221:21000/"',  //机场接送接口地址
  zuche_ROOT:'"http://192.168.1.139:19411/"',  //租车接口地址
  webviewUrl:'"http://192.168.1.54:8300/"',  //app跳外链的地址
});
