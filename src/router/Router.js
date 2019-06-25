import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';

import Menus from './Menus';
import Login from '../pages/Login'

class Router extends Component {
    render() {
        return (
            <div>
                {true && <Login/>}
                {false &&
                <BrowserRouter>
                    <Menus/>
                </BrowserRouter> }

            </div>

        );
    }
}

export default Router;
