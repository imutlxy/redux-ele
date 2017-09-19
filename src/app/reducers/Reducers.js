import Immutable from 'immutable';

import Constants from '../constants';

const {DROP_TO_CONTENT, GET_HOME_BUSINESS} = Constants;

let reducers = {};

reducers[DROP_TO_CONTENT] = function (state, action) {
    let foo = Immutable.fromJS(state);
    let newArr = foo.mergeDeep(Immutable.fromJS(action.content));
    return newArr.toJS();
};

reducers[GET_HOME_BUSINESS] = function (state, action) {
    let newState = Object.assign({}, state);
    newState['homeBusinesses'] = [].concat((newState['homeBusinesses'] || []), action['content']);
    return newState;
};

export default reducers;
