import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Button} from 'antd';

import Constants from '../../constants';
import {authInstance} from '../../auth';
import Footer from './../footer';
import {util, axiosInstance, mapStateToProps, mapDispatchToProps} from '../../utils';

const {DROP_TO_CONTENT} = Constants;

@translate(['menuBar'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let self = this;
        const {t} = self.props;
        return (
            <div className='home-view'>
                <h1>{t('menuBar:content_test')}</h1>
                <Footer />
            </div>
        );
    }
}

export default HomeView;
