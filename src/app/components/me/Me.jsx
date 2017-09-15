import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Button, Toast, List, Icon} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, mapStateToProps, mapDispatchToProps} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';
import Footer from '../footer';

const {DROP_TO_CONTENT, GOTO} = Constants;
const Item = List.Item;

/**
 * Header View
 */
@translate(['me'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarText: '登录/注册'
        };
    }

    componentDidMount() {
    }

    handleSettingClick= (e) => {
        e.preventDefault();
        util.transformRouter(this.props, '/me/setting');
    }

    handleAvatarClick = (e) => {
        e.preventDefault();
        if (authInstance.userName) {
            util.transformRouter(this.props, '/me/ownerPage');
        } else {
            util.transformRouter(this.props, '/me/logIn');
        }
    }

    render() {
        let self = this;
        const {t} = this.props;
        return (
            <div className='app-me'>
                <Header title='我的'/>
                <List className='app-me-avatar-panel'>
                    <Item
                        thumb={<Icon type='loading' />}
                        arrow='horizontal'
                        onClick={self.handleAvatarClick}
                    >{authInstance.userName ? `欢迎您，${authInstance.userName}` : '登录/注册'}</Item>
                </List>
                <List className='app-me-list'>
                    <Item
                        thumb='https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
                        arrow='horizontal'
                        onClick={self.handleSettingClick}
                    >我的设置</Item>
                </List>
                <List className='app-me-list'>
                    <Item thumb='https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png' arrow='horizontal'>服务中心</Item>
                </List>
                <Footer />
            </div>
        );
    }
}

export default Me;
