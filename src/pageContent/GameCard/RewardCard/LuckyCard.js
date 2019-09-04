import React,{Component} from 'react'
import box4 from "../../../img/box/box4.png";
import box2 from "../../../img/box/box2.png";
import box1 from "../../../img/box/box1.png";
import box3 from "../../../img/box/box3.png";
import {Avatar, Button, Card, Col, message, Modal, Row} from "antd";
import PropTypes from "prop-types";
import {addAjax, getAjax} from "../../../util/ajax";
import ShowPercentModal from "../../GameCardAdmin/GameCard/ShowPercentModal";
import {getUser} from "../../../util/userUtil";


let openCount = 0;
class LuckyCard extends Component{


    state = {
        luckyData: [],  // 抽奖列表
        luckyType: [],  // 抽奖的字典类型
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


    // 初始化数据
    initData = () => {
        // 获取lucky表的抽奖信息
        getAjax(`/game/lucky`).then(response => {
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
    }

    render() {

        const {luckyData,luckyType} = this.state;

        const marginStyle = {
            marginBottom: '6px'
        }

        return (
            <div>
                {luckyData && luckyData.length > 0 &&
                luckyData.map(record => {
                    const type = record.type;
                    const resultDict = luckyType.filter(filterRecord => filterRecord.code * 1 === type)
                    let title = ''
                    if (resultDict.length > 0) {
                        title = resultDict[0].name;
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
        )
    }
}

export default LuckyCard
