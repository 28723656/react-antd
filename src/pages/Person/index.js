import React, {Component} from 'react'
import {Button, Card, List, Tabs, Typography} from "antd";

const {TabPane} = Tabs;


class Person extends Component {
    logout =() =>{
        localStorage.removeItem("user");
        localStorage.removeItem("basePlanList");
        window.location="/";
    }
    render() {
       const user = JSON.parse(localStorage.getItem("user"));
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="个人中心" key="1">
                    <Card title='我的信息' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                        <p>id：{user.id}</p>
                        <p>账号：{user.phone}</p>
                        <p>昵称：{user.nickName}</p>
                        <Button onClick={this.logout} type="primary" block>注销账号</Button>
                    </Card>
                </TabPane>
            </Tabs>
        )
    }
}

export default Person
