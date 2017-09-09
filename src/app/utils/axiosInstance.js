import axios from 'axios';
import {Toast} from 'antd';

import {i18n} from '../i18n';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9999',
    timeout: 10000, // 请求时间超过10秒视为超时
    withCredentials: true
});

//请求拦截
axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    Toast.fail(i18n.t('common:network_error_req'), 2);
    return Promise.reject(error);
});
//回应拦截
axiosInstance.interceptors.response.use(function (response) {
    if (response.status === 200 && response.data) {
        return response;
    } else {
        Toast.fail('返回的结果中 status 不是 200 或没有 data 字段或 data 字段为 null 或 \'\' 或 false', 2);
        return Promise.reject(response);
    }
}, function (error) {
    Toast.fail(i18n.t('common:network_error_req'), 2);
    return Promise.reject(error);
});

export {axiosInstance};
