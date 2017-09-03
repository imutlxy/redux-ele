import {push} from 'react-router-redux';

import Constants from '../constants';

const {DROP_TO_CONTENT, GOTO} = Constants;

let actions = {};

actions[DROP_TO_CONTENT] = function (action, dispatch, state) {
    dispatch(action);
};

actions[GOTO] = function (action, dispatch, state) {
    dispatch(push(action['content']));
};

export default actions;
