import React, {Component} from 'react'
import {Col, List, message, Row} from "antd";
import Button from "antd/es/button";
import {getUser} from "../../../util/userUtil";
import PropTypes from "prop-types";
import InviteModal from "../../../pageContent/Poker/zjh/InviteModal";


class Friends extends Component{

    static propTypes = {
        userList:PropTypes.array.isRequired,
        handleCancel:PropTypes.func.isRequired,
        handleOk:PropTypes.func.isRequired,
        inviteVisible:PropTypes.bool.isRequired,
        inviteSomeone:PropTypes.func.isRequired,
        letHimOut:PropTypes.func.isRequired,
        owner:PropTypes.object.isRequired,
        guest:PropTypes.object.isRequired,
        gameStart:PropTypes.func.isRequired,
    }


    // 邀请某人，房主和客人
    inviteSomeone =(owner,guest) =>{
        this.props.inviteSomeone(owner,guest);
    }

    // 让某个玩家下线
    letHimOut =(item) =>{
        this.props.letHimOut(item);

    }

    // 开始游戏
    gameStart =(userList2) =>{
        this.props.gameStart(userList2);
    }


    render() {


        const {userList,handleCancel,handleOk,inviteVisible,owner,guest} = this.props;
        console.log('^^^^userList',userList)
        const user = getUser();

        const userMongo = userList.filter(record => record.id === user.id)
        console.log('^^^^userMongo',userMongo)

        let  userList2
        if(userMongo.length !== 0){
            // 找出userList中和自己是一个room的，且不等于0的
            userList2 =  userList.filter((record =>{
                return record.room !== '0' && record.room === userMongo[0].room;
            }))
            console.log('^^^^userList2',userList2)
        }else {
            userList2 = []
        }




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
                {userList2 && userList2.length >=2 &&
                <div>
                    <List
                        size="small"
                        header={header2}
                        bordered
                        dataSource={userList2}
                        renderItem={item => <List.Item>
                            {item.nickName}
                        </List.Item>}
                    />
                    <Button type='primary' block size='large' onClick={() =>this.gameStart(userList2)}> 开始游戏 </Button>
                </div>
                }

                <br/>
                <br/>
                <List
                    size="small"
                    header={header}
                    bordered
                    dataSource={userList}
                    renderItem={item => <List.Item>
                        {item.nickName}
                        &nbsp;&nbsp;&nbsp; {item.id !==user.id && <Button onClick={() =>this.inviteSomeone(user,item)}>邀请</Button> }
                        &nbsp;&nbsp;&nbsp; {user.id === 1 && item.id !==user.id  &&  <Button type='danger' onClick={() =>this.letHimOut(item)} >踢出</Button> }
                    </List.Item>}
                />

                <InviteModal guest={guest} owner={owner} handleCancel={handleCancel} handleOk={handleOk} inviteVisible={inviteVisible}/>


            </div>
        )
    }
}

export default Friends
