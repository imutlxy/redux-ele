import Immutable from 'immutable';

import Constants from '../../../constants';

const {GET_HOME_BUSINESS, ENTER_BUSINESS} = Constants;

let homeActions = {};

homeActions[GET_HOME_BUSINESS] = function (action, dispatch, state) {
    dispatch(action);
};

homeActions[ENTER_BUSINESS] = function (action, dispatch, state) {
    dispatch(action);
};

export default homeActions;
