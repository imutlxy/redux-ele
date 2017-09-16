import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Toast, Carousel, WhiteSpace, WingBlank} from 'antd-mobile';

import Constants from '../../constants';
import {authInstance} from '../../auth';
import Footer from './../footer';
import {util, axiosInstance, sessionStorageUtil, mapStateToProps, mapDispatchToProps} from '../../utils';

const {DROP_TO_CONTENT} = Constants;

@translate(['home'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['', '', ''],
            initialHeight: 200
        };
    }

    getUserSetting = () => {
        axiosInstance.get('/setting').then(response => {
            let data  = response.data;
            if (data.status === 200) {
                sessionStorageUtil.set({name: data.name, id: data.id, language: data.language});
                authInstance.userId = data.id;
                authInstance.userName = data.name;
            } else {
                Toast.fail(data.msg || '网络回应错误');
            }
        });
    }

    componentDidMount() {
        // this.getUserSetting();
    }

    render() {
        let self = this;
        const {t} = self.props;
        return (
            <div className='app-home'>
                <div className='app-header'>{t('title')}</div>
                <WingBlank>
                    <Carousel
                        className="my-carousel"
                        autoplay={true}
                        infinite
                        swipeSpeed={35}
                    >
                        {this.state.data.map(ii => (
                            <a href="http://www.baidu.com" key={ii}>
                                <img
                                    src={`https://zos.alipayobjects.com/rmsportal/${ii || 'QcWDkUhvYIVEcvtosxMF'}.png`}
                                    alt="icon"
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({
                                            initialHeight: null
                                        });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>
                <Footer />
            </div>
        );
    }
}

export default HomeView;
