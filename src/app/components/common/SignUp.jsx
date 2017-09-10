import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {Button} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, mapStateToProps, mapDispatchToProps, sessionStorageUtil} from '../../utils';
import {authInstance} from '../../auth';

// const FormItem = Form.Item;
const {GOTO} = Constants;

/**
 * 注册页
 */
@translate(['menuBar'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 注册
     */
    register = (e) => {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axiosInstance.post('/signUp', values).then(response => {
                    let data  = response.data;
                    if (data.status === 200) {
                        // message.success(data.msg);
                        sessionStorageUtil.set({name: data.name, id: data.id});
                        authInstance.userId = data.id;
                        authInstance.userName = data.name;
                        self.gotoHomeView();
                    } else {
                        // message.error(data.msg || '网络回应错误');
                    }
                });
            }
        });
    }

    gotoHomeView = () => {
        // const {onClickAction} = this.props;
        // let gotoAction = {
        //     type: GOTO,
        //     content: '/home'
        // };
        // onClickAction(gotoAction, this.props);
    }

    render() {
        let self = this;
        // const {getFieldDecorator} = self.props.form;
        const {t} = self.props;
        return (
            <div>123</div>
            // {/*<Form className='login-form' onSubmit={this.register}>*/}
            //     {/*<FormItem>*/}
            //         {/*{getFieldDecorator('userName', {*/}
            //             {/*rules: [{required: true, message: 'Please input your username!'}]*/}
            //         {/*})(*/}
            //             {/*<Input prefix={<Icon type='user' style={{fontSize: 13}}/>} placeholder='Username'/>*/}
            //         {/*)}*/}
            //     {/*</FormItem>*/}
            //     {/*<FormItem>*/}
            //         {/*{getFieldDecorator('password', {*/}
            //             {/*rules: [{required: true, message: 'Please input your Password!'}]*/}
            //         {/*})(*/}
            //             {/*<Input prefix={<Icon type='lock' style={{fontSize: 13}}/>} type='password'*/}
            //                    {/*placeholder='Password'/>*/}
            //         {/*)}*/}
            //     {/*</FormItem>*/}
            //     {/*<FormItem>*/}
            //         {/*<Button type='primary' htmlType='submit' className='login-form-button'>{t('menuBar:sign_up')}</Button>*/}
            //     {/*</FormItem>*/}
            // {/*</Form>*/}
        );
    }
}

export default SignUp;
