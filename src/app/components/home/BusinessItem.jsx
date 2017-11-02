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
        let response = await axiosInstance.get('/home/getBusiness', {params: {id: id}});
        let resData  = response && response.data || {};
        if (resData.status === 200 && Array.isArray(resData.data) && resData.data.length > 0) {
            let action = {
                type: ENTER_BUSINESS,
                content: {}
            };
            action['content'][id] = resData.data[0];
            await onClickAction(action, self.props);
            // console.log(id,'====')
            util.transformRouter(self.props, `/business/${id}`);
        } else {
            Toast.fail(resData.msg || '网络回应错误');
        }
    }

    handleShopClick = (e) => {
        e.stopPropagation();
        let self = this;
        const {store, data} = self.props;
        if (data.id) {
            if (store[data.id]) {
                util.transformRouter(self.props, `/business/${data.id}`);
            } else {
                self.getBusinessData(data.id).catch(e => console.error('商家详情页', e));
            }
        }
    }

    render() {
        let self = this;
        const {t, data} = self.props;
        return (
            <li className='app-seller-list' onClick={self.handleShopClick}>
                <div className='app-seller-list-left'>
                    <div className='app-seller-list-left-icon'><img src='../../resource/images/favicon.png'/></div>
                    <div className='app-seller-list-left-desc'>{data.title}</div>
                </div>
                <div className='app-seller-list-right'>ewtrwt</div>
            </li>
        );
    }
}

export default BusinessItem;
