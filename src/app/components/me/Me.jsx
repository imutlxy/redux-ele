import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Button, Toast, List, Icon} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, mapStateToProps, mapDispatchToProps} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';
import Footer from '../footer';
import './style/index.scss';

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
    }

    componentDidMount() {
    }

    handleSettingClick= (e) => {
        e.preventDefault();
        util.transformRouter(this.props, '/me/setting');
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
                        onClick={self.handleSettingClick}
                    >登录/注册</Item>
                </List>
                {/*<Button className='am-button' onClick={self.handleTransLan}>点击切换语言</Button>*/}
                {/*<div className='login-form'>*/}
                    {/*<h2>{authInstance.userId && authInstance.userName ? `${authInstance.userName} 欢迎你` : ''}</h2>*/}
                    {/*<br/>*/}
                    {/*<Button className='btn' onClick={self.signOutClick}>登出</Button>*/}
                {/*</div>*/}
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
