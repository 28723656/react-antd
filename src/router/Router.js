import React, {Component} from 'react';
import {BrowserRouter,Switch , Route} from 'react-router-dom';

import Menus from './Menus';
import Login from '../pages/Login'
import Register from "../pages/Login/Register";
import NoMatch from "../pages/NoMatch";


class Router extends Component {

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <div>
                <BrowserRouter>
                    {user === null &&  <div>
                        <Switch>
                            <Route exact path="/" component={Login}/>
                            <Route  path="/register" component={Register}/>
                            <Route  component={NoMatch} />
                        </Switch>
                    </div>
                    }
                    {user !== null &&
                    <Menus/>}
                </BrowserRouter>
            </div>

        );
    }
}

export default Router;
