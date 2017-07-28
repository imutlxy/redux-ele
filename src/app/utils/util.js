export function browser(navigator) {
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
}

/**
 * 解析URL参数
 * @param {string} [url]
 * @returns {Object}
 * Usage:
 *      1. parseQueryString('http://www.example.com/search?key0=&key1=1&key2=%E5%8F%82%E6%95%B0')
 *      => {key0: "", key1: "1", key2: "参数"}
 *      2. parseQueryString() => 返回当前地址栏的解析结果
 */
export function parseQueryString(url) {
    url = url || window.location.href;
    const queryObject = {};
    const startIndex = url.indexOf('?');
    if (startIndex > -1) {
        const queryString = url.substring(startIndex + 1);
        const queryArray = queryString.split('&');
        queryArray.forEach(function (item) {
            const arr = item.split('=');
            const key = decodeURIComponent(arr[0]);
            queryObject[key] = decodeURIComponent(arr[1]);
        });
    }
    return queryObject;
}

/**
 * JSON 对象转成 URLParams 形式
 * @param {Object} data
 * @returns {string} QueryString
 * Usage:
 *      stringifyToQueryString({key0: "", key1: "1", key2: "参数"})
 *      => key0=&key1=1&key2=%E5%8F%82%E6%95%B0
 */
export function stringifyURLParams(data) {
    let paramsArray = [];
    for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
            paramsArray.push(encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]));
        }
    }
    return paramsArray.join('&');
}

/**
 * 追加 params 到 URL
 * @param {string} url
 * @param {Object} params
 *
 * http://www.example.com
 * http://www.example.com/
 * http://www.example.com/? => http://www.example.com/?key0=0
 * http://www.example.com/?key0=
 * http://www.example.com/?key0=&key1=1
 * http://www.example.com/search?key0=&key1=1
 */
export function appendParamsToUrl(url, params) {
    const startIndex = url.indexOf('?');
    // 不存在 "?"
    if (startIndex === -1) {
        if (url.slice(-1) !== '/') {
            url += '/';
        }
        url += '?';
    } else if (startIndex !== url.length - 1) {
        // "?" 不是URL最后一个字符
        url += '&';
    }
    return url + stringifyURLParams(params);
}

/**
 * 获取没有?的URL
 * @param {string} [url]
 * @returns {string}
 *
 * http://www.example.com/search?key0=&key1=1 => http://www.example.com/search
 */
export function getShortUrl(url) {
    url = url || window.location.href;
    const startIndex = url.indexOf('?');
    if (startIndex === -1) {
        return url;
    }
    return url.substr(0, startIndex);
}

/**
 * 从 URL 中移除指定的key，返回新的 URL
 * @param {string} key
 * @param {string} [url]
 */
export function removeKeyFromUrl(key, url) {
    url = url || window.location.href;
    const qsObj = parseQueryString();
    delete qsObj[key];
    return appendParamsToUrl(getShortUrl(url), qsObj);
}

/*
 返回 YYYY-MM-DD-HH.mm.ss 格式时间
 */
export function generateDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;
}
