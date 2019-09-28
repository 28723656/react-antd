import React,{Component} from 'react'
import {Button,Row,Col,Card} from "antd";

class RealGame extends Component{
    render() {

        const gridStyle = {
            width: '33.33%',
            textAlign: 'center',
            fontSize:'30px',
            height: '70px',
            padding: '11px 0px 0px 0px'
        };

        return (
            <div>
                <Row>
                    <Col xs={24} xl={12}>
                        <Card title="我的卡牌♠♣♥♦">
                            <Card.Grid style={gridStyle}>♦7</Card.Grid>
                            <Card.Grid style={gridStyle}>♥8</Card.Grid>
                            <Card.Grid style={gridStyle}>♣9</Card.Grid>
                        </Card>
                    </Col>
                    <Col xs={24} xl={12}>
                        <Card title='对手情况'>
                            <Row>
                                <Col span={6}>
                                    我:
                                </Col>
                                <Col span={3}>
                                    <Button >♦7</Button>
                                </Col>
                                <Col span={3}>
                                    <Button >♥8</Button>
                                </Col>
                                <Col span={3}>
                                    <Button >♣9</Button>
                                </Col>
                                <Col offset={1} span={5}>
                                    <Button  type='primary'>已看牌</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    小明:
                                </Col>
                                <Col span={3}>
                                    <Button >-</Button>
                                </Col>
                                <Col span={3}>
                                    <Button >-</Button>
                                </Col>
                                <Col span={3}>
                                    <Button >-</Button>
                                </Col>
                                <Col offset={1} span={5}>
                                    <Button disabled >已弃牌</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    小红:
                                </Col>
                                <Col span={3}>
                                    <Button >-</Button>
                                </Col>
                                <Col span={3}>
                                    <Button >-</Button>
                                </Col>
                                <Col span={3}>
                                    <Button >-</Button>
                                </Col>
                                <Col offset={1} span={5}>
                                    <Button  type='primary'>已看牌</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    小花:
                                </Col>
                                <Col span={3}>
                                    <Button >-</Button>
                                </Col>
                                <Col span={3}>
                                    <Button >-</Button>
                                </Col>
                                <Col span={3}>
                                    <Button >-</Button>
                                </Col>
                                <Col offset={1} span={5}>
                                    <Button  type='default'>未看牌</Button>
                                </Col>
                            </Row>
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
