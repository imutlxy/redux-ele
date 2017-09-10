
let urlUtil = {};

/**
 * 解析URL参数
 * @param {string} [url]
 * @returns {Object}
 * Usage:
 *      1. parseQueryString('http://www.example.com/search?key0=&key1=1&key2=%E5%8F%82%E6%95%B0')
 *      => {key0: "", key1: "1", key2: "参数"}
 *      2. parseQueryString() => 返回当前地址栏的解析结果
 */
urlUtil.parseQueryString = (url) => {
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
};

/**
 * JSON 对象转成 URLParams 形式
 * @param {Object} data
 * @returns {string} QueryString
 * Usage:
 *      stringifyToQueryString({key0: "", key1: "1", key2: "参数"})
 *      => key0=&key1=1&key2=%E5%8F%82%E6%95%B0
 */
urlUtil.stringifyURLParams = (data) => {
    let paramsArray = [];
    for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
            paramsArray.push(encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]));
        }
    }
    return paramsArray.join('&');
};

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
urlUtil.appendParamsToUrl = (url, params) => {
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
    return url + urlUtil.stringifyURLParams(params);
};

/**
 * 获取没有?的URL
 * @param {string} [url]
 * @returns {string}
 *
 * http://www.example.com/search?key0=&key1=1 => http://www.example.com/search
 */
urlUtil.getShortUrl = (url) => {
    url = url || window.location.href;
    const startIndex = url.indexOf('?');
    if (startIndex === -1) {
        return url;
    }
    return url.substr(0, startIndex);
};

/**
 * 从 URL 中移除指定的key，返回新的 URL
 * @param {string} key
 * @param {string} [url]
 */
urlUtil.removeKeyFromUrl = (key, url) => {
    url = url || window.location.href;
    const qsObj = urlUtil.parseQueryString();
    delete qsObj[key];
    return urlUtil.appendParamsToUrl(urlUtil.getShortUrl(url), qsObj);
};

export default urlUtil;
