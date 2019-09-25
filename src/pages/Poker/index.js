import React,{Component} from 'react'
import {Button, Row, Col, Tabs} from "antd";
import Friends from "../../pageContent/Poker/zjh/Friends";
import {addAjax} from "../../util/ajax";
import {getUser} from "../../util/userUtil";
import MongoTest from "../../pageContent/Poker/test/MongoTest";
import SocketTest from "../../pageContent/Poker/test/SocketTest";
import Friends2 from "../../pageContent/Poker/zjh/Friends2";
const {TabPane} = Tabs;

class Poker extends Component{

    state ={
        activeKey:"1",
    }


    changeTab =(value) =>{
        console.log(value,typeof value)
        this.setState({activeKey:value})
    }

    render() {

        const {activeKey} = this.state;

        return (

            <Tabs  activeKey={activeKey} onChange={this.changeTab}>
                <TabPane tab="poker" key="1">
                    <div>
                        <br />
                        <Row>
                            <Col span={22} offset={1}>
                                <Button type="primary" block size='large' onClick={() =>this.changeTab("2")}>
                                    炸金花
                                </Button>
                            </Col>
                        </Row>

                        <br />
                        <Row>
                            <Col span={22} offset={1}>
                                <Button type="primary" block size='large'>
                                    斗牛
                                </Button>
                            </Col>
                        </Row>

                        <br />
                        <Row>
                            <Col span={22} offset={1}>
                                <Button type="primary" block size='large'>
                                    斗地主
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </TabPane>
                <TabPane tab="炸金花" key="2">
                        <Friends2/>
                </TabPane>
                <TabPane tab="mongoTest" key="3">
                   <MongoTest/>
                </TabPane>
                <TabPane tab="socketTest" key="4">
                   <SocketTest/>
                </TabPane>
            </Tabs>


        )
    }
}

export default Poker
