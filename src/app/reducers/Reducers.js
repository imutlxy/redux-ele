import Immutable from 'immutable';

import Constants from '../constants';

const {DROP_TO_CONTENT, GOTO, GO_BACK, GO_FORWARD} = Constants;

let reducers = {};

reducers[DROP_TO_CONTENT] = function (state, action) {
    let foo = Immutable.fromJS(state);
    let newArr = foo.mergeDeep(Immutable.fromJS(action.content));
    return newArr.toJS();
};

// reducers[GOTO] = function (state, action) {
//     return state;
// };

// reducers[GO_BACK] = function (state, action) {
//     return state;
// };

// reducers[GO_FORWARD] = function (state, action) {
//     return state;
// };

export default reducers;
