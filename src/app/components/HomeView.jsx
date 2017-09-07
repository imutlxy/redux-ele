import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {translate} from 'react-i18next';
import {Button, message} from 'antd';

import Constants from '../constants';
import i18n from '../i18n';
import appConfig from '../config';
import {axiosInstance} from '../utils/axiosInstance';

const {DROP_TO_CONTENT, GOTO} = Constants;
const AppActionRouter = appConfig.router;

@translate(['menuBar'], {wait: true})
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signOutBtnDisabled: true
        };
    }

    handleTransLan = (e) => {
        e.stopPropagation();
        const {onClickAction, store} = this.props;
        let language = this.props.i18n.language;
        i18n.changeLanguage(language.toLowerCase().includes('zh') ? 'en' : 'zh');

        let changeActiveKeyAction = {
            type: DROP_TO_CONTENT,
            content: {
                sideBar: '123432'
            }
        };
        onClickAction(changeActiveKeyAction, this.props);
    }

    gotoBtnClick = (e) => {
        e.stopPropagation();
        const {onClickAction} = this.props;
        let gotoAction = {
            type: GOTO,
            content: '/about'
        };
        onClickAction(gotoAction, this.props);
    }

    gotoLoginPage = () => {
        const {onClickAction} = this.props;
        let gotoAction = {
            type: GOTO,
            content: '/'
        };
        onClickAction(gotoAction, this.props);
    }

    /**
     * 登出
     */
    signOutClick = (e) => {
        e.preventDefault();
        let self = this;
        axiosInstance.get('/signOut').then(response => {
            let data  = response.data;
            if (data.status === 200) {
                message.success(data.msg);
                self.gotoLoginPage();
            } else {
                message.error(data.msg || '网络回应错误');
            }
        });
    }

    render() {
        let self = this;
        const {t} = self.props;
        return (
            <div className='home-view'>
                <h1>{t('menuBar:content_test')}</h1>
                <Button className='btn' type='primary' onClick={self.handleTransLan}>点击切换语言</Button>
                <Button className='btn' type='primary' onClick={self.gotoBtnClick}>跳转到 about</Button>
                <div className='login-form'>
                    <Button className='btn' type='primary' onClick={self.signOutClick}>登出</Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: (state && state.appReducer) || {}
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AppActionRouter, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
