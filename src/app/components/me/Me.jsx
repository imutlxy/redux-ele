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
        this.userInfo = sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')) || props.store.userInfo;
        this.state = {
            avatarText: (this.userInfo && `欢迎您，${this.userInfo.username}`) || '登录/注册'
        };
    }

    componentDidMount() {
    }

    handleSettingClick = (path = '') => {
        path && util.transformRouter(this.props, path);
    }

    handleAvatarClick = (e) => {
        e.preventDefault();
        this.userInfo ? util.transformRouter(this.props, '/me/ownerPage') : util.transformRouter(this.props, '/me/logIn');
    }

    render() {
        let self = this;
        const {t} = this.props;
        return (
            <div className='app-me'>
                <Header title={t('title')}/>
                <List className='app-me-avatar-panel'>
                    <Item
                        thumb={this.userInfo && this.userInfo['avatar'] || './resource/images/default-avatar.png'}
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
