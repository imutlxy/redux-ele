import React, {Component} from 'react';
import {Toast} from 'antd-mobile';

import {util, axiosInstance, connectToStore} from '../../utils';
import Constants from '../../constants';

const {ENTER_BUSINESS} = Constants;

@connectToStore
class BusinessItem extends Component {
    constructor(props) {
        super(props);
    }

    getBusinessData = async (id) => {
        let self = this;
        const {onClickAction} = self.props;
        let response = await axiosInstance.get(`/business/${id}`);
        let resData = response && response.data || {};
        if (resData.data) {
            let action = {
                type: ENTER_BUSINESS,
                content: {}
            };
            action['content'][id] = resData.data;
            new Promise((resolve, reject) => {
                action['resolve'] = resolve;
                onClickAction(action, self.props);
            }).then((data) => {
                util.transformRouter(self.props, `/business/${id}`);
            }).catch((e) => {
                console.error(e);
            });
        } else {
            Toast.fail(resData.msg || '网络回应错误');
        }
    }

    handleShopClick = (e) => {
        e.stopPropagation();
        let self = this;
        const {store, businessData} = self.props;
        const id = businessData['businessId'];
        if (id) {
            if (store[id]) {
                util.transformRouter(self.props, `/business/${id}`);
            } else {
                self.getBusinessData(id).catch(e => console.error('商家详情页', e));
            }
        }
    }

    render() {
        let self = this;
        const {t, businessData} = self.props;
        return (
            <li className='app-seller-list' onClick={self.handleShopClick}>
                <div className='app-seller-list-left'>
                    <div className='app-seller-list-left-icon'>
                        <img className='app-seller-list-left-icon' src={businessData.icon}/>
                    </div>
                    <div className='app-seller-list-left-desc'>
                        <div className='title'>
                            <span className='brand' style={{display: businessData.whetherBrand ? 'inline-block' : 'none'}}>品牌</span>
                            {businessData.shopName}
                        </div>
                        <p className='text'>评分：<span>{businessData.score || '暂无'}</span> 月售：<span>{businessData.monthlySales || 0}</span>单</p>
                        <p className='text'><span>{businessData.dispatchLimit}</span>起送 / 配送费￥<span>{businessData.deliveryFee}</span></p>
                    </div>
                </div>
                <div className='app-seller-list-right'>
                    <div className='express'>
                        <span>{businessData.mailType}</span>
                        <span style={{display: businessData.hasInvoice ? 'none' : 'inline-block'}}>准时达</span>
                    </div>
                    <p className='text'><span>{businessData.distance}</span>公里 / <span>{businessData.serviceTime}分钟</span></p>
                </div>
            </li>
        );
    }
}

export default BusinessItem;
