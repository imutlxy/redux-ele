import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Toast, Button} from 'antd-mobile';

import Constants from '../../constants';
import Footer from './../footer';
import CategoryCarousel from './CategoryCarousel';
import {util, axiosInstance, connectToStore} from '../../utils';
import BusinessItem from './BusinessItem';

const {GET_HOME_BUSINESS, MERGE_DATA} = Constants;

@translate(['home'], {wait: true})
@connectToStore
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bottomText: '点击加载更多···'
        };
    }

    getBusinesses = async (param) => {
        let self = this;
        const {onClickAction} = self.props;
        const response = await axiosInstance.get('/home/getBusiness', {params: param || {}});
        const data  = response && response.data || {};
        if (response.data && response.data.status === 200) {
            if (Array.isArray(data.data) && data.data.length > 0) {
                let action = {
                    type: GET_HOME_BUSINESS,
                    content: data.data
                };
                onClickAction(action, self.props);
            } else {
                self.setState({bottomText: '我是有底线的'});
            }
        } else {
            Toast.fail(response && response.data && response.data.msg || '网络回应错误');
        }
    }

    componentWillMount() {
        let self = this;
        const {store, onClickAction} = self.props;
        let p1 = undefined;
        let p2 = undefined;
        if(!store['homeBusinesses']) {
            p1 = axiosInstance.get('/home/getBusiness');
        }
        if(!store['user'] && sessionStorage.getItem('userInfo')) {
            const userData = JSON.parse(sessionStorage.getItem('userInfo'));
            p2 = axiosInstance.get('/user/userData', {params: {id: userData.id || null}});
        }
        if (!p1 && !p2) {
            return;
        }
        Promise.all([p1, p2]).then(([data1, data2]) => {
            let action = {
                type: MERGE_DATA,
                content: {}
            };
            if (data1) {
                action['content']['homeBusinesses'] = data1['data']['data'];
            }
            if (data2) {
                action['content']['user'] = data2['data']['data'];
            }
            if (Object.keys(action['content']).length > 0) {
                onClickAction(action, self.props);
            }
        });
    }

    loadMore = (e) => {
        e.stopPropagation();
        let self = this;
        const len = (self.props.store['homeBusinesses'] || []).length;
        self.getBusinesses({startPos: len, pageSize: 5}).catch(e => console.error('首页获取商家', e));
    }

    render() {
        let self = this;
        const {t, store} = self.props;
        const businessesInner = (store['homeBusinesses'] || []).map((val, i) => (<BusinessItem data={val} key={val.id}/>));
        return (
            <div className='app-home'>
                <div className='app-header'>{t('title')}</div>
                <CategoryCarousel/>
                <div className='nearby-merchants'>
                    <i className='fa fa-bandcamp' style={{fontSize: '.3rem', margin: '.3rem 0'}}>&nbsp;&nbsp;附近商家</i>
                    <ul>{businessesInner}</ul>
                    <Button className='load-more-btn' onClick={self.loadMore}>{self.state.bottomText}</Button>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HomeView;
