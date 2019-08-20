import React, {Component} from 'react'
import {Card, DatePicker, List, Tabs, Typography} from "antd";
import {getAjax} from "../../util/ajax";
import moment from 'moment';

const {TabPane} = Tabs;



class OnlyAdmin extends Component {

    state ={
        // 留言
        messageList:[],
        // Ip
        ipList:[],
    }

     onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    loadMessage = () =>{
        // 加载评论
        getAjax('/message/message')
            .then(response =>{
                this.setState({messageList:response.data.data})
            })
    }

    loadIp =() =>{
        getAjax('/ip/ip')
            .then(response =>{
              this.setState({ipList:response.data.data})
            })
    }

    componentDidMount() {
       this.loadMessage();
       this.loadIp();
    }

    render() {

        const {messageList,ipList} = this.state;

        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="评论留言" key="1">
                    {messageList &&
                    <Card title='留言' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                        <List
                            header={<div>简单介绍</div>}
                            bordered
                            dataSource={messageList}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text mark>{item.username}</Typography.Text>说： {item.message} ---- {moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")}
                                </List.Item>
                            )}
                        />
                    </Card>
                    }

                </TabPane>
                <TabPane tab="ip管理" key="2">
                    {ipList &&
                    <Card title='ip' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                        <List
                            header={<div>最近登录ip(50条)</div>}
                            bordered
                            dataSource={ipList}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text mark>{item.username}</Typography.Text> &nbsp; &nbsp; &nbsp; &nbsp;
                                    <Typography.Text >{item.ip}</Typography.Text> &nbsp; &nbsp; &nbsp; &nbsp;
                                    <Typography.Text > {moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")}</Typography.Text>
                                </List.Item>
                            )}
                        />
                    </Card>
                    }
                </TabPane>



            </Tabs>
        )
    }
}

export default OnlyAdmin
