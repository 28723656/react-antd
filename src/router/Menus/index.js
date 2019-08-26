import React, {Component} from 'react';
import {
    Route,
    Link,
    NavLink,
    withRouter,
    Redirect,
    Switch,
} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Avatar, message} from 'antd';
import Page1 from "../../pages/Page1";
import Page2 from "../../pages/Page2";
import PlanStat from "../../pages/PlanStat";
import Page3 from "../../pages/Page3";
import Page4 from "../../pages/Page4";
import Page5 from "../../pages/Page5";
import Test02 from "../../pages/Test02";
import Page7 from "../../pages/Page7";
import Page8 from "../../pages/Page8";
import WangYi from "../../pages/WangYi";
import Log from "../../pages/Log";
import Admin from "../../pages/Admin";
import {addAjax, getAjax} from "../../util/ajax";
import Person from "../../pages/Person";
import Score from "../../pages/Score";
import Password from "../../pages/Password";
import Message from "../../pages/Message";
import OnlyAdmin from "../../pages/OnlyAdmin";
import GameCard from "../../pages/GameCard";
import GameCardAdmin from "../../pages/Admin/GameCardAdmin";
import Test001 from "../../pages/Test001";

require('./style.css')


const {Header, Content, Footer} = Layout;


const linkList = [
    {
        menu: 'wangyi', link: <Menu.Item key="2004">
            <NavLink to='/wangyi'>网易云相关</NavLink>
        </Menu.Item>
    },
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
    },
    {
        menu: 'score', link: <Menu.Item key="1002">
            <NavLink to='/score'>积分</NavLink>
        </Menu.Item>
    },
    {
        menu: 'password', link: <Menu.Item key="1003">
            <NavLink to='/password'>密码加密</NavLink>
        </Menu.Item>
    },
    {
        menu: 'message', link: <Menu.Item key="1004">
            <NavLink to='/message'>留言</NavLink>
        </Menu.Item>
    },
    {
        menu: 'gameCard', link: <Menu.Item key="1006">
            <NavLink to='/gameCard'>卡片游戏</NavLink>
        </Menu.Item>
    },
    {
        menu: 'gameCardAdmin', link: <Menu.Item key="1007">
            <NavLink to='/gameCardAdmin'>卡片游戏管理</NavLink>
        </Menu.Item>
    },
    {
        menu: 'onlyAdmin', link: <Menu.Item key="1098">
            <NavLink to='/onlyAdmin'>管理员后台</NavLink>
        </Menu.Item>
    },
    {
        menu: 'person', link: <Menu.Item key="1099">
            <NavLink to='/person'>个人中心</NavLink>
        </Menu.Item>
    },
    {
        menu: 'test001', link: <Menu.Item key="9001">
            <NavLink to='/test001'>测试001</NavLink>
        </Menu.Item>
    },

    ]

const routerList = [
    {menu:'plan',route: <Route exact key={6} path="/plan" component={Page1}/>},
    {menu:'statistics',route:<Route key={1} path="/statistics" component={PlanStat}/>},
    {menu:'TV',route: <Route key={2} path="/TV" component={Page4}/>},
    {menu:'homework',route: <Route key={3} path="/homework" component={Page2}/>},
    {menu:'log',route:<Route key={4} path="/log" component={Log}/>},
    {menu:'system',route:<Route key={5} path="/system" component={Admin}/>},
    {menu:'person',route:<Route key={7} path="/person" component={Person}/>},
    {menu:'score',route:<Route key={8} path="/score" component={Score}/>},
    {menu:'wangyi',route:<Route key={9} path="/wangyi" component={WangYi}/>},
    {menu:'password',route:<Route key={10} path="/password" component={Password}/>},
    {menu:'message',route:<Route key={11} path="/message" component={Message}/>},
    {menu:'onlyAdmin',route:<Route key={12} path="/onlyAdmin" component={OnlyAdmin}/>},
    {menu:'gameCard',route:<Route key={13} path="/gameCard" component={GameCard}/>},
    {menu:'gameCardAdmin',route:<Route key={14} path="/gameCardAdmin" component={GameCardAdmin}/>},
    {menu:'test001',route:<Route key={9001} path="/test001" component={Test001}/>},
]


//const menuList=['plan','statistics','system'];

class Menus extends Component {

    state ={
        menuList:[],
    }

    initMenu = () =>{
        console.log('------lalala-------')
      const user = JSON.parse(localStorage.getItem('user'));
      if(user!== null && !user.offLine){
          getAjax(`/admin/user/menu/${user.id}`)
              .then(response =>{
                  const result = response.data;
                  if(result.flag){
                      //  this.props.history.replace("/plan");
                      // console.log('this.props.history',this.props.history);

                    //  window.location="/"
                      this.setState({menuList:result.data});
                  }else {
                      message.error('没有权限，请联系管理员');
                  }
              })
      } else {
          // 离线登录，给他几个菜单显示吧
      }
    }

    componentDidMount() {
       this.initMenu();
    }


    render() {
         const {menuList} = this.state;
        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                    <div className='logo'/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['7']}
                        style={{lineHeight: '64px'}}
                    >
                        {menuList && menuList.length > 0 && linkList.map((record, index) => {
                            if (menuList.indexOf(record.menu)!== -1){
                                return record.link;
                            }
                                })}

                    </Menu>
                </Header>
                <Content style={{padding: '0 0px', marginTop: 64}}>

                    <div style={{padding: '24 0px', minHeight: '90vh'}}>
                        {menuList && menuList.length > 0 && routerList.map((record,index) =>{
                            if(menuList.indexOf(record.menu) !== -1){
                                return record.route;
                            }
                        })}
                        <Route exact path="/" component={Person}/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>©2019 Created 风往西边吹丶 &nbsp;&nbsp;  QQ:28723656</Footer>
            </Layout>

        );
    }
}

export default Menus;
