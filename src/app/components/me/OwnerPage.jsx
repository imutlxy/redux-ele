import React, {Component} from 'react';
import {Toast, Picker, List, WhiteSpace} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, connectToStore} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';

const Item = List.Item;
const {ENTER_BUSINESS, GOTO} = Constants;

/**
 * Header View
 */
@connectToStore
class OwnerPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((pos) => {
        //         console.log(pos);
        //     }, (err) => {
        //         console.log(err);
        //     }, {timeout: 10000});
        // }
    }

    handleItemClick = (path = '') => {
        path && util.transformRouter(this.props, path);
    }

    render() {
        let self = this;
        return (
            <div className='app-me'>
                <Header title='账号管理'/>
                <WhiteSpace size="lg"/>
                <List className='app-me-list'>
                    <Item
                        arrow='horizontal'
                        onClick={self.handleItemClick.bind(this, '/me/ownerPage/addressList')}
                    >收货地址管理</Item>
                </List>
                <List className='app-me-list'>
                    <Item
                        arrow='horizontal'
                        onClick={self.handleItemClick.bind(this, '/order')}
                    >修改登录密码</Item>
                </List>
            </div>
        );
    }
}

export default OwnerPage;
