import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import About from './About';
import Inbox from './Inbox';
import ContentView from './ContentView';
import '../style/_content.scss';
import 'antd/dist/antd.css';

/**
 * App View
 */
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <ul className='app-menu-bar'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/Inbox'>Inbox</Link></li>
                    </ul>
                    <hr/>
                    <Route exact path='/' component={ContentView}/>
                    <Route path='/about' component={About}/>
                    <Route path='/Inbox' component={Inbox}/>
                </div>
            </Router>
        );
    }
}

export default App;
