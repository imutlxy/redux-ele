import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Toast, Button} from 'antd-mobile';

import Constants from '../../constants';
import {authInstance} from '../../auth';
import Footer from './../footer';
import CategoryCarousel from './CategoryCarousel';
import {util, axiosInstance, sessionStorageUtil, connectToStore} from '../../utils';
import BusinessItem from './BusinessItem';

const {DROP_TO_CONTENT} = Constants;

@translate(['home'], {wait: true})
@connectToStore
class HomeView extends Component {
    constructor(props) {
        super(props);
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

    loadMore = (e) => {
        e.stopPropagation();
        console.log('加载更多');
    }

    render() {
        let self = this;
        const {t} = self.props;
        const businessesInner = [1].map((val, i) => (<BusinessItem url={`/business/${util.getRandomKey()}`} key={i}/>));
        return (
            <div className='app-home'>
                <div className='app-header'>{t('title')}</div>
                <CategoryCarousel/>
                <div className='nearby-merchants'>
                    <i className='fa fa-bandcamp' style={{fontSize: '.3rem', margin: '.3rem 0'}}>&nbsp;&nbsp;附近商家</i>
                    {businessesInner}
                    <Button className='load-more-btn' onClick={self.loadMore}>点击加载更多···</Button>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HomeView;
