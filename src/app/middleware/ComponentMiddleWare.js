/**
 * 组件操作拦截器中间件。此处组件包括全局所有组件
 */
export function componentMiddleWare(preMiddleWares, postMiddleWares) {
    return function ({getState}) {
        return next => (action) => {
            // 前置拦截校验函数
            let preInterceptFunc = preMiddleWares ? preMiddleWares[action.type] : null;
            // 进行拦截校验操作
            if (preInterceptFunc && !preInterceptFunc.call(this, action, getState())) {
                console.error('Invalid action for preMiddleWares intercept!!');
                return;
            }

            // 调用 middleware 链中下一个 middleware 的 dispatch。
            // 一般会是 action 本身，除非后面的 middleware 修改了它。
            const returnValue = next(action);

            // 后置拦截校验函数
            let postInterceptFunc = postMiddleWares ? postMiddleWares[action.type] : null;
            // 进行拦截校验操作
            if (postInterceptFunc && !postInterceptFunc.call(this, action, getState())) {
                console.error('Invalid action for postMiddleWares intercept!!');
                return;
            }
            return returnValue;
        };
    };
}
