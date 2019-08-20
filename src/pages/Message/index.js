import React, {Component} from 'react'
import {Tabs, Input, Typography,Button,message} from "antd";
import {addAjax} from "../../util/ajax";

const {TabPane} = Tabs;
const { TextArea } = Input;
const { Text } = Typography;

class Message extends Component {

    state ={
        words:""
    }


     onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    handleClick =() =>{
        const {words } =this.state;
        if(words ===""){
            message.warning("空内容...");
        }else{
            const user = JSON.parse(localStorage.getItem('user'));
            addAjax(`/message/message`,{userId:user.id,message:this.state.words})
                .then(response =>{
                    message.success("提交成功");
                })
            this.setState({words:""})
        }

    }

    changeWords =(event) =>{
        this.setState({words:event.target.value})
    }


    render() {
        const {words} = this.state
        return (
            <div>
                <Text>有什么感觉不舒服，不对劲的地方，随便什么，留言一下</Text>
                <br/>
                <br/>
                <TextArea rows={6} placeholder="欢迎留言"  onChange={this.changeWords}/>
                <br/>
                <br/>
                <Button block type="primary" onClick={this.handleClick} >提交</Button>
            </div>
        )
    }
}

export default Message
