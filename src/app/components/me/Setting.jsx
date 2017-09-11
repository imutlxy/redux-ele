import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {List, InputItem, Switch, Toast, Button} from 'antd-mobile';
import {createForm} from 'rc-form';

import Constants from '../../constants';
import {util, axiosInstance, mapStateToProps, mapDispatchToProps} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';

const {DROP_TO_CONTENT, GOTO} = Constants;
const Item = List.Item;

/**
 * Header View
 */
@createForm()
@translate(['me'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class Setting extends Component {
    constructor(props) {
        super(props);
    }

    handleTransLan = (e) => {
        e.stopPropagation();
        util.setLanguage('zh');
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }

    componentDidMount() {
    }

    /**
     * 登出
     */
    signOutClick = (e) => {
        e.preventDefault();
        let self = this;
        axiosInstance.get('/signOut').then(response => {
            let data  = response.data;
            if (data.status === 200) {
                authInstance.userId = undefined;
                authInstance.userName = undefined;
                authInstance.userAccount = undefined;
                util.goBack(self.props);
                Toast.success(data.msg);
            } else {
                Toast.fail('网络回应错误');
            }
        });
    }

    render() {
        let self = this;
        const {getFieldProps} = self.props.form;
        const {t} = this.props;
        return (
            <div className='app-me'>
                <Header title='设置'/>
                <List className='app-me-list'>
                    <Item extra={<Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })} />}
                    >中英文切换</Item>
                </List>
                <Button
                    disabled={authInstance.userName === undefined}
                    className='app-me-setting-signup-btn'
                    onClick={self.signOutClick}
                >
                    退出登录
                </Button>
            </div>
        );
    }
}

export default Setting;
