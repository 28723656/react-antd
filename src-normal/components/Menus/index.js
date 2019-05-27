import React, {Component} from 'react';
import {
    Route,
    Link,
    NavLink,
    withRouter,
    Redirect,
    Switch,
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import Page1 from "../../pages/Page1";
import Page2 from "../../pages/Page2";
import Page3 from "../../pages/Page3";
import Page4 from "../../pages/Page4";
import Test01 from "../../pages/Test01";

require('./style.css')


const { Header, Content, Footer } = Layout;

class Menus extends Component {


    render() {
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className='logo' />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">
                            <NavLink to='/'  >首页</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to='/page2'  >页面2</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to='/page3'  >页面3</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to='/page4'  >排行榜 </NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink to='/test01'  > 练习一：模块化练习 </NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>

                    <div style={{padding: '240px 20px', minHeight: '90vh'}}>
                            <Route exact path="/" component={Page1}/>
                            <Route path="/page2" component={Page2}/>
                            <Route path="/page3" component={Page3}/>
                            <Route path="/page4" component={Page4}/>
                            <Route path="/test01" component={Test01}/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>

        );
    }
}

export default Menus;
