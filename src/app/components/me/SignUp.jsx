import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Toast, List, InputItem, Button} from 'antd-mobile';
import {createForm} from 'rc-form';
import md5 from 'md5';

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

    getVerificationCodeUrl = async (e) => {
        e && e.stopPropagation();
        let self = this;
        let response = await axiosInstance.get('user/getCaptchas').catch(e => console.error('验证码', e));
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
                // if (!util.validateMobile(formData.cellPhoneNumber)) {
                //     Toast.fail('手机号格式错误');
                //     return;
                // }
                if (!formData.password || !formData.rePassword || formData.password !== formData.rePassword) {
                    Toast.fail('两次输入的密码不一致');
                    return;
                }
                // if (!util.validatePassword(formData.password)) {
                //     Toast.fail('密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间');
                //     return;
                // }
                if (!util.validateEmail(formData.email)) {
                    Toast.fail('邮箱格式错误');
                    return;
                }
                // if (!util.validateVeriCode(formData.veriCode)) {
                //     Toast.fail('验证码格式错误');
                //     return;
                // }
                formData.password = md5(formData.password);
                formData.rePassword = md5(formData.rePassword);
                self.handleSignUp(formData).catch(e => console.error('signUp', e));
            }
        });
    }

    handleSignUp = async (param) => {
        let self = this;
        let response = await axiosInstance.post('user/signUp', param);
        if (response.data.status === 200) {
            util.persistUserData(response.data.data);
            util.transformRouter(this.props, '/me/logIn');
        } else {
            // self.getVerificationCodeUrl().catch(e => console.error('验证码', e));
            Toast.fail(response.data.msg || '网络回应错误');
        }
    }

    render() {
        let self = this;
        const {getFieldProps} = self.props.form;
        const {t} = self.props;
        const {verificationCodeUrl} = self.state;
        return (
            <div className='app-me'>
                <Header title={t('register')}/>
                <form>
                    <List className='app-me-list'>
                        <InputItem {...getFieldProps('username')} placeholder='请输入昵称'>用户名</InputItem>
                        <InputItem {...getFieldProps('cellPhoneNumber')} placeholder='请输入手机号'>手机号</InputItem>
                        <InputItem {...getFieldProps('email')} placeholder='请输入邮箱'>邮箱</InputItem>
                        <InputItem {...getFieldProps('password')} placeholder='请输入密码' type='password'>密码</InputItem>
                        <InputItem {...getFieldProps('rePassword')} placeholder='请再次输入密码' type='password'>再次输入</InputItem>
                        {/*<InputItem {...getFieldProps('veriCode')} placeholder='请输入验证码'>验证码</InputItem>*/}
                        {/*<div className='am-list-item am-input-item verification-code-area'>*/}
                            {/*<img src={verificationCodeUrl}/>*/}
                            {/*<span onClick={self.getVerificationCodeUrl}>{t('change')}</span>*/}
                        {/*</div>*/}
                        <Item>
                            <Button type='primary' onClick={this.onSubmit} inline>{t('common:confirm')}</Button>
                        </Item>
                    </List>
                </form>
            </div>
        );
    }
}

export default Login;
