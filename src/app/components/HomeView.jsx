import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {translate} from 'react-i18next';
import {Button} from 'antd';

import appConfig from '../config';
const AppActionRouter = appConfig.router;

@translate(['menuBar'], {wait: true})
class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    handleBtnClick = (e) => {
        const {onClickAction, store} = this.props;
        // let language = this.props.i18n.language;
        // this.props.i18n.language = language.toLowerCase().includes('zh') ? 'en' : 'zh';

        let changeActiveKeyAction = {
            type: 'DROP_TO_CONTENT',
            content: {
                sideBar: '123432'
            }
        };
        onClickAction(changeActiveKeyAction, this.props);
    }

    render() {
        let self = this;
        const {t} = self.props;
        return (
            <div>
                <Button
                    type="primary"
                    onClick={self.handleBtnClick}
                >
                    {t('menuBar:click_test')}
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: state && state.appReducer ? state.appReducer : {}
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AppActionRouter, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
