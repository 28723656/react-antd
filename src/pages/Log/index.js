import React, {Component} from 'react'
import {Card, List, Tabs, Typography} from "antd";

const {TabPane} = Tabs;


const dataLog = [
    {id: 1, updateDay: '6-05', content: '项目初始动工'},
    {id: 2, updateDay: '6-10', content: '完成了基本的项目搭建'},
    {id: 3, updateDay: '6-15', content: '设计了计划管理的构思'},
    {id: 4, updateDay: '6-23', content: '把项目前后台运行在服务器上'},
];

const dataFuture= [
    {id: 1,  content: '完成计划内容'},
    {id: 2,  content: '添加用户角色权限'},
    {id: 3,  content: '设计动漫界面'},
    {id: 4,  content: '后续再看... ...'},
];

class Log extends Component {
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
                            dataSource={dataFuture}
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