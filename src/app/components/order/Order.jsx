import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Button} from 'antd';

import Constants from '../../constants';
import Footer from './../footer';
import {util, mapStateToProps, mapDispatchToProps} from '../../utils';

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
            <div>
                <h1>{t('order:about_test')}</h1>
                <Footer />
            </div>
        );
    }
}

export default Order;
