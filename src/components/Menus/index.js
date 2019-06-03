import React, {Component} from 'react';
import {
    Route,
    Link,
    NavLink,
    withRouter,
    Redirect,
    Switch,
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb ,Avatar} from 'antd';
import Page1 from "../../pages/Page1";
import Page2 from "../../pages/Page2";
import Page3 from "../../pages/Page3";
import Page4 from "../../pages/Page4";
import Page5 from "../../pages/Page5";
import Test01 from "../../pages/Test01";
import Test02 from "../../pages/Test02";
import Page7 from "../../pages/Page7";
import Page8 from "../../pages/Page8";

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
                            <NavLink to='/'  >今日任务</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to='/page2'  >计划安排</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to='/page3'  >商城</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to='/page4'  >排行榜</NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink to='/page5'  >测试页面</NavLink>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <NavLink to='/test01'  > 练习一：模块化练习 </NavLink>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <NavLink to='/test02'  > 练习二：数字排列 </NavLink>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <NavLink to='/page7'  >幸运7</NavLink>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <NavLink to='/page8'  >  我的信息</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 0px', marginTop: 64 }}>

                    <div style={{padding: '24 0px', minHeight: '90vh'}}>
                            <Route exact path="/" component={Page1}/>
                            <Route path="/page2" component={Page2}/>
                            <Route path="/page3" component={Page3}/>
                            <Route path="/page4" component={Page4}/>
                            <Route path="/page5" component={Page5}/>
                            <Route path="/test01" component={Test01}/>
                            <Route path="/test02" component={Test02}/>
                            <Route path="/page7" component={Page7}/>
                            <Route path="/page8" component={Page8}/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created 风往西边吹丶</Footer>
            </Layout>

        );
    }
}

export default Menus;
