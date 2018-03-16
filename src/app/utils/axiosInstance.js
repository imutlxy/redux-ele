import axios from 'axios';
import {Toast} from 'antd-mobile';

import {i18n} from '../i18n';
import Constants from '../constants';

const axiosInstance = axios.create({
    baseURL: Constants.BASE_URL,
    timeout: 10000, // 请求时间超过10秒视为超时
    withCredentials: true
});

//请求拦截
axiosInstance.interceptors.request.use((config) => {
    return config;
}, function (error) {
    Toast.fail(i18n.t('common:network_error_req'), 2);
    return Promise.reject(error);
});
//回应拦截
axiosInstance.interceptors.response.use((response) => {
    if (response.data.success === true) {
        return response;
    } else if (response.config.url.includes(Constants.BASE_URL + '/user/getCaptchas')) { // 获取验证码，返回的结果是 string
        console.log(1);
        return response;
    }
    return Promise.reject(response.data);
}, (error) => {
    return Promise.reject(error.response && error.response.data || error);
});

export {axiosInstance};
