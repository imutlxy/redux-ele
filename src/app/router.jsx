import React from 'react';
import {Router, Route} from 'react-router';
import {Toast} from 'antd-mobile';

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
    ForgotPassword,
    ErrorPage
} from './components';

/**
 * 跳转路由之前的校验
 */
const checkPermission = (nextState, replace, next) => {
    // Toast.fail('检测到您当前为登录，即将跳转到登陆页', 3, () => {
    //     replace('/me/logIn');
    //     next();
    // });
    next();
};

const routes = (history) => {
    return (
        <Router history={history}>
            <Route path="/" component={HomeView}/>
            <Route path="/home" component={HomeView}/>
            <Route path="/business/:id" component={BusinessDetail}/>
            <Route path="/search" component={Search}/>
            <Route path="/order" component={Order}/>
            <Route path="/me" component={Me}/>
            <Route path="/me/setting" component={Setting} onEnter={checkPermission}/>
            <Route path="/me/logIn" component={Login}/>
            <Route path="/me/signUp" component={SignUp}/>
            <Route path="/me/forgotPassword" component={ForgotPassword} onEnter={checkPermission}/>
            <Route path="/me/ownerPage" component={OwnerPage} onEnter={checkPermission}/>
            <Route path="/me/ownerPage/addressList" component={AddressList} onEnter={checkPermission}/>
            <Route path="/me/ownerPage/addressList/addressEditor" component={AddressEditor} onEnter={checkPermission}/>
            <Route path="*" component={ErrorPage}/>
        </Router>
    );
};

export default routes;
