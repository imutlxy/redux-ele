import {render} from 'react-dom';
import React, {Component} from 'react';
import {Toast, List, InputItem, Button} from 'antd-mobile';
import {createForm} from 'rc-form';
import md5 from 'md5';

import {util, axiosInstance} from './app/utils';

const Item = List.Item;

/**
 * Header View
 */
@createForm()
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationCodeUrl: ''
        };
    }

    getVerificationCodeUrl = async (e) => {
        e && e.stopPropagation();
        let self = this;
        let response = await axiosInstance.get('user/getCaptchas');
        if (response && response.data && response.data.msg && response.data.msg.startsWith('data:image/jpeg;base64,')) {
            self.setState({verificationCodeUrl: response.data.msg});
        }
    }

    componentWillMount() {
        // this.getVerificationCodeUrl().catch(e => console.error('验证码', e));
    }

    onSubmit = () => {
        let self = this;
        self.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                const formData = this.props.form.getFieldsValue();
                if (!util.validateName(formData.username)) {
                    Toast.fail('只能输入5-20个以字母开头包括字母数字下划线的字符串');
                    return;
                }
                // if (!util.validatePassword(formData.password)) {
                //     Toast.fail('密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间');
                //     return;
                // }
                // if (!util.validateVeriCode(formData.veriCode)) {
                //     Toast.fail('验证码格式错误');
                //     return;
                // }
                formData.password = md5(formData.password);
                formData.rememberMe = true;
                self.handleLogin(formData).catch(e => console.error('signIn', e));
            }
        });
    }

    handleLogin = async (param) => {
        let self = this;
        let response = await axiosInstance.post('user/signIn', param);
        if (response && response.data) {
            util.persistUserData(response.data.data);
            util.transformRouter(self.props, '/me');
        } else {
            // self.getVerificationCodeUrl().catch(e => console.error('验证码', e));
            Toast.fail(response.data.msg || '网络回应错误');
        }
    }

    onReset = () => {
        this.props.form.resetFields();
    }

    handleForgotPwd = () => {
        util.transformRouter(this.props, 'me/forgotPassword');
    }

    handleRegister = (e) => {
        e.stopPropagation();
        util.transformRouter(this.props, 'me/signUp');
        // window.location.href = 'login.html';
    }

    render() {
        let self = this;
        const {getFieldProps} = self.props.form;
        const {t} = self.props;
        const {verificationCodeUrl} = self.state;
        const userData = JSON.parse(localStorage.getItem('userInfo')) || {};
        return (
            <div className='app-me'>
                <form>
                    <List className='app-me-list'>
                        <InputItem {...getFieldProps('username', {
                            initialValue: userData['username']
                        })} placeholder='请输入昵称'>用户名</InputItem>
                        <InputItem {...getFieldProps('password')} placeholder='请输入密码' type='password'>密码</InputItem>
                        {/*<InputItem {...getFieldProps('veriCode')} placeholder='请输入验证码'>验证码</InputItem>*/}
                        {/*<div className='am-list-item am-input-item verification-code-area'>*/}
                        {/*<img className='verification-code-img' src={verificationCodeUrl}/>*/}
                        {/*<span onClick={self.getVerificationCodeUrl}>{t('change')}</span>*/}
                        {/*</div>*/}
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

/**
 * Main App View
 */
render(<Login />, document.getElementById('app'));
