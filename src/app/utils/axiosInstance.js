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
    } else if (response.config.url.includes(Constants.BASE_URL + '/user/getCaptchas')) { // 校验服务失败、仍然保存
        return response;
    }
    return response;
}, function (error) {
    Toast.fail(i18n.t('common:network_error_req'), 2);
    return Promise.reject(error);
});

export {axiosInstance};
