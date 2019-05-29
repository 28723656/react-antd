import qs from 'qs';
import axios from 'axios'


axios.defaults.baseURL='http://localhost'


// 查
export  function getAjax(url) {

    const options = {
        method: 'get',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url,
    };
    return axios(options);
}


// 改
export  function updateAjax(url,data) {
    const options = {
        method: 'put',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
    };
    return axios(options);
}

// 增
export  function addAjax(url,data) {
    const options = {
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
    };
    return axios(options);
}

// 删
export  function deleteAjax(url,data) {
    const options = {
        method: 'delete',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
    };
    return axios(options);
}

