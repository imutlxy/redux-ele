import Constants from '../constants';

const {DROP_TO_CONTENT} = Constants;

let actions = {};

actions[DROP_TO_CONTENT] = function (action, dispatch, state) {
    dispatch(action);
};

export default actions;
