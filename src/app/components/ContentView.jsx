import React, {Component} from 'react';
import {Provider} from 'react-redux';

import {Layout} from 'antd';
const {Content} = Layout;

import SideBarView from './SideBar';
import actions from '../actions';
import reducers from '../reducers';
import {default as Store} from '../config/ConfigureStore';
import appMiddleWares from '../middleware/AppMiddleWare';
import '../style/_content.scss';

/**
 * App View
 */
class ContentView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let storeOptions = {};

        const defaultStates = Object.assign({});
        const defaultActions = Object.assign({}, actions);
        let defaultReducers = Object.assign({}, reducers);

        storeOptions.initialStates = defaultStates;
        storeOptions.actions = defaultActions;
        storeOptions.reducers = defaultReducers;
        storeOptions.preMiddleWares = appMiddleWares.preMiddleWares;
        storeOptions.postMiddleWares = appMiddleWares.postMiddleWares;

        const store = Store.configureStore(storeOptions);

        return (
            <Provider store={store}>
                <Layout className='app-content'>
                    <SideBarView/>
                    <Content>
                        Content
                    </Content>
                </Layout>
            </Provider>
        );
    }
}

export default ContentView;
