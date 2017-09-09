import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import classNames from 'classnames';

import {util, mapStateToProps, mapDispatchToProps} from '../../utils';
import './style/index.scss';

@translate(['footer'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class Footer extends Component {
    constructor(props) {
        super(props);
    }

    handleMenuBarClick = (e, url) => {
        e.stopPropagation();
        util.transformRouter(this.props, url);
    }

    render() {
        let self = this;
        const {t, routerStore} = self.props;
        const routerUrl = routerStore && routerStore.pathname;
        return (
            <div className='app-footer'>
                <div className={classNames({
                    'app-footer-item': true,
                    'active': routerUrl.includes('/home') || routerUrl === '/'
                })} onClick={(e) => {
                    self.handleMenuBarClick(e, '/home');
                }}>
                    <i className="fa fa-home" aria-hidden="true"/>
                    <span>{t('footer:footerHome')}</span>
                </div>
                <div className={classNames({
                    'app-footer-item': true,
                    'active': routerUrl.includes('/search')
                })} onClick={(e) => {
                    self.handleMenuBarClick(e, '/search');
                }}>
                    <i className="fa fa-search" aria-hidden="true"/>
                    <span>{t('footer:footerSearch')}</span>
                </div>
                <div className={classNames({
                    'app-footer-item': true,
                    'active': routerUrl.includes('/order')
                })} onClick={(e) => {
                    self.handleMenuBarClick(e, '/order');
                }}>
                    <i className="fa fa-bars" aria-hidden="true"/>
                    <span>{t('footer:footerOrder')}</span>
                </div>
                <div className={classNames({
                    'app-footer-item': true,
                    'active': routerUrl.includes('/me')
                })} onClick={(e) => {
                    self.handleMenuBarClick(e, '/me');
                }}>
                    <i className="fa fa-user-o" aria-hidden="true"/>
                    <span>{t('footer:footerMe')}</span>
                </div>
            </div>
        );
    }
}

export default Footer;
