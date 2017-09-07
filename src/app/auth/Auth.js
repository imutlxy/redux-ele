import uuid from 'uuid';

import {localStorageUtil, sessionStorageUtil} from '../utils/StorageUtil';

const sessionStorageObj = sessionStorageUtil.get();
const localStorageObj = localStorageUtil.get();

class Auth {
    constructor(userId, userName) {
        this._userId = userId || '';
        this._userName = userName || '';
    }

    /**
     * 从 sessionStorage 中获取 userId
     * @returns {string|undefined}
     */
    static getUserIdFromSessionStorage() {
        if (sessionStorageObj.userId) {
            return sessionStorageObj.userId;
        }
        console.warn('The "userId" could not be found in the sessionStorage');
        return undefined;
    }

    /**
     * 从 localStorage 中获取 userId
     * @returns {string|undefined}
     */
    static getUserIdFromLocalStorage() {
        if (localStorageObj.userId) {
            return localStorageObj.userId;
        }
        console.warn('The "userId" could not be found in the localStorage');
        return undefined;
    }

    /**
     * 随机生成一定长度的 userId
     * @param {number} maxLength
     * @returns {string} userId
     * @static
     */
    static generateRandomUserId(maxLength) {
        const uuidV4 = uuid.v4().replace(/-/g, '');
        return uuidV4.substring(0, maxLength);
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
    }
}

let userId = Auth.getUserIdFromSessionStorage() || Auth.getUserIdFromLocalStorage() || undefined;

// 将 userId 添加到 localStorage 进行多标签共享
if (sessionStorageObj.userId) {
    localStorageUtil.set({userId: userId});
}

const authInstance = new Auth(userId, '');
authInstance.userId = userId;
authInstance.userName = '';

export {
    Auth,
    authInstance
};

export default Auth;
