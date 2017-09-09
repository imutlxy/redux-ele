import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import {syncHistoryWithStore} from 'react-router-redux';
import {hashHistory} from 'react-router';

import {default as appActions} from './actions';
import {default as appReducers} from './reducers';
import {default as Store} from './config/ConfigureStore';
import appMiddleWares from './middleware/AppMiddleWare';

import {i18n, locales} from './i18n';
import {merge} from './utils/object';
import routes from './routes';
// import 'antd/dist/antd.css';
import './style/_content.scss';

/**
 * App View
 */
class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const extraLocales = this.props.locales || {};
        const lanResource = merge(locales, extraLocales);
        // 添加i18n语言包
        for (let ns in lanResource['zh']) {
            if (lanResource['zh'].hasOwnProperty(ns)) {
                i18n.addResourceBundle('zh', ns, lanResource['zh'][ns]);
                i18n.addResourceBundle('en', ns, lanResource['en'][ns]);
            }
        }
    }

    render() {
        let storeOptions = {};

        const defaultStates = {};
        const allActions = Object.assign({}, appActions);  //此处可以并入其它模块中的 action
        const allReducers = Object.assign({}, appReducers);  //此处可以并入其它模块中的 reducer
        const preMiddleWares = Object.assign({}, appMiddleWares.preMiddleWares);  //此处可以并入其它模块中的 preMiddleWares
        const postMiddleWares = Object.assign({}, appMiddleWares.postMiddleWares);  //此处可以并入其它模块中的 postMiddleWares

        storeOptions.initialStates = defaultStates;
        storeOptions.actions = allActions;
        storeOptions.reducers = allReducers;
        storeOptions.preMiddleWares = preMiddleWares;
        storeOptions.postMiddleWares = postMiddleWares;

        const store = Store.configureStore(storeOptions);
        const history = syncHistoryWithStore(hashHistory, store);

        return (
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    {routes(history)}
                </I18nextProvider>
            </Provider>
        );
    }
}

export default App;
