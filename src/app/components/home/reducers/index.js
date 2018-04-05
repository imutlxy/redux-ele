import Immutable from 'immutable';

import Constants from '../../../constants';

const {GET_HOME_BUSINESS, GET_SEARCH_BUSINESS, ENTER_BUSINESS, MERGE_DATA} = Constants;

let homeReducers = {};

homeReducers[GET_HOME_BUSINESS] = function (state, action) {
    let newState = Object.assign({}, state);
    newState['homeBusinesses'] = [].concat((newState['homeBusinesses'] || []), action['content']);
    return newState;
};

homeReducers[GET_SEARCH_BUSINESS] = function (state, action) {
    let newState = Object.assign({}, state);
    newState['searchBusinesses'] = [].concat((newState['searchBusinesses'] || []), action['content']);
    return newState;
};

homeReducers[MERGE_DATA] = function (state, action) {
    let foo = Immutable.fromJS(state);
    let newArr = foo.mergeDeep(Immutable.fromJS(action.content));
    return newArr.toJS();
};

homeReducers[ENTER_BUSINESS] = function (state, action) {
    let foo = Immutable.fromJS(state);
    let newArr = foo.mergeDeep(Immutable.fromJS(action.content));
    return newArr.toJS();
};

export default homeReducers;
