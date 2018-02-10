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
axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    Toast.fail(i18n.t('common:network_error_req'), 2);
    return Promise.reject(error);
});
//回应拦截
axiosInstance.interceptors.response.use(function (response) {
    if (response.data.success === true) {
        return response;
    } else if (response.config.url.includes(Constants.BASE_URL + '/user/getCaptchas')) { // 获取验证码，返回的结果是 string
        return response;
    }
    return response;
}, function (error) {
    let msg = '';
    if (error.response && error.response.data && error.response.data.status === 401) {
        msg = '权限不足，请先登录';
    }
    Toast.fail(msg || i18n.t('common:network_error_req'), 3);
    return Promise.reject(error);
});

export {axiosInstance};
