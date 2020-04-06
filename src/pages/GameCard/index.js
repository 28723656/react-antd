import React, {Component} from 'react'
import {Avatar, Button, Card, Col, message, Modal, Row, Spin, Tabs,Typography } from "antd";
import {addAjax, getAjax} from "../../util/ajax";
import ShowPercentModal from "../../pageContent/GameCardAdmin/GameCard/ShowPercentModal";
import box1 from "../../img/box/box1.png"
import box2 from "../../img/box/box2.png"
import box3 from "../../img/box/box3.png"
import box4 from "../../img/box/box4.png"
import {getUser} from "../../util/userUtil";
import GameCardIndex from "../../pageContent/GameCardAdmin/GameCard/GameCardIndex";
import MyMoney from "../../pageContent/GameCard/Common/MyMoney";

const {TabPane} = Tabs;
const { Text } = Typography;

const gridStyle = {
    width: '33.3%',
    textAlign: 'left',
    padding: '4px',
    border: 'rgb(255, 255, 255) 1px solid',
};


const marginStyle = {
    marginBottom: '6px'
}
let openCount = 0;

class GameCard extends Component {

    state = {
        loading: false,
        luckyData: [],  // 抽奖列表
        luckyType: [],  // 抽奖的字典类型
        userCoin: [],   // 用户货币
        userSkill:{},  // 用户技能

        cardData: [], //我的卡牌信息
    }

    onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    // 升级卡片
    updateCard = () => {
        console.log('升级了卡片')
    }

    // 开箱 (两个参数，luckyId,开的次数)
    openLucky = (luckyId, openTimes) => {
        this.setState({loading: true})
        const user = getUser()
        addAjax(`/game/lucky/${user.id}/${luckyId}/${openTimes}`)
            .then(response => {
                // 从数据库里面拉取数据，让用户看到刚刚得到了什么
                this.setState({loading: false})
                if (!response.data.flag) {
                    message.warning('早点洗洗睡吧');
                    return;
                }
                const result = response.data.data
                console.log('开箱结果：', ++openCount)
                result.map(record => {
                    if (record.rewardType === 4) {
                        if (record.cardType === 'S') {
                            console.error(`第${record.rewardOrder}次：获得了${record.cardType}级卡片:${record.cardName}*${record.cardNums}`)
                        } else if (record.cardType === 'A') {
                            console.warn(`第${record.rewardOrder}次：获得了${record.cardType}级卡片:${record.cardName}*${record.cardNums}`)
                        } else {
                            console.log(`第${record.rewardOrder}次：获得了${record.cardType}级卡片:${record.cardName}*${record.cardNums}`)

                        }
                    } else {
                        let coinType = '金币'
                        if (record.rewardType === 1) {
                            coinType = '金币'
                        } else if (record.rewardType === 2) {
                            coinType = '钻石'
                        } else if (record.rewardType === 3) {
                            coinType = '钥匙'
                        }
                        console.log(`第${record.rewardOrder}次：获得了${record.rewardCoinNums}${coinType}`)

                    }

                })
                this.success(result, openCount);
                this.commonInitMethod();
            })
    }


    success = (result, openCount) => {
        Modal.success({
            title: `出货啦，出货啦(第${openCount}发)。`,
            content:
                <div>
                    {
                        result.length > 0 && result.map((record, index) => {
                            if (record.rewardType === 4) {
                                if (record.cardType === 'S') {
                                    return <p key={record.id}
                                              style={{color: 'red'}}>第{record.rewardOrder}次：获得了{record.cardType}级卡片:{record.cardName}*{record.cardNums}</p>
                                } else if (record.cardType === 'A') {
                                    return <p key={record.id}
                                              style={{color: 'blue'}}>第{record.rewardOrder}次：获得了{record.cardType}级卡片:{record.cardName}*{record.cardNums}</p>
                                } else {
                                    return <p
                                        key={record.id}>第{record.rewardOrder}次：获得了{record.cardType}级卡片:{record.cardName}*{record.cardNums}</p>
                                }
                            } else {
                                let coinType = '金币'
                                if (record.rewardType === 1) {
                                    coinType = '金币'
                                } else if (record.rewardType === 2) {
                                    coinType = '钻石'
                                } else if (record.rewardType === 3) {
                                    coinType = '钥匙'
                                }
                                return <p
                                    key={record.id}>第{record.rewardOrder}次：获得了{record.rewardCoinNums}{coinType}</p>
                            }
                        })
                    }
                </div>
            ,
        });
    }

    // 查看概率
    showPercent = (luckyId) => {
        getAjax(`/game/luckyConfig/last/${luckyId}`)
            .then(response => {
                console.log('概率数据:', response.data.data);
                Modal.success({
                    title: '概率列表',
                    icon: null,
                    content:
                        <div>
                            <ShowPercentModal percentArr={response.data.data}/>
                        </div>
                })
            })

    }


    // 更新货币信息
    updateCoinAndSkillData = () => {
        const user = getUser();
        getAjax(`/game/myMoney/${user.id}`).then(response => {
            this.setState({userCoin: response.data.data})
        })
        getAjax(`/game/myCard/skillCount/${user.id}`).then(response =>{
            this.setState({userSkill: response.data.data})
        })
    }

    // 我的卡牌信息
    showMyCard = () => {
        const user = getUser();
        getAjax(`/game/card/showMyCard/${user.id}`).then(response => {
            console.log('获取到的卡片数据:',response.data.data)
            this.setState({cardData: response.data.data})
        })
    }

    // 公共更新方法
    commonInitMethod =() =>{
        // 更新用户的货币信息
        this.updateCoinAndSkillData();
        // 重点，获取卡牌信息
        this.showMyCard();
    }

    // 初始化数据
    initData = () => {
        // 获取lucky表的抽奖信息
        getAjax(`/game/lucky/open`).then(response => {
            console.log('获取到的抽奖信息数据：', response.data.data)
            this.setState({luckyData: response.data.data})
        })

        // 获取抽奖的字典类型
        getAjax(`/plan/dict/lucky_type`).then(response => {
            let result = response.data.data;
            console.log('获取到的抽奖字典数据：', result)
            if (result.length === 0) {
                result = []
            }
            this.setState({luckyType: result})
        })

      this.commonInitMethod();
    }

    componentDidMount() {
        this.initData();
    }

    render() {


        const {loading, luckyData, luckyType, userCoin, cardData,userSkill} = this.state;

        // 把卡牌信息分开
        const cardDataD = cardData.filter(record => record.cardType === "D")
        const cardDataC = cardData.filter(record => record.cardType === "C")
        const cardDataB = cardData.filter(record => record.cardType === "B")
        const cardDataA = cardData.filter(record => record.cardType === "A")
        const cardDataS = cardData.filter(record => record.cardType === "S")

        return (
            <Tabs defaultActiveKey="4" onChange={this.callback}>
                <TabPane tab="获取卡片" key="1">
                    <Spin spinning={loading}>
                        <div>
                            <Card>
                              <MyMoney userCoin={userCoin} userSkill={userSkill}/>
                            </Card>
                        </div>
                        <div>

                            {luckyData && luckyData.length > 0 &&
                            luckyData.map(record => {
                                const type = record.type;
                                const resultDict = luckyType.filter(filterRecord => filterRecord.code * 1 === type)
                                let title =''
                                if (resultDict.length > 0) {
                                  title =  <div>
                                        <Text>{record.name}</Text>
                                        <Text type="secondary">（{resultDict[0].name}）</Text>
                                    </div>
                                }
                                // 来默认选盒子
                                let box = box4

                                if (type === 1) {
                                    box = box4
                                } else if (type === 2) {
                                    box = box2
                                } else if (type === 3) {
                                    box = box1
                                } else if (type === 4) {
                                    box = box3
                                }

                                let smallIcon = '💰'
                                if (record.costType === 1) {
                                    smallIcon = '💰'
                                } else if (record.costType === 2) {
                                    smallIcon = '💎'
                                } else if (record.costType === 3) {
                                    smallIcon = '🔑'
                                }

                                return <Card key={record.id} title={title}
                                             extra={<a onClick={() => this.showPercent(record.id)}>查看概率</a>}>
                                    <Row>
                                        <Col xs={12}>
                                            <Row style={marginStyle}>
                                                <Col xs={24}>
                                                    <Avatar shape="square" size={120} src={box}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={16} style={marginStyle}>
                                                    <Button style={{width: 120}}
                                                            onClick={() => this.openLucky(record.id, 1)}>1次&nbsp;&nbsp;&nbsp;&nbsp;{record.onceCost} {smallIcon}</Button>
                                                </Col>
                                                <Col xs={16} style={marginStyle}>
                                                    <Button style={{width: 120}}
                                                            onClick={() => this.openLucky(record.id, 10)}>10次&nbsp;&nbsp;&nbsp;&nbsp;{record.tenTimesCost} {smallIcon}</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={12}>
                                            <Row style={marginStyle}>
                                                <Col xs={24}>卡包说明：</Col>
                                                <Col xs={24}>1.可以获得{record.output}卡片</Col>
                                                <Col xs={24}>2.等级越高，获得稀有卡片几率越高</Col>
                                                <Col xs={24}>3.{record.description}</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            })
                            }

                        </div>
                    </Spin>
                </TabPane>
                <TabPane tab="我的卡片" key="2">
                    <Card> <MyMoney userCoin={userCoin} userSkill={userSkill}/> </Card>
                   <GameCardIndex cardData={cardDataS} initMethod={this.commonInitMethod} title="S级卡片"/>
                   <GameCardIndex cardData={cardDataA} initMethod={this.commonInitMethod} title="A级卡片"/>
                   <GameCardIndex cardData={cardDataB} initMethod={this.commonInitMethod} title="B级卡片"/>
                   <GameCardIndex cardData={cardDataC} initMethod={this.commonInitMethod} title="C级卡片"/>
                   <GameCardIndex cardData={cardDataD} initMethod={this.commonInitMethod} title="D级卡片"/>

                </TabPane>

            </Tabs>
        )
    }
}

export default GameCard
