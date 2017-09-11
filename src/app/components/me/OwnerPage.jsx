import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Toast} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, mapStateToProps, mapDispatchToProps} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';

const {DROP_TO_CONTENT, GOTO} = Constants;

/**
 * Header View
 */
@translate(['me'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class OwnerPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let self = this;
        const {t} = this.props;
        return (
            <div className='app-me'>
                <Header title='我的页面'/>
                <h1>我的页面</h1>
            </div>
        );
    }
}

export default OwnerPage;
