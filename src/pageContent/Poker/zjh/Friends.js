import React,{Component} from 'react'
import {Col, List, Row,message} from "antd";
import Button from "antd/es/button";
import {addAjax, getAjax, updateAjax} from "../../../util/ajax";
import {getUser} from "../../../util/userUtil";
import InviteModal from "./InviteModal";




class Friends extends Component{

    state ={
        players:[],
        inviteVisible:false,
        teamPlayers:[],
    }

    // 标记为在线
    online =() =>{
        const user =  getUser();
        addAjax(`/poker/online/${user.id}`);
    }


    // 查询队伍玩家
    showTeam =(room) =>{
        getAjax(`/poker/room/team/${room}`).then(response =>{
            this.setState({teamPlayers:response.data.data})
        })
    }

    // 通过用户id查询是否有房间信息
    showTeamByUserId =() =>{
        const user = getUser();
        getAjax(`/poker/room/teamByUserId/${user.id}`).then(response =>{
            if(response.data.flag){
                this.setState({teamPlayers:response.data.data})
            }
        })
    }


    // 查询当前在线的玩家
    searchOnlinePlayer =() =>{
        getAjax(`/poker/online`).then(response =>{
            if(response.data.flag){
                console.log("--------interval-------------")
                this.setState({players:response.data.data})
            }
        })
    }

    /**
     * 清楚定时器
     */
    clearTheInterval =() =>{
        clearInterval(this.interval);
        clearInterval(this.interval2);
        clearInterval(this.interval3);
        clearInterval(this.interval4);
    }


    /**
     * 游戏开始
     */
    gameStart =() =>{
       this.clearTheInterval();
    }


    // 邀请玩家
    invite =(item) =>{
        console.log("邀请玩家：",item.id,item.nickName)
        const user = getUser();
        addAjax(`/poker/room/user/${user.id}/${item.id}`).then(response =>{
            if(response.data.flag){
                message.success("邀请成功");
            }else {
                message.warning("玩家在已在某个队伍中")
            }
        })
    }

    ifBeInvited =() =>{
        const user = getUser();
        getAjax(`/poker/room/invited/${user.id}`).then(response =>{
            if(response.data.flag){
                this.setState({inviteVisible:true})
            }
        })
    }


    /**
     * -------------------  邀请模态框---------------------
     */
    handleCancel =() =>{
        this.setState({inviteVisible:false});
        const user = getUser();
        updateAjax(`/poker/room/reply/${user.id}/2`)
    }


    handleOk = () =>{
        this.setState({inviteVisible:false})
        const user = getUser();
        updateAjax(`/poker/room/reply/${user.id}/1`)
    }

    /**
     * -------------------结束：  邀请模态框---------------------
     */


    componentDidMount() {
        this.online();
        this.showTeamByUserId();
        this.searchOnlinePlayer();

        // 每3秒获取一次在线玩家
        this.interval = setInterval(() =>{
            console.log('------interval--------------')
            this.searchOnlinePlayer();
        },3000)


        // 每3秒获取一次在房间的玩家
        this.interval3 = setInterval(() =>{
            console.log('------interval3--------------')
            this.showTeamByUserId();
        },3000)

        // 每3秒查询一次自己是否被邀请了
        this.interval4 = setInterval(() =>{
            console.log('------interval4--------------')
            this.ifBeInvited();
        },3000)

        // 每过30秒发送一次我在线
        this.interval2 = setInterval(() =>{
            console.log('------interval2--------------')
            this.online();
        },30000)
    }

    render() {

        const data = [
            '风往西边吹丶',
            '玩家一',
            '玩家二',
        ];

        const {players,inviteVisible,teamPlayers} = this.state
        const user = getUser();


        const header =<div>
            <Row>
                <Col span={12}> <span style={{color:'green' }}>当前在线</span></Col>
            </Row>


        </div>
        const header2 = <p style={{color:'blue' }}>当前队伍</p>

        return (
            <div>

                {teamPlayers && teamPlayers.length > 0 &&
                <List
                    size="small"
                    header={header2}
                    bordered
                    dataSource={teamPlayers}
                    renderItem={item => <List.Item>
                        {item.userId}
                    </List.Item>}
                />}


                <Button type='primary' block size='large' onClick={this.gameStart}> 准备 </Button>


                <br/>
                <br/>
                <List
                    size="small"
                    header={header}
                    bordered
                    dataSource={players}
                    renderItem={item => <List.Item>
                        {item.nickName} &nbsp;&nbsp;&nbsp; <Button  disabled={item.id === user.id} onClick={() =>this.invite(item)}>邀请</Button>
                        {user.id === 1 &&  <Button type='danger' onClick={() =>this.letHimOut()} >踢出</Button> }
                    </List.Item>}
                />

                <InviteModal handleCancel={this.handleCancel} handleOk={this.handleOk} inviteVisible={inviteVisible}/>


            </div>
        )
    }
}

export default Friends
