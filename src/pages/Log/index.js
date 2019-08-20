import React, {Component} from 'react'
import {Card, DatePicker, List, Tabs, Typography} from "antd";

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
    {id: 8, updateDay: '2019-7月到8-15', content: '游山玩水去了，持续掉线中... ...'},
    {id: 9, updateDay: '2019-8-16', content: '更新了网易云的相关功能，可以听歌，看评论，看歌词等等'},
    {id: 10, updateDay: '2019-8-20', content: '优化了网易云的选中标签特效，新增屏幕使用时间密码忘记功能'},
];

const dataFuture6= [
    {id: 1,  content: '完成计划内容 (进行中...)'},
    {id: 2,  content: '添加用户角色权限(进行中...) '},
    {id: 3,  content: '设计动漫界面'},
    {id: 4,  content: '后续再看... ...'},
];

const dataFuture7= [
    {id: 1,  content: '随缘更新...'},
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

                    </Card>
                </TabPane>



            </Tabs>
        )
    }
}

export default Log
