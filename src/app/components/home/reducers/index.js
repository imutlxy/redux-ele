import Immutable from 'immutable';

import Constants from '../../../constants';

const {GET_HOME_BUSINESS, DROP_TO_CONTENT} = Constants;

let homeReducers = {};

homeReducers[GET_HOME_BUSINESS] = function (state, action) {
    let newState = Object.assign({}, state);
    newState['homeBusinesses'] = [].concat((newState['homeBusinesses'] || []), action['content']);
    return newState;
};

homeReducers[DROP_TO_CONTENT] = function (state, action) {
    let foo = Immutable.fromJS(state);
    let newArr = foo.mergeDeep(Immutable.fromJS(action.content));
    return newArr.toJS();
};

export default homeReducers;
