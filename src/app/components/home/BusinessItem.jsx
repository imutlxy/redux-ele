import React, {Component} from 'react';
import {Toast} from 'antd-mobile';

import {util, connectToStore} from '../../utils';

@connectToStore
class BusinessItem extends Component {
    constructor(props) {
        super(props);
    }

    handleShopClick = (e) => {
        e.stopPropagation();
        util.transformRouter(this.props, this.props.url);
    }

    render() {
        let self = this;
        const {t} = self.props;
        return (
            <div className='app-seller-list' onClick={self.handleShopClick}>
                <div className='app-seller-list-left'>
                    <div className='app-seller-list-left-icon'><img src='../../resource/imgs/favicon.png'/></div>
                    <div className='app-seller-list-left-desc'>sdf</div>
                </div>
                <div className='app-seller-list-right'>ewtrwt</div>
            </div>
        );
    }
}

export default BusinessItem;
