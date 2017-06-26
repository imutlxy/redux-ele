import {wrapActions} from '../config/ConfigureStore';

/**
 * app action Router
 */
function onClickWithoutCheck(action) {
    return action;
}

/**
 * MenuBar 按钮点击事件代理action 函数. 此处可以针对按钮点击事件进行拦截。
 * 如果外部注入 wrapAction，那么直接使用 wrapAction 的操作即可。
 * 如果外部没有注入 wrapAction， 使用 dispatch 操作。
 */

export function onClickAction(action, props) {
    return function (dispatch, getState) {
        if (action.type && wrapActions.hasOwnProperty(action.type)) {
            wrapActions[action.type].call(this, action, dispatch, props);
        } else {
            dispatch(onClickWithoutCheck(action));
        }
    };
}
