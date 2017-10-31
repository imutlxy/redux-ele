import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Toast, List, InputItem, Button} from 'antd-mobile';
import {createForm} from 'rc-form';

import {util, axiosInstance, connectToStore} from '../../utils';
import Header from '../header';

const Item = List.Item;

/**
 * Header View
 */
@createForm()
@translate(['me'], {wait: true})
@connectToStore
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationCodeUrl: ''
        };
    }

    getVerificationCodeUrl = (e) => {
        e && e.stopPropagation();
        let self = this;
        axiosInstance.get('/signIn/getCaptchas').then(response => {
            let data = response.data;
            if (data.status === 200) {
                self.setState({verificationCodeUrl: data.code});
            }
        });
    }

    componentWillMount() {
        this.getVerificationCodeUrl();
    }

    onSubmit = () => {
        let self = this;
        self.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                const formData = this.props.form.getFieldsValue();
                if (!util.validateName(formData.name)) {
                    Toast.fail('只能输入5-20个以字母开头包括字母数字下划线的字符串');
                    return;
                }
                if (!util.validatePassword(formData.password)) {
                    Toast.fail('密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间');
                    return;
                }
                if (!util.validateVeriCode(formData.veriCode)) {
                    Toast.fail('验证码格式错误');
                    return;
                }
                axiosInstance.post('/signIn', formData).then(response => {
                    if (response.data.status === 200) {
                        util.persistUserData(response.data.data);
                        util.goBack(self.props);
                    } else {
                        self.getVerificationCodeUrl();
                        Toast.fail(response.data.msg || '网络回应错误');
                    }
                });
            }
        });
    }

    onReset = () => {
        this.props.form.resetFields();
    }

    handleForgotPwd = () => {
        //TODO 处理忘记密码
    }

    handleRegister = (e) => {
        e.stopPropagation();
        util.transformRouter(this.props, 'me/signUp');
    }

    render() {
        let self = this;
        const {getFieldProps} = self.props.form;
        const {t} = self.props;
        const {verificationCodeUrl} = self.state;
        return (
            <div className='app-me'>
                <Header title={t('login')}/>
                <form>
                    <List className='app-me-list'>
                        <InputItem {...getFieldProps('name')} placeholder='请输入昵称'>昵称</InputItem>
                        <InputItem {...getFieldProps('password')} placeholder='请输入密码' type='password'>密码</InputItem>
                        <InputItem {...getFieldProps('veriCode')} placeholder='请输入验证码'>验证码</InputItem>
                        <div className='am-list-item am-input-item verification-code-area'>
                            <img src={verificationCodeUrl}/>
                            <span onClick={self.getVerificationCodeUrl}>{t('change')}</span>
                        </div>
                        <Item>
                            <Button type='primary' onClick={this.onSubmit} inline>{t('common:confirm')}</Button>
                            <Button onClick={this.onReset} inline>{t('common:reset')}</Button>
                            <Button size='middle' onClick={this.handleForgotPwd} inline>{t('forgotPwd')}</Button>
                            <Button size='middle' onClick={this.handleRegister} inline>{t('register')}</Button>
                        </Item>
                    </List>
                </form>
            </div>
        );
    }
}

export default Login;
