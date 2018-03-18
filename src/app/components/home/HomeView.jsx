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
        let p1 = undefined;
        let p2 = undefined;
        if (!store['homeBusinesses']) {
            p1 = axiosInstance.get('/business/getBusiness');
        }
        if (!store['userInfo'] || !sessionStorage.getItem('userInfo')) {
            const userData = JSON.parse(sessionStorage.getItem('userInfo'));
            p2 = axiosInstance.get('/user/currentUser', {params: {id: userData.id || null}});
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
                action['content']['userInfo'] = data2['data']['data'];
            }
            if (Object.keys(action['content']).length > 0) {
                onClickAction(action, self.props);
            }
        });
    }

    componentDidMount() {
        util.setDocumentScrollTop('homePageScrollTop');
    }

    componentWillUnmount() {
        util.getDocumentScrollTop('homePageScrollTop');
    }

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
            console.log(res);
        });
    }

    render() {
        let self = this;
        const {t, store} = self.props;
        const businessesInner = (store['homeBusinesses'] || []).map(val => val && <BusinessItem businessData={val}/>).filter(val => val);
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
                    {/*<Button onClick={this.addTestData}>添加测试数据</Button>*/}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HomeView;
