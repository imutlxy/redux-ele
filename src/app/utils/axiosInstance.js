import axios from 'axios';
import {Modal, message} from 'antd';

import {i18n} from '../i18n';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000, // 请求时间超过10秒视为超时
    withCredentials: true
});

//请求拦截
axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    Modal.warning({
        title: i18n.t('common:warning'),
        content: i18n.t('common:network_error_tip'),
        okText: i18n.t('common:ok')
    });
    return Promise.reject(error);
});
//回应拦截
axiosInstance.interceptors.response.use(function (response) {
    if (response.data && response.data.success === true) {
        return response;
    } else {
        if (response.data && response.data.msg) {
            message.error(response.data.msg);
        } else {
            message.error(i18n.t('common:network_error_tip'));
        }
        return Promise.reject(response);
    }
}, function (error) {
    Modal.warning({
        title: i18n.t('common:warning'),
        content: '返回的结果缺少 success 字段或者 success 为 false',
        okText: i18n.t('common:ok')
    });
    return Promise.reject(error);
});

export {axiosInstance};
