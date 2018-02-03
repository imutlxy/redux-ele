import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {createForm} from 'rc-form';
import {Toast, Picker, List, InputItem, Button, WhiteSpace} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, connectToStore} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';

const Item = List.Item;
const {ENTER_BUSINESS, GOTO} = Constants;

/**
 * 编辑收货地址
 */
@createForm()
@translate(['me'], {wait: true})
@connectToStore
class AddressEditor extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sValue: ['2013', '春'],
        visible: false
    };

    onPickerChange = (val) => {
        console.log(val);
        let colNum = 1;
        const d = [...this.state.data];
        const asyncValue = [...val];
        if (val[0] === '11') {
            d.forEach((i) => {
                if (i.value === '11') {
                    colNum = 2;
                    if (!i.children) {
                        i.children = [{
                            value: 'bj-east',
                            label: '东城区'
                        }, {
                            value: 'zj-west',
                            label: '西城区'
                        }];
                        asyncValue.push('zj-nb');
                    } else if (val[1] === 'zj-west') {
                        i.children.forEach((j) => {
                            if (j.value === 'zj-west') {
                                j.children = [{
                                    value: 'zj-hz-xh',
                                    label: '西湖区'
                                }];
                                asyncValue.push('zj-hz-xh');
                            }
                        });
                        colNum = 3;
                    }
                }
            });
        } else {
            colNum = 1;
        }
        this.setState({
            data: d,
            cols: colNum,
            asyncValue
        });
    };

    handleOk = () => {
        let self = this;
        self.props.form.validateFields({force: true}, (error) => {
            if (!error) {
                const formData = self.props.form.getFieldsValue();
                console.log(formData);
            }
        });
    }

    handleDeleteAddress = () => {
        // TODO 删除收货地址
        console.log('删除收货地址');
    }

    render() {
        let self = this;
        const {t, form} = self.props;
        const {getFieldProps} = form;
        return (
            <div className='app-me'>
                <Header title='收获地址'/>
                <form>
                    <List className='app-me-list'>
                        <InputItem {...getFieldProps('name', {
                            initialValue: '收货人'
                        })} placeholder='请输入收货人姓名'>收货人</InputItem>
                    </List>
                    <List className='app-me-list'>
                        <Picker
                            extra='更改'
                            data={this.state.data}
                            cols={this.state.cols}
                            value={this.state.asyncValue}
                            onPickerChange={this.onPickerChange}
                            onOk={v => console.log(v)}
                        >
                            <List.Item arrow='horizontal'>{'上海张江镇'}</List.Item>
                        </Picker>
                    </List>
                    <List className='app-me-list'>
                        <InputItem {...getFieldProps('address', {
                            initialValue: '详细地址'
                        })} placeholder='详细地址'>详细地址</InputItem>
                    </List>
                    <Button type='primary' onClick={this.handleOk}>确认</Button>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type='warning' onClick={this.handleDeleteAddress}>删除收货地址</Button>
                </form>
            </div>
        );
    }
}

export default AddressEditor;
