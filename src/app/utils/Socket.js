/**
 * stompSocket 封装。
 * 主要解决问题：
 * 1、将 Stomp 原始 API 进行封装。
 * 2、将 Stomp 原始的 connect 函数的异步转换为同步操作。（异步连接坑很大，且不利于封装使用）。
 */
import {Stomp} from 'stompjs/lib/stomp';
import SockJs from 'sockjs-client';
//STOMP 简单(流)文本定向消息协议，它提供了一个可互操作的连接格式，允许STOMP客户端与任意STOMP消息代理（Broker）进行交互

import {authInstance} from '../auth';

let socketInstance = null;

/**
 * 创建 WebSocket Promise
 * @param {object} scope
 * @return {Promise}
 */
const createPromise = (scope) => {
    let socket = Stomp.over(new SockJs(scope.url));
    socket.heartbeat.outgoing = scope.heartBeatOutTime || 10000; // 接收频率 默认为10000ms
    socket.heartbeat.incoming = scope.heartBeatInTime || 10000;  // 发送频率 默认为10000ms
    socket.debug = false;
    return socket;
};

class Socket {
    constructor(url, heartBeatOutTime, heartBeatInTime) {
        const self = this;
        self.events = [];
        self.url = url;
        self.heartBeatOutTime = heartBeatOutTime;
        self.heartBeatInTime = heartBeatInTime;
        if (!self.socketPromise) {
            self.socketPromise = createPromise(self);
        }
    }

    connect() {
        // let self = this;
        // if (!self.socketPromise) {
        //     self.socketPromise = createPromise(self);
        // }
    }

    closeHandler(err) {
        console.error('default close handler', err);
    }

    /**
     * 订阅/监听消息
     * @param {string} destinationUrl
     * @param {function} messageCallback
     */
    on(destinationUrl, messageCallback) {
        const self = this;
        self.events.push({url: destinationUrl, callback: messageCallback});
        self.applyEvent(destinationUrl, messageCallback);
    }

    applyEvent(destinationUrl, messageCallback) {
        if (Object.prototype.toString.call(messageCallback) === '[object Function]') {
            return this.socketPromise.then(function (socket) {
                socket.subscribe(destinationUrl, function (msg) {
                    let msgObj = {};
                    try {
                        msgObj = JSON.parse(msg.body);
                    } catch (err) {
                        console.error(err);
                    } finally {
                        messageCallback(msgObj);
                    }
                });
            }).catch((err) => {
                console.error(err);
            });
        } else {
            console.log('Please provide a callBack function');
        }
    }

    /**
     * 发送 WebSocket 消息
     * @param {string} targetUrl
     * @param {Object} msg
     */
    emit(targetUrl, msg) {
        return this.socketPromise.then(function (socket) {
            socket.send(targetUrl, {}, JSON.stringify(msg));
        }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * 主动断开 WebSocket 连接
     * @return {Promise}
     */
    disconnect() {
        return this.socketPromise.then(function (socket) {
            socket.disconnect();
        }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * 监听 WebSocket 断开
     * @param {function} closeHandler
     */
    onClose(closeHandler) {
        this.closeHandler = closeHandler;
    }
}

/**
 * 建立 WebSocket 连接
 */
function createSocket() {
    socketInstance = new Socket('http://localhost:9999', 1000, 1000);
}

function getInstance() {
    if (null === socketInstance) {
        createSocket();
    }
    return socketInstance;
}

Socket.getInstance = getInstance;

export {
    Socket
};

export default Socket;
