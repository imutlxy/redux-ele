import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Toast} from 'antd-mobile';

import Constants from '../../constants';
import {authInstance} from '../../auth';
import Footer from './../footer';
import {util, axiosInstance, sessionStorageUtil, mapStateToProps, mapDispatchToProps} from '../../utils';

const {DROP_TO_CONTENT} = Constants;

@translate(['menuBar'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getUserSetting = () => {
        axiosInstance.get('/setting').then(response => {
            let data  = response.data;
            if (data.status === 200) {
                sessionStorageUtil.set({name: data.name, id: data.id, language: data.language});
                authInstance.userId = data.id;
                authInstance.userName = data.name;
            } else {
                Toast.fail(data.msg || '网络回应错误');
            }
        });
    }

    componentDidMount() {
        // this.getUserSetting();
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
