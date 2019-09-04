import React, {Component} from 'react'
import {Card, Col, Row, Tabs} from "antd";
import {getAjax} from "../../util/ajax";
import {getUser} from "../../util/userUtil";
import MyMoney from "../../pageContent/GameCard/Common/MyMoney";
import LuckyCardRecord from "../../pageContent/GameCard/RecentRecord/LuckyCardRecord";
import LuckyCountRecord from "../../pageContent/GameCard/RecentRecord/LuckyCountRecord";
import LuckyRecentFifty from "../../pageContent/GameCard/RecentRecord/LuckyRecentFifty";
import CardDetail from "../../pageContent/GameCard/CardAlbum/CardDetail";

const {TabPane} = Tabs;

class GameCardUser extends Component {

    state = {
        userCoin: [],   // 用户货币
        cardArr:[],  // 卡牌图鉴
    }

    onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    // 卡牌图鉴
    cardAlbum =() =>{
        getAjax(`/game/card/dictionary`).then(response =>{
            if(response.data.flag){
                this.setState({cardArr:response.data.data})
            }
        })
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
    componentDidMount() {
        this.updateCoinData();
        this.cardAlbum();
    }

    render() {
        const {userCoin,cardArr} = this.state;
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>

                <TabPane tab="卡牌图鉴" key="1">
                    <CardDetail cardArr={cardArr}/>
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
