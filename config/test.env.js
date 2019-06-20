'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://192.168.1.237:8899/"',  //网约车接口地址
  common_ROOT: '"http://192.168.1.237:8999/"',   //牦牛出行下载地址
  Air_ROOT:'"http://192.168.1.221:21000/"',  //机场接送接口地址
  zuche_ROOT:'"http://192.168.1.232:19411/"',  //租车接口地址
  webviewUrl:'"http://192.168.1.223:1452/"',  //app跳外链的地址
});
