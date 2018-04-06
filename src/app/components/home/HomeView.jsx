import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Toast, Button} from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';

import Constants from '../../constants';
import Footer from './../footer';
import CategoryCarousel from './CategoryCarousel';
import {util, axiosInstance, connectToStore} from '../../utils';
import BusinessItem from './BusinessItem';
import './style/index.scss';

const {GET_HOME_BUSINESS, MERGE_DATA} = Constants;

@translate(['home'], {wait: true})
@connectToStore
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.pageSize = 5;
        this.state = {
            hasMore: true,
            bottomText: '加载中···'
        };
    }

    getBusinesses = async (param) => {
        let self = this;
        const {onClickAction} = self.props;
        const response = await axiosInstance.get('/business/getBusiness', {params: param || {}});
        const data = response && response.data || {};
        if (data) {
            if (Array.isArray(data.data) && data.data.length > 0) {
                let action = {
                    type: GET_HOME_BUSINESS,
                    content: data.data
                };
                onClickAction(action, self.props);
            } else {
                self.setState({bottomText: '我是有底线的', hasMore: false});
            }
        } else {
            Toast.fail(response && response.data && response.data.msg || '网络回应错误');
        }
    }

    componentWillMount() {
        let self = this;
        const {store, onClickAction} = self.props;
        if (!store['hasQueryingBusinessData'] && (!store['userInfo'] || !sessionStorage.getItem('userInfo'))) {
            let action = {
                type: GET_HOME_BUSINESS,
                content: {}
            };
            axiosInstance.get('/user/currentUser').then(res => {
                action.content = {userInfo: res.data && res.data.data};
                onClickAction(action, self.props);
            }).catch(e => {
                action.type = MERGE_DATA;
                action.content = {hasQueryingBusinessData: true};
                onClickAction(action, self.props);
            });
        }
    }

    componentDidMount() {
        util.setDocumentScrollTop('homePageScrollTop');
    }

    componentWillUnmount() {
        util.getDocumentScrollTop('homePageScrollTop');
    }

    // TODO 首屏进来同一时间可能会请求多次，所以会存在重复数据的问题
    loadMore = (page) => {
        page -= 1;
        page = page < 0 ? 0 : page;
        this.getBusinesses({
            page: page,
            size: this.pageSize
        }).catch(e => {
            Toast.fail(e.msg || '请求数据出错', 3);
            this.setState({bottomText: '请求数据出错', hasMore: false});
        });
    }

    logIn = (e) => {
        e.stopPropagation();
        util.transformRouter(this.props, '/me/logIn');
    }

    /**
     * 添加商家测试数据
     */
    addTestData = () => {
        let self = this;
        let testData = [];
        for (let i = 1; i < 101; i++) {
            testData.push({
                shopName: '标题--' + i,
                score: parseFloat((Math.random() * 6).toFixed(1)),
                deliveryFee: 20,
                monthlySales: Math.ceil(Math.random() * 2000),
                distance: Math.ceil(Math.random() * 1000),
                serviceTime: Math.ceil(Math.random() * 60),
                mailType: ['蜂鸟', '达达', '韵达', '中通', '顺丰', '圆通'][Math.floor(Math.random() * 6)],
                whetherDistribution: true,
                onTime: i % 4 === 0,
                hasInvoice: i % 7 === 0,
                newStore: i % 10 === 0,
                whetherBrand: true,
                dispatchLimit: 20,
                lowerDeliveryFeeLimit: 20,
                icon: 'http://owdivnpno.bkt.clouddn.com/2016062842269313.jpg'
            });
        }
        axiosInstance.post('/business/save', testData).then(res => {
            Toast.success('成功添加商家数！');
            (self.props.store.homeBusinesses || []).length === 0 && self.loadMore(1);
        });
    }

    render() {
        let self = this;
        const {t, store} = self.props;
        const businessList = store['homeBusinesses'] || [];
        const businessesInner = businessList.map(val => val && val['businessId'] &&
        <BusinessItem key={val['businessId']} businessData={val}/>).filter(val => val);
        return (
            <div className='app-home'>
                <div className='app-header'>
                    <span>{t('title')}</span>
                    <Button
                        style={{
                            display: sessionStorage.getItem('userInfo') ? 'none' : 'block',
                            position: 'absolute'
                        }}
                        onClick={self.logIn}>
                        登录/注册
                    </Button>
                </div>
                <CategoryCarousel/>
                <div className='nearby-merchants'>
                    <i className='fa fa-bandcamp' style={{fontSize: '.3rem', margin: '.3rem 0'}}>&nbsp;&nbsp;附近商家</i>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMore}
                    >
                        <ul className='home-shop-list'>{businessesInner}</ul>
                    </InfiniteScroll>
                    <p className='load-more'>{self.state.bottomText}</p>
                    {
                        process.env.NODE_ENV !== 'production' ?
                            <Button disabled={businessList.length > 0} onClick={this.addTestData}>添加测试数据</Button>
                            :
                            null
                    }
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HomeView;
