import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Button, Toast, List, WhiteSpace} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, connectToStore} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';
import Footer from '../footer';
import './style/index.scss';

const {ENTER_BUSINESS, GOTO} = Constants;
const Item = List.Item;

/**
 * Header View
 */
@translate(['me'], {wait: true})
@connectToStore
class Me extends Component {
    constructor(props) {
        super(props);
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.state = {
            avatarText: (userInfo && `欢迎您，${userInfo.name}`) || '登录/注册'
        };
    }

    componentDidMount() {
    }

    handleSettingClick = (path = '') => {
        path && util.transformRouter(this.props, path);
    }

    handleAvatarClick = (e) => {
        e.preventDefault();
        // util.transformRouter(this.props, '/me/ownerPage');
        if (sessionStorage.getItem('userInfo')) {
            util.transformRouter(this.props, '/me/ownerPage');
        } else {
            util.transformRouter(this.props, '/me/logIn');
            // window.location.href = 'login.html';
        }
    }

    render() {
        let self = this;
        const {t} = this.props;
        const userData = JSON.parse(localStorage.getItem('userInfo')) || {};
        return (
            <div className='app-me'>
                <Header title={t('title')}/>
                <List className='app-me-avatar-panel'>
                    <Item
                        thumb={userData['avatar'] || './resource/images/default-avatar.png'}
                        arrow='horizontal'
                        onClick={self.handleAvatarClick}
                    >{authInstance.userName ? `${authInstance.userName}` : self.state.avatarText}</Item>
                </List>
                <WhiteSpace />
                <List className='app-me-list'>
                    <Item
                        thumb={<i className='fa fa-bars'/>}
                        arrow='horizontal'
                        onClick={self.handleSettingClick.bind(this, '/order')}
                    >{t('order')}</Item>
                </List>
                <WhiteSpace />
                <List className='app-me-list'>
                    <Item
                        thumb='https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
                        arrow='horizontal'
                        onClick={self.handleSettingClick.bind(this, '/me/setting')}
                    >{t('setting')}</Item>
                </List>
                <WhiteSpace />
                <List className='app-me-list'>
                    <Item thumb='https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png' arrow='empty'>{t('serviceCenter')}</Item>
                </List>
                <Footer />
            </div>
        );
    }
}

export default Me;
