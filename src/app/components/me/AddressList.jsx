import React, {Component} from 'react';
import {List, WhiteSpace} from 'antd-mobile';

import {util, connectToStore} from '../../utils';
import Header from '../header';

const Item = List.Item;

/**
 * 收货地址列表
 */
@connectToStore
class AddressList extends Component {
    constructor(props) {
        super(props);
    }

    createAllAddressView = () => {
        return [
            {
                address: '收货地址一'
            },
            {
                address: '收货地址二'
            }].map((val, i) => {
            return (
                <List key={`${i + 1}`} className='app-me-list'>
                    <Item
                        arrow='horizontal'
                        onClick={this.handleItemClick.bind(this, '/me/addressList/addressEditor')}
                    >{val.address}</Item>
                </List>
            );
        });
    };

    handleItemClick = (path = '') => {
        path && util.transformRouter(this.props, path);
    }

    render() {
        let self = this;
        return (
            <div className='app-me'>
                <Header title='管理收获地址'/>
                <WhiteSpace size="lg"/>
                {this.createAllAddressView()}
                <List className='app-me-list'>
                    <Item
                        extra={<i className='fa fa-plus-circle'/>}
                        onClick={self.handleItemClick.bind(this, '/me/addressList/addressEditor')}
                    >新增收货地址</Item>
                </List>
            </div>
        );
    }
}

export default AddressList;
