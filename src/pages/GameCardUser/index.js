import React, {Component} from 'react'
import {Card, Col, Row, Tabs} from "antd";
import {getAjax} from "../../util/ajax";
import {getUser} from "../../util/userUtil";
import MyMoney from "../../pageContent/GameCard/Common/MyMoney";
import LuckyCardRecord from "../../pageContent/GameCard/RecentRecord/LuckyCardRecord";
import LuckyCountRecord from "../../pageContent/GameCard/RecentRecord/LuckyCountRecord";
import LuckyRecentFifty from "../../pageContent/GameCard/RecentRecord/LuckyRecentFifty";

const {TabPane} = Tabs;

class GameCardUser extends Component {

    state = {
        userCoin: [],   // 用户货币
    }

    onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    // 更新货币信息
    updateCoinData = () => {
        const user = getUser();
        getAjax(`/game/myMoney/${user.id}`).then(response => {
            console.log('用户的货币信息:', response.data.data)
            this.setState({userCoin: response.data.data})
        })
    }

    // 公共更新方法
    commonInitMethod = () => {
        // 更新用户的货币信息
        this.updateCoinData();
    }

    render() {
        const {userCoin} = this.state;
        return (
            <Tabs defaultActiveKey="2" onChange={this.callback}>

                <TabPane tab="卡片图鉴" key="1">
                    <p>
                        待完成：用于显示所有的卡片的各种详细信息
                    </p>
                </TabPane>
                <TabPane tab="最近记录" key="2">
                    <Row gutter={5}>
                        <Col xs={24} md={24}>
                            <Card> <MyMoney userCoin={userCoin}/> </Card>
                        </Col>
                        <Col xs={24} md={12} style={{marginTop: 5}}>
                            <LuckyCardRecord monthCount={1}/>
                        </Col>
                        <Col xs={24} md={12} style={{marginTop: 5}}>
                            <LuckyCountRecord monthCount={1}/>
                        </Col>
                        <Col xs={24} md={24} style={{marginTop: 5}}>
                            <LuckyRecentFifty count={50}/>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        )
    }
}

export default GameCardUser
