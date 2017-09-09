import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Button} from 'antd';

import i18n from '../../i18n';
import Constants from '../../constants';
import {util, axiosInstance, mapStateToProps, mapDispatchToProps} from '../../utils';
import {authInstance} from '../../auth';
import Footer from './../footer';

const {DROP_TO_CONTENT, GOTO} = Constants;

/**
 * Header View
 */
@translate(['me'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class Me extends Component {
    constructor(props) {
        super(props);
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

    /**
     * 登出
     */
    signOutClick = (e) => {
        e.preventDefault();
        let self = this;
        axiosInstance.get('/signOut').then(response => {
            let data  = response.data;
            if (data.status === 404) {
                // self.gotoLoginPage();
            } else {
                // message.error(data.msg || '网络回应错误');
            }
        });
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <h1>{t('me:me_test')}</h1>
                {/*<Button className='btn' type='primary' onClick={self.handleTransLan}>点击切换语言</Button>*/}
                {/*<div className='login-form'>*/}
                    {/*<h2>{authInstance.userId && authInstance.userName ? `${authInstance.userName} 欢迎你` : ''}</h2>*/}
                    {/*<br/>*/}
                    {/*<Button className='btn' type='primary' onClick={self.signOutClick}>登出</Button>*/}
                {/*</div>*/}
                <Footer />
            </div>
        );
    }
}

export default Me;
