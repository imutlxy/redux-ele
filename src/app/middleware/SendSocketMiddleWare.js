import {Socket} from '../utils/Socket';

/**
 * socket MiddleWare。
 * 此处MidlleWare 依旧可以采用根据业务分层的方式来使用。
 * 针对于不同的业务部分，可以使用针对于该业务的中间件来进行处理。
 * 注意：MidlleWare 的拦截功能主要是用于全局或者较大范围的拦截实现。
 */
export function socketMiddleWare({getState}) {
    return next => (action) => {
        let currentStore = getState().appReducer;
        let onLineStatus = (currentStore.user_online && currentStore.user_online.status === 'success') || false;
        if (action.sendSocket && onLineStatus) {
            Socket.getInstance().sendAction(action);
        }
        return next(action);
    };
}
