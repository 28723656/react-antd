import React, {Component} from 'react'
import {Card, List, Tabs, Typography} from "antd";
import SmallTable from "../../components/Table/SmallTable";

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


const initColumns = [
    {
        title: 'id',
        dataIndex: 'id',
    },
    {
        title: '电话（用户名）',
        dataIndex: 'phone',
    },
    {
        title: '昵称',
        dataIndex: 'nickName',
    },
    {
        title: '操作',
        render: (value,record) =>{
            return <a>修改</a>
        }
    },
];
const initData = [
    {
        id:1,
        phone: '13232323232',
        nickName: '风往西边吹丶',
    },
    {
        id:2,
        phone: '13456789087',
        nickName: '普通用户丶',
    },
    {
        id:3,
        phone: '13456474578',
        nickName: '我是高级用户',
    },
];


class Admin extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="用户管理" key="1">
               <SmallTable columns={initColumns} dataSource={initData} />
                </TabPane>
                <TabPane tab="角色管理" key="2">
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
                <TabPane tab="权限管理" key="3">
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

export default Admin
