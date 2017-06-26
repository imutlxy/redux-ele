import React, {Component} from 'react';

import App from './App';

import '../style/_content.scss';

/**
 * 最外层包装 View
 */
class WrapView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <App/>
        );
    }
}

export default WrapView;
