import qs from 'qs';
import axios from 'axios'


// 本地
axios.defaults.baseURL='http://localhost'
// 服务器
//axios.defaults.baseURL='http://47.106.187.222'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 查
export  function getAjax(url) {

    const options = {
        method: 'get',
   //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url,
    };
    return axios(options);
}


// 改
export  function updateAjax(url,data) {
    debugger
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
    debugger
    console.log(data)
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
        data,
        url,
    };
    return axios(options);
}

