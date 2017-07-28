/**
 * Storage 工具类
 */
class StorageUtil {
    constructor(storage) {
        this.storage = storage;
        this.usable = this._isUsable();
    }

    /**
     * localStorage/sessionStorage 是否被禁用
     * @returns {boolean} true 可用，false 禁用
     * @private
     */
    _isUsable() {
        let usable = false;
        try {
            let len = this.storage.length;
            usable = true;
        } catch (err) {
            console.error('Warning: It’s likely your browser\'s cookies are disabled. You’ll need to turn cookies on to use the site normally.');
        }
        return usable;
    }

    /**
     * storage 存储
     * @param {string} key
     * @param {string} value
     * @private
     */
    _setItem(key, value) {
        if (this.usable) {
            this.storage.setItem(key, value);
            return true;
        }
        return false;
    }

    /**
     * 获取 storage 值
     * @param {string} key
     * @return {*}
     * @private
     */
    _getItem(key) {
        if (!this.usable || typeof key !== 'string') {
            return false;
        }
        let data;
        let str = this.storage.getItem(key);
        try {
            data = JSON.parse(str);
        } catch (e) {
            return str;
        }
        return data;
    }

    /**
     * 用法：storage.set({key: value})
     * storage.set({
     *   settings: {
     *     theme: 'light'
     *   }
     * })
     * @param {Object} obj
     * @returns {boolean} true 操作成功，false 操作失败
     * @public
     */
    set(obj) {
        if (!obj) {
            return false;
        }
        let data = obj;
        if (typeof obj !== 'object' || Array.isArray(obj)) {
            console.error('Error: The StorageUtilUtil.set() only accept plain object.');
            return false;
        }
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                let stringifyData = data[prop];
                if (typeof data[prop] === 'object' && data[prop] !== null) {
                    stringifyData = JSON.stringify(data[prop]);
                }
                this._setItem(prop, stringifyData);
            }
        }
        return true;
    }

    /**
     * 传 key，返回对应的 value
     * 不传 key，返回 Storage 所有内容
     * @param {string} [key] 要获取的key
     * @returns {Object} 返回对应的value
     * @public
     */
    get(key) {
        if (key) {
            return this._getItem(key);
        }
        const obj = {};
        for (let prop in this.storage) {
            if (this.storage.hasOwnProperty(prop)) {
                obj[prop] = this._getItem(prop);
            }
        }
        return obj;
    }

    /**
     * StorageUtil.get() 的快捷方式
     * @return {Object} 返回 storage 中所有的内容
     */
    getAll() {
        return this.get();
    }

    /**
     * 从 storage 移除移除指定数据
     * @param {string} key - 需要移除的 key
     * @return {boolean} - true 操作成功，false 操作失败
     * @public
     */
    remove(key) {
        if (!this.usable || typeof key !== 'string') {
            return false;
        }
        this.storage.removeItem(key);
        return true;
    }

    /**
     * 清除所有的 storage 数据
     * @return {boolean} - true 操作成功，false 操作失败
     * @public
     */
    clear() {
        if (!this.usable) {
            return false;
        }
        this.storage.clear();
        return true;
    }
}

export default StorageUtil;

const localStorageUtil = new StorageUtil(localStorage);
const sessionStorageUtil = new StorageUtil(sessionStorage);

export {
    localStorageUtil,
    sessionStorageUtil
};
