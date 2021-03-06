import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Toast, List, InputItem, Button, WhiteSpace} from 'antd-mobile';
import {createForm} from 'rc-form';
import md5 from 'md5';

import {util, axiosInstance, connectToStore} from '../../utils';
import Constants from '../../constants';
import Header from '../header';

const Item = List.Item;
const {MERGE_DATA} = Constants;

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

    getVerificationCodeUrl = async (e) => {
        e && e.stopPropagation();
        let self = this;
        let response = await axiosInstance.get('user/getCaptchas');
        if (response && response.data && response.data.msg && response.data.msg.startsWith('data:image/jpeg;base64,')) {
            self.setState({verificationCodeUrl: response.data.msg});
        }
    }

    componentWillMount() {
        this.getVerificationCodeUrl().catch(e => Toast.fail(e.msg || '验证码错误'));
    }

    onSubmit = () => {
        let self = this;
        self.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                const formData = this.props.form.getFieldsValue();
                // if (!util.validateName(formData.username)) {
                //     Toast.fail('只能输入5-20个以字母开头包括字母数字下划线的字符串');
                //     return;
                // }
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
                self.handleLogin(formData).catch(e => Toast.fail(e.msg || '网络请求错误'));
            }
        });
    }

    handleLogin = async (param) => {
        let self = this;
        let response = await axiosInstance.post('user/signIn', param);
        if (response && response.data) {
            util.persistUserData(response.data.data);
            util.transformRouter(self.props, '/me');
            const {onClickAction} = self.props;
            let action = {
                type: MERGE_DATA,
                content: {
                    userInfo: response.data.data
                }
            };
            onClickAction(action, self.props);
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
    }

    render() {
        let self = this;
        const {getFieldProps} = self.props.form;
        const {t} = self.props;
        const {verificationCodeUrl} = self.state;
        const userData = JSON.parse(sessionStorage.getItem('userInfo')) || {};
        return (
            <div className='app-me app-me-login'>
                <Header title={t('login')}/>
                <form>
                    <List className='app-me-list'>
                        <WhiteSpace/>
                        <InputItem {...getFieldProps('username', {
                            initialValue: userData['username']
                        })} placeholder='请输入昵称'>用户名</InputItem>
                        <InputItem {...getFieldProps('password')} placeholder='请输入密码' type='password'>密码</InputItem>
                        <InputItem {...getFieldProps('veriCode')} placeholder='请输入验证码'>验证码</InputItem>
                        <div className='am-list-item am-input-item verification-code-area'>
                            <img className='verification-code-img' src={verificationCodeUrl}/>
                            <span onClick={self.getVerificationCodeUrl}>{t('change')}</span>
                        </div>
                        <WhiteSpace/>
                        <Item className='app-me-login-btn-list'>
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
