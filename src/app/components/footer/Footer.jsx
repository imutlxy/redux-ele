import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {TabBar} from 'antd-mobile';

import Constants from '../../constants';
import {util, connectToStore} from '../../utils';
import './style/index.scss';

const {GOTO} = Constants;

@translate(['footer'], {wait: true})
@connectToStore
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '/home'
        };
    }

    handleMenuBarClick = (url = '') => {
        const pathname = this.props.routerStore && this.props.routerStore.pathname;
        pathname && url && pathname !== url && util.transformRouter(this.props, url);
    }

    render() {
        let self = this;
        const {t, routerStore} = self.props;
        const routerUrl = util.getRouterUrl(routerStore);
        return (
            <div className='app-footer'>
                <TabBar
                    unselectedTintColor="#666"
                    tintColor="#1bbc9b"
                    barTintColor='#ffffff'
                >
                    <TabBar.Item
                        title={t('footer:home')}
                        icon={<i className='fa fa-home'/>}
                        selectedIcon={<i className='fa fa-home'/>}
                        selected={routerUrl === '/home' || routerUrl.length < 3}
                        onPress={self.handleMenuBarClick.bind(this, '/home')}
                    />
                    <TabBar.Item
                        icon={<i className='fa fa-search'/>}
                        selectedIcon={<i className='fa fa-search'/>}
                        title={t('footer:search')}
                        badge={1}
                        selected={routerUrl === '/search'}
                        onPress={self.handleMenuBarClick.bind(this, '/search')}
                    />
                    <TabBar.Item
                        icon={<i className='fa fa-bars'/>}
                        selectedIcon={<i className='fa fa-bars'/>}
                        title={t('footer:order')}
                        dot={true}
                        selected={routerUrl === '/order'}
                        onPress={self.handleMenuBarClick.bind(this, '/order')}
                    />
                    <TabBar.Item
                        icon={<i className='fa fa-user-o'/>}
                        selectedIcon={<i className='fa fa-user-o'/>}
                        title={t('footer:me')}
                        dot={true}
                        selected={routerUrl === '/me'}
                        onPress={self.handleMenuBarClick.bind(this, '/me')}
                    />
                </TabBar>
            </div>
        );
    }
}

export default Footer;
