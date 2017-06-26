
/**
 * 前置拦截器
 */
let preMiddleWares = {
    CREATE_NEW_ITEM: (action, state) => {
        return true;
    }
};

/**
 * 后置拦截器
 */
let postMiddleWares = {
    RESTORE_PAGE_DESIGNER_DATA: (action, state) => {
        return true;
    }
};

let appMiddleWares = {
    preMiddleWares,
    postMiddleWares
};

export default appMiddleWares;
