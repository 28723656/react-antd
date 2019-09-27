import React,{Component} from 'react'
import io from 'socket.io-client'
import {Button, Input,message,Row,Col} from "antd";
import {getUser} from "../../../util/userUtil";
import moment from "moment";
import PropTypes from "prop-types";

class SocketTest extends Component{


    static propTypes = {
        inputValue:PropTypes.string.isRequired,
        msgList:PropTypes.array.isRequired,
        sendMsg:PropTypes.func.isRequired,
        inputChange:PropTypes.func.isRequired,
    }

    // 点击按钮发送消息
    sendMsg =() =>{
      this.props.sendMsg();
    }

    // 输入框的变化
    inputChange =(e) =>{
        this.props.inputChange(e.target.value);
    }




    render() {

        const {inputValue,msgList } = this.props;
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
                        <Col span={24} style={colorStyle} ><span>{record.nickName} 说:</span>{record.msg} &nbsp;&nbsp;&nbsp;{moment(record.sendTime).format('HH:mm:ss')}</Col>
                    </Row>
                })}

            </div>
        )
    }
}

export default SocketTest
