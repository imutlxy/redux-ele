import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {Button} from 'antd';

import appConfig from '../config';
import Constants from '../constants';

const {GOTO} = Constants;
const AppActionRouter = appConfig.router;

/**
 * Header View
 */
@translate(['inbox'], {wait: true})
class Inbox extends Component {
    constructor(props) {
        super(props);
    }

    gotoBtnClick = (e) => {
        e.stopPropagation();
        const {onClickAction} = this.props;
        let gotoAction = {
            type: GOTO,
            content: '/'
        };
        onClickAction(gotoAction, this.props);
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <h1>{t('inbox:inbox_test')}</h1>
                <Button type="primary" onClick={this.gotoBtnClick}>去 home</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
