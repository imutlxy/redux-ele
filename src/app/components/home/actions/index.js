import Immutable from 'immutable';

import Constants from '../../../constants';

const {GET_HOME_BUSINESS, DROP_TO_CONTENT} = Constants;

let homeActions = {};

homeActions[GET_HOME_BUSINESS] = function (action, dispatch, state) {
    dispatch(action);
};

homeActions[DROP_TO_CONTENT] = function (action, dispatch, state) {
    dispatch(action);
};

export default homeActions;
