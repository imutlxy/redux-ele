/**
 * 日志 MiddleWare。
 * 此处MidlleWare 依旧可以采用根据业务分层的方式来使用。
 * 针对于不同的业务部分，可以使用针对于该业务的中间件来进行处理。
 * 注意：MidlleWare 的拦截功能主要是用于全局或者较大范围的拦截实现。
 */
export function logger({getState}) {
    return next => (action) => {
        console.info('will dispatch', action);
        // 调用 middleware 链中下一个 middleware 的 dispatch。
        const returnValue = next(action);
        console.info('state after dispatch', getState());
        // 一般会是 action 本身，除非后面的 middleware 修改了它。
        return returnValue;
    };
}
