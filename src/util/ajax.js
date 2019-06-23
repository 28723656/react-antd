import axios from 'axios'


// 接口地址根路径
const DEV_API_ROOT = 'http://localhost';
const PROD_API_ROOT = 'http://47.106.187.222';

export const API_ROOT = process.env.NODE_ENV === 'production'
    ? PROD_API_ROOT : DEV_API_ROOT;

axios.defaults.baseURL=API_ROOT
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
        data,
        url,
    };
    return axios(options);
}

