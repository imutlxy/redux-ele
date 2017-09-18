import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import appConfig from '../config';
const AppActionRouter = appConfig.router;

export function mapStateToProps(state) {
    return {
        store: state.appReducer || {},
        routerStore: (state.routing && state.routing.locationBeforeTransitions) || {}
    };
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(AppActionRouter, dispatch);
}

export default function connectToStore(component) {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}
