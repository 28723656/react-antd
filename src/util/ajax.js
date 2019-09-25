import axios from 'axios'


// 接口地址根路径
const DEV_API_ROOT = 'http://localhost';
const PROD_API_ROOT = 'http://47.106.187.222';

export const API_ROOT = process.env.NODE_ENV === 'production'
    ? PROD_API_ROOT : DEV_API_ROOT;

axios.defaults.baseURL=API_ROOT
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// 解决跨域请求获取不到session的情况   卧槽，加了这个node的跨域请求失败了
 //axios.defaults.withCredentials =true;

// 查
export  function getAjax(url) {

    const options = {
        method: 'get',
   //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url,
    };
    return axios(options);
}


export  function getWangYiAjax(url) {

    const baseURL='http://47.106.187.222:3000'
    const completeUrl =baseURL+url
    const options = {
        method: 'get',
        //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url:completeUrl,
    };
    return axios(options);
}




// 改
export  function updateAjax(url,data) {
    console.log(data)
    const options = {
        method: 'put',
   //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url,
    };
    return axios(options);
}

// 增
export  function addAjax(url,data) {
    const options = {
        method: 'post',
 //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url,
    };
    return axios(options);
}

// 删
export  function deleteAjax(url,data) {
    const options = {
        method: 'delete',
  //      headers: { 'content-type': 'application/x-www-form-urlencoded' },
   //     data: qs.stringify(data),
        headers: { 'content-type': 'application/json;charset=utf-8' },
     //   data,
        url,
    };
    return axios(options);
}


/**
 *   对mongodb 操作数据库的封装
 *
 */
export  function getMongoAjax(url = '', data = {}) {

    const baseURL='http://localhost:4000'
    url = url + '?time='+new Date().getTime();

    if(JSON.stringify(data) !== "{}"){
        // 准备 url query 参数数据
        let dataStr = '' //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
            url = url + dataStr
        }
    }

    const completeUrl =baseURL+url
    console.log('完整的url:',completeUrl)

    const options = {
        method: 'GET',
       // headers: { 'content-type': 'application/json;charset=utf-8' },
        headers: { 'content-type': 'application/json' },
        url:completeUrl,
    };
    return axios(options);
}




// 增
export  function postMongoAjax(url,data) {
    const baseURL='http://localhost:4000'
    const completeUrl =baseURL+url
    const options = {
        method: 'post',
        data,
        url:completeUrl,
    };
    return axios(options);
}
