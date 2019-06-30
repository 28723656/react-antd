import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Menus from './Menus';
import Login from '../pages/Login'
import Register from "../pages/Login/Register";


class Router extends Component {

    render() {
        const user = localStorage.getItem("user");
        console.log('user', user);
        return (
            <div>
                <BrowserRouter>
                    {user === null &&  <div>
                        <Route exact path="/" component={Login}/>
                        <Route  path="/register" component={Register}/>

                    </div> }
                    {user !== null &&
                    <Menus/>}
                </BrowserRouter>
            </div>

        );
    }
}

export default Router;
