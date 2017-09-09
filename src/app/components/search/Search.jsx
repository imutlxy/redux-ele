import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Button} from 'antd';

import Constants from '../../constants';
import Footer from './../footer';
import {util, mapStateToProps, mapDispatchToProps} from '../../utils';

const {GOTO} = Constants;

/**
 * Header View
 */
@translate(['search'], {wait: true})
@connect(mapStateToProps, mapDispatchToProps)
class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <h1>{t('search:inbox_test')}</h1>
                <Footer />
            </div>
        );
    }
}

export default Search;
