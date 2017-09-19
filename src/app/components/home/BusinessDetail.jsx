import React, {Component} from 'react';
import {Toast, Button} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, connectToStore} from '../../utils';
import Header from '../header';

const {DROP_TO_CONTENT} = Constants;

@connectToStore
class BusinessDetail extends Component {
    constructor(props) {
        super(props);
    }

    getBusinessId = () => {
        const url = util.getRouterUrl(this.props.routerStore);
        return url && url.split('/')[url.split('/').length - 1];
    }

    componentWillMount() {
        let self = this;
        const {onClickAction, store} = self.props;
        let id = self.getBusinessId();
        if (!store[id]) {
            axiosInstance.get('/home/getBusiness/:' + id).then(response => {
                let data  = response.data;
                if (data.status === 200 && data.data.length > 0) {
                    let action = {
                        type: DROP_TO_CONTENT,
                        content: {}
                    };
                    action['content'][id] = data.data[0];
                    onClickAction(action, self.props);
                } else {
                    self.setState({bottomText: '网络回应错误'});
                    Toast.fail(data.msg || '网络回应错误');
                }
            });
        }
    }

    render() {
        let self = this;
        const {store} = self.props;
        const id = self.getBusinessId();
        return (
            <div className='app-business-detail'>
                <Header title='商家'/>
                <h1>{`商家 ${util.getRouterUrl(self.props.routerStore)}`}</h1>
                <h2>{store[id] && store[id].title}</h2>
            </div>
        );
    }
}

export default BusinessDetail;
