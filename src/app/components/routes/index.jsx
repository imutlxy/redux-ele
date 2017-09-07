import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import HomeView from '../HomeView';
import About from '../About';
import Inbox from '../Inbox';
import SignUp from '../SignUp';
import Login from '../Login';

const routes = (history) => {
    return (
        <Router history={history}>
            <Route path="/" component={Login}/>
            <Route path="/home" component={HomeView}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="/about" component={About}/>
            <Route path="/inbox" component={Inbox}/>
        </Router>
    );
};

export default routes;
