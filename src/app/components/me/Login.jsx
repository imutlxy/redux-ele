import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Toast, List, InputItem, Button} from 'antd-mobile';
import {createForm} from 'rc-form';

import {util, axiosInstance, mapStateToProps, mapDispatchToProps, sessionStorageUtil} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';

const Item = List.Item;

/**
 * Header View
 */
@createForm()
@translate(['me'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        let self = this;
        self.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                const formData = this.props.form.getFieldsValue();
                if (formData.name && formData.password && formData.account) {
                    axiosInstance.post('/signIn', formData).then(response => {
                        let data  = response.data;
                        if (data.status === 200) {
                            sessionStorageUtil.set({name: data.name, id: data.id, account: data.account});
                            authInstance.userId = data.id;
                            authInstance.userName = data.name;
                            authInstance.userAccount = data.name;
                            util.goBack(self.props);
                        } else {
                            Toast.fail(data.msg || '网络回应错误');
                        }
                    });
                } else {
                    Toast.fail('错误的表单信息');
                }
            }
        });
    }

    onReset = () => {
        this.props.form.resetFields();
    }

    handleForgotPwd = () => {
        //TODO 处理忘记密码
    }

    render() {
        let self = this;
        const {getFieldProps} = self.props.form;
        const {t} = this.props;
        return (
            <div className='app-me'>
                <Header title='登录/注册'/>
                <form>
                    <List className='app-me-list'>
                        <InputItem {...getFieldProps('name')} placeholder='请输入昵称'>昵称</InputItem>
                        <InputItem {...getFieldProps('account')} placeholder='请输入手机号'>手机号</InputItem>
                        <InputItem {...getFieldProps('password')} placeholder='请输入密码' type='password'>密码</InputItem>
                        <Item>
                            <Button type='primary' onClick={this.onSubmit} inline>确认</Button>
                            <Button onClick={this.onReset} inline>重置</Button>
                            <Button size='middle' onClick={this.handleForgotPwd} inline>忘记密码</Button>
                        </Item>
                    </List>
                </form>
            </div>
        );
    }
}

export default Login;
