import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';

import {util, mapStateToProps, mapDispatchToProps} from '../../utils';
import './style/index.scss';

@translate(['footer'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class Header extends Component {
    constructor(props) {
        super(props);
    }

    goBack = (e) => {
        e.stopPropagation();
        const routerUrl = this.props.routerStore && this.props.routerStore.pathname;
        if (routerUrl && routerUrl.split && routerUrl.split('/').length > 2) {
            util.goBack(this.props);
        }
    }

    render() {
        let self = this;
        const {t, title} = self.props;
        return (
            <div className='app-header'>
                <i className="fa fa-chevron-left" onClick={self.goBack}/>
                <span>{title}</span>
            </div>
        );
    }
}

export default Header;
