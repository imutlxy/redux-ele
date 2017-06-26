import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Sider} = Layout;

import * as AppActionRouter from '../config/AppActionRouter';

/**
 * App View
 */
class SideBarView extends Component {
    constructor(props) {
        super(props);
    }

    handleMenuClick = ({item, key, keyPath}) => {
        const {onClickAction} = this.props;

        let changeActiveKeyAction = {
            type: 'DROP_TO_CONTENT',
            content: {
                sideBar: '123432'
            }
        };
        onClickAction(changeActiveKeyAction, this.props);
    }

    render() {
        return (
            <Sider className='app-side-bar'>
                <Menu
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{height: '100%', borderRight: 0}}
                    onClick={this.handleMenuClick}
                >
                    <SubMenu key='sub1' title={<span><Icon type='user'/>subnav 1</span>}>
                        <Menu.Item key='1'>option1</Menu.Item>
                        <Menu.Item key='2'>option2</Menu.Item>
                        <Menu.Item key='3'>option3</Menu.Item>
                        <Menu.Item key='4'>option4</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

function mapStateToProps(state) {
    return state && state.appReducer ? state.appReducer : 'empty';
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AppActionRouter, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarView);
