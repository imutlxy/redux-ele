import {push, goBack, goForward} from 'react-router-redux';

import Constants from '../../../constants';

const {GOTO} = Constants;

let footerActions = {};

footerActions[GOTO] = function (action, dispatch, state) {
    dispatch(push(action['content']));
};

export default footerActions;
