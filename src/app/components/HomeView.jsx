import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {translate} from 'react-i18next';
import {Button} from 'antd';

import Constants from '../constants';
import i18n from '../i18n';
import appConfig from '../config';

const {DROP_TO_CONTENT, GOTO} = Constants;
const AppActionRouter = appConfig.router;

@translate(['menuBar'], {wait: true})
class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    handleBtnClick = (e) => {
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

    render() {
        let self = this;
        const {t} = self.props;
        return (
            <div>
                <h1>{t('menuBar:content_test')}</h1>
                <Button type="primary" onClick={self.handleBtnClick}>点击切换</Button>
                <br/>
                <br/>
                <Button type="primary" onClick={self.gotoBtnClick}>跳转到 about</Button>
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
