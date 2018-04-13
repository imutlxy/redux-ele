import React, {Component} from 'react';
import {translate} from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import {Button, Toast, Modal, Checkbox, WhiteSpace, SearchBar} from 'antd-mobile';

import Constants from '../../constants';
import Footer from './../footer';
import {util, connectToStore, axiosInstance} from '../../utils';
import Header from '../header';
import BusinessItem from '../home/BusinessItem';
import CommonButton from '../common/CommonButton';
import './style/index.scss';

const {GET_SEARCH_BUSINESS, REPLACE_DATA} = Constants;

/**
 * 搜索页
 */
@translate(['search'], {wait: true})
@connectToStore
class Search extends Component {
    constructor(props) {
        super(props);
        this.pageSize = 15;
        let sorts = [];
        sorts.push({property: 'distance', direction: 'desc'});
        sorts.push({property: 'score', direction: 'asc'});
        sorts.push({property: 'monthlySales', direction: 'desc'});
        sorts.push({property: 'serviceTime', direction: 'asc'});
        this.state = {
            hasMore: true,
            focused: false,
            modalVisible: false,
            bottomText: '加载中···'
        };
        this.param = {
            page: 0,
            size: this.pageSize,
            sorts: sorts,
            filters: []
        };
        this.filterParam = {
            newStore: false,
            onTime: true,
            whetherBrand: true,
            whetherDistribution: true
        };
    }

    componentDidMount() {
        util.setDocumentScrollTop('searchPageScrollTop');
    }

    componentWillUnmount() {
        util.getDocumentScrollTop('searchPageScrollTop');
    }

    handleClose = () => {
        this.setState({modalVisible: false});
    }

    changeFilterParam = () => {
        let filters = [];
        this.setState({modalVisible: false}, () => {
            for (let key in this.filterParam) {
                filters.push({name: key, value: this.filterParam[key]});
            }
            this.getBusinesses({...this.param, filters: filters}).catch(e => {
                Toast.fail(e.msg || '请求数据出错', 3);
                this.setState({bottomText: '请求数据出错', hasMore: false});
            });
        });
    }

    getBusinesses = async (paramData = {}, actionType = GET_SEARCH_BUSINESS) => {
        let self = this;
        const {onClickAction} = self.props;
        const param = {
            ...paramData,
            sorts: JSON.stringify(paramData.sorts),
            filterParam: JSON.stringify(paramData.filters)
        };
        const response = await axiosInstance.get('/business/getBusiness', {params: param});
        const data = response && response.data || {};
        if (data) {
            if (Array.isArray(data.data) && data.data.length > 0) {
                let action = {
                    type: actionType,
                    dataKey: 'searchBusinesses',
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

    loadMore = (page) => {
        page = page < 0 ? 0 : page;
        this.param.page = page;
        this.getBusinesses(this.param).catch(e => {
            Toast.fail(e.msg || '请求数据出错', 3);
            this.setState({bottomText: '请求数据出错', hasMore: false});
        });
    }

    handleCommonBtnChange = (key, value) => {
        if (key && value) {
            if (key === 'otherCondition') {
                this.setState({modalVisible: true});
            } else {
                let index = this.param.sorts.findIndex((val) => val.property === key && val.direction !== value);
                if (index !== -1) {
                    this.param.sorts[index]['direction'] = value;
                    this.getBusinesses(this.param, REPLACE_DATA).catch(e => {
                        Toast.fail(e.msg || '请求数据出错', 3);
                        this.setState({bottomText: '请求数据出错', hasMore: false});
                    });
                }
            }
        }
    }

    handleCheckBoxChange = (key, val) => {
        if (key && this.filterParam[key] != null) {
            this.filterParam[key] = val.target.checked;
        }
    }

    handleSearchBusiness = (value) => {
        console.log(value);
    }

    render() {
        let self = this;
        const {t, store} = self.props;
        const businessList = store['searchBusinesses'] || [];
        const businessesInner = businessList.map(val => val && <BusinessItem businessData={val}/>).filter(val => val);
        return (
            <div className='app-search'>
                <Header title={t('title')}/>
                <div className='wrap-common-btns'>
                    <CommonButton
                        keyWord='score'
                        text='评分'
                        orientation='asc'
                        onChange={this.handleCommonBtnChange}
                    />
                    <CommonButton
                        keyWord='monthlySales'
                        text='销量'
                        orientation='desc'
                        onChange={this.handleCommonBtnChange}
                    />
                    <CommonButton
                        keyWord='distance'
                        text='距离'
                        orientation='asc'
                        onChange={this.handleCommonBtnChange}
                    />
                    <CommonButton
                        keyWord='serviceTime'
                        text='送达时间'
                        orientation='asc'
                        onChange={this.handleCommonBtnChange}
                    />
                    <CommonButton
                        text='其他条件'
                        keyWord='otherCondition'
                        hidden
                        onChange={this.handleCommonBtnChange}
                    />
                </div>
                <SearchBar
                    placeholder='请输入搜索内容'
                    onChange={this.handleSearchBusiness}
                />
                <WhiteSpace/>
                <Modal
                    title='title'
                    visible={this.state.modalVisible}
                    maskClosable={false}
                    transparent
                    footer={
                        [
                            {text: '取消', onPress: this.handleClose},
                            {text: '确定', onPress: this.changeFilterParam}
                        ]
                    }
                >
                    <Checkbox.CheckboxItem
                        key='newStore'
                        defaultChecked={this.filterParam['newStore']}
                        onChange={this.handleCheckBoxChange.bind(this, 'newStore')}>
                        新店
                    </Checkbox.CheckboxItem>
                    <Checkbox.CheckboxItem
                        key='onTime'
                        defaultChecked={this.filterParam['onTime']}
                        onChange={this.handleCheckBoxChange.bind(this, 'onTime')}>
                        准时达
                    </Checkbox.CheckboxItem>
                    <Checkbox.CheckboxItem
                        key='whetherBrand'
                        defaultChecked={this.filterParam['whetherBrand']}
                        onChange={this.handleCheckBoxChange.bind(this, 'whetherBrand')}>
                        品牌
                    </Checkbox.CheckboxItem>
                    <Checkbox.CheckboxItem
                        key='whetherDistribution'
                        defaultChecked={this.filterParam['whetherDistribution']}
                        onChange={this.handleCheckBoxChange.bind(this, 'whetherDistribution')}>
                        保送
                    </Checkbox.CheckboxItem>
                </Modal>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMore}
                >
                    <ul className='home-shop-list'>{businessesInner}</ul>
                </InfiniteScroll>
                <p className='load-more'>{self.state.bottomText}</p>
                <Footer />
            </div>
        );
    }
}

export default Search;
