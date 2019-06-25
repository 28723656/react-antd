import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Menus from './Menus';
import Login from '../pages/Login'
import Page1 from "../pages/Page1";
import {Route} from 'react-router-dom';

class Router extends Component {
    render() {
        const user = localStorage.getItem("user");
        console.log('user', user);
        return (
            <div>
                <BrowserRouter>
                    {user === null &&   <Route  path="/" component={Login}/>}
                    {user !== null &&
                    <Menus/>}
                </BrowserRouter>
            </div>

        );
    }
}

export default Router;
