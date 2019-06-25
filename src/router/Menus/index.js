import React, {Component} from 'react';
import {
    Route,
    Link,
    NavLink,
    withRouter,
    Redirect,
    Switch,
} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Avatar} from 'antd';
import Page1 from "../../pages/Page1";
import Page2 from "../../pages/Page2";
import PlanStat from "../../pages/PlanStat";
import Page3 from "../../pages/Page3";
import Page4 from "../../pages/Page4";
import Page5 from "../../pages/Page5";
import Test01 from "../../pages/Test01";
import Test02 from "../../pages/Test02";
import Page7 from "../../pages/Page7";
import Page8 from "../../pages/Page8";
import Log from "../../pages/Log";
import Admin from "../../pages/Admin";

require('./style.css')


const {Header, Content, Footer} = Layout;


const linkList = [
    {
        menu: 'plan', link: <Menu.Item key="1">
            <NavLink to='/plan'>今日任务</NavLink>
        </Menu.Item>
    },
    {
        menu: 'statistics', link: <Menu.Item key="2">
            <NavLink to='/statistics'>任务统计</NavLink>
        </Menu.Item>
    },
    {
        menu: 'TV', link: <Menu.Item key="20">
            <NavLink to='/TV'>动漫</NavLink>
        </Menu.Item>
    },
    {
        menu: 'homework', link: <Menu.Item key="40">
            <NavLink to='/homework'>作业界面</NavLink>
        </Menu.Item>
    },
    {
        menu: 'log', link: <Menu.Item key="100">
            <NavLink to='/log'>更新日志</NavLink>
        </Menu.Item>
    },
    {
        menu: 'system', link: <Menu.Item key="1001">
            <NavLink to='/system'>系统管理</NavLink>
        </Menu.Item>
    }]

const routerList = [{menu:'plan',route: <Route exact key={6} path="/plan" component={Page1}/>},
    {menu:'statistics',route:<Route key={1} path="/statistics" component={PlanStat}/>},
    {menu:'TV',route: <Route key={2} path="/TV" component={Page4}/>},
    {menu:'homework',route: <Route key={3} path="/homework" component={Page2}/>},
    {menu:'log',route:<Route key={4} path="/log" component={Log}/>},
    {menu:'system',route:<Route key={5} path="/system" component={Admin}/>},
]


const menuId=['plan','statistics','system'];

class Menus extends Component {


    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                    <div className='logo'/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '64px'}}
                    >
                        {linkList.map((record, index) => {
                            if (menuId.indexOf(record.menu)!== -1){
                                return record.link;
                            }
                                })}

                    </Menu>
                </Header>
                <Content style={{padding: '0 0px', marginTop: 64}}>

                    <div style={{padding: '24 0px', minHeight: '90vh'}}>
                        {routerList.map((record,index) =>{
                            if(menuId.indexOf(record.menu) !== -1){
                                return record.route;
                            }
                        })}
                        <Route exact path="/" component={Page1}/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>©2019 Created 风往西边吹丶</Footer>
            </Layout>

        );
    }
}

export default Menus;
