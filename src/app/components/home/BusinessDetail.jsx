import React, {Component} from 'react';
import {Toast, Button} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, connectToStore} from '../../utils';
import Header from '../header';

const {ENTER_BUSINESS} = Constants;

@connectToStore
class BusinessDetail extends Component {
    constructor(props) {
        super(props);
        const id = this.getBusinessId();
        this.state = {
            shopData: props.store && props.store[id] || {}
        };
    }

    componentWillMount() {
        let self = this;
        const {store} = self.props;
        const id = self.getBusinessId();
        !store[id] && axiosInstance.get(`/business/${id}`).then(res => {
            res.data && res.data.data && this.setState({shopData: res.data.data});
        });
    }

    getBusinessId = () => {
        const url = util.getRouterUrl(this.props.routerStore);
        return url && url.split('/')[url.split('/').length - 1];
    }

    render() {
        let self = this;
        const {shopData} = self.state;
        return (
            <div className='app-business-detail'>
                <Header title='商家'/>
                <h4>{`商家 ${util.getRouterUrl(self.props.routerStore)}`}</h4>
                <p>{shopData['shopName']}</p>
            </div>
        );
    }
}

export default BusinessDetail;
