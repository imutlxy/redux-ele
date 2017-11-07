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
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        let self = this;
        self.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                const formData = this.props.form.getFieldsValue();
                if (!util.validateEmail(formData.email)) {
                    Toast.fail('只能输入5-20个以字母开头包括字母数字下划线的字符串');
                    return;
                }
                if (!util.validatePassword(formData.password)) {
                    Toast.fail('密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间');
                    return;
                }
                if (formData.veriCode && formData.veriCode.length !== 6) {
                    Toast.fail('验证码格式错误');
                    return;
                }
                formData.password = md5(formData.password);
                axiosInstance.post('/forgotPassword', formData).then(response => {
                    if (response.data.status === 200) {
                        Toast.success(response.data.msg);
                        util.persistUserData(response.data.data);
                        util.transformRouter(self.props, '/me');
                    } else {
                        Toast.fail(response.data.msg || '网络错误');
                    }
                });
            }
        });
    }

    onSend = () => {
        let self = this;
        self.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                const formData = this.props.form.getFieldsValue();
                if (!util.validateEmail(formData.email)) {
                    Toast.fail('邮箱格式错误');
                } else {
                    axiosInstance.get('/forgotPassword', {params: {email: formData.email}}).then(response => {
                        if (response && response.data && response.data.status === 200) {
                            Toast.success(response.data.msg);
                        } else {
                            Toast.fail('网络错误');
                        }
                    });
                }
            }
        });
    }

    render() {
        let self = this;
        const {getFieldProps} = self.props.form;
        const {t} = self.props;
        return (
            <div className='app-me'>
                <Header title={t('forgotPwd')}/>
                <form>
                    <List className='app-me-list'>
                        <InputItem {...getFieldProps('email')} placeholder='请输入邮箱'>邮箱</InputItem>
                        <InputItem {...getFieldProps('password')} placeholder='请输入密码' type='password'>新密码</InputItem>
                        <InputItem {...getFieldProps('veriCode')} placeholder='请输入验证码'>验证码</InputItem>
                        <Item>
                            <Button type='small' onClick={this.onSend} inline>点击发送验证码</Button>
                            <Button type='small'  onClick={this.onSubmit} inline>{t('common:confirm')}</Button>
                        </Item>
                    </List>
                </form>
            </div>
        );
    }
}

export default ForgotPassword;
