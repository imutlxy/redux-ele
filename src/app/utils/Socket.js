/**
 * Created by wangtao on 23/03/2017.
 * stompSocket 封装。
 * 主要解决问题：
 * 1、将 Stomp 原始 API 进行封装。
 * 2、将 Stomp 原始的 connect 函数的异步转换为同步操作。（异步连接坑很大，且不利于封装使用）。
 */
import {Stomp} from 'stompjs/lib/stomp';
import SockJs from 'sockjs-client';

let socketInstance = null;

let reLinkCount = 0;
/**
 * 创建 WebSocket Promise
 * @param {object} scope
 * @return {Promise}
 */
const createPromise = (scope) => {
    let socket = Stomp.over(new SockJs(scope.url));
    socket.heartbeat.outgoing = scope.heartBeatOutTime;
    socket.heartbeat.incoming = scope.heartBeatInTime;
    socket.debug = false;
    return new Promise((resolve, reject) => {
        socket.connect({}, function (frame) {
            socket.send(`/online/${123}`, {}, JSON.stringify({}));
            return resolve(socket);
        }, function (err) {
            scope.closeHandler(err);
            if (reLinkCount < 3) {
                setTimeout(function () {
                    scope.socketPromise = createPromise(scope);
                    scope.events.forEach((e) => {
                        scope.applyEvent(e.url, e.callback);
                    });
                }, 4000);
            }
            reLinkCount++;
            return reject('Connection Error!');
        });
    });
};

class Socket {
    constructor(url, heartBeatOutTime, heartBeatInTime) {
        const self = this;
        self.events = [];
        self.url = url;
        self.heartBeatOutTime = heartBeatOutTime;
        self.heartBeatInTime = heartBeatInTime;
        self.socketPromise = createPromise(self);
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

    /**
     * 发送socket，后端获取roomId并做判断处理
     * @param action
     */
    sendAction(action) {
        if (this.onLine){
            const simpleAction = Object.assign({}, action);
            delete simpleAction.sendSocket;
            if (simpleAction.view) {
                delete simpleAction.view;
            }
            this.emit('/transferData', {
                content: simpleAction,
                fromUserId: {}
            });
        }
    }
}

/**
 * 建立 WebSocket 连接
 */
function createSocket() {
    socketInstance = new Socket('1111111', 0, 0);
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
