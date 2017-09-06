import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {translate} from 'react-i18next';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
const FormItem = Form.Item;

import Constants from '../constants';
import i18n from '../i18n';
import appConfig from '../config';
import {axiosInstance} from '../utils/axiosInstance';

const {DROP_TO_CONTENT, GOTO} = Constants;
const AppActionRouter = appConfig.router;

@translate(['menuBar'], {wait: true})
class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    handleTransLan = (e) => {
        e.stopPropagation();
        const {onClickAction, store} = this.props;
        let language = this.props.i18n.language;
        i18n.changeLanguage(language.toLowerCase().includes('zh') ? 'en' : 'zh');

        let changeActiveKeyAction = {
            type: DROP_TO_CONTENT,
            content: {
                sideBar: '123432'
            }
        };
        onClickAction(changeActiveKeyAction, this.props);
    }

    ajxaGetClick = (e) => {
        e.stopPropagation();
        axiosInstance.get('/user', {params: {userName: 'sivan'}}).then(response => {
            if (response.data && response.data.success === true) {
                console.log('get 请求接收到的数据', response.data.data);
            }
        });
    }

    ajxaPostClick = (e) => {
        e.stopPropagation();
        axiosInstance.post('/user', {data: 123}).then(response => {
            if (response.data && response.data.success === true) {
                console.log('post 请求接收到的数据', response.data.data);
            }
        });
    }

    gotoBtnClick = (e) => {
        e.stopPropagation();
        const {onClickAction} = this.props;
        let gotoAction = {
            type: GOTO,
            content: '/about'
        };
        onClickAction(gotoAction, this.props);
    }

    login = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axiosInstance.post('/signin', values).then(response => {
                    let data  = response.data.data;
                    if (data.status === 200) {
                        message.success(data.msg);
                    } else {
                        message.error(data.msg);
                    }
                });
            }
        });
    }

    render() {
        let self = this;
        const {getFieldDecorator} = self.props.form;
        const {t} = self.props;
        return (
            <div className='home-view'>
                <h1>{t('menuBar:content_test')}</h1>
                <Button className='btn' type='primary' onClick={self.handleTransLan}>点击切换语言</Button>
                <Button className='btn' type='primary' onClick={self.ajxaGetClick}>点击发起 get 请求</Button>
                <Button className='btn' type='primary' onClick={self.ajxaPostClick}>点击发起 post 请求</Button>
                <Button className='btn' type='primary' onClick={self.gotoBtnClick}>跳转到 about</Button>
                <Form onSubmit={this.login} className='login-form'>
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
                        {/*<a className='login-form-forgot' href=''>Forgot password</a>*/}
                        <Button type='primary' htmlType='submit' className='login-form-button'>
                            Log in
                        </Button>
                        {/*Or <a href=''>register now!</a>*/}
                    </FormItem>
                </Form>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(HomeView));
