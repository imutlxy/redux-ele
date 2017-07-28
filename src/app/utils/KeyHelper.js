/* eslint-disable no-console */

/**
 * 将组合键字符串解析为对象
 * Ctrl+A, ctrl+a, ctrl + a, ctrl-a
 * ctrl+alt+a, ctrl+shift+a
 * 'ctrl+space' -> {"name":"space","ctrl":true,"meta":false,"shift":false,"alt":false}
 * 'shift-ctrl-c' -> { name: 'c', ctrl: true, meta: false, shift: true, alt: false }
 * 'shift+ctrl+c' -> { name: 'c', ctrl: true, meta: false, shift: true, alt: false }
 * @param {String} s
 */
export function parseKey(s) {
    let keyString = s.trim().toLowerCase();
    keyString = keyString.replace(/\s/g, '');
    if (keyString.indexOf('+') > -1) {
        keyString = keyString.replace(/\+/g, '-');
    }
    let key = {name: undefined, ctrl: false, meta: false, shift: false, alt: false};
    let parts = keyString.split('-');
    let c;

    key.name = parts.pop();
    while ((c = parts.pop())) {
        key[c] = true;
    }

    return key;
}

/**
 * 验证组合键在浏览器中是否可用
 * 以下组合键在 Chrome 中无法捕获到事件、取消默认动作
 * - Ctrl + N
 * - Ctrl + T
 * - Ctrl + W
 * - Ctrl + Shift + N
 * - Ctrl + Shift + T
 * - Ctrl + Shift + W
 * - Alt + F4
 *
 * - Ctrl + E 在 360 浏览器中被占用，无法取消默认动作
 * - Ctrl + T 在 IE 中被占用，无法取消默认动作
 * @param s
 */
export function verifyKey(s) {
    const key = parseKey(s);
    let condition1 = ['n', 't', 'w'].includes(key.name) && key.ctrl;
    let condition2 = key.name === 'f4' && key.alt;
    if (condition1 || condition2) {
        console.warn(`The shortcut key '${s}' has been used by browser!`);
        return false;
    }
    return true;
}

/**
 * 将字符转换为 keyCode
 * @param char
 * @returns {{char: *, charCode: Number, keyCode: undefined}}
 * e.g. 'a' -> { char: 'a', charCode: 97, keyCode: 65 }
 * e.g. 'h' -> { char: 'h', charCode: 104, keyCode: 104 }
 */
export function parseCharToKeyCode(char) {
    let code = {
        char: char,
        charCode: char.charCodeAt(0),
        keyCode: undefined
    };
    // 大字母A-Z按键的 keyCode 和 charCode(ASCII) 码相同
    if (char >= 'A' && char <= 'Z') {
        code.keyCode = char.charCodeAt(0);
    } else if (char >= 'a' && char <= 'z') {
        // 小字母a-z按键的 keyCode 和大写字母相同
        code.keyCode = char.toUpperCase().charCodeAt(0);
    } else {
        // TODO: 补满其他字符的 keyCode
        code.keyCode = char.toUpperCase().charCodeAt(0);
    }
    return code;
}

/**
 * 模拟键盘事件
 * @param {String} typeArg : keydown, keypress, keyup
 * @param {Object} initArg
 */
export function simulateKeyboardEvent(typeArg, initArg) {
    let defaultDict = {
        bubbles: false,
        cancelable: false,
        key: '',
        keyCode: 0,
        code: '',
        charCode: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        view: null
    };
    let initDict = Object.assign(defaultDict, initArg);
    let keyboardEvent;
    if (typeof KeyboardEvent !== 'undefined') {
        try {
            keyboardEvent = new KeyboardEvent(typeArg, initDict);
            document.dispatchEvent(addExtraCode(keyboardEvent, initDict));
            return;
        } catch (e) {
            console.warn('当前浏览器不支持 KeyboardEvent 构造函数！', e);
        }
    }
    keyboardEvent = document.createEvent('KeyboardEvent');
    const UA = navigator.userAgent;
    const isIE = UA.indexOf('MSIE') > -1 || UA.indexOf('Trident') > -1;
    if (isIE) {
        let modifiersListArgArray = [];
        modifiersListArgArray.push(initDict.ctrlKey ? 'Control' : '');
        modifiersListArgArray.push(initDict.altKey ? 'Alt' : '');
        modifiersListArgArray.push(initDict.shiftKey ? 'Shift' : '');
        modifiersListArgArray.push(initDict.metaKey ? 'Meta' : '');
        // https://msdn.microsoft.com/en-us/library/ff975297(v=vs.85).aspx
        // keyboardEvent.initKeyboardEvent(eventType, canBubble, cancelable, viewArg, keyArg, locationArg, modifiersListArg, repeat, locale);
        keyboardEvent.initKeyboardEvent(
            typeArg,
            initDict.bubbles,
            initDict.cancelable,
            initDict.view,
            initDict.key,
            initDict.location,
            modifiersListArgArray.join(' '),
            initDict.repeat,
            initDict.locale
        );
        document.dispatchEvent(addExtraCode(keyboardEvent, initDict));
        return;
    }
    // for Firefox Legacy
    // initKeyboardEvent 已经从 W3C Events 准备中移除，新版 Firefox 只支持 initKeyEvent
    let initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';
    keyboardEvent[initMethod](
        typeArg,
        initDict.bubbles,
        initDict.cancelable,
        initDict.view,
        initDict.ctrlKey,
        initDict.altKey,
        initDict.shiftKey,
        initDict.metaKey,
        initDict.keyCode,
        initDict.charCode
    );
    document.dispatchEvent(addExtraCode(keyboardEvent, initDict));
}

/**
 * Chrome 在定义键盘事件时不支持 keyCode, charCode, which. 只支持 key, code
 * @param keyboardEvent
 * @param initDict
 * @returns {*}
 */
function addExtraCode(keyboardEvent, initDict) {
    Object.defineProperties(keyboardEvent, {
        charCode: {
            get: function () {
                // 只有 keypress 事件和可打印字符才返回有效的 charCode
                if (this.type === 'keypress') {
                    if (this.key && this.key.length === 1) {
                        return this.key.charCodeAt(0);
                    }
                    return initDict.charCode || 0;
                }
                return 0;
            }
        },
        keyCode: {
            get: function () {
                if (this.key && this.key.length === 1) {
                    if (this.type === 'keypress') {
                        return this.key.charCodeAt(0);
                    }
                    // 数字和大写字母的 keyCode 恰好对应 ASCII 值，英文标点的键值视浏览器而定
                    return this.key.toUpperCase().charCodeAt(0);
                } else {
                    // console.error('暂不支持获取keyCode值！');
                    return initDict.keyCode || 0;
                }
            }
        },
        which: {
            get: function () {
                if (this.key && this.key.length === 1) {
                    if (this.type === 'keypress') {
                        return this.key.charCodeAt(0);
                    }
                    // 数字和大写字母的 which 恰好对应 ASCII 值，英文标点的键值视浏览器而定
                    return this.key.toUpperCase().charCodeAt(0);
                } else {
                    // console.error('暂不支持获取keyCode值！');
                    return initDict.which || 0;
                }
            }
        }
    });
    return keyboardEvent;
}

/**
 * 模拟组合键按下
 * @param s e.g 'ctrl-h'
 * TODO: 目前无法模拟 'ctrl+space' 等 alphabet字母表以外按键
 */
export function simulateKeyDown(s) {
    let key = parseKey(s);
    let result = parseCharToKeyCode(key.name);
    simulateKeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: key.name,
        keyCode: result.keyCode,
        code: `Key${key.name.toUpperCase()}`,
        charCode: result.charCode,
        ctrlKey: key.ctrl,
        altKey: key.alt,
        shiftKey: key.shift,
        metaKey: key.meta,
        view: window,
        which: result.keyCode
    });
}

/* eslint-enable no-console */
