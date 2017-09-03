import React, {Component} from 'react';

import HomeView from './HomeView';
import '../style/_content.scss';

/**
 * App View
 */
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HomeView/>
        );
    }
}

export default App;
