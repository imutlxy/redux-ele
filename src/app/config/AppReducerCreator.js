/**
 * 全局Reducer 产生器。
 */
function appReducerCreator(wrapInitialState, allReducerMap) {
    function appReducer(state = wrapInitialState, action) {
        if (action && action.type && allReducerMap[action.type]) {
            return allReducerMap[action.type](state, action);
        } else {
            return state;
        }
    }
    return appReducer;
}

export default appReducerCreator;
