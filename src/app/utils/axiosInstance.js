import axios from 'axios';
import {Modal, message} from 'antd';

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
    Modal.warning({
        title: i18n.t('common:warning'),
        content: i18n.t('common:network_error_req'),
        okText: i18n.t('common:ok')
    });
    return Promise.reject(error);
});
//回应拦截
axiosInstance.interceptors.response.use(function (response) {
    if (response.status === 200 && response.data) {
        return response;
    } else {
        message.error('返回的结果中 status 不是 200 或没有 data 字段或data字段为null或 \'\'或 false');
        return Promise.reject(response);
    }
}, function (error) {
    Modal.warning({
        title: i18n.t('common:warning'),
        content: i18n.t('common:network_error_res'),
        okText: i18n.t('common:ok')
    });
    return Promise.reject(error);
});

export {axiosInstance};
