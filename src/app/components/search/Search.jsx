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
        sorts.push({property: 'distance', direction: 'asc'});
        sorts.push({property: 'deliveryFee', direction: 'asc'});
        sorts.push({property: 'monthlySales', direction: 'desc'});
        sorts.push({property: 'serviceTime', direction: 'asc'});
        this.state = {
            hasMore: true,
            focused: false,
            modalVisible: false,
            searchValue: '',
            bottomText: '加载中···'
        };
        this.param = {
            page: 0,
            size: this.pageSize,
            sorts: sorts,
            filterParam: []
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

    /**
     * 添加过滤参数
     */
    changeFilterParam = () => {
        let filterParam = [];
        this.setState({modalVisible: false}, () => {
            for (let key in this.filterParam) {
                filterParam.push({name: key, value: this.filterParam[key]});
            }
            const shopNameFilter = this.param.filterParam.find(val => val.name === 'shopName' && val.value);
            shopNameFilter && filterParam.push(shopNameFilter);
            this.param.filterParam = filterParam;
            this.fetchBusinessData(REPLACE_DATA);
        });
    }

    fetchBusinessData = (type) => {
        this.getBusinesses(this.param, type).catch(e => {
            Toast.fail(e.msg || '请求数据出错', 3);
            this.setState({bottomText: '请求数据出错', hasMore: false});
        });
    }

    /**
     * 请求数据
     */
    getBusinesses = async (paramData = {}, actionType = GET_SEARCH_BUSINESS) => {
        let self = this;
        const {onClickAction} = self.props;
        const param = {
            ...paramData,
            sorts: JSON.stringify(paramData.sorts),
            filterParam: JSON.stringify(paramData.filterParam)
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

    /**
     * 加载更多
     */
    loadMore = (page) => {
        this.param.page = page;
        this.fetchBusinessData();
    }

    /**
     * 排序条件面板点击事件
     */
    handleCommonBtnChange = (key, value) => {
        if (key && value) {
            if (key === 'otherCondition') {
                this.setState({modalVisible: true});
            } else {
                let index = this.param.sorts.findIndex((val) => val.property === key && val.direction !== value);
                if (index !== -1) {
                    this.param.sorts[index]['direction'] = value;
                    this.fetchBusinessData(REPLACE_DATA);
                }
            }
        }
    }

    /**
     * 过滤条件面板点击回调事件
     */
    handleCheckBoxChange = (key, val) => {
        if (key && this.filterParam[key] != null) {
            this.filterParam[key] = val.target.checked;
        }
    }

    /**
     * 搜索商家
     */
    handleSearchBusiness = (value) => {
        this.param.filterParam = value ? [{name: 'shopName', value: value}] : [];
        this.fetchBusinessData(REPLACE_DATA);
    }

    /**
     * 取消搜索
     */
    handleSearchCancel = () => {
        const shopNameFilter = this.param.filterParam.find(val => val.name === 'shopName' && val.value);
        if (shopNameFilter) {
            this.param.filterParam = this.param.filterParam.filter(val => val.name !== 'shopName');
            this.fetchBusinessData(REPLACE_DATA);
            this.setState({searchValue: ''});
        }
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
                        keyWord='deliveryFee'
                        text='配送费'
                        defaultOrientation='asc'
                        onChange={this.handleCommonBtnChange}
                    />
                    <CommonButton
                        keyWord='monthlySales'
                        text='销量'
                        defaultOrientation='desc'
                        onChange={this.handleCommonBtnChange}
                    />
                    <CommonButton
                        keyWord='distance'
                        text='距离'
                        defaultOrientation='asc'
                        onChange={this.handleCommonBtnChange}
                    />
                    <CommonButton
                        keyWord='serviceTime'
                        text='送达时间'
                        defaultOrientation='asc'
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
                    value={this.state.searchValue}
                    placeholder='请输入搜索内容'
                    onChange={(val) => this.setState({searchValue: val})}
                    onCancel={this.handleSearchCancel}
                    onSubmit={this.handleSearchBusiness}
                />
                <WhiteSpace/>
                <Modal
                    title='请选择'
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
