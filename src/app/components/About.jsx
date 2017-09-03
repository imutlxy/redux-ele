import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {hashHistory} from 'react-router';
import {Button} from 'antd';

import Constants from '../constants';
import appConfig from '../config';

const {GOTO} = Constants;
const AppActionRouter = appConfig.router;

/**
 * Header View
 */
@translate(['about'], {wait: true})
class About extends Component {
    constructor(props) {
        super(props);
    }

    gotoBtnClick = (e) => {
        e.stopPropagation();
        const {onClickAction} = this.props;
        let gotoAction = {
            type: GOTO,
            content: '/inbox'
        };
        onClickAction(gotoAction, this.props);
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <h1>{t('about:about_test')}</h1>
                <Button type="primary" onClick={this.gotoBtnClick}>去 Inbox</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
