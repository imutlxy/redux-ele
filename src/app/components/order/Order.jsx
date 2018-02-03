import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Button} from 'antd-mobile';

import Constants from '../../constants';
import Footer from './../footer';
import {util, connectToStore} from '../../utils';
import Header from '../header';
import './style/index.scss';

const {GOTO} = Constants;

/**
 * Header View
 */
@translate(['order'], {wait: true})
@connectToStore
class Order extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        util.setDocumentScrollTop('orderPageScrollTop');
    }

    componentWillUnmount() {
        util.getDocumentScrollTop('orderPageScrollTop');
    }

    render() {
        const {t} = this.props;
        return (
            <div className='app-order'>
                <Header title={t('title')}/>
                <h1>我的订单</h1>
                <Footer />
            </div>
        );
    }
}

export default Order;
