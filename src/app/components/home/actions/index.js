import Immutable from 'immutable';

import Constants from '../../../constants';

const {GET_HOME_BUSINESS, ENTER_BUSINESS, MERGE_DATA} = Constants;

let homeActions = {};

homeActions[GET_HOME_BUSINESS] = function (action, dispatch, state) {
    dispatch(action);
};

homeActions[ENTER_BUSINESS] = function (action, dispatch, state) {
    dispatch(action);
};

homeActions[MERGE_DATA] = function (action, dispatch, state) {
    dispatch(action);
};

export default homeActions;
