import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {hashHistory} from 'react-router';
import {routerReducer, routerMiddleware} from 'react-router-redux';

import {componentMiddleWare, logger} from '../middleware';
import appReducerCreator from './AppReducerCreator';

/**
 * store 构建器
 */
export function configureStore(config) {
    let {initialStates, preMiddleWares, postMiddleWares, reducers} = config;
    let allReducer = Object.assign({}, reducers);
    let appReducer = appReducerCreator(initialStates, allReducer);
    const finalReducer = combineReducers({appReducer, routing: routerReducer});
    const allMiddleWares = [
        thunk,
        componentMiddleWare(preMiddleWares, postMiddleWares),
        routerMiddleware(hashHistory),
        logger
    ];

    let enhancer = compose(
        applyMiddleware(...allMiddleWares)
    );
    return createStore(finalReducer, {}, enhancer);
}

const Store = {
    configureStore
};

export default Store;
