/**
 * 深克隆Plain Object，不包括数组
 * @param {Object} obj
 * @returns {Object} 返回新对象
 */
export function clone(obj) {
    let newObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
                newObj[key] = clone(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}

/**
 * 判断是否是Object类型
 * @param obj
 * @returns {Boolean}
 */
export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 合并对象，返回一个新对象（原对象不会被修改），遇到相当的key，使用obj2的value
 * @param obj1 target
 * @param obj2 source
 * @returns {Object}
 */
export function merge(obj1, obj2) {
    let newObj = clone(obj1);
    for (let key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (obj1[key] && isObject(obj1[key])) {
                if (isObject(obj2[key])) {
                    newObj[key] = merge(obj1[key], obj2[key]);
                } else {
                    console.warn('You are trying to merge non-object to object. The non-object will be ignored.');
                }
            } else {
                // merge({a: 'test'}, {a: ''}) => {a: ''}
                newObj[key] = obj2[key];
            }
        }
    }
    return newObj;
}

export function isObjectEqual(obj1, obj2) {
    let result = false;
    if (obj1 && obj2 && Object.keys(obj1).length === Object.keys(obj2).length) {
        for (let key in obj1) {
            if (obj1[key] === obj2[key]) {
                result = true;
            }
        }
    }
    return result;
}
