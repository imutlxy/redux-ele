import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {Button} from 'antd-mobile';

import Constants from '../../constants';
import Footer from './../footer';
import {util, connectToStore} from '../../utils';
import Header from '../header';
import './style/index.scss';

const {GOTO} = Constants;

/**
 * Header View
 */
@translate(['search'], {wait: true})
@connectToStore
class Search extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        util.setDocumentScrollTop('searchPageScrollTop');
    }

    componentWillUnmount() {
        util.getDocumentScrollTop('searchPageScrollTop');
    }

    render() {
        const {t} = this.props;
        return (
            <div className='app-search'>
                <Header title={t('title')}/>
                <h1>搜索</h1>
                <Footer />
            </div>
        );
    }
}

export default Search;
