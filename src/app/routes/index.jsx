import React from 'react';
import {Router, Route} from 'react-router';

import {
    HomeView,
    BusinessDetail,
    Order,
    Search,
    Me,
    Setting,
    Login,
    OwnerPage,
    SignUp,
    AddressList,
    AddressEditor,
    ForgotPassword
} from '../components';

const routes = (history) => {
    return (
        <Router history={history}>
            <Route path="/" component={HomeView}/>
            <Route path="/home" component={HomeView}/>
            <Route path="/business/:id" component={BusinessDetail}/>
            <Route path="/search" component={Search}/>
            <Route path="/order" component={Order}/>
            <Route path="/me" component={Me}/>
            <Route path="/me/setting" component={Setting}/>
            <Route path="/me/logIn" component={Login}/>
            <Route path="/me/signUp" component={SignUp}/>
            <Route path="/me/forgotPassword" component={ForgotPassword}/>
            <Route path="/me/ownerPage" component={OwnerPage}/>
            <Route path="/me/addressList" component={AddressList}/>
            <Route path="/me/addressList/addressEditor" component={AddressEditor}/>
        </Router>
    );
};

export default routes;
