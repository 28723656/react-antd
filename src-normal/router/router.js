import React, {Component} from 'react';
import {
    Route,
    HashRouter,
    BrowserRouter
} from 'react-router-dom';

import Menus from '../components/Menus';


class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Menus/>
            </BrowserRouter>
        );
    }
}

export default Router;
