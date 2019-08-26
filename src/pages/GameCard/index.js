import React, {Component} from 'react'
import {Tabs,Card,Row,Col,Button,Avatar  } from "antd";

const {TabPane} = Tabs;

const gridStyle = {
    width: '50%',
    textAlign: 'center',
    padding:'5px'
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
                        <Card.Grid style={gridStyle} >
                            <Row>
                                <Col xs={24}  >
                                    <span style={{fontSize:'20px',margin:'2px'}}>★☆</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>14/20</span>
                                </Col>

                                <Col xs={24}>
                                    <span style={{color:'blue',fontSize:'20px'}} >D1卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                <Col xs={10}>
                                    <p>效果：</p>
                                </Col>
                                <Col xs={14}>
                                    <p>金币+7%</p>
                                </Col>
                                <Col xs={24}>
                                    <a onClick={this.updateCard} > 升级</a>
                                </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Row>
                                <Col xs={24} >
                                    <span style={{fontSize:'20px',margin:'2px'}}>★☆</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>14/20</span>
                                </Col>

                                <Col xs={24}>
                                    <span style={{color:'blue',fontSize:'20px'}} >D2卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                    <Col xs={8}>
                                        <p>效果：</p>
                                    </Col>
                                    <Col xs={16}>
                                        <p>经验+7%</p>
                                    </Col>
                                    <Col xs={24}>
                                        <a onClick={this.updateCard} > 升级</a>
                                    </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Row>
                                <Col xs={24} >
                                    <span style={{fontSize:'20px',margin:'2px'}}>★☆</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>14/20</span>
                                </Col>

                                <Col xs={24}>
                                    <span style={{color:'blue',fontSize:'20px'}} >D3卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                    <Col xs={8}>
                                        <p>效果：</p>
                                    </Col>
                                    <Col xs={16}>
                                        <p>抽1张:60%&nbsp;&nbsp;</p>
                                    </Col>
                                <Col xs={24}>
                                    <a onClick={this.updateCard} > 升级</a>
                                </Col>
                            </Row>
                        </Card.Grid>


                        <Card.Grid style={gridStyle}>
                            <Row>
                                <Col xs={24} >
                                    <span style={{fontSize:'20px',margin:'2px'}}>★☆</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>14/20</span>
                                </Col>

                                <Col xs={24}>
                                    <span style={{color:'blue',fontSize:'20px'}} >D4卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                    <Col xs={8}>
                                        <p>效果：</p>
                                    </Col>
                                    <Col xs={16}>
                                        <p>金币+8%</p>
                                    </Col>
                                <Col xs={24}>
                                    <a onClick={this.updateCard} > 升级</a>
                                </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Row>
                                <Col xs={24} >
                                    <span style={{fontSize:'20px',margin:'2px'}}>★☆</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>14/20</span>
                                </Col>

                                <Col xs={24}>
                                    <span style={{color:'blue',fontSize:'20px'}} >D5卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                    <Col xs={10}>
                                        <p>效果：</p>
                                    </Col>
                                    <Col xs={14}>
                                        <p>经验+8%</p>
                                    </Col>
                                <Col xs={24}>
                                    <a onClick={this.updateCard} > 升级</a>
                                </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Row>
                                <Col xs={24} >
                                    <span style={{fontSize:'20px',margin:'2px'}}>★☆</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>14/20</span>
                                </Col>

                                <Col xs={24}>
                                    <span style={{color:'blue',fontSize:'20px'}} >D6卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                    <Col xs={8}>
                                        <p>效果：</p>
                                    </Col>
                                    <Col xs={16}>
                                        <p>抽1张:70%&nbsp;&nbsp;</p>
                                    </Col>
                                <Col xs={24}>
                                    <a onClick={this.updateCard} > 升级</a>
                                </Col>
                            </Row>
                        </Card.Grid>


                        <Card.Grid style={gridStyle}>
                            <Row>
                                <Col xs={24} >
                                    <span style={{fontSize:'20px',margin:'2px'}}>★☆☆</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>14/20</span>
                                </Col>

                                <Col xs={24}>
                                    <span style={{color:'blue',fontSize:'20px'}} >D7卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                    <Col xs={8}>
                                        <p>效果：</p>
                                    </Col>
                                    <Col xs={16}>
                                        <p>金币+9%</p>
                                    </Col>
                                <Col xs={24}>
                                    <a onClick={this.updateCard} > 升级</a>
                                </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Row>
                                <Col xs={24} >
                                    <span style={{fontSize:'20px',margin:'2px'}}>★☆☆</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>14/20</span>
                                </Col>

                                <Col xs={24}>
                                    <span style={{color:'blue',fontSize:'20px'}} >D8卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                    <Col xs={10}>
                                        <p>效果：</p>
                                    </Col>
                                    <Col xs={14}>
                                        <p>经验+9%</p>
                                    </Col>
                                <Col xs={24}>
                                    <a onClick={this.updateCard} > 升级</a>
                                </Col>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Row>
                                <Col xs={24} >
                                    <span style={{fontSize:'20px',margin:'2px'}}>★☆☆</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>14/20</span>
                                </Col>

                                <Col xs={24}>
                                    <span style={{color:'blue',fontSize:'20px'}} >D9卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                </Col>
                                    <Col xs={8}>
                                        <p>效果：</p>
                                    </Col>
                                    <Col xs={16}>
                                        <p>抽1张:80%&nbsp;&nbsp;</p>
                                    </Col>
                                    <Col xs={24}>
                                        <a onClick={this.updateCard} > 升级</a>
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
                                                <Button block onClick={this.openOne}>1次&nbsp;&nbsp;&nbsp;&nbsp;1 🗝</Button>
                                            </Col>
                                            <Col xs={16} style={marginStyle}>
                                                <Button block onClick={this.openTen}>10次&nbsp;&nbsp;&nbsp;&nbsp;9 🗝</Button>
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
                                            <Button block onClick={this.openOne}>1次&nbsp;&nbsp;&nbsp;&nbsp;50G</Button>
                                        </Col>
                                        <Col xs={16} style={marginStyle}>
                                            <Button block onClick={this.openTen}>10次&nbsp;&nbsp;&nbsp;&nbsp;450G</Button>
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
                                            <Button block>1次&nbsp;&nbsp;&nbsp;&nbsp;120G</Button>
                                        </Col>
                                        <Col xs={16} style={marginStyle}>
                                            <Button block>10次&nbsp;&nbsp;&nbsp;&nbsp;1080G</Button>
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
                                            <Button block>1次&nbsp;&nbsp;&nbsp;&nbsp;50 钻</Button>
                                        </Col>
                                        <Col xs={16} style={marginStyle}>
                                            <Button block>10次&nbsp;&nbsp;&nbsp;&nbsp;450 钻</Button>
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



            </Tabs>
        )
    }
}

export default GameCard
