import {push, goBack, goForward} from 'react-router-redux';

import Constants from '../../../constants';

const {GO_BACK, GO_FORWARD} = Constants;

let headerActions = {};

headerActions[GO_BACK] = function (action, dispatch, state) {
    dispatch(goBack());
};

headerActions[GO_FORWARD] = function (action, dispatch, state) {
    dispatch(goForward());
};

export default headerActions;
