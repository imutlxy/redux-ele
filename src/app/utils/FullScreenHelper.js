/**
 * 判断当前是否全屏
 * @returns {*|boolean}
 */
export function getFullscreenStatus() {
    let hasFullscreenElement = Boolean(document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement || false);
    return hasFullscreenElement;
}

/**
 * 全屏切换
 * @param el
 */
export function toggleFullscreen(el) {
    // 有全屏元素
    if (getFullscreenStatus) {
        exitFullscreen();
    } else {
        requestFullscreen(el);
    }
}

/**
 * 请求全屏（浏览器默认F11自动切全屏）
 * @param el
 */
export function requestFullscreen(el) {
    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
    } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
    }
}

/**
 * 退出全屏（对F11无效）
 */
export function exitFullscreen() {
    if (document.exitFullscreen) {
        // W3C
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        // Chrome
        document.webkitExitFullscreen();
    } else if (document.webkitCancelFullScreen) {
        // Chrome legacy
        document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        // Firefox legacy
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        // IE 11
        document.msExitFullscreen();
    }
}

/**
 * 返回对应浏览器的 fullscreenchange 事件名称
 * @returns {string}
 */
export function getFullscreenChangeEventName() {
    let fullscreenChange = '';
    if (typeof document.onfullscreenchange !== 'undefined') {
        fullscreenChange = 'fullscreenchange';
    } else if (typeof document.onwebkitfullscreenchange !== 'undefined') {
        fullscreenChange = 'webkitfullscreenchange';
    } else if (typeof document.onmozfullscreenchange !== 'undefined') {
        fullscreenChange = 'mozfullscreenchange';
    } else if (typeof document.onmsfullscreenchange !== 'undefined') {
        fullscreenChange = 'MSFullscreenChange';
    } else {
        throw new Error('抱歉，您的浏览器不能完全支持全屏。');
    }
    return fullscreenChange;
}
