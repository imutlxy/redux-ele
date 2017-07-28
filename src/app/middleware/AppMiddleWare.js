
/**
 * 前置拦截器
 */
let preMiddleWares = {
    DROP_TO_CONTENT: (action, state) => {
        return true;
    }
};

/**
 * 后置拦截器
 */
let postMiddleWares = {
    DROP_TO_CONTENT: (action, state) => {
        return true;
    }
};

let appMiddleWares = {
    preMiddleWares,
    postMiddleWares
};

export default appMiddleWares;
