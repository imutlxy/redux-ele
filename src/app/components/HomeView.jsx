import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'antd';

import * as AppActionRouter from '../config/AppActionRouter';

class HomeView extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    handleBtnClick = (e) => {
        const {onClickAction, store} = this.props;

        console.log(this.props)
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
        return (
            <div>
                <Button
                    type="primary"
                    onClick={self.handleBtnClick}
                >
                    点击发送 action
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state && state.appReducer ? state.appReducer : {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AppActionRouter, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
