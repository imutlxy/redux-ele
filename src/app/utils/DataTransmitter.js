import EventEmitter from 'events';

/**
 * Created by wangtao on 2016/11/14.
 * DataTransmitter。
 * 注意，事件模型为：单个事件，可以为其注册多个监听函数。
 */
let instance = undefined;
class DataTransmitter extends EventEmitter {
    constructor() {
        super();
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    /**
     * 发送指定事件
     */
    emitChange = (eventType, emitData) => {
        this.emit(eventType, emitData);
    };

    /**
     * 为指定事件添加指定监听函数, 注意：一定要在 DOM 消失之前卸载事件。
     */
    addChangeListener = (eventType, callback) => {
        this.on(eventType, callback);
    };

    /**
     * 监听一次性事件，触发之后，即删除。
     */
    addOnceChangeListener = (eventType, callback) => {
        this.once(eventType, callback);
    };

    /**
     * 移除指定事件指定监听函数
     */
    removeChangeListener = (eventType, callback) => {
        this.removeListener(eventType, callback);
    };

    /**
     * 移除指定事件所有监听器函数
     */
    removeAllChangeListeners = (eventType) => {
        this.removeAllListeners(eventType);
    };
}

export default DataTransmitter;
