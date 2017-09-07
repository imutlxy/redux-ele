import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Form, Icon, Input, Button, Checkbox, message} from 'antd';

import appConfig from '../config';
import Constants from '../constants';
import {axiosInstance} from '../utils/axiosInstance';

const FormItem = Form.Item;
const {GOTO} = Constants;
const AppActionRouter = appConfig.router;

/**
 * 登录页
 */
@translate(['menuBar'], {wait: true})
class Login extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 登录
     */
    login = (e) => {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axiosInstance.post('/signIn', values).then(response => {
                    let data  = response.data;
                    if (data.status === 200) {
                        message.success(data.msg);
                        self.gotoHomeView();
                    } else {
                        message.error(data.msg || '网络回应错误');
                    }
                });
            }
        });
    }

    gotoHomeView = () => {
        const {onClickAction} = this.props;
        let gotoAction = {
            type: GOTO,
            content: '/home'
        };
        onClickAction(gotoAction, this.props);
    }

    gotoSignUpPage = (e) => {
        e.stopPropagation();
        const {onClickAction} = this.props;
        let gotoAction = {
            type: GOTO,
            content: '/signUp'
        };
        onClickAction(gotoAction, this.props);
    }

    render() {
        let self = this;
        const {getFieldDecorator} = self.props.form;
        const {t} = self.props;
        return (
            <Form className='login-form' onSubmit={this.login}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}]
                    })(
                        <Input prefix={<Icon type='user' style={{fontSize: 13}}/>} placeholder='Username'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}]
                    })(
                        <Input prefix={<Icon type='lock' style={{fontSize: 13}}/>} type='password'
                               placeholder='Password'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type='primary' htmlType='submit' className='login-form-button'>{t('menuBar:login')}</Button>
                    <Button type='primary' className='btn' onClick={this.gotoSignUpPage}>{t('menuBar:sign_up')}</Button>
                </FormItem>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: (state && state.appReducer) || {}
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AppActionRouter, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
