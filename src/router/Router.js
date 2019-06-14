import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';

import Menus from './Menus';


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
