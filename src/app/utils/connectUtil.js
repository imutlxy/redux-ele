import {bindActionCreators} from 'redux';
import appConfig from '../config';
const AppActionRouter = appConfig.router;

function mapStateToProps(state) {
    if (state) {
        return {
            store: state.appReducer || {},
            routerStore: (state.routing && state.routing.locationBeforeTransitions) || {}
        };
    } else {
        return {
            store: {},
            routerStore: {}
        };
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AppActionRouter, dispatch);
}

export {mapStateToProps, mapDispatchToProps};
