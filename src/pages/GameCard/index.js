import React, {Component} from 'react'
import {Tabs,Card,Row,Col,Button,Avatar  } from "antd";

const {TabPane} = Tabs;

const gridStyle = {
    width: '33.3%',
    textAlign: 'left',
    padding:'2px',
    border:'rgb(255, 255, 255) 1px solid',
};

const gridStyleD = {
    width: '33.3%',
    textAlign: 'left',
    padding:'2px',
    border:'#229282 1px solid',
};

const marginStyle ={
    marginBottom:'6px'
}

class GameCard extends Component {

     onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    // 升级卡片
    updateCard =() =>{
         console.log('升级了卡片')
    }

    // 开箱一次
    openOne = () =>{
         console.log('开一次')
    }
    // 开箱10次
    openTen =() =>{
         console.log('开10次')
    }

    // 查看概率
    showPercent =() =>{
         console.log('查看概率')
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="我的卡片" key="1">
                    <Card title="D卡">
                        <Card.Grid style={gridStyleD} >
                            <Row >
                                <Col span={6}>
                                    <Row>
                                        <span>&nbsp;</span>
                                    </Row>
                                    <Row>
                                        <span style={{fontSize:'20px',margin:'2px'}}>★☆</span>
                                    </Row>
                                    <Row>
                                        <span style={{color:'blue',fontSize:'20px'}} >D1卡</span>
                                    </Row>
                                    <Row>
                                        <span>&nbsp;</span>
                                    </Row>

                                </Col>
                                <Col span={18}>
                                    <Row>
                                        <Col xs={10}  >
                                            <span >卡片数量:</span>
                                        </Col>
                                        <Col xs={6}>
                                            <span>24/20</span>
                                        </Col>
                                        <Col xs={4}>
                                            <a onClick={this.updateCard} > 升星</a>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={10}>
                                            <span>当前等级:</span>
                                        </Col>
                                        <Col xs={6}  >
                                            <span>14</span>
                                        </Col>
                                        <Col xs={4}  >
                                            <a onClick={this.updateCard} > 升级</a>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={10}  >
                                            <span>升级花费:</span>
                                        </Col>
                                        <Col xs={6}  >
                                            <span>140G</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={10}  >
                                            <span>当前效果：</span>
                                        </Col>
                                        <Col xs={10}  >
                                            <span>金币+7%</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={10}  >
                                            <span>下一级：</span>
                                        </Col>
                                        <Col xs={10}  >
                                            <span>金币+7.1%</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={gridStyleD} >
                            <Row >
                                <Col span={6}>
                                    <Row>
                                        <span>&nbsp;</span>
                                    </Row>
                                    <Row>
                                        <span style={{fontSize:'20px',margin:'2px'}}>★☆</span>
                                    </Row>
                                    <Row>
                                        <span style={{color:'blue',fontSize:'20px'}} >D2卡</span>
                                    </Row>
                                    <Row>
                                        <span>&nbsp;</span>
                                    </Row>
                                </Col>
                                <Col span={18}>
                                    <Row>
                                        <Col xs={10}  >
                                            <span >卡片数量:</span>
                                        </Col>
                                        <Col xs={6}>
                                            <span>24/20</span>
                                        </Col>
                                        <Col xs={4}>
                                            <a onClick={this.updateCard} > 升星</a>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={10}>
                                            <span>当前等级:</span>
                                        </Col>
                                        <Col xs={6}  >
                                            <span>14</span>
                                        </Col>
                                        <Col xs={4}  >
                                            <a onClick={this.updateCard} > 升级</a>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={10}  >
                                            <span>升级花费:</span>
                                        </Col>
                                        <Col xs={6}  >
                                            <span>140G</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={10}  >
                                            <span>当前效果：</span>
                                        </Col>
                                        <Col xs={10}  >
                                            <span>金币+7%</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={10}  >
                                            <span>下一级：</span>
                                        </Col>
                                        <Col xs={10}  >
                                            <span>金币+7.1%</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={gridStyleD} >
                            <Row >
                                <Col span={6}>
                                    <Row>
                                        <span>&nbsp;</span>
                                    </Row>
                                    <Row>
                                        <span style={{fontSize:'20px',margin:'2px'}}>★☆</span>
                                    </Row>
                                    <Row>
                                        <span style={{color:'blue',fontSize:'20px'}} >D3卡</span>
                                    </Row>
                                    <Row>
                                        <span>&nbsp;</span>
                                    </Row>
                                </Col>
                                <Col span={18}>
                                    <Row>
                                        <Col xs={10}  >
                                            <span >卡片数量:</span>
                                        </Col>
                                        <Col xs={6}>
                                            <span>24/20</span>
                                        </Col>
                                        <Col xs={4}>
                                            <a onClick={this.updateCard} > 升星</a>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={10}>
                                            <span>当前等级:</span>
                                        </Col>
                                        <Col xs={6}  >
                                            <span>14</span>
                                        </Col>
                                        <Col xs={4}  >
                                            <a onClick={this.updateCard} > 升级</a>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={10}  >
                                            <span>升级花费:</span>
                                        </Col>
                                        <Col xs={6}  >
                                            <span>140G</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={10}  >
                                            <span>当前效果：</span>
                                        </Col>
                                        <Col xs={10}  >
                                            <span>金币+7%</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={10}  >
                                            <span>下一级：</span>
                                        </Col>
                                        <Col xs={10}  >
                                            <span>金币+7.1%</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Grid>
                    </Card>

                    <Card title="C卡">
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                    </Card>

                    <Card title="B卡">
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                    </Card>

                    <Card title="A卡">
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                    </Card>

                    <Card title="S卡">
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                    </Card>

                </TabPane>
                <TabPane tab="获取卡片" key="2">
                    <div>
                        <Card title="免费卡包" extra={<a href="#" onClick={this.showPercent}>查看概率</a>} >
                            <Row>
                                    <Col xs={12}>
                                        <Row style={marginStyle}>
                                            <Col xs={24}>
                                                <Avatar shape="square" size={120} icon="user" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={16} style={marginStyle}>
                                                <Button style={{width:120}} onClick={this.openOne}>1次&nbsp;&nbsp;&nbsp;&nbsp;1 🗝</Button>
                                            </Col>
                                            <Col xs={16} style={marginStyle}>
                                                <Button style={{width:120}} onClick={this.openTen}>10次&nbsp;&nbsp;&nbsp;&nbsp;9 🗝</Button>
                                            </Col>
                                        </Row>
                                    </Col >
                                    <Col  xs={12}>
                                        <Row style={marginStyle}>
                                            <Col xs={24}>卡包说明：</Col>
                                            <Col xs={24} >1.可以获得D-S卡片</Col>
                                            <Col xs={24} >2.等级越高，获得稀有卡片几率越高</Col>
                                        </Row>

                                        <Row>
                                            <Col xs={24}>获得结果：</Col>
                                            <Col xs={24} >1. D1卡片*1</Col>
                                        </Row>
                                    </Col>
                            </Row>
                        </Card>
                        <Card title="普通卡包" extra={<a href="#">查看概率</a>} >
                            <Row>
                                <Col xs={12}>
                                    <Row style={marginStyle}>
                                        <Col xs={24}>
                                            <Avatar shape="square" size={120} icon="user" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={16} style={marginStyle}>
                                            <Button style={{width:120}} onClick={this.openOne}>1次&nbsp;&nbsp;&nbsp;&nbsp;50G</Button>
                                        </Col>
                                        <Col xs={16} style={marginStyle}>
                                            <Button style={{width:120}} onClick={this.openTen}>10次&nbsp;&nbsp;&nbsp;&nbsp;450G</Button>
                                        </Col>
                                    </Row>
                                </Col >
                                <Col  xs={12}>
                                    <Row style={marginStyle}>
                                        <Col xs={24}>卡包说明：</Col>
                                        <Col xs={24} >1.可以获得D-B卡片</Col>
                                        <Col xs={24} >2.等级越高，获得稀有卡片几率越高</Col>
                                    </Row>

                                    <Row>
                                        <Col xs={24}>获得结果：</Col>
                                        <Col xs={24} >1. D1卡片*1</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                        <Card title="高级卡包"  extra={<a href="#">查看概率</a>} >
                            <Row>
                                <Col xs={12}>
                                    <Row style={marginStyle}>
                                        <Col xs={24}>
                                            <Avatar shape="square" size={120} icon="user" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={16} style={marginStyle}>
                                            <Button style={{width:120}}>1次&nbsp;&nbsp;&nbsp;&nbsp;120G</Button>
                                        </Col>
                                        <Col xs={16} style={marginStyle}>
                                            <Button style={{width:120}}>10次&nbsp;&nbsp;&nbsp;&nbsp;1080G</Button>
                                        </Col>
                                    </Row>
                                </Col >
                                <Col  xs={12}>
                                    <Row style={marginStyle}>
                                        <Col xs={24}>卡包说明：</Col>
                                        <Col xs={24} >1.可以获得C-A卡片</Col>
                                        <Col xs={24} >2.等级越高，获得稀有卡片几率越高</Col>
                                    </Row>

                                    <Row>
                                        <Col xs={24}>获得结果：</Col>
                                        <Col xs={24} >1. C1卡片*1</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                        <Card title="至尊卡包"  extra={<a href="#">查看概率</a>} >
                            <Row>
                                <Col xs={12}>
                                    <Row style={marginStyle}>
                                        <Col xs={24}>
                                            <Avatar shape="square" size={120} icon="user" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={16} style={marginStyle}>
                                            <Button style={{width:120}}>1次&nbsp;&nbsp;&nbsp;&nbsp;50 钻</Button>
                                        </Col>
                                        <Col xs={16} style={marginStyle}>
                                            <Button style={{width:120}}>10次&nbsp;&nbsp;&nbsp;&nbsp;450 钻</Button>
                                        </Col>
                                    </Row>
                                </Col >
                                <Col  xs={12}>
                                    <Row style={marginStyle}>
                                        <Col xs={24}>卡包说明：</Col>
                                        <Col xs={24} >1.可以获得B-S卡片</Col>
                                        <Col xs={24} >2.等级越高，获得稀有卡片几率越高</Col>
                                    </Row>

                                    <Row>
                                        <Col xs={24}>获得结果：</Col>
                                        <Col xs={24} >1. B1卡片*1</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </TabPane>
                <TabPane tab="卡片图鉴" key="3">
                </TabPane>


            </Tabs>
        )
    }
}

export default GameCard
