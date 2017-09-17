import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Toast, Carousel, WhiteSpace, WingBlank} from 'antd-mobile';

import Constants from '../../constants';
import {authInstance} from '../../auth';
import Footer from './../footer';
import CategoryCarousel from './CategoryCarousel';
import {util, axiosInstance, sessionStorageUtil, mapStateToProps, mapDispatchToProps} from '../../utils';

const {DROP_TO_CONTENT} = Constants;

@translate(['home'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['', '', ''],
            initialHeight: 200
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
            <div className='app-home'>
                <div className='app-header'>{t('title')}</div>
                <CategoryCarousel/>
                <div className='nearby-merchants'>
                    <i className='fa fa-bandcamp' style={{fontSize: '.3rem', margin: '.3rem 0'}}>&nbsp;&nbsp;附近商家</i>
                    <div className='app-seller-list'>
                        <div className='app-seller-list-left'>
                            <div className='app-seller-list-left-icon'><img src='../../resource/imgs/favicon.png'/></div>
                            <div className='app-seller-list-left-desc'>sdf</div>
                        </div>
                        <div className='app-seller-list-right'>ewtrwt</div>
                    </div>
                    <div className='app-seller-list'>
                        <div className='app-seller-list-left'>
                            <div className='app-seller-list-left-icon'><img src='../../resource/imgs/favicon.png'/></div>
                            <div className='app-seller-list-left-desc'>sdf</div>
                        </div>
                        <div className='app-seller-list-right'>ewtrwt</div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HomeView;
