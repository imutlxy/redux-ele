import i18n from '../i18n';
import Constants from '../constants';
import {authInstance} from '../auth';

const {GOTO, GO_BACK, GO_FORWARD} = Constants;

let util = {};

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
    if (data && data.name && data._id && data.cell_phone_number) {
        let userInfo = JSON.stringify({name: data.name, id: data._id, cellPhoneNumber: data.cell_phone_number});
        localStorage.setItem('userInfo', userInfo);
        sessionStorage.setItem('userInfo', userInfo);
        authInstance.userId = data.id;
        authInstance.userName = data.name;
    }
};

export default util;
