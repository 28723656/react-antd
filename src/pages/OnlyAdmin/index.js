import React, {Component} from 'react'
import {Button, Card, DatePicker, List, Tabs, Typography} from "antd";
import {getAjax} from "../../util/ajax";
import moment from 'moment';
import {getMomentTime} from "../../util/momentUtil";

const {TabPane} = Tabs;



class OnlyAdmin extends Component {

    state ={
        // 留言
        messageList:[],
        // Ip
        ipList:[],
        // 登录
        signInList:[],
        // 查看多少天内的情况
        signDays:90,
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

    getSignIn =(more=false) =>{
        let {signDays} = this.state
        if(more){
            signDays +=90;
            this.setState({signDays})
        }
        getAjax(`/game/recordSignIn/record/${signDays}`).then(response =>{
            this.setState({signInList:response.data.data})
        })
    }

    loadSignIn =() =>{
      this.getSignIn();
    }

    componentDidMount() {
       this.loadMessage();
       this.loadIp();
       this.loadSignIn();
    }

    render() {

        const {messageList,ipList,signInList} = this.state;
        console.log('signInList-render',signInList)

        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>

                <TabPane tab="今日活跃" key="1">
                    {signInList&& signInList.length>0 &&
                    <>
                        <Card title='登录情况' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                            <List
                                header={<div>近3个月内登录记录</div>}
                                bordered
                                dataSource={signInList}
                                renderItem={item => (
                                    <List.Item>
                                        <Typography.Text>{item.userId}</Typography.Text> &nbsp; &nbsp;
                                        <Typography.Text mark>{item.nickName}</Typography.Text> &nbsp; &nbsp;
                                        <Typography.Text>{getMomentTime(item.createTime)}</Typography.Text> &nbsp; &nbsp;
                                    </List.Item>
                                )}
                            />
                        </Card>
                        <br/>
                        <Button type='primary' block onClick={() => this.getSignIn(true)}>多看3个月</Button>
                    </>
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
                                    <Typography.Text > {moment(item.createTime.map((record,index)=> index === 1 ?record-1:record)  ).format("YYYY-MM-DD HH:mm:ss")}</Typography.Text>
                                </List.Item>
                            )}
                        />
                    </Card>
                    }
                </TabPane>

                <TabPane tab="评论留言" key="3">
                    {messageList &&
                    <Card title='留言' bordered={true} bodyStyle={{paddingTop: '2px'}}>
                        <List
                            header={<div>简单介绍</div>}
                            bordered
                            dataSource={messageList}
                            renderItem={item =>
                                  <List.Item>
                                    <Typography.Text mark>{item.username}</Typography.Text>说： {item.message}---- ---- {moment(item.createTime.map((record,index)=> index === 1 ?record-1:record)  ).format("YYYY-MM-DD HH:mm:ss")}
                                </List.Item>
                            }
                        />
                    </Card>
                    }

                </TabPane>

            </Tabs>
        )
    }
}

export default OnlyAdmin
