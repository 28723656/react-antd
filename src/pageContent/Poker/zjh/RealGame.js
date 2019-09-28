import React,{Component} from 'react'
import {Button,Row,Col,Card,message} from "antd";
import PropTypes from "prop-types";
import {getUser} from "../../../util/userUtil";
import {getCardNumber, getCardType, getCardTypeNumber} from "../../../util/gameUtil";

class RealGame extends Component{
    static propTypes = {
        roomUserList:PropTypes.array.isRequired,
        sendCard:PropTypes.func.isRequired,
        lookCard:PropTypes.func.isRequired,
    }


    // 发牌
    sendCard = (roomUserList) =>{
        this.props.sendCard(roomUserList)
    }

    // 看牌
    lookCard =(selfUser)=>{
        if(selfUser.cardStatus === 0){
            message.warning('还没发牌呢，急个啥子！')
        }else if(selfUser.cardStatus === 1) {
            message.warning('还没看够？')
        }else if(selfUser.cardStatus === 2){
            this.props.lookCard(selfUser)
        }
    }

    render() {

        const gridStyle = {
            width: '33.33%',
            textAlign: 'center',
            fontSize:'30px',
            height: '70px',
            padding: '11px 0px 0px 0px'
        };
        const {roomUserList} = this.props

        const user = getUser()

        let  tempSelfUser = roomUserList.filter(record => user.id === record.id)
        // 自己
        const selfUser = tempSelfUser[0]

       // console.log('当前玩家：',roomUserList);

        const extra = <Button onClick={() =>this.lookCard(selfUser)}>看牌</Button>


        return (
            <div>
                <Row>
                    <Col xs={24} xl={12}>
                        <Card title="我的卡牌♠♣♥♦" extra={extra}>
                            {
                                selfUser && selfUser.cardStatus === 0 &&
                                <Card.Grid style={{width: '100%'}}><Button block type='primary' onClick={()=>this.sendCard(roomUserList)}>性感荷官，在线发牌</Button></Card.Grid>
                            }
                            {
                                selfUser && selfUser.cardStatus === 1 &&
                                <div>
                                    {(selfUser.id === 1 ||selfUser.id===27) && <Card.Grid style={{width: '100%'}}><Button block type='primary' onClick={()=>this.sendCard(roomUserList)}>性感荷官，在线发牌</Button></Card.Grid> }
                                    <Card.Grid style={gridStyle}>{getCardTypeNumber(selfUser.cardOneType,selfUser.cardOneNumber)}</Card.Grid>
                                    <Card.Grid style={gridStyle}>{getCardTypeNumber(selfUser.cardTwoType,selfUser.cardTwoNumber)} </Card.Grid>
                                    <Card.Grid style={gridStyle}>{getCardTypeNumber(selfUser.cardThreeType,selfUser.cardThreeNumber)} </Card.Grid>
                                </div>
                            }
                            {
                                selfUser && selfUser.cardStatus === 2 &&
                                <div>
                                    {(selfUser.id === 1 ||selfUser.id===27) && <Card.Grid style={{width: '100%'}}><Button block type='primary' onClick={()=>this.sendCard(roomUserList)}>性感荷官，在线发牌</Button></Card.Grid> }
                                    <Card.Grid style={gridStyle}>-</Card.Grid>
                                    <Card.Grid style={gridStyle}>-</Card.Grid>
                                    <Card.Grid style={gridStyle}>-</Card.Grid>
                                </div>
                            }

                        </Card>
                    </Col>
                    <Col xs={24} xl={12}>
                        <Card title='对手情况'>


                            {
                                roomUserList && roomUserList.length> 0 && roomUserList.map((record) =>{

                                    // 是否看了牌
                                    const status =  record.cardStatus
                                    let statusDesc = ''
                                    if(status === 0){
                                        statusDesc =<Button  disabled>已弃牌 </Button>
                                    }else if(status === 1){
                                        statusDesc =<Button  type='primary'>已看牌 </Button>
                                    }else if(status === 2){
                                        statusDesc =<Button  >未看牌</Button>
                                    }

                                    return  <Row key={record._id}>
                                        <Col span={6}>
                                            {(record.id === user.id && status ===1) || user.id === 27?<span style={{color:'red'}}>我</span>:record.nickName}:
                                        </Col>
                                        <Col span={3}>
                                            <Button >{(record.id === user.id && status ===1)|| user.id === 27?getCardTypeNumber(record.cardOneType,record.cardOneNumber):'-'}</Button>
                                        </Col>
                                        <Col span={3}>
                                            <Button >{(record.id === user.id && status ===1)|| user.id === 27?getCardTypeNumber(record.cardTwoType,record.cardTwoNumber):'-'}</Button>
                                        </Col>
                                        <Col span={3}>
                                            <Button >{(record.id === user.id && status ===1)|| user.id === 27?getCardTypeNumber(record.cardThreeType,record.cardThreeNumber):'-'}</Button>
                                        </Col>
                                        <Col offset={1} span={5}>
                                            {statusDesc}
                                        </Col>
                                    </Row>
                                })

                            }
                        </Card>
                    </Col>


                    <Col xs={24} xl={12}>
                        <Card bodyStyle={{height:'500px'}}>
                            下面的功能完善中......
                        </Card>
                    </Col>

                    <Col xs={24} xl={12}>
                        <Card title='下注     (金币：1000)'>
                            <Row>
                                <Col  span={3}>
                                    <Button disabled={true} >&nbsp; &nbsp; 1&nbsp; &nbsp;</Button>
                                </Col>
                                <Col offset={1} span={3}>
                                    <Button  disabled={true} >&nbsp; &nbsp; 2&nbsp; &nbsp;</Button>
                                </Col>
                                <Col offset={1} span={3}>
                                    <Button >&nbsp; &nbsp; 3&nbsp; &nbsp;</Button>
                                </Col>
                                <Col offset={1} span={3}>
                                    <Button > &nbsp; &nbsp;4&nbsp; &nbsp;</Button>
                                </Col>
                                <Col offset={1} span={3}>
                                    <Button >&nbsp; &nbsp; 5&nbsp; &nbsp;</Button>
                                </Col>
                                <Col offset={1} span={3}>
                                    <Button >&nbsp; &nbsp; 6&nbsp; &nbsp;</Button>
                                </Col>
                            </Row>

                            <Row style={{marginTop:'10px'}}>
                                <Col offset={1} span={10}>
                                    <Button type='danger' block >弃&nbsp;牌</Button>
                                </Col>
                                <Col offset={1} span={10}>
                                    <Button type='primary' block>随机比牌</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={24} xl={12}>
                        <Card title='记录栏' bordered={false}>
                            <Row>
                                <Col  span={4}>
                                    总&nbsp;计：
                                </Col>
                                <Col span={20}>
                                    <Col  span={6}>
                                        小明:5
                                    </Col>
                                    <Col  span={6}>
                                        小王:7
                                    </Col>
                                    <Col  span={6}>
                                        小红:9
                                    </Col>
                                    <Col  span={6}>
                                        总：21
                                    </Col>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col  span={4}>
                                    第三波：
                                </Col>
                                <Col span={20}>
                                    <Col  span={6}>
                                        小明:3
                                    </Col>
                                    <Col  span={6}>
                                        小王:3
                                    </Col>
                                    <Col  span={6}>
                                        小红:3
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col  span={4}>
                                    第二波：
                                </Col>
                                <Col span={20}>
                                    <Col  span={6}>
                                        小明:1
                                    </Col>
                                    <Col  span={6}>
                                        小王:2
                                    </Col>
                                    <Col  span={6}>
                                        小红:3
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col  span={4}>
                                    第一波：
                                </Col>
                                <Col span={20}>
                                    <Col  span={6}>
                                        小明:1
                                    </Col>
                                    <Col  span={6}>
                                        小王:2
                                    </Col>
                                    <Col  span={6}>
                                        小红:3
                                    </Col>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <div>

                </div>
            </div>

        )
    }
}

export default RealGame
