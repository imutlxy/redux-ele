import i18n from '../i18n';
import Constants from '../constants';
import {authInstance} from '../auth';
import DataStore from './DataStore';

const {GOTO, GO_BACK, GO_FORWARD} = Constants;

let util = {};
const dataStore = new DataStore();

util.browser = (navigator) => {
    let tem;
    const ua = navigator.userAgent;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return `IE ${tem[1] || ''}`;
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem) {
            return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    tem = ua.match(/version\/(\d+)/i);
    if (tem) {
        M.splice(1, 1, tem[1]);
    }
    return M.join(' ');
};

/**
 * 获取用户偏好设置
 */
util.setLanguage = (lan) => {
    i18n.changeLanguage(lan || 'zh');
};

/**
 * 返回 YYYY-MM-DD-HH.mm.ss 格式时间
 */
util.generateDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;
};

/**
 * 导航到 url 页
 */
util.transformRouter = (props, url) => {
    if (props && props.onClickAction) {
        const {onClickAction} = props;
        let gotoAction = {
            type: GOTO,
            content: url
        };
        onClickAction(gotoAction, props);
    }
};

/**
 * 后退
 */
util.goBack = (props) => {
    if (props && props.onClickAction) {
        const {onClickAction} = props;
        let gotoAction = {
            type: GO_BACK,
            content: ''
        };
        onClickAction(gotoAction, props);
    }
};

/**
 * 前进
 */
util.goForward = (props) => {
    if (props && props.onClickAction) {
        const {onClickAction} = props;
        let gotoAction = {
            type: GO_FORWARD,
            content: ''
        };
        onClickAction(gotoAction, props);
    }
};

/**
 * 生成唯一的 key
 */
util.getRandomKey = () => {
    return Math.random().toString(16).substr(-6);
};

/**
 * 生成唯一的 key
 */
util.getRouterUrl = (routerStore) => {
    return routerStore && routerStore.pathname || '/home';
};

/**
 * 校验用户名 只能输入5-20个以字母开头包括字母数字下划线的字符串
 */
util.validateName = (name) => {
    return name && name.match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,19}$/);
};

/**
 * 校验密码 必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
 */
util.validatePassword = (password) => {
    return password && password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/);
};

/**
 * 校验验证码
 */
util.validateVeriCode = (veriCode) => {
    return veriCode && veriCode.match(/^\d{4}$/);
};

/**
 * 校验手机号
 */
util.validateMobile = (mobile) => {
    return mobile && mobile.match(/^(13|15|18)[0-9]{9}$/);
};

/**
 * 校验邮箱
 */
util.validateEmail = (email) => {
    return email && email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
};

/**
 * 校验邮箱
 */
util.persistUserData = (data) => {
    if (data) {
        let userInfo = JSON.stringify(data);
        sessionStorage.setItem('userInfo', userInfo);
        authInstance.userId = data.id;
        authInstance.userName = data.name;
    }
};

/**
 * 记住 document 位置
 */
util.getDocumentScrollTop = (key) => {
    if (key && typeof key === 'string') {
        dataStore.set(key, document.documentElement.scrollTop);
    }
};

/**
 * 设置 document 位置
 */
util.setDocumentScrollTop = (key) => {
    if (key && typeof key === 'string' && dataStore.get(key)) {
        document.documentElement.scrollTop = parseInt(dataStore.get(key));
    }
};

/**
 * 写入Cookie
 */
util.setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
};

/**
 * 读取Cookie
 */
util.getCookie = (cname) => {
    const name = cname + '=';
    for (let c of document.cookie.split(';')) {
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) !== -1) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

/**
 * 清除cookie
 */
util.clearCookie = (name) => {
    util.setCookie(name, '', -1);
};

export default util;
