import {Socket} from './Socket';
import {appendParamsToUrl, browser, parseQueryString, stringifyURLParams} from './util';
import {axiosInstance} from './axiosInstance';
import {default as DataTransmitter} from './DataTransmitter';
import {localStorageUtil, sessionStorageUtil} from './StorageUtil';

let utils = {
    Socket: Socket,
    browser: browser,
    appendParamsToUrl: appendParamsToUrl,
    parseQueryString: parseQueryString,
    stringifyURLParams: stringifyURLParams,
    axiosInstance: axiosInstance,
    DataTransmitter: DataTransmitter,
    sessionStorageUtil,
    localStorageUtil
};

export {
    Socket,
    browser,
    appendParamsToUrl,
    parseQueryString,
    stringifyURLParams,
    axiosInstance,
    sessionStorageUtil,
    localStorageUtil
};

export default utils;

