'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"pre"',
    API_ROOT: '"http://111.231.212.28/"', //网约车接口地址
    common_ROOT: '"http://111.231.211.112:8999/"',  //牦牛出行下载地址
    Air_ROOT:'"http://111.231.211.53:21000/"',  //机场接送接口地址
    zuche_ROOT:'"http://111.231.212.114/"',  //租车接口地址
    webviewUrl:'"http://111.231.213.114/"',  //app跳外链的地址
});
