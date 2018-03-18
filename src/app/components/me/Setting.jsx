import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {List, Switch, Toast, Button, WhiteSpace} from 'antd-mobile';
import {createForm} from 'rc-form';

import Constants from '../../constants';
import {util, axiosInstance, connectToStore} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';

const {MERGE_DATA} = Constants;
const Item = List.Item;

/**
 * Header View
 */
@createForm()
@translate(['me'], {wait: true})
@connectToStore
class Setting extends Component {
    constructor(props) {
        super(props);
        const {i18n} = props;
        this.state = {
            language: i18n.language
        };
    }

    componentDidMount() {
        this.originSetting = {
            language: this.props.i18n.language
        };
    }

    /**
     * 登出
     */
    signOutClick = async (e) => {
        e.preventDefault();
        let self = this;
        const response = await axiosInstance.get('user/signOut');
        const data = response && response.data || {};
        if (data.success === true) {
            authInstance.userId = undefined;
            authInstance.userName = undefined;
            sessionStorage.removeItem('userInfo');
            util.goBack(self.props);
            Toast.success(data.msg || '成功退出！');
        }
    }

    onSubmit = () => {
        let self = this;
        self.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                const formData = this.props.form.getFieldsValue();
                if (!sessionStorage.getItem('userInfo')) {
                    Toast.fail('请先去登录');
                }
                else {
                    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                    let lan = formData['language'] === true ? 'zh' : 'en';
                    let data = Object.assign({}, userInfo, {
                        language: self.state.language,
                        id: userInfo.id
                    });
                    self.handleSubmitSetting(data, lan).catch(e => Toast.fail(e.msg || '网络回应错误'));
                }
            }
        });
    }

    handleSubmitSetting = async (param, lan) => {
        let self = this;
        let response = await axiosInstance.post('/user/setting', param);
        let data = response && response.data && response.data.data;
        if (data) {
            authInstance.language = data.name;
            util.setLanguage(lan);
            const {onClickAction} = self.props;
            let action = {
                type: MERGE_DATA,
                content: {
                    userInfo: data
                }
            };
            onClickAction(action, self.props);
            util.goBack(self.props);
        }
    }

    switchLanguage = (checked) => {
        this.setState({language: checked ? 'zh' : 'en'});
    }

    render() {
        let self = this;
        const {getFieldProps} = self.props.form;
        const {t} = self.props;
        const {language} = self.state;
        const disabled = Boolean(sessionStorage.getItem('userInfo'));
        return (
            <div className='app-me app-me-setting'>
                <Header title={t('setting')}/>
                <WhiteSpace/>
                <List className='app-me-list'>
                    <Item
                        extra={<Switch
                        disabled={!disabled}
                        checked={language === 'zh'}
                        {...getFieldProps('language')}
                        onClick={self.switchLanguage}/>}
                    >中英文切换</Item>
                </List>
                <WhiteSpace/>
                <Button
                    disabled={!disabled}
                    className='app-me-setting-submit-btn'
                    onClick={this.onSubmit}
                >
                    确认修改
                </Button>
                <WhiteSpace/>
                <Button
                    disabled={!disabled}
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
