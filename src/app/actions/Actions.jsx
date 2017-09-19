import {push, goBack, goForward} from 'react-router-redux';

import Constants from '../constants';

const {DROP_TO_CONTENT, GOTO, GO_BACK, GO_FORWARD, GET_HOME_BUSINESS} = Constants;

let actions = {};

actions[DROP_TO_CONTENT] = function (action, dispatch, state) {
    dispatch(action);
};

actions[GOTO] = function (action, dispatch, state) {
    dispatch(push(action['content']));
};

actions[GO_BACK] = function (action, dispatch, state) {
    dispatch(goBack());
};

actions[GO_FORWARD] = function (action, dispatch, state) {
    dispatch(goForward());
};

actions[GET_HOME_BUSINESS] = function (action, dispatch, state) {
    dispatch(action);
};

export default actions;
