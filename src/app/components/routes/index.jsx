import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import HomeView from '../HomeView';
import About from '../About';
import Inbox from '../Inbox';

const routes = (history) => {
    return (
        <Router history={history}>
            <Route path="/" component={HomeView}/>
            <Route path="/about" component={About}/>
            <Route path="/inbox" component={Inbox}/>
        </Router>
    );
};

export default routes;
