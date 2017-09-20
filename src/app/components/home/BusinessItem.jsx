import React, {Component} from 'react';
import {Toast} from 'antd-mobile';

import {util, axiosInstance, connectToStore} from '../../utils';
import Constants from '../../constants';

const {DROP_TO_CONTENT} = Constants;

@connectToStore
class BusinessItem extends Component {
    constructor(props) {
        super(props);
    }

    getBusinessData = (id) => {
        let self = this;
        const {onClickAction} = self.props;
        axiosInstance.get('/home/getBusiness', {params: {id: id}}).then(response => {
            let resData  = response.data;
            if (resData.status === 200 && resData.data.length > 0) {
                let action = {
                    type: DROP_TO_CONTENT,
                    content: {}
                };
                action['content'][id] = resData.data[0];
                new Promise((resolve, reject) => {
                    onClickAction(action, self.props);
                    resolve();
                }).then(function () {
                    util.transformRouter(self.props, `/business/${id}`);
                }).catch((e) => {
                    console.error('点击首页商家--', e);
                });
            } else {
                Toast.fail(resData.msg || '网络回应错误');
            }
        });
    }

    handleShopClick = (e) => {
        e.stopPropagation();
        let self = this;
        const {store, data} = self.props;
        if (data.id) {
            if (store[data.id]) {
                util.transformRouter(self.props, `/business/${data.id}`);
            } else {
                self.getBusinessData(data.id);
            }
        }
    }

    render() {
        let self = this;
        const {t, data} = self.props;
        return (
            <div className='app-seller-list' onClick={self.handleShopClick}>
                <div className='app-seller-list-left'>
                    <div className='app-seller-list-left-icon'><img src='../../resource/imgs/favicon.png'/></div>
                    <div className='app-seller-list-left-desc'>{data.title}</div>
                </div>
                <div className='app-seller-list-right'>ewtrwt</div>
            </div>
        );
    }
}

export default BusinessItem;
