import Axios from 'axios';
let qs = require('qs');
Axios.defaults.timeout = 5000;
//Axios.defaults.baseURL = process.env.API_ROOT; //页面其它接口地址
//Axios.defaults.baseURL = "http://localhost:8300/";
Axios.defaults.commonURL = process.env.common_ROOT; //下载接口地址
//Axios.defaults.headers.common['X-Api-AccessToken'] = window.localStorage.getItem('accessToken');
Axios.defaults.withCredentials = true; // 允许携带cookie

function getCookie(c_name)
{
    if (document.cookie.length>0)
      {
      var c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
        {
        c_start=c_start + c_name.length+1
        var c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
        }
      }
    return ""
}

//http request 拦截器
Axios.interceptors.request.use(
    config => {

     /* let token = sessionStorage.getItem("token");
      if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        alert(token);
        config.headers.token = `${token}`;
      }
      if (config.url.indexOf(url) === -1) {
        config.url = url + config.url;
      }*/
       /* let token = localStorage.getItem("token");

        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            alert(token);
            config.headers.token = `${token}`;
        }
        if (config.url.indexOf(url) === -1) {
            config.url = url + config.url;/!*拼接完整请求路径*!/
        }
        console.log(config);*/
       return config;
    },
    error => {
        return Promise.reject(err);
    }
);
//响应拦截器即异常处理
Axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                console.log('错误请求');
                break;
            case 401:
                console.log('未授权，请重新登录');
                break;
            case 403:
                console.log('拒绝访问');
                break;
            case 404:
                console.log('请求错误,未找到该资源');
                break;
            case 405:
                console.log('请求方法未允许');
                break;
            case 408:
                console.log('请求超时');
                break;
            case 500:
                console.log('服务器端出错');
                break;
            case 501:
                console.log('网络未实现');
                break;
            case 502:
                console.log('网络错误');
                break;
            case 503:
                console.log('服务不可用');
                break;
            case 504:
                console.log('网络超时');
                break;
            case 505:
                console.log('http版本不支持该请求');
                break;
            default:
                console.log(`连接错误${err.response.status}`);
        }
    } else {
        console.log('连接到服务器失败');
    }
    return Promise.resolve(err.response);
});

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={},headers={}){
    if(!(/\/api\/comm\//).test(url)){
        if(typeof params != "object" || params == null){
            params = {};
        }
        params.justurl = encodeURIComponent(url);
        url = "/api/comm/transmit";

    }
    if(typeof headers != "object" || headers == null){
        headers = {"content-type": "application/json;charset=UTF-8"};
    }
    else if(typeof headers["content-type"] != "undefined"){
        headers["transmitHeader"] = headers["content-type"];
        headers["content-type"] = "application/json;charset=UTF-8";
    }
    headers["justdata"] = getCookie("justdata");

    return new Promise((resolve,reject) => {
        Axios.get(url,{
            params:params,
            headers:headers
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err)
        })
    })
}


/**
 * 封装post qs.stringify请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {},headers={}){

    if(!(/\/api\/comm\//).test(url)){

        if(typeof data != "object"){
            data = {};
        }
        data.justurl = encodeURIComponent(url);
        url = "/api/comm/transmit";
    }

    if(typeof headers != "object" || headers == null){
        headers = {"content-type": "application/json;charset=UTF-8"};
    }
    else if(typeof headers["content-type"] != "undefined"){
        headers["transmitHeader"] = headers["content-type"];
        headers["content-type"] = "application/json;charset=UTF-8";
    }
    headers["justdata"] = getCookie("justdata");

    return new Promise((resolve,reject) => {
        Axios.post(url,data,{headers})
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err);

            })
    })
}


/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {},headers={}){
    if(!(/\/api\/comm\//).test(url)){

        if(typeof data != "object"){
            data = {};
        }
        data.justurl = url;
        url = "/api/comm/transmit";
    }

    if(typeof headers != "object" || headers == null){
        headers = {"content-type": "application/json;charset=UTF-8"};
    }
    else if(typeof headers["content-type"] != "undefined"){
        headers["transmitHeader"] = headers["content-type"];
        headers["content-type"] = "application/json;charset=UTF-8";
    }
    headers["justdata"] = getCookie("justdata");
    return new Promise((resolve,reject) => {
        Axios.put(url,data,{headers})
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 下面是获取数据的接口
 */
/**
 * 测试接口
 * 名称：name
 * 参数：paramObj/null
 * 设置headers：headerObj/null
 * 方式：post/patch/put
 */
export const server = {
    post: function(api,paramObj,headerObj){
        return post(api,paramObj,headerObj);
    },
    get: function(api,paramObj,headerObj){
        return get(api,paramObj,headerObj);
    },
    put: function(api,paramObj,headerObj){
        return put(api,paramObj,headerObj);
    },


};

