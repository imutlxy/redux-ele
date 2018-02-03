import React, {Component} from 'react';
import {translate} from 'react-i18next';
import classNames from 'classnames';

import Constants from '../../constants';
import {util, connectToStore} from '../../utils';
import './style/index.scss';

const {GOTO} = Constants;

@translate(['footer'], {wait: true})
@connectToStore
class Footer extends Component {
    constructor(props) {
        super(props);
    }

    handleMenuBarClick = (url = '') => {
        url && util.transformRouter(this.props, url);
    }

    render() {
        let self = this;
        const {t, routerStore} = self.props;
        const routerUrl = util.getRouterUrl(routerStore);
        return (
            <div className='app-footer'>
                <div className={classNames({
                    'app-footer-item': true,
                    'active': routerUrl.includes('/home') || routerUrl === '/'
                })} onClick={self.handleMenuBarClick.bind(this, '/home')}>
                    <i className='fa fa-home'/>
                    <span>{t('footer:home')}</span>
                </div>
                <div className={classNames({
                    'app-footer-item': true,
                    'active': routerUrl.includes('/search')
                })} onClick={self.handleMenuBarClick.bind(this, '/search')}>
                    <i className='fa fa-search'/>
                    <span>{t('footer:search')}</span>
                </div>
                <div className={classNames({
                    'app-footer-item': true,
                    'active': routerUrl.includes('/order')
                })} onClick={self.handleMenuBarClick.bind(this, '/order')}>
                    <i className='fa fa-bars'/>
                    <span>{t('footer:order')}</span>
                </div>
                <div className={classNames({
                    'app-footer-item': true,
                    'active': routerUrl.includes('/me')
                })} onClick={self.handleMenuBarClick.bind(this, '/me')}>
                    <i className='fa fa-user-o'/>
                    <span>{t('footer:me')}</span>
                </div>
            </div>
        );
    }
}

export default Footer;
