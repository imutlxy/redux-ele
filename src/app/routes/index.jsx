import React from 'react';
import {Router, Route} from 'react-router';

import {
    Order,
    HomeView,
    Search,
    SignUp,
    Login,
    Me,
    Footer
} from '../components';

const routes = (history) => {
    return (
        <Router history={history}>
            <Route path="/" component={HomeView}/>
            <Route path="/home" component={HomeView}/>
            <Route path="/search" component={Search}/>
            <Route path="/order" component={Order}/>
            <Route path="/me" component={Me}/>
        </Router>
    );
};

export default routes;
