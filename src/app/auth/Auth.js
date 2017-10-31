import uuid from 'uuid';

import {localStorageUtil, sessionStorageUtil} from '../utils/StorageUtil';

const sessionStorageObj = sessionStorageUtil.get();
const localStorageObj = localStorageUtil.get();

class Auth {
    constructor(userId, userName) {
        this.userId = userId || '';
        this.userName = userName || '';
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
}

let userId = Auth.getUserIdFromLocalStorage() || undefined;

const authInstance = new Auth(userId, '');
authInstance.userId = userId;
authInstance.userName = '';

export {
    Auth,
    authInstance
};

export default Auth;
