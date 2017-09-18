import i18n from '../i18n';
import Constants from '../constants';

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

export default util;
