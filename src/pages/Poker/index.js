import React,{Component} from 'react'
import {Button, Row, Col, Tabs, message} from "antd";
import Friends from "../../pageContent/Poker/zjh/Friends";
import {addAjax, WS_API_ROOT} from "../../util/ajax";
import {getUser} from "../../util/userUtil";
import MongoTest from "../../pageContent/Poker/test/MongoTest";
import SocketTest from "../../pageContent/Poker/test/SocketTest";
import Friends2 from "../../pageContent/Poker/zjh/Friends2";
import io from 'socket.io-client'
import moment from "moment";
const {TabPane} = Tabs;

class Poker extends Component{
    state ={
        activeKey:"1",
        userList:[], // 当前在线的人
        inputValue:'', // 输入框，聊天
        msgList:[],   // 聊天消息
        inviteVisible:false,  // 邀请的窗口
        owner:{}, // 邀请人  ：发起者
        guest:{},// 被邀请人
    }

    // 连接
    initIO = () => {
        if(!io.socket||io.socket.disconnected){
            // 连接服务器, 得到代表连接的 socket 对象
            io.socket = io(WS_API_ROOT)

            const user = getUser();

            //发送消息,说我在线
            io.socket.emit('sendOnLine',user)

            // 监听在线
            io.socket.on('receiveOnLine',  (data,str,theUser) => {
                console.log('浏览器端接收到消息:', data,str,theUser)
                if(str === 'in'){
                    message.success('用户:'+theUser.nickName+'已上线！')
                }else {
                    message.info('用户:'+theUser.nickName+'已下线！')
                    if(theUser.id === user.id){
                        io.socket.close();
                    }
                }
                // 更新state
                this.setState({userList:data});
            })


            // 监听聊天
            io.socket.on('receiveMsg',  (data) => {
                console.log('浏览器端接收到消息:', data)
                // 更新state
                const {msgList} = this.state;
                console.log('msgList',msgList)
                if(msgList!== undefined && msgList!==null){
                    msgList.push(data);
                    this.setState({msgList})
                }
            })


            // 监听邀请信息
            io.socket.on('receiveInvite',  (owner,guest) => {
                console.log('浏览器端接收到消息:', owner,guest)
                // 如果这个人是被邀请的那个人
                if(guest.id === user.id){
                    this.setState({inviteVisible:true,owner,guest})
                }
            })


            // 监听邀请是否同意
            io.socket.on('receiveInviteOne',  (data,owner,guest,bool) => {
                console.log('浏览器端接收到消息邀请信息:', data,owner,guest,bool)
                if(bool){
                    this.setState({userList:data})
                }
                // 如果这个人是被邀请的那个人
                if(bool&& owner.id === getUser().id){
                  message.success('对方进入房间')
                }else if(!bool&& owner.id === getUser().id) {
                    message.info('对方拒绝了您--')
                }
            })


        }

    }


    changeTab =(value) =>{
        console.log(value,typeof value)
        this.setState({activeKey:value})
    }



    //--------------开始：处理聊天的----------------
    // 输入框的变化
    inputChange =(value) =>{
        this.setState({inputValue:value})
    }

    sendMsg =() =>{
        const user = getUser();
        const {inputValue} = this.state;
        if(inputValue!==''){
            user.msg= inputValue
            user.sendTime = moment()
            console.log("客户端发送消息:",user)
            //发送消息
            io.socket.emit('sendMsg',user)
            this.setState({inputValue:''})
        }else {
            message.info('不能发送空内容滴')
        }

    }

    //--------------结束：处理聊天的----------------


    //--------------开始：处理邀请的---------------
    handleCancel =(owner,guest) =>{
        io.socket.emit('sendInviteOne',owner,guest,false);
        this.setState({inviteVisible:false})
    }

    // 同意邀请
    handleOk =(owner,guest) =>{
        io.socket.emit('sendInviteOne',owner,guest,true);
        this.setState({inviteVisible:false})

    }

    // 房主邀请客人
    inviteSomeone =(owner,guest) =>{
        console.log(owner+'邀请了'+guest)
        //发送邀请消息
        if(io.socket.disconnected){
            message.warning("哥，你被某人T了，邀请不到了！")
        }else {
                io.socket.emit('sendInvite',owner,guest)
        }

    }


    // 让某个玩家下线
    letHimOut =(item) =>{
        console.log('管理员要T出用户：',item.id)
        const user = getUser();
        // 加一个字段，说用户退出了
        user.out = true
        user.id = item.id
        user.nickName=item.nickName
        io.socket.emit('sendOnLine',user)

    }

    //--------------结束：处理邀请的----------------


    componentDidMount() {
        this.initIO();
    }


    componentWillUnmount() {
        const user = getUser();
        message.info('用户:'+user.nickName+'已退出！')
        // 加一个字段，说用户退出了
        user.out = true
        io.socket.emit('sendOnLine',user)
        io.socket.close();
    }

    render() {

        const {activeKey,userList,inputValue,msgList,inviteVisible,owner,guest} = this.state;

        return (

            <Tabs  activeKey={activeKey} onChange={this.changeTab}>
                <TabPane tab="poker" key="1">
                    <div>
                        <br />
                        <Row>
                            <Col span={22} offset={1}>
                                <Button type="primary" block size='large' onClick={() =>this.changeTab("2")}>
                                    炸金花
                                </Button>
                            </Col>
                        </Row>

                        <br />
                        <Row>
                            <Col span={22} offset={1}>
                                <Button type="primary" block size='large'>
                                    斗牛
                                </Button>
                            </Col>
                        </Row>

                        <br />
                        <Row>
                            <Col span={22} offset={1}>
                                <Button type="primary" block size='large'>
                                    斗地主
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </TabPane>
                <TabPane tab="gameTest" key="2">
                        <Friends2 guest={guest}  owner={owner}  userList={userList} handleCancel={this.handleCancel} handleOk={this.handleOk} inviteSomeone={this.inviteSomeone} inviteVisible={inviteVisible} letHimOut={this.letHimOut}/>
                </TabPane>
                <TabPane tab="socketTest" key="3">
                   <SocketTest inputChange={this.inputChange} inputValue={inputValue} msgList={msgList} sendMsg={this.sendMsg}  />
                </TabPane>
                <TabPane tab="mongoTest" key="4">
                    <MongoTest/>
                </TabPane>
            </Tabs>
        )
    }
}
export default Poker
