import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Toast, Button} from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';

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
        this.pageSize = 5;
        this.state = {
            hasMore: true,
            bottomText: '点击加载更多···'
        };
    }

    getBusinesses = async (param) => {
        let self = this;
        const {onClickAction} = self.props;
        const response = await axiosInstance.get('/home/getBusiness', {params: param || {}});
        const data = response && response.data || {};
        if (response.data && response.data.status === 200) {
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
            p1 = axiosInstance.get('/home/getBusiness');
        }
        if (!store['user'] && sessionStorage.getItem('userInfo')) {
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

    componentDidMount() {
        util.setDocumentScrollTop('homePageScrollTop');
    }

    componentWillUnmount() {
        util.getDocumentScrollTop('homePageScrollTop');
    }

    loadMore = (page) => {
        this.getBusinesses({
            startPos: page * this.pageSize,
            pageSize: this.pageSize
        }).catch(e => console.error('首页获取商家', e));
    }

    logIn = (e) => {
        e.stopPropagation();
        util.transformRouter(this.props, '/me/logIn');
    }

    render() {
        let self = this;
        const {t, store} = self.props;
        const businessesInner = (store['homeBusinesses'] || []).map((val, i) => (
            <BusinessItem
                key={val['id']}
                id={val['id']}
                icon={val['icon']}
                distance={val['distance']}
                dispatchLimit={val['lower_delivery_fee_limit']}
                deliveryFee={val['delivery_fee']}
                monthlySales={val['monthly_sales']}
                newStore={val['new_store']}
                expressType={val['express_type']}
                score={val['score']}
                serviceTime={val['service_time']}
                title={val['title']}
                whetherBrand={val['whether_brand']}
                hasInvoice={val['has_invoice']}
            />)
        );
        return (
            <div className='app-home'>
                <div className='app-header'>
                    <span>{t('title')}</span>
                    <Button style={{display: sessionStorage.getItem('userInfo') ? 'none' : 'block'}} onClick={self.logIn}>
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
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HomeView;
