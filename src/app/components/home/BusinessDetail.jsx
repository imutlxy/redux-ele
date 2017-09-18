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

    componentWillMount() {
        let self = this;
        const url = util.getRouterUrl(self.props.routerStore);
    }

    render() {
        let self = this;
        return (
            <div className='app-business-detail'>
                <Header title='商家'/>
                <h1>{`商家 ${util.getRouterUrl(self.props.routerStore)}`}</h1>
            </div>
        );
    }
}

export default BusinessDetail;
