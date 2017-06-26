import Immutable from 'immutable';

import Constants from '../constants';

const {DROP_TO_CONTENT} = Constants;

let reducers = {};

reducers[DROP_TO_CONTENT] = function (state, action) {
    let foo = Immutable.fromJS(state);
    let newArr = foo.mergeDeep(Immutable.fromJS(action.content));
    return newArr.toJS();
};

export default reducers;
