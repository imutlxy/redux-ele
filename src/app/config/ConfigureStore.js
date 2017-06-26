import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {componentMiddleWare, logger} from '../middleware';
import appReducerCreator from './AppReducerCreator';

/**
 * store 构建器
 */
export const wrapActions = {};

export function configureStore(config) {
    let {initialStates, actions, preMiddleWares, postMiddleWares, reducers} = config;
    let allReducer = Object.assign({}, reducers);
    let appReducer = appReducerCreator(initialStates, allReducer);
    const finalReducer = combineReducers({appReducer});
    Object.assign(wrapActions, actions);
    const allMiddleWares = [
        thunk,
        componentMiddleWare(preMiddleWares, postMiddleWares),
        logger
    ];

    let enhancer = compose(
        applyMiddleware(...allMiddleWares)
    );
    return createStore(finalReducer, {}, enhancer);
}

const Store = {
    wrapActions,
    configureStore
};

export default Store;
