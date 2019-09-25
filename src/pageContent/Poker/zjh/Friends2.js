import React, {Component} from 'react'
import {Col, List, Row} from "antd";
import Button from "antd/es/button";


class Friends extends Component{




    render() {

        const data = [
            '风往西边吹丶',
            '玩家一',
            '玩家二',
        ];



        const header =<div>
            <Row>
                <Col span={12}> <span style={{color:'green' }}>当前在线</span></Col>
            </Row>


        </div>
        const header2 = <p style={{color:'blue' }}>当前队伍</p>

        return (
            <div>

                <List
                    size="small"
                    header={header2}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>
                        {item}
                    </List.Item>}
                />


                <Button type='primary' block size='large' onClick={this.gameStart}> 准备 </Button>


                <br/>
                <br/>
                <List
                    size="small"
                    header={header}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>
                        {item} &nbsp;&nbsp;&nbsp; <Button >邀请</Button>
                    </List.Item>}
                />

            {/*    <InviteModal handleCancel={this.handleCancel} handleOk={this.handleOk} inviteVisible={inviteVisible}/>*/}


            </div>
        )
    }
}

export default Friends
