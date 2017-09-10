import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Button} from 'antd-mobile';

import Constants from '../../constants';
import Footer from './../footer';
import {util, mapStateToProps, mapDispatchToProps} from '../../utils';
import Header from '../header';
import './style/index.scss';

const {GOTO} = Constants;

/**
 * Header View
 */
@translate(['order'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class Order extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <div className='app-order'>
                <Header title='我的订单'/>
                <h1>{t('order:about_test')}</h1>
                <Footer />
            </div>
        );
    }
}

export default Order;
