import Immutable from 'immutable';

import Constants from '../../../constants';

const {GET_HOME_BUSINESS, GET_SEARCH_BUSINESS, ENTER_BUSINESS, MERGE_DATA} = Constants;

let homeActions = {};

homeActions[GET_HOME_BUSINESS] = function (action, dispatch, state) {
    dispatch(action);
};

homeActions[GET_SEARCH_BUSINESS] = function (action, dispatch, state) {
    dispatch(action);
};

homeActions[ENTER_BUSINESS] = function (action, dispatch, state) {
    dispatch(action);
    action.resolve && action.resolve('success');
};

homeActions[MERGE_DATA] = function (action, dispatch, state) {
    dispatch(action);
};

export default homeActions;
