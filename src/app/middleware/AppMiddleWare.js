
/**
 * 前置拦截器
 */
let preMiddleWares = {
    ENTER_BUSINESS: (action, state) => {
        return true;
    }
};

/**
 * 后置拦截器
 */
let postMiddleWares = {
    ENTER_BUSINESS: (action, state) => {
        return true;
    }
};

let appMiddleWares = {
    preMiddleWares,
    postMiddleWares
};

export default appMiddleWares;
