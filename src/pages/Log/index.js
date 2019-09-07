import React, {Component} from 'react'
import {Card, DatePicker, List, Tabs, Typography,Col,Row} from "antd";

const {TabPane} = Tabs;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


const dataLog = [
    {id: 1, updateDay: '2019-6-05', content: '项目初始动工'},
    {id: 2, updateDay: '2019-6-10', content: '完成了基本的项目搭建'},
    {id: 3, updateDay: '2019-6-15', content: '设计了计划管理的构思'},
    {id: 4, updateDay: '2019-6-23', content: '把项目前后台运行在服务器上'},
    {id: 5, updateDay: '2019-6-25', content: '完成用户角色权限系统'},
    {id: 6, updateDay: '2019-6-26', content: '完成角色登陆后显示对应的权限菜单'},
    {id: 7, updateDay: '2019-6-30', content: '新增了用户注册和登录，计划管理也和用户账号对应'},
    {id: 8, updateDay: '2019-7-1月-2019-8-15', content: '游山玩水去了，持续掉线中... ...'},
    {id: 9, updateDay: '2019-8-16', content: '更新了网易云的相关功能，可以听歌，看评论，看歌词等等'},
    {id: 10, updateDay: '2019-8-20', content: '优化了网易云的选中标签特效，新增屏幕使用时间密码忘记功能'},
    {id: 10, updateDay: '2019-9-2', content: '肝了一个多星期，终于制作出来卡牌游戏的基本雏形了，能够实现自定义卡牌，自定义卡牌的任何属性，能够自定义抽奖的任何概率，一切都可以自定义的卡牌游戏'},
    {id: 11, updateDay: '2019-9-3', content: '优化了一下页面跳转，卡牌基本功能实现，详细信息在制作中...'},
    {id: 12, updateDay: '2019-9-4', content: '新增卡牌图鉴，抽卡记录，统计，开、关部分抽奖等功能，'},
];

const dataFuture6= [
    {id: 1,  content: '完成计划内容 (进行中...等哪天有闲工夫再说)'},
    {id: 2,  content: '添加用户角色权限(进行中...早就ok了) '},
    {id: 3,  content: '设计动漫界面...这个也是有闲工夫再说'},
    {id: 4,  content: '完成卡牌游戏设计... 爆肝中'},
    {id: 5,  content: '后续再看... ...'},
];

const dataFuture7= [
    {id: 1,  content: '7月持续掉线中'},
];

const dataFuture8= [
    {id: 1,  content: '8月前半个月掉线中'},
    {id: 2,  content: '8月后半段完成了网易云的功能，可听歌，看评论，都是批量的，想看多少看多少'},
    {id: 3,  content: '8月后半段闲暇的时候把屏幕使用时间的忘记密码功能做了一下，让自己少玩点手机'},
    {id: 4,  content: '8月20多号，开始更新卡牌游戏，灵感来自于狂野飙车10的卡牌设计，其实大多数卡牌游戏都一个屌样'},
];

const dataFuture9= [
    {id: 1,  content: '我一直在黑夜中更新...'},
    {id: 2,  content: '有什么灵感就更新什么...'},
];

class Log extends Component {

     onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="更新日志" key="1">
                    <Card title='『2019 年』' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                        <h3 style={{margin: 8}}>6月</h3>
                        <List
                            header={<div>简单介绍</div>}
                            footer={<div>我是小尾巴~~~</div>}
                            bordered
                            dataSource={dataLog}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text mark>{item.updateDay}</Typography.Text> {item.content}
                                </List.Item>
                            )}
                        />
                    </Card>
                </TabPane>
                <TabPane tab="未来计划" key="2">
                    <Card title='『2019 』' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                        <h3 style={{margin: 8}}>6月</h3>
                        <List
                            header={<div>简单介绍</div>}
                            footer={<div>我是小尾巴~~~</div>}
                            bordered
                            dataSource={dataFuture6}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text strong>{item.id}</Typography.Text> {item.content}
                                </List.Item>
                            )}
                        />

                        <h3 style={{margin: 8}}>7月</h3>
                        <List
                            header={<div>简单介绍</div>}
                            footer={<div>我是小尾巴~~~</div>}
                            bordered
                            dataSource={dataFuture7}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text strong>{item.id}</Typography.Text> {item.content}
                                </List.Item>
                            )}
                        />
                        <h3 style={{margin: 8}}>8月</h3>
                        <List
                            header={<div>简单介绍</div>}
                            footer={<div>我是小尾巴~~~</div>}
                            bordered
                            dataSource={dataFuture8}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text strong>{item.id}</Typography.Text> {item.content}
                                </List.Item>
                            )}
                        />

                        <h3 style={{margin: 8}}>9月</h3>
                        <List
                            header={<div>简单介绍</div>}
                            footer={<div>我是小尾巴~~~</div>}
                            bordered
                            dataSource={dataFuture9}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text strong>{item.id}</Typography.Text> {item.content}
                                </List.Item>
                            )}
                        />

                    </Card>
                </TabPane>
                <TabPane tab="系统说明" key="3">
                    <Card title='前端'>
                        <Row>
                            <Col>1.用的react,react-router-dom做路由，redux做状态管理,但是后期嫌麻烦，就直接没用redux了</Col>
                            <Col>2.ant-design前端组件，虽然是web端组件，但是我做的时候还是对手机和pad端进行的一些调整</Col>
                        </Row>
                    </Card>
                    <Card title='后台'>
                        <Row>
                            <Col>1.springBoot+mybatisPlus，因为这样对数据库操作起来太方便了</Col>
                            <Col>2.暂时没有加上任何的安全验证，因为我觉得测试起来可能不方便，等都成型了后，加上shiro吧</Col>
                        </Row>
                    </Card>
                    <Card title='数据库'>
                        <Row>
                            <Col>1.主要用mysql,但是这次我没有主动关联任何主外键</Col>
                            <Col>2.对于一些查询时间比较长的操作，我就把数据放入redis了</Col>
                        </Row>
                    </Card>
                    <Card title='服务器'>
                        <Row>
                            <Col>1.阿里云的服务器,linux系统，左右的东西都放在docker里面跑了</Col>
                            <Col>2.网易云那个东西，就是开源的一个项目，直接从git靠过来，在docker里面运行，就能直接调接口那数据了</Col>
                            <Col>3.本来想搞个域名的，结果有一步要居住证，就算了</Col>
                        </Row>
                    </Card>
                </TabPane>
                <TabPane tab="版本控制" key="4">

                    <Card title='v0.2.2   2019-9-7'>
                        <Row>
                            <Col>1.管理员后台新增数据字典管理</Col>
                            <Col>2.优化了下菜单显示</Col>
                        </Row>
                    </Card>

                    <Card title='v0.2.1   2019-9-5'>
                        <Row>
                            <Col>1.完成了基本的卡牌游戏</Col>
                            <Col>2.能够自定义卡牌和抽奖，所有的数据都是自定义的</Col>
                        </Row>
                    </Card>

                    <Card title='v0.1.1   2019-7-5'>
                        <Row>
                            <Col>1.完成了用户角色权限的划分</Col>
                            <Col>2.动漫的基本雏形</Col>
                        </Row>
                    </Card>

                    <Card title='v0.0.2   2019-6-29'>
                        <Row>
                            <Col>1.计划管理系统上线（但是只完成了部分）</Col>
                        </Row>
                    </Card>

                    <Card title='v0.0.1   2019-6-15'>
                        <Row>
                            <Col>1.终于部署了自己的服务器，准备放点东西上去</Col>
                            <Col></Col>
                        </Row>
                    </Card>


                </TabPane>

            </Tabs>
        )
    }
}

export default Log
