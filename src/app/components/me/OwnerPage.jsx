import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {translate} from 'react-i18next';
import {createForm} from 'rc-form';
import Cropper from 'react-cropper';
import AvatarCropper from 'react-avatar-cropper';
import {Toast, Picker, List, WhiteSpace} from 'antd-mobile';

import Constants from '../../constants';
import {util, axiosInstance, connectToStore} from '../../utils';
import {authInstance} from '../../auth';
import Header from '../header';

const {ENTER_BUSINESS, GOTO} = Constants;

/**
 * Header View
 */
@createForm()
@translate(['me'], {wait: true})
@connectToStore
class OwnerPage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        src: '../../../resource/images/default-avatar.png',
        cropResult: null,
        img: '../../../resource/images/default-avatar.png',
        cropperOpen: true,
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

    onClick = () => {
        setTimeout(() => {
            this.setState({
                data: [
                    {
                        value: '11',
                        label: '北京市',
                        spell: 'BeiJingShi'
                    }, {
                        value: '12',
                        label: '天津市',
                        spell: 'TianJinShi'
                    }, {
                        value: '13',
                        label: '河北省',
                        spell: 'HeBeiSheng'
                    }, {
                        value: '14',
                        label: '山西省',
                        spell: 'ShanXiSheng'
                    }, {
                        value: '15',
                        label: '内蒙古自治区',
                        spell: 'NeiMengGuZiZhiQu'
                    }, {
                        value: '21',
                        label: '辽宁省',
                        spell: 'LiaoNingSheng'
                    }, {
                        value: '22',
                        label: '吉林省',
                        spell: 'JiLinSheng'
                    }, {
                        value: '23',
                        label: '黑龙江省',
                        spell: 'HeiLongJiangSheng'
                    }, {
                        value: '31',
                        label: '上海市',
                        spell: 'ShangHaiShi'
                    }, {
                        value: '32',
                        label: '江苏省',
                        spell: 'JiangSuSheng'
                    }, {
                        value: '33',
                        label: '浙江省',
                        spell: 'ZheJiangSheng'
                    }, {
                        value: '34',
                        label: '安徽省',
                        spell: 'AnHuiSheng'
                    }, {
                        value: '35',
                        label: '福建省',
                        spell: 'FuJianSheng'
                    }, {
                        value: '36',
                        label: '江西省',
                        spell: 'JiangXiSheng'
                    }, {
                        value: '37',
                        label: '山东省',
                        spell: 'ShanDongSheng'
                    }, {
                        value: '41',
                        label: '河南省',
                        spell: 'HeNanSheng'
                    }, {
                        value: '42',
                        label: '湖北省',
                        spell: 'HuBeiSheng'
                    }, {
                        value: '43',
                        label: '湖南省',
                        spell: 'HuNanSheng'
                    }, {
                        value: '44',
                        label: '广东省',
                        spell: 'GuangDongSheng'
                    }, {
                        value: '45',
                        label: '广西壮族自治区',
                        spell: 'GuangXiZhuangZuZiZhiQu'
                    }, {
                        value: '46',
                        label: '海南省',
                        spell: 'HaiNanSheng'
                    }, {
                        value: '50',
                        label: '重庆市',
                        spell: 'ChongQingShi'
                    }, {
                        value: '51',
                        label: '四川省',
                        spell: 'SiChuanSheng'
                    }, {
                        value: '52',
                        label: '贵州省',
                        spell: 'GuiZhouSheng'
                    }, {
                        value: '53',
                        label: '云南省',
                        spell: 'YunNanSheng'
                    }, {
                        value: '54',
                        label: '西藏自治区',
                        spell: 'XiCangZiZhiQu'
                    }, {
                        value: '61',
                        label: '陕西省',
                        spell: 'ShanXiSheng'
                    }, {
                        value: '62',
                        label: '甘肃省',
                        spell: 'GanSuSheng'
                    }, {
                        value: '63',
                        label: '青海省',
                        spell: 'QingHaiSheng'
                    }, {
                        value: '64',
                        label: '宁夏回族自治区',
                        spell: 'NingXiaHuiZuZiZhiQu'
                    }, {
                        value: '65',
                        label: '新疆维吾尔自治区',
                        spell: 'XinJiangWeiWuErZiZhiQu'
                    }
                ]
            });
        }, 120);
    }

    componentDidMount() {
    }

    handleRequestHide = () => {
        this.setState({
            cropperOpen: false
        });
    }

    handleCrop = (dataURI) => {
        console.log(dataURI);
        this.setState({
            cropperOpen: false,
            img: null,
            croppedImg: dataURI
        });
    }

    cropImage = () => {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL()
        });
    }

    handleFile = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({src: reader.result});
        };
        reader.readAsDataURL(files[0]);
    }

    handleFileChange = (dataURI) => {
        this.setState({
            img: dataURI,
            croppedImg: this.state.croppedImg,
            cropperOpen: true
        });
    }

    render() {
        let self = this;
        const {t, form} = self.props;
        const {getFieldProps} = form;
        return (
            <div className='app-me'>
                <Header title='我的页面'/>
                <WhiteSpace size="lg"/>

                <button onClick={this.cropImage}>Crop Image</button>
                <input type='file' onChange={this.handleFile}/>
                <Cropper
                    style={{height: 400, width: 200}}
                    aspectRatio={16 / 9}
                    preview=".img-preview"
                    guides={false}
                    src={this.state.src}
                    ref={cropper => {
                        this.cropper = cropper;
                    }}
                />
                <img style={{width: '100%'}} src={this.state.cropResult} alt="cropped image"/>

                <Picker
                    extra="更改"
                    data={this.state.data}
                    cols={this.state.cols}
                    value={this.state.asyncValue}
                    onPickerChange={this.onPickerChange}
                    onOk={v => console.log(v)}
                >
                    <button onClick={this.onClick}>123</button>
                </Picker>
            </div>
        );
    }
}

export default OwnerPage;
