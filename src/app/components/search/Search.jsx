import React, {Component} from 'react';
import {translate} from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import {ActionSheet, Button, Toast} from 'antd-mobile';

import Constants from '../../constants';
import Footer from './../footer';
import {util, connectToStore, axiosInstance} from '../../utils';
import Header from '../header';
import BusinessItem from '../home/BusinessItem';
import './style/index.scss';

const {GET_HOME_BUSINESS} = Constants;

/**
 * 搜索页
 */
@translate(['search'], {wait: true})
@connectToStore
class Search extends Component {
    constructor(props) {
        super(props);
        this.pageSize = 5;
        this.state = {
            hasMore: true,
            bottomText: '加载中···'
        };
    }

    componentDidMount() {
        util.setDocumentScrollTop('searchPageScrollTop');
    }

    componentWillUnmount() {
        util.getDocumentScrollTop('searchPageScrollTop');
    }

    showActionSheet = () => {
        const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
        const wrapProps = util.isIPhone() && {
                onTouchStart: (e) => {
                    console.log(e);
                }
            };
        ActionSheet.showShareActionSheetWithOptions({
                options: BUTTONS,
                maskClosable: false,
                title: '添加过滤条件'
            },
            (buttonIndex) => {
                console.log(buttonIndex);
                // this.setState({clicked: BUTTONS[buttonIndex]});
                return buttonIndex !== -1 && new Promise((resolve) => {
                    }, (reject) => {
                        reject();
                    });
            }
        );
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

    render() {
        let self = this;
        const {t, store} = self.props;
        const businessList = store['homeBusinesses'] || [];
        const businessesInner = businessList.map(val => val && <BusinessItem businessData={val}/>).filter(val => val);
        return (
            <div className='app-search'>
                <Header title={t('title')}/>
                <div>
                    <Button>评分</Button>
                    <Button>销量</Button>
                </div>
                <Button onClick={this.showActionSheet}>showActionSheet</Button>
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
