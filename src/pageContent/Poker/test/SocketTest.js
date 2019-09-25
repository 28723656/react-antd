import React,{Component} from 'react'
import io from 'socket.io-client'
import {Button, Input,message,Row,Col} from "antd";
import {getUser} from "../../../util/userUtil";

class SocketTest extends Component{

    state ={
        inputValue:'',
        msgList:[],
    }

    // 点击按钮发送消息
    sendMsg =() =>{
        const user = getUser();
        const {inputValue} = this.state;
        if(inputValue!==''){
            user.msg= inputValue
             console.log("客户端发送消息:",user)
            //发送消息
            io.socket.emit('sendMsg',user)
            this.setState({inputValue:''})
        }else {
            message.info('不能发送空内容滴')
        }

    }

    // 输入框的变化
    inputChange =(e) =>{
        if(e!==''){
            this.setState({inputValue:e.target.value})
        }
    }


    // 为了不使用redux  我就直接在这里初始化
     initIO = () => {
        if(!io.socket){
            // 连接服务器, 得到代表连接的 socket 对象
            io.socket = io('ws://localhost:4000')
            // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
            io.socket.on('receiveMsg',  (data) => {
                console.log('浏览器端接收到消息:', data)
                // 更新state
                const {msgList} = this.state;
                console.log(msgList!== undefined)
                if(msgList!== undefined && msgList!==null){
                    msgList.push(data);
                    this.setState({msgList})
                }
            })
        }

    }

    // 初始化，进入这个界面的时候，进行监听
    componentDidMount() {
        this.initIO()
    }


    render() {

        const {inputValue,msgList } = this.state;
        const user = getUser();

        return (
            <div>
                <Input value={inputValue} onChange={this.inputChange} />
                <Button onClick={this.sendMsg}>发送消息</Button>
                {msgList && msgList.length>0 && msgList.map((record,index)=>{
                    let colorStyle=''
                    if(user.id === record.id){
                        colorStyle = {color:'red'}
                        console.log('自己人')
                    }else {
                        colorStyle = {color:'black'}
                    }
                    return <Row key={index}>
                        <Col span={24} style={colorStyle} ><span>{record.nickName} 说:</span>{record.msg}</Col>
                    </Row>
                })}

            </div>
        )
    }
}

export default SocketTest
